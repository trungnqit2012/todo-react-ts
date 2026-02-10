# 📝 Todo App – React + TypeScript

A modern Todo application built with **React**, **TypeScript**, and **Tailwind CSS**, focusing on **clean architecture**, **scalable state management**, and **best practices**.

This project is designed as a **learning & demonstration repo** for solid React fundamentals beyond basic tutorials.

---

## 🚀 Features

- Add / toggle / delete todos
- Filter todos: **All / Active / Completed**
- Persist state with **localStorage**
- Clear completed todos
- Keyboard-first UX (Enter to add)
- Polished UI with subtle animations
- Fully typed with TypeScript

---

## 🧱 Project Structure

```
src/
├─ components/
│  ├─ TodoInput.tsx
│  ├─ TodoItem.tsx
│  ├─ FilterBar.tsx
│  └─ EmptyState.tsx
│
├─ hooks/
│  ├─ useTodos.ts
│  └─ useLocalStorage.ts
│
├─ types/
│  ├─ todo.ts
│  └─ filter.ts
│
├─ App.tsx
└─ main.tsx
```

---
## 🏗️ Architecture Overview

This project is structured to reflect real-world React applications rather than tutorial-style code.

**Layers:**
- **Domain**: Pure business logic (state, reducer, actions)
- **Context**: Global state wiring and dependency injection
- **Hooks**: Application-facing API (commands + selectors)
- **UI Components**: Presentational and accessible components

This separation ensures:
- Business logic is framework-agnostic
- UI remains simple and declarative
- State management scales without refactoring
---
## 🧠 Architecture & Design Decisions

### 1. Separation of Concerns
- **UI components** are kept dumb and reusable
- **Business logic** lives inside custom hooks (`useTodos`)
- Side effects (localStorage) are abstracted into `useLocalStorage`

---

### 2. Custom Hooks

#### `useTodos`
- Manages todo state and filtering logic
- Exposes a clean API for the UI layer
- Uses functional updates to ensure immutability

#### `useLocalStorage`
- Generic hook (`<T>`) for persistent state
- Lazy initialization for performance
- Reusable across the app

---

### 3. Performance Optimizations
- `React.memo` applied to `TodoItem` to avoid unnecessary re-renders
- `useCallback` used **only when needed**
- Avoids premature optimization

---

### 4. Controlled Components
- `TodoInput` and `FilterBar` are fully controlled
- Single source of truth for state
- Predictable one-way data flow

---

## 🎨 UX & Accessibility

- Keyboard support (Enter to add todo)
- Disabled actions when not applicable
- Friendly empty state
- Subtle animations for visual feedback
- Semantic HTML and accessible labels

---

## 🛠️ Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite

---

## 📦 Getting Started

```bash
npm install
npm run dev
```

---

## ✅ React Concepts Covered

- Component-based architecture
- Controlled vs uncontrolled components
- State immutability
- Functional state updates
- Custom hooks
- Side effects with `useEffect`
- Performance optimization (`memo`, `useCallback`)
- Type-safe props & state
- Separation of UI and business logic

---

## 📄 License

MIT


---

## 🧠 What I Learned / Trade-offs

### What I Learned
- How to model UI state as a predictable state machine using `useReducer`
- How to separate domain logic from React-specific concerns
- How Context structure affects rendering performance
- How to test business logic and hooks with confidence
- Why accessibility and UX are part of engineering quality

### Trade-offs & Decisions
- **Context instead of Redux**: Keeps the app lightweight while preserving reducer-based thinking
- **Integration tests over shallow tests**: Higher confidence with fewer brittle tests
- **Undo delete handled at UI layer**: Avoids polluting domain logic with UX concerns
- **Selective memoization**: Optimized only where re-renders were proven to matter

This project intentionally prioritizes **clarity, scalability, and correctness** over feature count.

---

## 🚀 Project Status

✅ Core features complete  
✅ Accessibility improvements applied  
✅ Performance bottlenecks addressed  
✅ Integration tests in place  

This project is considered **feature-complete for its scope** and serves as a **showcase of modern React best practices**.

Future work would focus on:
- API persistence
- Error boundaries
- Optimistic updates

---
> This project intentionally balances **clean architecture** and **practical simplicity**,  
> reflecting real-world decision-making rather than tutorial-driven design.
