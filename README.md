# Tic Tac Toe

A modular Tic Tac Toe game built using vanilla JavaScript, focused on clean architecture, state management, and separation of concerns.

---

##  Features

* Interactive 3x3 game board
* Turn-based gameplay (Player 1 vs Player 2)
* Win and tie detection
* Game state control (prevents moves after game ends)
* Reset functionality
* Dynamic DOM rendering

---

## What I Learned

This project was mainly about understanding how to structure code properly rather than just making the game work.

* Separation of logic and UI (GameController vs ScreenController)
* Managing application state (`gameOver`)
* Preventing invalid state changes
* Event-driven programming in the browser
* Debugging UI sync issues between state and DOM

---

## Architecture

The project follows a modular pattern:

* **Gameboard** → handles board data and cell state
* **GameController** → manages game rules, turns, and win logic
* **ScreenController** → handles DOM updates and user interaction

This separation ensures that game logic is independent of the UI.

---

## How It Works

1. User clicks a cell
2. GameController processes the move
3. State is updated (board + active player)
4. Win/tie condition is checked
5. ScreenController re-renders the UI

---

## Key Concepts Used

* Factory functions & module pattern
* Encapsulation of state
* Event delegation
* DOM manipulation
* Conditional rendering

---

## Future Improvements

* Highlight winning cells
* Add player name input
* Add animations / better UI feedback
* Implement AI opponent
* Improve win-checking logic (pattern-based refactor)

---

## 💡 Note

This project was built as a learning exercise to understand how real applications manage state and UI updates.
The focus was on **code structure and reasoning**, not just functionality.

---

## ▶️ Run Locally

```bash
git clone <your-repo-link>
cd tic-tac-toe
open index.html
```

---

## 😄 Author

Built as part of learning JavaScript fundamentals and improving problem-solving skills.
Built With ❤️ by @alamShahnawaz

