# Hono vs. Express: Performance Benchmark & Comparison

This repository contains a direct, head-to-head comparison between two Node.js web frameworks: the industry-standard **Express.js** and the modern, high-performance **Hono**.

The goal is to evaluate their performance, developer experience, and architectural differences by implementing identical REST APIs in both frameworks.

## 🏎️ Benchmark Results

We conducted a load test using **Autocannon** to measure the throughput and latency of both frameworks under high concurrency. The results were conclusive:

**Hono significantly outperformed Express in every metric.**

| Metric | Express.js 🐢 | Hono 🚀 | Improvement |
| :--- | :--- | :--- | :--- |
| **Requests/sec** | 3,776 | **~30,995** | **8.2x Faster** |
| **Latency (Avg)** | 2.13 ms | **0.04 ms** | **53.25x Lower** |
| **Throughput** | 1.55 MB/sec | **4.25 MB/sec** | **2.7x Higher** |

### Visual Proof

**Autocannon Stress Test Results:**
<img width="1366" height="768" alt="Screenshot_20251125_021556" src="https://github.com/user-attachments/assets/130266fd-5c6d-4ae0-a805-bca6a15f93e8" />
*The top one is running Node+Express on port 3000 and the bottom one is running Bun+Hono on port 3050*

**Conclusion:**
<img width="1366" height="768" alt="Screenshot_20251125_023144" src="https://github.com/user-attachments/assets/4f8ff9ad-1865-4002-a51a-32945ae3a27c" />

---

## 🛠️ Tech Stack

Both implementations use a modern stack to ensure a fair comparison:
* **Runtime:** [Bun](https://bun.sh/) (v1.1.34)
* **Language:** TypeScript
* **Database:** MongoDB (via Mongoose)
* **Structure:** MVC (Model-View-Controller)

---

## 📂 Project Structure

Both projects follow an identical MVC directory structure to make the code comparison easy and transparent.

```
.
├── express/ # Express.js Implementation
│ ├── src/
│ │ ├── controllers/ # Business logic (req/res handling)
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # API route definitions
│ │ ├── utils/ # DB connection helper
│ │ └── server.ts # Application entry point
│ ├── package.json
│ └── tsconfig.json
│
│
├── hono/ # Hono Implementation
├── src/
│ ├── controllers/ # Business logic (Context handling)
│ ├── models/ # Mongoose schemas (Shared logic)
│ ├── routes/ # API route definitions
│ ├── utils/ # DB connection helper
│ └── index.ts # Application entry point
├── package.json
└── tsconfig.json
```

---

## 📝 Code Comparison

One of the biggest advantages of Hono is that its API is incredibly similar to Express, making migration easy.

### 1. Server Setup

**Express (`express/src/server.ts`):**
```typescript
import express from "express";
const app = express();

app.use(express.json()); // Middleware for JSON body parsing

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

**Hono (hono/src/index.ts`):**
```typescript
import { Hono } from "hono";
const app = new Hono();

// No need for body-parser middleware; JSON handling is built-in

export default {
  port: 3000,
  fetch: app.fetch, // Bun native server integration
};
```

### 2. Controllers
**Express (`express/src/controllers/video.controller.ts`):**
```typescript
export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos" });
  }
};
```

**Hono (`hono/src/controllers/video.controller.ts`):**
```typescript
export const getVideos = async (c: Context) => {
  try {
    const videos = await Video.find();
    return c.json(videos, 200); // Fluent, type-safe response
  } catch (error) {
    return c.json({ error: "Error fetching videos" }, 500);
  }
};
```

Key Difference: Hono uses a Context object (c) that bundles the request, response, and execution context into one, whereas Express separates req and res.

---

## Getting Started

To run these benchmarks yourself, follow these steps:

**Prerequisites**
- Bun installed on your machine.
- A running MongoDB instance (local or Atlas).
    
### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/hono-vs-express.git](https://github.com/your-username/hono-vs-express.git)
cd hono-vs-express
```

### 2. Run the Express Server
```bash
cd express
npm install
npm run server
```

### 3. Run the Hono Server
```bash
cd ../hono
bun install
bun run dev
```

### 4. Run Benchmarks (using Autocannon)
Open a new terminal and run the load test against each server:
```bash
bunx autocannon -c 100 -d 10 http://localhost:3000/api/videos
```
(Adjust the URL if your API route differs)

---
## Conclusion
While Express has a massive ecosystem and community, Hono is the clear winner for modern, high-performance applications, especially when paired with a fast runtime like Bun.
- **Performance:** Hono is ~4x faster in requests/second.
- **Developer Experience:** Hono offers built-in TypeScript support and web-standard APIs.
- **Modernity:** Hono is designed for the "Edge" (Cloudflare Workers, Deno, Bun), whereas Express is Node-centric.
