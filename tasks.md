# 🚧 Day 2 – Core React Deep Dive: `useState` & `useEffect` Exercises

Here are **hands-on exercises** focused on exploring edge cases and real-world usage of `useState` and `useEffect`.

---

## 🧪 1. Stateful Counter with Constraints

**Build:** A `<Counter />` component  
**Requirements:**

- Default value is 0
- Can set a custom initial value
- Can increase its value by 1 when + button is pressed
- Can decrease its value by 1 when - button is pressed
- Can't exceed upper limit
- Can't exceed lower limit
- - button is disabled if trying to exceed upper limit
- - button is disabled if upper limit is 0
- - button is disabled if trying to exceed lower limit
- Reset button to go back to the first count state
- Reset button is disabled if value is equal to initial value
- Increment counter just before hitting the upper limit
- Decrement counter just before hitting the lower limit

---

## 🔁 2. Debounced Input Component

// 1. allows a user to enter search text
// 2. returns the search value on button click
// 3. disables the search button when there is no input
//
// Debounced behavior (when debounce enabled):
// 4. triggers search callback after typing stops and delay time has passed
// 5. does not trigger search callback while typing continuously
// 6. does not trigger search callback if input is cleared before debounced delay
// 7. hides the search button when debounced mode is enabled
// 8. does not trigger search callback if debounce not enabled and no click

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
