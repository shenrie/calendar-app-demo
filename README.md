# Calendar App

A simple month-view calendar application built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools required — just open `index.html` in a browser.

## Features

- **Month navigation** — Browse months with prev/next buttons; year wraps automatically
- **Today highlight** — Current date is visually emphasized
- **Event CRUD** — Create, edit, and delete events via a modal form
- **Persistent storage** — Events are saved to localStorage and survive page refreshes
- **Responsive layout** — Adapts to mobile screens (≤600px)
- **Keyboard support** — Escape key closes the modal

## File Structure

```
calendar-app-demo/
  index.html      — Page structure (header, calendar grid, modal)
  styles.css      — Styling (CSS Grid layout, modal, responsive)
  app.js          — Application logic (rendering, navigation, CRUD)
  tasks/todo.md   — Implementation checklist and review
```

## Usage

1. Open `index.html` in any modern browser
2. Click a day cell to add an event
3. Click an event pill to edit or delete it

## Event Data

Events are stored in localStorage as a JSON array under the key `calendarEvents`:

```json
{
  "id": "evt_1709500000000",
  "title": "Team standup",
  "date": "2026-03-03",
  "description": ""
}
```
