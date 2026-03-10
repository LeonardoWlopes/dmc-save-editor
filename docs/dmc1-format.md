# DMC1 Save File Format

> Binary format reference for `dmc1.sav` — Devil May Cry 1, HD Collection (Steam).

---

## Overview

The DMC1 save file is **raw binary** with no encryption and no checksum. This makes it straightforward to read and write: you just need to know the byte offsets and data types for each field.

```
File: dmc1.sav
Total size: 24160 bytes (10 slots × 2416 bytes each)
Encoding: Little Endian for all multi-byte values
Checksum: None
Encryption: None
```

---

## Slot Layout

The file contains **10 save slots**. Each slot is exactly **2416 bytes**. To find where slot N starts:

```
slot_offset = N * 2416   (N is 0-indexed)
```

| Slot | Start offset | End offset |
|------|-------------|------------|
| 0 | 0x0000 | 0x096F |
| 1 | 0x0970 | 0x12DF |
| 2 | 0x12E0 | 0x1C4F |
| 3 | 0x1C50 | 0x25BF |
| 4 | 0x25C0 | 0x2F2F |
| 5 | 0x2F30 | 0x389F |
| 6 | 0x38A0 | 0x420F |
| 7 | 0x4210 | 0x4B7F |
| 8 | 0x4B80 | 0x54EF |
| 9 | 0x54F0 | 0x5E5F |

---

## Magic Bytes (Slot Validation)

The first 3 bytes of a valid (non-empty) slot are always:

```
0x01 0x00 0x00
```

If these bytes are not present at the slot's start offset, the slot is considered **empty**. This is how the editor detects which slots have actual save data.

---

## Field Offsets

All offsets below are **relative to the start of the slot** (i.e., add the slot base offset from the table above).

### Progress Fields

| Offset | Field | Type | Notes |
|--------|-------|------|-------|
| +32 | Save Count | `int16` LE | How many times the slot was saved |
| +34 | Times Beaten | `int16` LE | Number of completed playthroughs |
| +36 | Current Mission | `uint8` | 0-indexed mission number |
| +38 | Difficulty | `uint8` | See encoding below |
| +44 | Playtime | `int32` LE | In frames at 60fps — **read-only in the editor** |

### Character Fields

| Offset | Field | Type | Notes |
|--------|-------|------|-------|
| +1572 | Vitality Stars | `uint8` | Number of life bars |
| +1573 | Devil Trigger | `uint8` | Number of DT bars |

### Orbs

| Offset | Field | Type | Notes |
|--------|-------|------|-------|
| +1568 | Yellow Orbs | `int16` LE | |
| +1588 | Red Orbs | `int32` LE | Main currency |
| +1592 | Blue Orbs | `uint8` | |

---

## Data Types

| Type | Size | Range | Description |
|------|------|-------|-------------|
| `uint8` | 1 byte | 0–255 | Unsigned 8-bit integer |
| `int16` LE | 2 bytes | −32768–32767 | Signed 16-bit, Little Endian |
| `int32` LE | 4 bytes | −2147483648–2147483647 | Signed 32-bit, Little Endian |

---

## Endianness

All multi-byte values in this file use **Little Endian (LE)** byte order: the least significant byte comes first in memory.

**Example — Red Orbs value `1000` (`0x000003E8`):**

```
Memory layout (Little Endian):
Offset +1588: E8
Offset +1589: 03
Offset +1590: 00
Offset +1591: 00
```

When you read these 4 bytes in order (E8, 03, 00, 00) and interpret them as Little Endian, you get `0x000003E8` = `1000`.

In code, this is handled by `DataView` with the `littleEndian` flag:

```typescript
const redOrbs = view.getInt32(base + 1588, true); // true = little endian
```

---

## Difficulty Encoding

The difficulty byte does not store a simple index. It uses the formula:

```
stored_value = difficulty_index * 2 + 1
```

DMC 1 has three difficulties only:

| Difficulty       | Index | Stored Value (common) |
|------------------|-------|------------------------|
| Normal           | 0     | 1                      |
| Hard             | 1     | 3                      |
| Dante Must Die   | 2     | 5                      |

**Note:** Some saves use an offset of +2, storing 3, 5, 7 for the three difficulties instead of 1, 3, 5. The editor normalizes these on read so Normal displays correctly; on save it writes the display value (1, 3, 5) as-is.

---

## Playtime Calculation

Playtime is stored as a **frame count at 60fps**. To convert to human-readable time:

```typescript
const totalSeconds = Math.floor(frames / 60);
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;
```

Playtime is intentionally kept **read-only** in the editor, as modifying it could break in-game records.

---

## Reading with DataView

Here's a minimal example of how to read slot 0 data in JavaScript/TypeScript:

```typescript
async function readDmc1Save(file: File) {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);

  const SLOT_SIZE = 2416;
  const slotIndex = 0;
  const base = slotIndex * SLOT_SIZE;

  // Check magic bytes
  const isEmpty = !(
    view.getUint8(base + 0) === 0x01 &&
    view.getUint8(base + 1) === 0x00 &&
    view.getUint8(base + 2) === 0x00
  );

  if (isEmpty) return null;

  return {
    saveCount:      view.getInt16(base + 32, true),
    timesBeaten:    view.getInt16(base + 34, true),
    currentMission: view.getUint8(base + 36),
    difficulty:     view.getUint8(base + 38),
    playtime:       view.getInt32(base + 44, true),
    yellowOrbs:     view.getInt16(base + 1568, true),
    vitality:       view.getUint8(base + 1572),
    devilTrigger:   view.getUint8(base + 1573),
    redOrbs:        view.getInt32(base + 1588, true),
    blueOrbs:       view.getUint8(base + 1592),
  };
}
```

---

## Known Unknowns

The following regions have not been fully mapped yet. Contributions are welcome.

| Offset range | Status |
|-------------|--------|
| +0 to +31 | Partially unknown (magic bytes at +0) |
| +39 to +43 | Unknown |
| +45 to +1567 | Largely unknown |
| +1574 to +1587 | Unknown |
| +1593 to +2415 | Unknown |

If you discover what any of these bytes represent, please open a PR updating this document and the parser in `src/utils/parsers.ts`.

---

## Tools for Exploration

Recommended tools for exploring the raw binary yourself:

- **[HxD](https://mh-nexus.de/en/hxd/)** (Windows) — free hex editor
- **[ImHex](https://imhex.werwolv.net/)** (cross-platform) — open source hex editor with pattern matching
- **[010 Editor](https://www.sweetscape.com/010editor/)** — commercial, very powerful for game file research
- **[Cheat Engine](https://www.cheatengine.org/)** — useful for finding live memory addresses and mapping them to file offsets
