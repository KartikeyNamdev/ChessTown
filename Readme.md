# ♟️ ChessTown

> _Real‑time multiplayer chess in your browser._

[![GitHub issues](https://img.shields.io/github/issues/your-username/ChessTown?color=red)](https://github.com/your-username/ChessTown/issues)
[![GitHub stars](https://img.shields.io/github/stars/your-username/ChessTown?color=yellow)](https://github.com/your-username/ChessTown/stargazers)
![Last Commit](https://img.shields.io/github/last-commit/your-username/ChessTown?color=blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Made with TypeScript](https://img.shields.io/badge/TypeScript-5.x-informational)
![WebSocket](https://img.shields.io/badge/WebSocket-Realtime-1f72ff)

```
   ♜  ♞  ♝  ♛  ♚  ♝  ♞  ♜
   ♟  ♟  ♟  ♟  ♟  ♟  ♟  ♟
   ·  ·  ·  ·  ·  ·  ·  ·
   ·  ·  ·  ·  ·  ·  ·  ·
   ·  ·  ·  ·  ·  ·  ·  ·
   ·  ·  ·  ·  ·  ·  ·  ·
   ♙  ♙  ♙  ♙  ♙  ♙  ♙  ♙
   ♖  ♘  ♗  ♕  ♔  ♗  ♘  ♖
```

Welcome to **ChessTown**, a real‑time multiplayer chess experience where two players can battle it out right from their browsers. Built with **Node.js, WebSockets, TypeScript, and chess.js**, with a **React + Tailwind** frontend.

---

## 🔗 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Demo / Screenshots](#-demo--screenshots)
- [Getting Started](#-getting-started)

  - [Prerequisites](#prerequisites)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
  - [Env Variables](#env-variables)

- [Project Structure](#-project-structure)
- [WebSocket Protocol](#-websocket-protocol)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contributors](#-contributors)
- [Credits](#-credits)

---

## ✨ Features

- ✅ Real‑time multiplayer via **WebSocket**
- ✅ Automatic **move validation** with `chess.js`
- ✅ **Game‑over detection** (checkmate, stalemate, draws)
- ✅ **Color assignment** at game start (White / Black)
- ✅ **Live board sync** for both players
- ✅ **Resilient protocol** with clear message types
- 🧪 Dev‑friendly logs and ASCII board dump for debugging

> Want to help? Check the [Roadmap](#-roadmap) and [Contributing](#-contributing) sections!

---

## 🧩 Architecture

```mermaid
flowchart LR
  subgraph Browser A
    A1[React UI] -- WS --> A2[Client Socket]
  end
  subgraph Browser B
    B1[React UI] -- WS --> B2[Client Socket]
  end
  subgraph Server (Node.js)
    S1[WS Gateway]
    S2[Game Matcher]
    S3[Game Engine\n(chess.js wrapper)]
  end
  A2 <--> S1
  B2 <--> S1
  S1 <--> S2
  S2 <--> S3
```

- **Server** pairs players, validates and applies moves, and broadcasts updates.
- **Client** renders the board, sends player actions, and displays status.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, WebSocket (`ws`), **TypeScript**
- **Game Engine:** [`chess.js`](https://github.com/jhlywa/chess.js)
- **Frontend:** React, Vite, Tailwind CSS
- **Tooling:** ESLint, Prettier

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+** and npm (or pnpm/yarn)

### Server Setup

```bash
# Clone the repo
git clone https://github.com/your-username/ChessTown.git
cd ChessTown

# Install server deps
cd backend1
npm install

# Start dev server (with nodemon / ts-node if configured)
npm run dev
# or
npm run start
```

### Client Setup

```bash
# From project root
cd frontend
npm install

# Start the React dev server
npm run dev
```

> Open two browser tabs to connect two players to the same WebSocket server.

### Env Variables

Create a `.env` file in `frontend` (and `backend1` if needed):

```env
VITE_WS_URL=ws://localhost:8080
# SERVER_PORT=8080
```

---

## 📂 Project Structure

```bash
ChessTown/
├─ backend1/              # WebSocket server (Node + TS)
│  └─ src/
│     ├─ Game.ts          # Game class (rules, moves, validation)
│     ├─ GameManager.ts   # Player pairing / game handling
│     ├─ messages.ts      # Message type constants
│     └─ index.ts         # Server entry point
├─ frontend/              # React frontend (Vite + Tailwind)
│  ├─ src/
│  │  ├─ components/      # UI components (Board, Tile, HUD)
│  │  ├─ pages/           # Routes / views
│  │  ├─ hooks/           # Custom hooks (useChess, useSocket)
│  │  └─ main.tsx         # App bootstrap
│  └─ index.html
├─ dist/                  # Build outputs
├─ package.json
├─ tsconfig.json
├─ Readme.md
└─ assets/                # Screenshots / GIFs for README
```

---

## 📡 WebSocket Protocol

All messages are **JSON**.

**Server → Client**

```json
{ "type": "INIT_GAME", "payload": { "color": "White" } }
{ "type": "MOVE", "payload": { "from": "e2", "to": "e4" } }
{ "type": "GAME_OVER", "payload": { "winner": "white" } }
```

**Client → Server**

```json
{ "type": "MOVE", "payload": { "from": "e2", "to": "e4" } }
```

<details>
<summary>Planned messages</summary>

```json
{ "type": "RESIGN" }
{ "type": "DRAW_OFFER" }
{ "type": "CHAT", "payload": { "text": "gg!" } }
```

</details>

---

## 🗺 Roadmap

- ⏱️ Timed games (clocks)
- 💬 In‑game chat
- 👀 Spectator mode
- 🧮 ELO‑like rating / stats
- 📜 Match history
- 🔐 Reconnect / resume
- ♟️ Puzzle / analysis mode

> Have ideas? Open a **Discussion** or submit a **PR**!

---

## 🤝 Contributing

We love contributions! 🎉

1. **Fork** the repo
2. Create a feature branch: `git checkout -b feat/amazing-idea`
3. Commit with **Conventional Commits**: `feat: add timer to games`
4. **Push** and open a **PR**

### Guidelines

- Run linters/formatters before committing
- Add tests or include testing steps in the PR
- Be kind and constructive ❤️

<details>
<summary>All Contributors (bot)</summary>

- Enable the [all-contributors bot](https://allcontributors.org/) to auto‑thank contributors in README.

</details>

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## 🙌 Contributors

Thanks to all the amazing contributors!

<a href="https://github.com/your-username/ChessTown/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-username/ChessTown" />
</a>

---

## 🌟 Support

If you like this project, please ⭐ the repo — it helps others find **ChessTown**.

> “Every chess master was once a beginner.” — _Irving Chernev_

---

## 📝 Notes

- Replace `your-username` in badge URLs and links with your GitHub username.
- Screenshots/GIFs live in `assets/` — update paths if you move them.
- Want a **Deploy** button (Vercel/Cloudflare/Render)? Open an issue and we’ll add it.
