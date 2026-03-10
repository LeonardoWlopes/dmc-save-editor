# Architecture

> How the DMC Save Editor is structured and how to extend it with support for a new game.

---

## Overview

The app follows a clear pipeline:

```
File (ArrayBuffer)
  → Game Detection (magic bytes)
    → Parser (DataView reads)
      → Form (React Hook Form + Zod)
        → Serializer (DataView writes)
          → Download (Blob)
```

Each step is isolated, making it straightforward to add support for a new game without touching the existing logic.

---

## Directory Structure

```
src/
├── components/
│   ├── dmc1-editor/      # DMC1-specific field components
│   ├── layout/           # App shell (header, footer)
│   └── ui/               # shadcn/ui primitives (Button, Input, Select…)
│
├── contexts/
│   └── app-context/      # Holds the loaded ArrayBuffer and detected game
│
├── enums/
│   ├── version.ts        # EGameVersion (DMC1 | DMC2 | DMC3)
│   └── dmc1.ts           # EDmc1Difficulty
│
├── hooks/
│   ├── use-before-unload.ts   # Warns user before navigating away with unsaved changes
│   └── use-sound-effects.ts   # Plays UI sounds
│
├── i18n/
│   ├── config.ts              # i18next setup + browser language detection
│   └── languages/
│       ├── en.json            # English translations
│       └── pt-BR.json         # Portuguese translations
│
├── interfaces/
│   ├── common.ts         # Shared interfaces
│   ├── dmc1.ts           # IDmc1Slot — parsed slot data shape
│   └── game.ts           # IGameFile — what the context holds
│
├── screens/
│   ├── home/             # Landing page: file drop + game detection
│   └── dmc1/             # Editor page for DMC1
│       ├── index.tsx      # UI
│       ├── container.ts   # Business logic (reads context, calls parsers/serializers)
│       ├── schema.ts      # Zod validation schema
│       └── types.ts       # TDmc1ScreenForm type
│
└── utils/
    ├── parsers.ts         # Binary read/write (DataView)
    ├── detect-game.ts     # Magic byte detection
    └── data.ts            # Formatting helpers (e.g. frames → hh:mm:ss)
```

---

## Key Concepts

### ArrayBuffer as the Source of Truth

The entire save file is held in memory as a raw `ArrayBuffer` inside `AppContext`. No data is sent to any server — everything happens in the browser.

When the user downloads the file, a copy of the buffer is made, the edited fields are written into it, and a Blob is created for download. The original buffer is never mutated.

```typescript
// parsers.ts — always copy, never mutate
const copy = buffer.slice(0);
const view = new DataView(copy);
view.setInt32(base + 1588, data.redOrbs, true);
return copy;
```

### DataView for Binary I/O

JavaScript's `DataView` is used for all binary reads and writes. It lets you specify:
- The byte offset
- The data type (Int8, Uint8, Int16, Int32…)
- The byte order (Little Endian vs Big Endian)

```typescript
// Reading
const redOrbs = view.getInt32(base + 1588, true); // true = LE

// Writing
view.setInt32(base + 1588, newValue, true);
```

### Game Detection via Magic Bytes

`detect-game.ts` reads the first bytes of the file and matches them against known game signatures. Currently only DMC1 is supported:

```typescript
// DMC1 magic: 0x01 0x00 0x00 at the start of each valid slot
const DMC1_MAGIC = [0x01, 0x00, 0x00];
```

### Container Pattern

Each screen has a `container.ts` file that holds all business logic, keeping `index.tsx` focused on rendering. The container reads from context, parses data, manages form state, and calls serializers.

---

## Adding a New Game (e.g., DMC2)

### 1. Add the game version to the enum

```typescript
// src/enums/version.ts
export enum EGameVersion {
  DMC1 = 'dmc1',
  DMC2 = 'dmc2', // add this
  DMC3 = 'dmc3',
}
```

### 2. Create the slot interface

```typescript
// src/interfaces/dmc2.ts
export interface IDmc2Slot {
  index: number;
  isEmpty: boolean;
  // ... fields you've mapped
}
```

### 3. Add magic byte detection

```typescript
// src/utils/detect-game.ts
const DMC2_MAGIC = [0x??]; // find this by inspecting a real dmc2.sav

if (DMC2_MAGIC.every((byte, i) => view.getUint8(i) === byte)) {
  return EGameVersion.DMC2;
}
```

### 4. Write the parser and serializer

```typescript
// src/utils/parsers.ts
export const DMC2_SLOT_SIZE = ????; // find from the actual file
export const DMC2_SLOT_COUNT = ????;

export function parseDmc2Slots(buffer: ArrayBuffer): IDmc2Slot[] {
  // ...
}

export function serializeDmc2Slot(buffer: ArrayBuffer, slotIndex: number, data: TDmc2ScreenForm): ArrayBuffer {
  // ...
}
```

### 5. Create the screen

Copy `src/screens/dmc1/` as a starting point and adapt:
- `index.tsx` — render the fields your game has
- `container.ts` — call the DMC2 parser/serializer
- `schema.ts` — Zod validation for DMC2's field ranges
- `types.ts` — form type

### 6. Add the route

```typescript
// src/router.tsx
<Route path="/dmc2" element={<Dmc2Screen />} />
```

### 7. Add translations

Add new keys to both `src/i18n/languages/en.json` and `src/i18n/languages/pt-BR.json`.

---

## i18n

Translations live in `src/i18n/languages/`. The config in `src/i18n/config.ts` auto-detects the browser language and falls back to English.

To add a new language:
1. Create `src/i18n/languages/<locale>.json` mirroring the structure of `en.json`
2. Register it in `src/i18n/config.ts`

Run `bun run lint-i18n` to verify all translation keys are present across all language files.

---

## State Management

| Concern | Solution |
|---------|----------|
| Loaded file + game version | `AppContext` (React Context) |
| Form state | React Hook Form |
| UI notifications | Sonner (toast) |

---

## Testing

Tests live next to the code they test in `__tests__/` subdirectories, or as `.spec.ts` files alongside the source.

```bash
bun run test          # run all tests
bun run test:watch    # watch mode
bun run test:cov      # coverage report
bun run test:ui       # Vitest UI
```

Focus testing on the parsing/serialization logic in `utils/` — these are pure functions with no side effects and are easy to test with real binary fixtures.
