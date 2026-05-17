# Jayasree | AI Engineer Portfolio

A personal portfolio website for Jayasree Muruganandham — AI Engineer & Data Science graduate. Features an animated particle background, project showcase, experience timeline, and a working contact form powered by Gmail SMTP.

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express
- **Email:** Nodemailer (Gmail SMTP)
- **Deployment:** Render (backend + static serving)

## Features

- Animated particle canvas background
- Responsive navbar with mobile hamburger menu
- Skills, Projects, Experience & Education sections
- Contact form with SMTP email delivery
- Rate limiting (5 requests per 15 min) to prevent spam
- Input sanitization and validation

## Local Development

**1. Clone the repo**
```bash
git clone https://github.com/Jayasree2605/portfolio.git
cd portfolio
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file**
```env
GMAIL_USER=your@gmail.com
GMAIL_PASS=your_16char_app_password
RECIPIENT_EMAIL=your@gmail.com
PORT=3000
```

> `GMAIL_PASS` must be a Gmail App Password (not your regular password).  
> Generate one at: Google Account → Security → 2-Step Verification → App passwords

**4. Start the server**
```bash
npm start
```

Open `http://localhost:3000`

## Environment Variables

| Variable | Description |
|---|---|
| `GMAIL_USER` | Gmail address used to send emails |
| `GMAIL_PASS` | 16-character Gmail App Password |
| `RECIPIENT_EMAIL` | Email address that receives contact form messages |
| `PORT` | Server port (default: 3000) |
| `ALLOWED_ORIGIN` | Allowed CORS origin (optional, defaults to `*`) |

## Deployment (Render)

1. Push to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set **Build Command:** `npm install`
4. Set **Start Command:** `node server.js`
5. Add the environment variables above in Render's dashboard
6. Deploy

## License

MIT
