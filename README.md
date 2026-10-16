# Nandini Shrimangle - Next.js Portfolio (with Admin Panel)

Your MERN portfolio converted to **one Next.js app** (frontend + backend API together).

| What | How |
|---|---|
| Website | Same design and content as your MERN version |
| Backend | Next.js API routes (no separate Express server) |
| Database | MongoDB Atlas (contact messages + projects) |
| Admin login | Email + password from `.env.local` - **no login database** |
| Contact form | Saved in MongoDB **and** emailed to you (Gmail) |
| Admin panel | `/admin` - read/delete messages, add/edit/delete projects |

## 1. Run on your laptop

Needs Node.js 18.17+ (check with `node -v`).

```
npm install
npm run dev
```

Open http://localhost:3000  -  admin login: http://localhost:3000/login

## 2. Fill `.env.local`

| Variable | What to put |
|---|---|
| `ADMIN_EMAIL` | Email you will type on the login page |
| `ADMIN_PASSWORD` | Password you will type on the login page (choose a strong one) |
| `AUTH_SECRET` | Long random text, 32+ characters. Make one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `MONGODB_URI` | MongoDB Atlas connection string (see below) |
| `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_TO` | Gmail that sends / its **App Password** / inbox that receives |
| `NEXT_PUBLIC_SITE_URL` | Your live link, e.g. `https://nandini.vercel.app` |

Restart `npm run dev` after changing `.env.local`.

### MongoDB Atlas
1. mongodb.com/atlas -> free **M0** cluster.
2. **Database Access** -> add a user. **Network Access** -> allow `0.0.0.0/0`.
3. **Connect -> Drivers** -> copy the string into `MONGODB_URI` (replace the password and add `/portfolio` before the `?`).

Your 3 starter projects are saved to the database automatically the first time the site connects.

### Gmail App Password
Google Account -> Security -> turn on 2-Step Verification -> **App passwords** -> create one -> paste it (no spaces) into `EMAIL_PASS`.

The site still works without MongoDB or Gmail. The contact form needs at least one of them: it saves to MongoDB if `MONGODB_URI` is set and sends an email if `EMAIL_USER`/`EMAIL_PASS` are set.

## 3. How the admin login works
- `/login` checks the email/password against `ADMIN_EMAIL` / `ADMIN_PASSWORD` (compared in constant time).
- On success a signed token (JWT) is stored in an **httpOnly cookie** for 7 days.
- `middleware.js` protects `/admin` and every `/api/admin/*` route. No cookie = redirect to login / 401.
- 5 wrong attempts per 15 minutes are blocked.
- To change the password: edit the env variable and restart/redeploy. To log everyone out: change `AUTH_SECRET`.

## 4. Deploy on Vercel
1. Push the folder to GitHub (`.env.local` is ignored, never upload it).
2. vercel.com -> **Add New -> Project** -> pick the repo (Framework: Next.js, no other settings).
3. **Settings -> Environment Variables**: add every variable from the table above, with the real `NEXT_PUBLIC_SITE_URL`.
4. Deploy. Open `https://your-site.vercel.app/login`.

No Render/Express server is needed anymore.

## 5. Show up on Google
1. Set `NEXT_PUBLIC_SITE_URL` to your real link (the sitemap and canonical tags use it) and redeploy.
2. `https://your-link/sitemap.xml` and `/robots.txt` are generated automatically.
3. Add the site in Google Search Console -> choose the **HTML tag** method -> copy only the `content` value into `NEXT_PUBLIC_GOOGLE_VERIFICATION` -> redeploy -> Verify -> submit the sitemap -> URL Inspection -> Request Indexing.

## 6. Edit your content
- Text, skills, experience, education, contact details: `lib/content.js` (and About text in `components/Sections.js`)
- Projects: from `/admin -> Projects` (no code needed)
- Photo / resume: replace `public/images/photo.png` and `public/documents/Resume.pdf`
- Colours / design: `app/globals.css`

## Folder map
```
app/page.js                 public website
app/login, app/admin        login page + admin panel
app/api/contact             contact form (MongoDB + email)
app/api/auth/login|logout   admin session
app/api/admin/*             protected: messages + projects
lib/                        db, auth, mailer, content
models/                     Message, Project (Mongoose)
middleware.js               route protection
```

## Notes
- The login rate limiter is in memory (per server instance). That is fine for a personal site.
- Deleting all projects in the admin panel will not bring the starter ones back.
