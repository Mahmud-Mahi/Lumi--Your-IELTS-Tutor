<div align="center">

![Lumi](public/icons/icon-192.png)

# Lumi — Your IELTS Tutor

**Your personal AI IELTS speaking coach** — practice speaking, get instant CEFR evaluation, and improve with personalized lesson plans.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-app/)

</div>

---

## ✨ Features

### 🎤 Full Diagnostic Test
Complete Cambridge IELTS-style speaking assessment across all three parts:
- **Part 1** — Introduction & familiar topics (4-5 questions)
- **Part 2** — Cue card with 1-minute preparation
- **Part 3** — Abstract discussion & follow-up questions

### 📊 AI-Powered Evaluation
Instant detailed scoring across four IELTS pillars:

| Pillar | What's Assessed |
|--------|----------------|
| **Fluency & Coherence** | Smoothness, pacing, logical flow |
| **Lexical Resource** | Vocabulary range, precision, idiomatic language |
| **Grammatical Range** | Sentence structures, error frequency, complexity |
| **Pronunciation** | Clarity, stress, intonation, individual sounds |

### 📈 Score Report
- Predicted IELTS band score (0-9)
- CEFR level assessment (A1-C2)
- Strengths & growth areas per pillar
- Upgraded expressions with band-level alternatives
- Pronunciation tips with IPA transcriptions
- Speech statistics (WPM, pause fluency, vocabulary variety)

### 📚 Personalized Lesson Studio
AI-generated lesson roadmap tailored to your weaknesses:
- Rapid fire drills
- Cue card practice
- Lexical boost exercises
- Shadowing sessions
- Mock exam simulations

### 💬 1v1 Chat Practice
Two practice modes:
- **Casual Chat** — Free conversation on everyday topics
- **Interview Mode** — Structured IELTS Part 1 simulation with random topics

### 🔊 Real-Time Voice
- **Speech-to-Text**: Local offline Whisper (sherpa-onnx) + browser Web Speech API
- **Text-to-Speech**: Microsoft Edge Neural TTS with browser fallback
- Lumi speaks questions aloud and listens to your answers

### 📱 Progressive Web App
- Installable on desktop & mobile

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- A microphone for voice practice

### Installation

```bash
git clone https://github.com/Mahmud-Mahi/Lumi--Your-IELTS-Tutor.git
cd Lumi--Your-IELTS-Tutor
npm install
cp .env.example .env
```

### Configure LLM Provider

Edit `.env` with your preferred provider. Lumi uses a **cascading fallback** system:

```env
# Option 1: Local LLM (LM Studio, llama.cpp, LiteLLM, vLLM)
LLM_BASE_URL=http://localhost:3456/v1
LLM_MODEL=auto
LLM_API_KEY=none

# Option 2: Ollama (free, runs locally)
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=ornith:9b

# Option 3: Groq Cloud (free tier, no credit card)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b

# Provider priority order
PROVIDER_PRIORITY=local,ollama,groq
```

> **No API key? No problem!** Configure everything at runtime through the in-app Settings panel.

### Run the App

```bash

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Frontend (React)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │Diagnostic│ │  Score   │ │  Lesson  │ │   1v1    │   │
│  │   Test   │ │  Report  │ │  Studio  │ │   Chat   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                    Web Speech API                          │
└─────────────────────────┬────────────────────────────────┘
                          │ HTTP / REST
┌─────────────────────────┴────────────────────────────────┐
│                  Backend (Express)                         │
│  ┌──────────────────────────────────────────────────┐    │
│  │            LLM Provider Cascade                    │    │
│  │    Local → Ollama → Groq (auto-fallback)          │    │
│  └──────────────────────────────────────────────────┘    │
│  ┌─────────────────┐  ┌─────────────────────────────┐    │
│  │   Whisper STT   │  │     Edge Neural TTS          │    │
│  │  (sherpa-onnx)  │  │     (msedge-tts)             │    │
│  └─────────────────┘  └─────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

---

## ⚙️ Configuration

### LLM Providers

| Provider | Description | Setup |
|----------|-------------|-------|
| **Local** | Self-hosted LLM via OpenAI-compatible API | Set `LLM_BASE_URL` to your server |
| **Ollama** | Run open-source models locally | Install [Ollama](https://ollama.com) |
| **Groq** | Free cloud API (no credit card) | Get key at [console.groq.com](https://console.groq.com) |

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `LLM_BASE_URL` | `http://localhost:3456/v1` | Local LLM server URL |
| `LLM_MODEL` | `auto` | Model ID or `auto` for auto-detect |
| `OLLAMA_BASE_URL` | `http://localhost:11434/v1` | Ollama server URL |
| `OLLAMA_MODEL` | `ornith:9b` | Ollama model name |
| `GROQ_API_KEY` | — | Groq API key |
| `GROQ_MODEL` | `openai/gpt-oss-120b` | Groq model ID |
| `PROVIDER_PRIORITY` | `local,ollama,groq` | Fallback order |
| `TTS_ENABLED` | `true` | Enable text-to-speech |
| `TTS_VOICE` | `en-US-JennyNeural` | Edge TTS voice ID |
| `PORT` | `3000` | Server port |

---

## 📁 Project Structure

```
├── src/
│   ├── components/          # React UI components
│   │   ├── DiagnosticTest.tsx    # Cambridge IELTS test flow
│   │   ├── EvaluationReport.tsx  # Score report with tabs
│   │   ├── LessonStudio.tsx      # Personalized lesson modules
│   │   ├── LumiLiveChat.tsx      # 1v1 chat & interview mode
│   │   ├── LumiAvatar.tsx        # Animated character avatar
│   │   ├── SettingsModal.tsx     # Provider & voice config
│   │   └── ...
│   ├── utils/
│   │   ├── speech.ts        # TTS, STT, sound effects
│   │   ├── evaluation.ts    # LLM response normalization
│   │   ├── greetings.ts     # AI greeting generation
│   │   └── ...
│   ├── data/                # IELTS question banks
│   ├── types.ts             # TypeScript interfaces
│   └── App.tsx              # Main application
├── server.ts                # Express backend (LLM, TTS, STT)
├── stt-whisper.cjs          # sherpa-onnx Whisper STT binding
├── public/                  # Static assets & PWA manifest
├── assets/                  # IELTS test data (JSON)
└── .env.example             # Environment template
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4, Motion |
| **Build** | Vite 6, esbuild |
| **Backend** | Express.js, Node.js |
| **LLM** | OpenAI-compatible API (Local/Ollama/Groq) |
| **STT** | sherpa-onnx Whisper (local), Web Speech API |
| **TTS** | Microsoft Edge Neural TTS, SpeechSynthesis |
| **PWA** | Service Worker, Web App Manifest |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.

---

<div align="center">

Made with ❤️ for IELTS learners worldwide

</div>
