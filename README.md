# DMC Save Editor

> Editor de saves para Devil May Cry HD Collection (Steam) — projeto open source de uso pessoal e educacional.

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-red.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org)

---

## Sobre

O **DMC Save Editor** permite editar arquivos de save da Devil May Cry HD Collection no Steam (`.sav`). O projeto nasceu como ferramenta pessoal e estudo de manipulação de dados binários — entendendo endianness, layout de memória e estrutura de arquivos de jogos.

**Assets de som e textura do jogo:** [Devil May Cry HD Collection – Extract All Assets](https://www.nexusmods.com/devilmaycryhdcollection/mods/373) (Nexus Mods) — contém todos os sons e texturas extraídos do jogo.

## Jogos suportados

| Jogo | Status | Checksum |
|------|--------|----------|
| Devil May Cry 1 | ✅ Suportado | Sem checksum |
| Devil May Cry 2 | 🔜 Em breve | Sem checksum |
| Devil May Cry 3 | 🔜 Em breve | **Obrigatório** (recalculado automaticamente) |

## Features

- Importar arquivo `.sav` via drag & drop ou seleção
- Editar campos do save: missão atual, dificuldade, orbs, playtime, vida, devil trigger
- Visualizar todos os 10 slots de save
- Suporte futuro para DMC2 e DMC3

## Stack

- **React 19** + **TypeScript 5.7**
- **Vite 6** com HMR
- **Tailwind CSS v4** + **shadcn/ui**
- **react-i18next** para internacionalização
- **Vitest** para testes

## Desenvolvimento local

```bash
# Instalar dependências
bun install

# Iniciar dev server
bun run dev

# Rodar testes
bun run test

# Build de produção
bun run build
```

## Formato do arquivo DMC1 (`dmc1.sav`)

O arquivo é **binário puro**, sem criptografia e sem checksum. Isso facilita muito a edição.

### Estrutura

- **10 slots de save**, cada um com **2416 bytes**
- Slot N começa no offset `N × 2416`
- Magic bytes de validação: `0x01 0x00 0x00` nos primeiros 3 bytes de cada slot

### Offsets mapeados (relativos ao início do slot)

| Offset | Campo | Tipo | Observação |
|--------|-------|------|------------|
| +32 | Save count | int16 LE | Número de vezes que o slot foi salvo |
| +34 | Times beaten | int16 LE | Zeradas completadas |
| +36 | Current mission | uint8 | Missão atual (0-indexed) |
| +38 | Difficulty | uint8 | `valor = index × 2 + 1` |
| +44 | Playtime | int32 LE | Em frames a 60fps |
| +1568 | Yellow orbs | int16 LE | |
| +1572 | Vitality stars | uint8 | Nível de vida |
| +1573 | Devil trigger | uint8 | Nível de devil trigger |
| +1588 | Red orbs | int32 LE | |
| +1592 | Blue orbs | uint8 | |

### Sobre endianness

Todos os valores multi-byte neste arquivo usam **Little Endian (LE)**: o byte menos significativo vem primeiro. Por exemplo, o valor `0x0A00` no arquivo representa o número `10` em decimal.

## Contribuindo

Contribuições são bem-vindas! Se você mapeou novos offsets, encontrou bugs, ou quer adicionar suporte ao DMC2/DMC3 — abra uma issue ou pull request.

Leia a [licença](#licença) antes de contribuir.

## Licença

Este projeto está licenciado sob [CC BY-NC-SA 4.0](LICENSE).

- ✅ Uso pessoal e educacional
- ✅ Modificação e contribuição
- ✅ Compartilhamento com a mesma licença
- ❌ Uso comercial
- ❌ Publicar como produto próprio sem permissão do autor original

---

> **Aviso:** Este projeto não é afiliado, endossado ou conectado à Capcom Co., Ltd.
> Devil May Cry é marca registrada da Capcom Co., Ltd. Todos os direitos reservados.
