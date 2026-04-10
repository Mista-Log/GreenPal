# GreenPal 🌾
### AI-Powered Smart Farming Assistant for Africa

GreenPal is a mobile-first **Progressive Web App (PWA)** designed to empower smallholder farmers across Africa. By combining **Computer Vision**. GreenPal bridges the gap between advanced agricultural science and rural farming communities, regardless of literacy levels or internet stability.

---

## 🚀 Core Features

* **📸 AI Crop Disease Detection:** Instant diagnosis for Maize, Cassava, Tomato, and Rice using a fine-tuned CNN model.
* **💡 Smart Productivity Engine:** Rule-based recommendations for planting schedules, fertilizer application, and irrigation based on crop type and region.


---

## 🛠️ Technical Stack

### **Frontend (PWA)**
- **Framework:** React / Next.js
- **Offline Logic:** Service Workers & IndexedDB
- **Voice Integration:** Web Speech API (fallback)
- **Styling:** Tailwind CSS (Mobile-first, High Contrast)

### **Backend**
- **Language:** Python 3.9+
- **Framework:** FastAPI (Asynchronous processing)
- **Database:** Supabase (PostgreSQL + JWT Auth)
- **Deployment:** Render / Railway

### **AI/ML Layer**
- **Vision:** CNN-based model (TensorFlow/PyTorch) trained on the PlantVillage dataset.
- **NLP/Speech:** Custom integration for African language Speech-to-Text and TTS.

---

## 📂 Project Architecture

```text
├── backend/              # FastAPI Server
│   ├── app/
│   │   ├── api/          # Endpoints (v1)
│   │   ├── ml/           # Model Inference Logic
│   │   └── core/         # Security & Config
├── frontend/             # Next.js PWA
│   ├── components/       # Voice & Camera UI
│   ├── public/           # Service Workers & Assets
│   └── store/            # Offline State Management
└── ml_model/             # Trained CNN models & weights