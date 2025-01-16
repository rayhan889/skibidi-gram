## 🎭 Skibidi Gram

Skibidi Gram is a web application where users can post memes, react to them, and
repost their favorites. This app leverages a modern tech stack to deliver a
sleek and seamless user experience.

## 🚀 Features

- Post Memes: Share your creativity with the world.
- React to Memes: Like, laugh, and show your love for other users' posts.
- Repost Memes: Share your favorite memes with your followers.

## 🛠️ Tech Stack

- Next.js 15: The React framework for production-ready web applications.
- TailwindCSS: A utility-first CSS framework for rapid UI development.
- Neon: A modern, serverless PostgreSQL database platform.
- Drizzle: A type-safe and modern ORM for database management.
- Shadcn/UI: A component library built with TailwindCSS.

## 📝 Todos

- [x] Connect to a PostgreSQL database with Drizzle and Neon.
- [x] Create 2 essential schemas (users and memes).
- [x] Populate the database with mock data for users and memes.
- [x] Design the main screen.
- [x] Display mock data on the main screen.
- [x] Fetch the actual data from the database.
- [x] Auth using Kinde.
- [x] Create a topbar.
- [x] Parallel routes.
- [x] Form setup.
- [x] Submit meme functionality(can't upload it into db yet).
- [x] Fix UI issues.
- [x] Sidebar for mobile device.
- [x] Setting up new db schema.
- [x] Config next-auth.
- [x] Sign in and Sign up pages.
- [ ] Create a new meme functionality.

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.
