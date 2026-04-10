# GreenSabi AI – Backend

FastAPI backend for the GreenSabi AI smart farming assistant.

---

## Tech Stack

- **Python 3.11+** + FastAPI
- **Supabase** (PostgreSQL + Storage + Auth)
- **TensorFlow/PyTorch** – crop disease model
- **External STT/TTS API** – African language support

---

## Project Structure

```
greensabi-ai-backend/
│
├── app/
│
│   ├── main.py
│   ├── config.py
│
│   ├── api/
│   │   ├── router.py
│   │   │
│   │   └── endpoints/
│   │       ├── auth.py
│   │       ├── disease_detection.py
│   │       ├── recommendations.py
│   │       ├── voice_assistant.py
│   │       └── health.py
│
│   ├── schemas/
│   │   ├── auth.py
│   │   ├── disease.py
│   │   ├── recommendation.py
│   │   └── voice.py
│
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── disease_service.py
│   │   ├── recommendation_service.py
│   │   └── voice_service.py
│
│   ├── ai/
│   │   ├── disease_model.py
│   │   ├── speech_to_text.py
│   │   └── text_to_speech.py
│
│   ├── db/
│   │   └── supabase.py
│
│   ├── utils/
│   │   ├── image_utils.py
│   │   └── audio_utils.py
│
│   └── core/
│       └── security.py
│
│
├── .env
├── .env.example
├── requirements.txt
└── README.md
```

---

## Getting Started

```bash
# Clone and enter the project
git clone https://github.com/your-org/greensabi-api.git
cd greensabi-api

# Create virtual environment
python -m venv venv
source venv\scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Run the server
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000` · Docs at `http://localhost:8000/docs`

---

## Environment Variables

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

SECRET_KEY=your-jwt-secret
ACCESS_TOKEN_EXPIRE_MINUTES=60



```

---
