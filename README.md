# Pixels and Prayers

**Pixels and Prayers** is my personal React playground — a space to experiment, learn, and sharpen my frontend skills.

You’ll find a mix of components, utilities, and patterns here: some are just ideas in progress, others are foundational building blocks for more polished projects I may build in the future. Expect a bit of everything — from practical experiments to deep dives into modern frontend tooling and architecture.

---

## 🧱 Tech Stack

This project uses:

- **Vite** – for ultra-fast dev server and optimized builds
- **React 19** – with the latest features and hooks
- **TypeScript** – strict typing for better DX and maintainability
- **SCSS Modules** – for locally scoped, modular styles
- **Storybook** – to document and test components in isolation
- **Vitest + React Testing Library** – for fast, modern unit testing
- **ESLint (Flat config)** – for code quality with stylistic consistency
- **clsx** – for conditional class name handling

> Node.js will be added later to support full-stack features and end-to-end development.

---

## 🗂️ Repo Structure & Rationale

So far, the project focuses on **isolated, reusable UI components**, each built and tested individually with TDD and Storybook. These serve as the foundation for future work, where multiple components will be composed into more complex, feature-level units.

Each component lives in its own folder and includes:

- `Component.tsx` – core logic
- `Component.module.scss` – styles scoped via SCSS Modules
- `Component.test.tsx` – unit tests with Vitest + RTL
- `Component.stories.tsx` – Storybook stories for documentation

Global structure:

```
src/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   └── type-defs/
├── App.tsx
└── main.tsx
```

This layout supports reusability and separation of concerns, helping components evolve independently and later come together into cohesive features.

---

## 🧠 Workflow & Philosophy

This project follows a **TDD-first (Test-Driven Development)** approach, aimed at building components that are reusable, accessible, and grounded in real user needs.

I usually start from an idea, a small challenge, or simply the desire to showcase a specific pattern or interaction. Before writing any code, I define a basic set of requirements — always trying to view the component from the user’s perspective. Then I write tests to drive the implementation, focusing on expected behaviors. As the work evolves, new validations and edge cases are discovered and integrated incrementally.

While I lead the design and development, I use **ChatGPT as a support tool** throughout the process. It helps me:

- Think through edge cases
- Suggest improvements or alternative approaches
- Clarify technical questions as they arise
- Maintain flow without getting stuck on small details

Although my current approach centers on **TDD**, it naturally blends with other practices like:

- **BDD (Behavior-Driven Development)** – by defining requirements in terms of behavior and user expectations
- **CDD (Component-Driven Development)** – by building components in isolation and documenting them with Storybook

In the future, I plan to explore these approaches more intentionally, and may also try out others like **FDD (Feature-Driven Development)** or even **DDD (Domain-Driven Design)** for larger-scale architecture challenges.

---

## ✨ About the Name

The name **Pixels and Prayers** is a personal nod to the balance between craft and uncertainty that often defines creative development. _Pixels_ represent the hands-on, detailed work of building components — layouts, interactions, accessibility — while _prayers_ acknowledge that even with the best effort, sometimes things only click through iteration, insight, or a bit of luck.

It’s also a reminder to stay humble, curious, and open to learning — especially in a codebase that will grow beyond the frontend into full-stack experimentation.

---

## 🚀 How to Run It

1. **Install dependencies**

```bash
npm install
```

2. **Start the development server**

```bash
npm run dev
```

3. **Run tests**

```bash
npm run test
```

4. **Open Storybook**

```bash
npm run storybook
```
