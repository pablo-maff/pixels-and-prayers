# 🚧 Day 2 – Core React Deep Dive: `useState` & `useEffect` Exercises

Here are **hands-on exercises** focused on exploring edge cases and real-world usage of `useState` and `useEffect`.

---

## 🧪 1. Stateful Counter with Constraints

**Build:** A `<Counter />` component  
**Requirements:**
- Increment and decrement buttons
- Cannot go below 0 or above 10
- Reset button to set value to 5
- Display message if trying to exceed limits

---

## 🔁 2. Debounced Input Component

**Build:** A `<SearchInput />`  
**Requirements:**
- Uses `useState` to store input value
- Uses `useEffect` to trigger a "search" console.log after 500ms of inactivity
- Cleanup the timer on unmount

---

## 📶 3. Track Online/Offline Status

**Build:** A `<ConnectionStatus />`  
**Requirements:**
- Uses `useState` to track `navigator.onLine`
- Uses `useEffect` to subscribe to `online` / `offline` events
- Shows green "Online" or red "Offline" badge

---

## 🕒 4. Timer with Start/Stop

**Build:** A `<Timer />` component  
**Requirements:**
- Start, Stop, and Reset buttons
- Timer increases every second using `setInterval`
- Use `useEffect` to manage lifecycle of the interval
- Bonus: disable Start button if already running

---

## 🧹 5. Clean-Up Logic Debugger

**Build:** A `<DebugPanel />` that logs on mount/unmount  
**Requirements:**
- `useEffect` to log "mounted" and "unmounted"
- Add a toggle button in a parent to mount/unmount this component
- Observe cleanup behavior with console logs

---

Let me know when you want feedback or hints on any of them.
