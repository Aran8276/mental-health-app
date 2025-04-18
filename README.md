# Aplikasi Kesehatan Mental (Proyek Capstone Dicoding DBS Coding Camp) 🧠

[![Status Proyek](https://img.shields.io/badge/status-selesai-brightgreen)]()

## Ringkasan Proyek 📝

Aplikasi ini merupakan proyek akhir (capstone) dari DBS Coding Camp Dicoding. Dibangun sebagai aplikasi pendamping (_companion app_), tujuannya adalah untuk menyediakan dukungan dan bantuan 🤗 bagi individu yang menghadapi tantangan kesehatan mental dan membutuhkan wadah interaksi atau alat bantu pribadi.

## Fitur Utama ✨

Aplikasi ini menawarkan beberapa fitur inti untuk mendukung pengguna:

1.  **💬 Forum Komunitas:**
    - Pengguna dapat membuat postingan (thread) untuk berbagi cerita, masalah, atau pengalaman yang mereka hadapi.
    - Pengguna lain dapat merespons, memberikan dukungan, saran, atau rekomendasi pada postingan tersebut.
2.  **🎯 Tujuan Harian (Todos):**
    - Fitur manajemen tugas sederhana dimana pengguna dapat membuat, menandai selesai, dan menghapus daftar tujuan atau aktivitas harian mereka.
3.  **🧘 Sesi Kesadaran Penuh (_Mindfulness_):**
    - Menyediakan sesi meditasi terpandu dengan penghitung waktu untuk membantu pengguna meluangkan waktu untuk relaksasi dan fokus.
4.  **🤖 AI Chatbot (Didukung oleh Gemini API):**
    - Bot percakapan berbasis AI yang memungkinkan pengguna bertanya dan mendapatkan informasi mengenai isu kesehatan mental.
    - _Catatan:_ Idealnya menggunakan model LLM yang dikembangkan sendiri, namun karena keterbatasan waktu dan kendala pada tim Machine Learning, kami mengimplementasikan fitur ini menggunakan API Gemini yang sudah tersedia.

## Tautan Langsung (Live Demo) 🚀

- **Frontend:** 🖥️ [https://mental-health-app.aran8276.site/](https://mental-health-app.aran8276.site/)
- **Backend API:** ⚙️ [https://api-mental-health-app.aran8276.site/](https://api-mental-health-app.aran8276.site/)

## Teknologi yang Digunakan 🛠️

### Frontend 🎨

- **Framework:** React.js ⚛️ (dengan Vite sebagai bundler ⚡)
- **Styling:** TailwindCSS 💨
- **Komponen UI:** Shadcn UI 🧩
- **Layout Template:** Meraki UI
- **Animasi:** Framer Motion ✨
- **Routing:** React Router DOM 🛣️
- **Package Manager:** NPM 📦

### Backend ⚙️

- **Framework:** Express.js 🚂
- **ORM:** Prisma 🧱
- **ID Generator:** Nanoid #️⃣
- **Package Manager:** NPM 📦
- **Email:** Nodemailer ✉️ (untuk SMTP)
- **AI:** Google Gemini API (@google/generative-ai) 🤖

### Database 🗄️

- **DBMS:** MySQL 🐬

### Hosting & DevOps ☁️

- **Kontainerisasi:** Docker 🐳 & Docker Compose (dengan Dockerfile kustom)
- **Server:** PC pribadi 🖥️ yang difungsikan sebagai server
- **Tunneling/Exposure:** Cloudflare Zero Trust Tunnel 🛡️ (untuk mem-forward port Docker ke domain publik)

## Struktur Proyek 📁

```
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma     # Skema database Prisma 🧱
│   ├── src/                  # Kode sumber backend (TypeScript) ⚙️
│   │   ├── config/           # Konfigurasi (DB, Express, AI, Email) ⚙️
│   │   ├── controller/       # Logika request/response per fitur 🕹️
│   │   ├── middleware/       # Middleware Express (e.g., Autentikasi) 🛡️
│   │   ├── routes/           # Definisi endpoint API ↔️
│   │   ├── services/         # Logika bisnis (e.g., Token Service) 🧠
│   │   ├── utils/            # Utilitas pendukung 🛠️
│   │   └── index.ts          # Entry point backend ▶️
│   ├── .env.example          # Contoh konfigurasi environment backend 📄
│   ├── Dockerfile            # Instruksi build Docker backend 🐳
│   ├── docker-entrypoint.sh  # Skrip entry point Docker 📜
│   ├── package.json          # Dependensi backend 📦
│   └── tsconfig.json         # Konfigurasi TypeScript backend ⚙️
├── frontend/
│   ├── public/               # Aset statis 🖼️
│   ├── src/                  # Kode sumber frontend (TypeScript/TSX) 🎨
│   │   ├── components/       # Komponen UI reusable 🧩
│   │   ├── config/           # Konfigurasi (e.g., Axios client) ⚙️
│   │   ├── layouts/          # Struktur layout halaman 📐
│   │   ├── lib/              # Fungsi utilitas frontend 🛠️
│   │   ├── pages/            # Komponen halaman utama 📄
│   │   ├── viewports/        # Komponen terkait viewport (e.g., Navigator) 🧭
│   │   ├── App.tsx           # Komponen root aplikasi ✨
│   │   ├── main.tsx          # Entry point frontend ▶️
│   │   └── index.css         # Styling global (Tailwind base) 🎨
│   ├── .env                  # Konfigurasi environment frontend (JANGAN DI-COMMIT LANGSUNG! ⚠️)
│   ├── .env.example          # Contoh konfigurasi environment frontend 📄
│   ├── Dockerfile            # Instruksi build Docker frontend (via Nginx) 🐳
│   ├── index.html            # Template HTML utama 🌐
│   ├── package.json          # Dependensi frontend 📦
│   ├── tsconfig.json         # Konfigurasi TypeScript frontend ⚙️
│   └── vite.config.ts        # Konfigurasi Vite ⚡
├── nginx/
│   └── nginx.conf            # Konfigurasi Nginx untuk serve frontend 🌐
└── docker-compose.yml        # Konfigurasi Docker Compose (Frontend, Backend, DB) 🐳
```

## Cara Mereplikasi Proyek Ini 📖

Ada dua cara utama untuk menjalankan proyek ini di lingkungan lokal Anda: menggunakan Docker (direkomendasikan untuk kemudahan) atau secara manual.

### Opsi 1: Menggunakan Docker 🐳 (Direkomendasikan 👍)

Metode ini akan membangun dan menjalankan container untuk frontend (disajikan oleh Nginx), backend (Express.js), dan database (MySQL) secara bersamaan.

1.  **Prasyarat:** Pastikan Docker dan Docker Compose sudah terinstal di sistem Anda. 🔧
2.  **Clone Repository:** 📥
    ```bash
    git clone <URL_REPOSITORY_ANDA>
    cd <NAMA_FOLDER_REPOSITORY>
    ```
3.  **Konfigurasi Environment Variable:** ⚙️
    - Salin `.env.example` menjadi `.env` di dalam folder `backend/`.
      ```bash
      cp backend/.env.example backend/.env
      ```
    - Salin `.env.example` menjadi `.env` di dalam folder `frontend/`.
      ```bash
      cp frontend/.env.example frontend/.env
      ```
    - **⚠️ PENTING:** Edit kedua file `.env` tersebut dan isi nilainya sesuai dengan konfigurasi lokal atau kredensial Anda (lihat bagian [Konfigurasi Environment Variable](#konfigurasi-environment-variable) di bawah). _Jangan gunakan nilai default untuk production atau data sensitif._
4.  **Jalankan Docker Compose:** ▶️
    Dari _root_ direktori proyek (tempat `docker-compose.yml` berada), jalankan perintah berikut:

    ```bash
    docker-compose up --build -d
    ```

    - `--build`: Memaksa Docker untuk membangun ulang image jika ada perubahan pada Dockerfile atau kode.
    - `-d`: Menjalankan container di background (detached mode).

5.  **Akses Aplikasi:** 🌐
    - Frontend akan tersedia di `http://localhost:80` (atau port lain jika Anda mengubah `docker-compose.yml`). Port Nginx biasanya adalah 80.
    - Backend API akan tersedia di `http://localhost:3000` (atau port lain jika Anda mengubah `SERVER_PORT` di `backend/.env` dan `docker-compose.yml`).

### Opsi 2: Setup Manual 🛠️

Jika Anda tidak ingin menggunakan Docker, ikuti langkah-langkah ini:

1.  **Prasyarat:** 🔧
    - Node.js (versi yang kompatibel, cek `package.json`) dan NPM terinstal.
    - Server database MySQL berjalan dan dapat diakses.
2.  **Clone Repository:** 📥 (Sama seperti langkah Docker)
    ```bash
    git clone <URL_REPOSITORY_ANDA>
    cd <NAMA_FOLDER_REPOSITORY>
    ```
3.  **Setup Backend:** ⚙️
    - Pindah ke direktori backend: `cd backend`
    - Salin `.env.example` ke `.env`: `cp .env.example .env`
    - Edit `backend/.env` dengan konfigurasi database MySQL Anda, kunci JWT, kredensial Nodemailer, API Key Gemini, dan base URL frontend.
    - Instal dependensi: `npm install` 📦
    - Jalankan migrasi Prisma untuk membuat skema database: `npx prisma migrate dev` 🏗️
    - (Opsional) Generate Prisma Client: `npx prisma generate`
    - Jalankan server backend (mode development): `npm run dev` ▶️
    - Backend akan berjalan di port yang ditentukan dalam `backend/.env` (default: 3000).
4.  **Setup Frontend:** 🎨
    - Buka terminal baru, pindah ke direktori frontend: `cd ../frontend` (jika masih di direktori backend) atau `cd frontend` (jika dari root).
    - Salin `.env.example` ke `.env`: `cp .env.example .env`
    - Edit `frontend/.env` dan pastikan `VITE_PUBLIC_EXPRESS_BASE_URL` menunjuk ke URL backend yang sedang berjalan (misalnya `http://localhost:3000`).
    - Instal dependensi: `npm install` 📦
    - Jalankan server frontend (mode development): `npm run dev` ▶️
    - Frontend akan berjalan di port yang ditentukan oleh Vite (default: 5173). Akses melalui `http://localhost:5173`.

## Konfigurasi Environment Variable 🔑

File `.env` diperlukan untuk konfigurasi aplikasi. Salin dari `.env.example` yang tersedia.

### `backend/.env`

```ini
# Konfigurasi koneksi database Prisma 🗄️
# Contoh: mysql://<user>:<password>@<host>:<port>/<database_name>
DATABASE_URL="mysql://root:<PASSWORD_ANDA>@127.0.0.1:3306/prisma_testdb"

# Base URL frontend (penting untuk CORS dan email link) 🌐
FRONTEND_BASE_URL="http://localhost:5173" # Sesuaikan jika port frontend berbeda

# State aplikasi ('development' atau 'production') ⚙️
APP_STATE="development"

# Port tempat server backend berjalan 🔌
SERVER_PORT=3000

# Kunci rahasia untuk JWT (Generate nilai acak yang kuat!) 🔒
# Contoh generate di terminal: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=<KUNCI_RAHASIA_ANDA_YANG_SANGAT_KUAT>
JWT_REFRESH_SECRET=<KUNCI_RAHASIA_REFRESH_ANDA_YANG_SANGAT_KUAT>

# Durasi expiry token (contoh: 15 menit, 7 hari) ⏳
JWT_ACCESS_TOKEN_EXPIRY="15m"
JWT_REFRESH_TOKEN_EXPIRY="7d"

# Konfigurasi Nodemailer untuk pengiriman email (e.g., verifikasi) ✉️
# Gunakan App Password jika memakai Gmail dengan 2FA
GMAIL_APP_PASSWORD="<GMAIL_APP_PASSWORD_ANDA>" # contoh: abcd efgh ijkl mnop
NODEMAILER_EMAIL_FROM="<ALAMAT_EMAIL_PENGIRIM_ANDA>" # contoh: namaanda@gmail.com

# API Key untuk Google Gemini 🤖
GEMINI_API_KEY="<API_KEY_GEMINI_ANDA>"
```

### `backend/.env (Versi Docker 🐳)`

```ini
# Konfigurasi koneksi database Prisma 🗄️
# Contoh: mysql://<user>:<password>@<host>:<port>/<database_name>
DATABASE_URL="mysql://root:mental_health_app@db:3306/mental_health_app"

# Base URL frontend 🌐
FRONTEND_BASE_URL="http://mental-health-app.aran8276.site"

# State aplikasi ⚙️
APP_STATE="production" # "production" || "development"

# Port backend 🔌
SERVER_PORT=3000

# Kunci rahasia JWT 🔒
# Contoh generate: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=<KUNCI_RAHASIA_ANDA_YANG_SANGAT_KUAT>
JWT_REFRESH_SECRET=<KUNCI_RAHASIA_REFRESH_ANDA_YANG_SANGAT_KUAT>

# Durasi expiry token ⏳
JWT_ACCESS_TOKEN_EXPIRY="15m"
JWT_REFRESH_TOKEN_EXPIRY="7d"

# Konfigurasi Nodemailer ✉️
# Gunakan App Password jika memakai Gmail dengan 2FA
GMAIL_APP_PASSWORD="<GMAIL_APP_PASSWORD_ANDA>"
NODEMAILER_EMAIL_FROM="<ALAMAT_EMAIL_PENGIRIM_ANDA>"

# API Key Google Gemini 🤖
GEMINI_API_KEY="<API_KEY_GEMINI_ANDA>"
```

**🚨 PERHATIAN:** Jangan pernah meng-commit file `.env` yang berisi kredensial asli ke repository publik! Gunakan `.env.example` sebagai template.

### `frontend/.env`

```ini
# Base URL dari API Backend yang sedang berjalan ⚙️➡️
VITE_PUBLIC_EXPRESS_BASE_URL=http://localhost:3000 # Sesuaikan dengan URL backend Anda
```

## Alur Pengembangan (Ringkasan) 📈

Pengembangan aplikasi ini mengikuti alur berikut:

1.  **Perancangan Awal & Templating Frontend:** Merancang tampilan antarmuka (UI) secara _low-fidelity_ langsung di kode frontend (React + TailwindCSS) untuk efisiensi waktu, sambil melakukan brainstorming kebutuhan data berdasarkan tampilan.
2.  **Perancangan Database:** Membuat skema database (menggunakan Prisma Schema) berdasarkan analisis kebutuhan data dari tahap templating frontend. 🗄️
3.  **Pengembangan Backend:** Merancang dan mengimplementasikan endpoint API (logika verifikasi, CRUD, autentikasi, dll.) menggunakan Express.js dan Prisma. ⚙️
4.  **Pengujian Backend:** Melakukan pengujian endpoint API menggunakan alat seperti Postman untuk memastikan fungsionalitas CRUD dan penanganan error berjalan benar. 🧪
5.  **Integrasi Frontend-Backend:** Menghubungkan komponen frontend dengan endpoint API backend, memastikan aliran data dan interaksi berjalan lancar. 🔗
6.  **Penyempurnaan UI/UX:** Menambahkan detail visual seperti skema warna, animasi (menggunakan Framer Motion), dan meningkatkan pengalaman pengguna. ✨🎨
7.  **Pengujian End-to-End:** Melakukan pengujian menyeluruh pada aplikasi (bisa dibantu dengan framework seperti Cypress). ✅
8.  **Pembersihan Kode & Build:** Melakukan _error checking_, _linting_, dan pengujian build aplikasi. 🧹🏗️
9.  **Deployment:** Menyiapkan dan menjalankan aplikasi di server menggunakan Docker dan Cloudflare Tunnel. 🚀☁️

Made by Aran8276 / SMK Negeri 6 Malang (lihat [kontributor lain di repo ini](https://github.com/Aran8276/mental-health-app/graphs/contributors)).

---
