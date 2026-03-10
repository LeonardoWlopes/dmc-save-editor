# DMC Save Editor

> Open-source save editor for Devil May Cry HD Collection (Steam) — built for personal use and as an educational project on binary data manipulation.

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-red.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org)

---

## What is this?

**DMC Save Editor** lets you load, inspect, and modify `.sav` files from the Devil May Cry HD Collection on Steam — directly in the browser, with no server involved. Everything happens client-side.

The project was also born as a study on **binary file manipulation**: understanding endianness, raw memory layout, and how game save data is structured at the byte level. If you're curious about those topics, this codebase is meant to be readable and educational.

Sound assets and textures used in the UI were extracted from the game via [Devil May Cry HD Collection – Extract All Assets](https://www.nexusmods.com/devilmaycryhdcollection/mods/373) (Nexus Mods).

---

## Supported Games

| Game | Status | Checksum |
| --- | --- | --- |
| Devil May Cry 1 | ✅ Supported | None |
| Devil May Cry 2 | 🔜 Coming soon | None |
| Devil May Cry 3 | 🔜 Coming soon | **Required** (auto-recalculated on save) |

---

## Features

- Import `.sav` files via drag & drop or file picker
- Select from up to 10 save slots per file
- Edit save data: current mission, difficulty, orbs, playtime, vitality, devil trigger
- Download the modified `.sav` file, ready to drop back into your game
- Automatic game detection from magic bytes
- Browser language detection (English and Portuguese)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 + TypeScript 5.7 |
| Build Tool | Vite 6 + SWC |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Forms | React Hook Form + Zod |
| i18n | react-i18next |
| State | React Context |
| Routing | React Router v7 |
| Testing | Vitest + Testing Library |
| Package Manager | Bun |

---

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Run tests
bun run test

# Production build
bun run build
```

---

## Project Structure

```text
src/
├── components/         # Reusable UI components
│   ├── dmc1-editor/    # DMC1-specific form fields
│   ├── layout/         # App shell (header/footer)
│   └── ui/             # shadcn/ui primitives
├── contexts/           # React context (global game file state)
├── enums/              # Game version and difficulty enums
├── hooks/              # Custom React hooks
├── i18n/               # Translations (pt-BR, en)
├── interfaces/         # TypeScript interfaces for save data
├── screens/            # Page-level components (home, dmc1 editor)
├── stores/             # Zustand stores
├── types/              # Global type declarations
└── utils/
    ├── parsers.ts       # Binary read/write logic (core)
    ├── detect-game.ts   # Magic byte game detection
    └── data.ts          # Formatting helpers
```

---

## How It Works

1. User drops a `.sav` file onto the page
2. The file is read as an `ArrayBuffer` (raw binary)
3. `detect-game.ts` checks magic bytes to identify the game
4. The appropriate parser (e.g. `parseDmc1Slots`) reads field values using `DataView` with Little Endian offsets
5. Values are displayed in a form — user edits them
6. On download, `serializeDmc1Slot` writes the values back into the buffer at the correct offsets
7. The buffer is exported as a `.sav` file via a blob download

See [docs/dmc1-format.md](docs/dmc1-format.md) for a full breakdown of the binary format.

---

## Documentation

| Document | Description |
|----------|-------------|
| [docs/dmc1-format.md](docs/dmc1-format.md) | DMC1 save file binary format, all offsets, data types |
| [docs/architecture.md](docs/architecture.md) | Codebase architecture and how to add a new game |
| [docs/contributing.md](docs/contributing.md) | How to contribute, conventions, and workflow |

---

## Contributing

Contributions are welcome! Whether you've mapped new offsets, found a bug, or want to add DMC2/DMC3 support — open an issue or pull request.

Please read [docs/contributing.md](docs/contributing.md) before submitting.

---

## License

This project is licensed under [CC BY-NC-SA 4.0](LICENSE).

- ✅ Personal and educational use
- ✅ Modification and contribution
- ✅ Redistribution under the same license
- ❌ Commercial use
- ❌ Publishing as your own product without the original author's permission

---

> **Disclaimer:** This project is not affiliated with, endorsed by, or connected to Capcom Co., Ltd.
> Devil May Cry is a registered trademark of Capcom Co., Ltd. All rights reserved.
