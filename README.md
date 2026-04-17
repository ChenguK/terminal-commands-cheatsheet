# DevCommands API

This project started as something simple — just a personal collection of CLI commands I kept forgetting.

Over time, I realized this is the kind of thing a lot of new developers struggle with early on, so I decided to turn it into a proper API. The goal is to keep everything in one place: useful commands, clear descriptions, and examples you can actually use.

It’s still meant to be simple and approachable, but now it’s structured in a way that reflects how a real backend service is built.

---

## What this is

A REST API that lets you:

* Browse common developer CLI commands
* Search (even if you don’t remember the exact syntax)
* Filter by category, tags, or difficulty
* Save favorites (without needing an account)

This is meant to be a **learning resource first**, and a backend project second.

---

## Why I built it this way

I didn’t want this to require login or authentication just to use it. When I’m learning something new, the last thing I want is friction.

So:

* The API is **open**
* Favorites can be **shared or user-specific (via headers)**
* You can plug it into your own app and make it your own

---

## Features

* Search + fuzzy matching (handles typos pretty well)
* Filtering (category, tags, difficulty)
* Pagination, sorting, and field selection
* Favorites system (no auth required)
* Swagger docs for easy exploration
* Seed script for quickly populating data
* Basic test coverage

---

## Tech Stack

* Node.js + Express
* MongoDB (Mongoose)
* Jest + Supertest
* Swagger (OpenAPI)

---

## Getting started

Clone the repo:

```bash
git clone https://github.com/yourusername/devcommands-api.git
cd devcommands-api
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Run the server:

```bash
npm start
```

---

## Seed the database

To load example commands:

```bash
npm run seed
```

---

## API Docs

Once the server is running:

```
http://localhost:3000/api-docs
```

---

## Example usage

Get commands:

```bash
curl "http://localhost:3000/api/commands?page=1&limit=5"
```

Search:

```bash
curl "http://localhost:3000/api/commands?search=grap"
```

Toggle favorite:

```bash
curl -X PATCH http://localhost:3000/api/commands/:id/favorite
```

Optional (for user-specific favorites):

```bash
-H "x-user-id: your-id"
```

---

## Project structure

```
controllers/   → request logic  
models/        → database schemas  
routes/        → API endpoints  
utils/         → query builder + helpers  
scripts/       → seed script  
data/          → command dataset  
tests/         → integration tests  
```

---

## Deployment

Currently deployed using:

* Render
* MongoDB Atlas

I’m planning to deploy this to additional platforms as well to explore different hosting setups.

---

## Where this can go next

This started as a personal tool, but it could grow into:

* A frontend UI for browsing commands
* User accounts (optional, not required)
* More advanced search
* Community-contributed commands

---

## Final note

This is still something I actively use and update. If you’re early in your dev journey, feel free to use it however you want — or even build on top of it.

That’s kind of the point.
