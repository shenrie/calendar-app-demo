# Calendar App

A lightweight, browser-based calendar that lets you create, edit, and delete personal events. It runs entirely in the browser with no server or build step required — just open the HTML file and start using it. Events are saved automatically in your browser's local storage, so they persist across page refreshes.

---

## Features

- **Month view** — displays a 6-week grid covering the full month, with day numbers and events visible at a glance
- **Today highlight** — today's date is marked with a blue circle so you always know where you are
- **Month navigation** — use the `<` and `>` buttons to move between months; click **Today** to jump back to the current month instantly
- **Add events** — click the `+` button in the header, or click directly on any day cell, to open the Add Event form
- **Edit events** — click any event pill on the calendar to open it in the Edit Event form
- **Delete events** — a Delete button appears in the edit form to remove an event with one click
- **Optional description** — each event can include a short description in addition to its title and date
- **Persistent storage** — events are saved to `localStorage` automatically; they survive page refreshes and browser restarts (as long as the same browser profile is used)
- **Responsive layout** — the grid scales down for small screens (phones and narrow viewports)
- **Keyboard accessible** — every interactive element is reachable and operable by keyboard; the modal traps focus and returns it to the triggering element on close
- **Screen reader friendly** — ARIA roles, labels, and live regions are in place throughout the app

---

## Prerequisites

This app has no dependencies and requires no installation. All you need is:

- A modern web browser (Chrome, Firefox, Safari, or Edge — any recent version)

That's it. There is no Node.js, no npm, and no build process.

---

## Setup Instructions

1. **Download or clone the repository.**

   ```bash
   git clone <your-repo-url>
   cd calendar-app-demo
   ```

2. **Open the app in your browser.**

   The simplest way is to double-click `index.html` in your file manager, or drag it into a browser window. You can also open it from the terminal:

   ```bash
   # macOS
   open index.html

   # Windows
   start index.html

   # Linux
   xdg-open index.html
   ```

3. **Optional: serve over a local HTTP server.**

   Opening `index.html` directly as a `file://` URL works fine for this app. If you prefer a local server (for example, to avoid any browser restrictions on local files), you can use Python's built-in server:

   ```bash
   # Python 3
   python3 -m http.server 8080
   ```

   Then visit `http://localhost:8080` in your browser.

> **Note:** There is no `npm install`, no build command, and no environment variables to configure. The app is ready to use the moment you open the file.

---

## Usage

### Navigating the calendar

| Action | How to do it |
|---|---|
| Go to the previous month | Click the `<` button in the header |
| Go to the next month | Click the `>` button in the header |
| Jump back to today's month | Click the **Today** button |

### Adding an event

1. Click the blue **+** button in the top-right corner of the header, **or** click directly on any day cell.
2. Fill in the **Title** (required) and confirm the **Date** (pre-filled to the day you clicked).
3. Optionally add a **Description**.
4. Click **Save**.

The event appears immediately as a pill on the calendar day.

### Editing an event

1. Click any event pill on the calendar.
2. Update the title, date, or description in the form that opens.
3. Click **Save** to apply changes.

### Deleting an event

1. Click the event pill to open the Edit Event form.
2. Click the red **Delete** button.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `Enter` or `Space` on a day cell | Open the Add Event form for that day |
| `Enter` or `Space` on an event pill | Open the Edit Event form for that event |
| `Escape` | Close the modal without saving |
| `Tab` / `Shift+Tab` | Move focus between form fields (focus is trapped inside the modal while it is open) |

---

## Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Page structure and modal markup |
| CSS3 | Layout (CSS Grid), theming (CSS custom properties), responsive design |
| JavaScript (ES5/ES6) | All app logic — rendering, navigation, event CRUD, modal, localStorage |

No frameworks, libraries, or build tools are used. The entire app is three files.

---

## Project Structure

```
calendar-app-demo/
├── index.html      # Page structure: header, calendar grid, event modal
├── styles.css      # All styles: layout, theming, modal, responsive breakpoints
└── app.js          # All JavaScript: rendering, navigation, CRUD, modal logic
```

### File responsibilities at a glance

- **`index.html`** — defines the static skeleton of the app. The calendar grid and event pills are generated dynamically by `app.js` and injected into `#calendar-grid`.
- **`styles.css`** — uses CSS custom properties (variables) for colors and sizing, making the theme easy to adjust. A media query at `600px` reduces cell height and font sizes for mobile.
- **`app.js`** — a self-contained IIFE (immediately invoked function expression) with no global variables. It reads and writes events as a JSON array stored under the key `calendarEvents` in `localStorage`.
