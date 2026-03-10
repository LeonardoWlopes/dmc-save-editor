# Contributing

Thanks for your interest in contributing to DMC Save Editor! This document covers setup, conventions, and the areas where help is most needed.

---

## Ways to Contribute

- **Map new offsets** — Find undocumented bytes in DMC1, DMC2, or DMC3 save files and add them to the parser and [dmc1-format.md](dmc1-format.md)
- **Add DMC2 or DMC3 support** — Follow the guide in [architecture.md](architecture.md#adding-a-new-game)
- **Bug reports** — Open an issue with the steps to reproduce and the save file if possible (make sure to remove any personal data)
- **UI/UX improvements** — Better layouts, accessibility, mobile usability
- **Translations** — Add support for a new language
- **Tests** — More coverage for the binary parsing logic is always welcome

---

## Setup

You need [Bun](https://bun.sh) installed.

```bash
# Clone the repo
git clone https://github.com/YOUR_ORG/dmc-save-editor.git
cd dmc-save-editor

# Install dependencies (this also sets up git hooks via Lefthook)
bun install

# Start the dev server
bun run dev
```

---

## Code Conventions

This project uses [Biome](https://biomejs.dev) for linting and formatting. Run it before committing:

```bash
bun run lint
```

Pre-commit hooks (via Lefthook) run Biome and the i18n linter automatically on staged files.

### TypeScript

- Prefer `interface` over `type` for object shapes
- Use `satisfies` when constructing objects against an interface
- Avoid `any` — use `unknown` and narrow it

### Components

- Keep components small and focused on rendering
- Business logic belongs in `container.ts`, not `index.tsx`
- Use the `FieldWrapper` component for consistent form field layout

### Binary Parsing

- Never mutate the original `ArrayBuffer` — always `buffer.slice(0)` first
- Always pass `true` as the second argument to `DataView` methods (Little Endian)
- Add a comment for any offset that has non-obvious encoding (like difficulty)
- Document new offsets in [docs/dmc1-format.md](dmc1-format.md)

---

## Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/). The commit-msg hook will reject non-conforming messages.

```
feat: add red orbs cap validation
fix: correct difficulty offset for DMC1 slot 9
docs: document yellow orbs encoding
chore: update dependencies
```

Scopes are optional but encouraged for larger changes:

```
feat(dmc2): add initial slot parser
fix(i18n): missing key in English translation
```

---

## Pull Requests

1. Fork the repository and create a branch from `main`
2. Keep changes focused — one concern per PR
3. Update documentation if you're changing the file format or adding a new game
4. Make sure `bun run test` and `bun run lint` pass
5. Open the PR with a clear description of what changed and why

---

## Mapping New Offsets

This is one of the most valuable contributions you can make. Here's how to approach it:

### Tools

- **[HxD](https://mh-nexus.de/en/hxd/)** or **[ImHex](https://imhex.werwolv.net/)** — hex editors for inspecting the raw file
- **[Cheat Engine](https://www.cheatengine.org/)** — scan live game memory, then cross-reference with the file

### Process

1. Open a known save file in a hex editor
2. Note the current value of the field you want to find (e.g., 500 red orbs)
3. Search the file for that value encoded as the expected type (e.g., `F4 01` for 500 as `int16 LE`)
4. Change the value in-game, save, reload the file, and confirm the byte changed at that offset
5. Calculate the offset relative to the slot start (`offset_in_file - slot_base`)
6. Add it to the parser, serializer, interface, and documentation

### Once you've found an offset

1. Add the read in `parseDmc1Slots` in `src/utils/parsers.ts`
2. Add the write in `serializeDmc1Slot`
3. Add the field to `IDmc1Slot` in `src/interfaces/dmc1.ts`
4. Add validation in `src/screens/dmc1/schema.ts`
5. Add the form field to `src/screens/dmc1/index.tsx`
6. Add translation keys to both `en.json` and `pt-BR.json`
7. Update `docs/dmc1-format.md`

---

## License Note

By contributing, you agree that your contributions will be licensed under [CC BY-NC-SA 4.0](../LICENSE), the same license as the rest of the project.
