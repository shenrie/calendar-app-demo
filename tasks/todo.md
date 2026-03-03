# Calendar App — Implementation Checklist

## Steps
- [x] Create `index.html` with static structure (header, grid, modal)
- [x] Create `styles.css` (CSS Grid layout, modal, responsive)
- [x] Create `app.js` — calendar rendering (grid, day cells, today highlight)
- [x] Add month navigation (prev/next with year wrapping)
- [x] Add event CRUD (add, edit, delete with localStorage)
- [x] Add modal logic (open/close, validation, backdrop/Escape close)
- [x] Polish and final testing (responsive, edge cases, no console errors)

## Review

### Files Created
- **index.html** — Single-page structure with header (prev/next nav + month label), 7-column day-name row, `#calendar-grid` container, and a hidden modal with form fields (title, date, description) plus Save/Delete/Cancel buttons.
- **styles.css** — CSS custom properties for theming, 7-column CSS Grid for the calendar, day cell styling with `.today` (blue highlight) and `.other-month` (dimmed) states, blue event pills with ellipsis overflow, fixed-position modal overlay, and responsive breakpoint at 600px (smaller cells, near-full-width modal).
- **app.js** — IIFE containing all logic:
  - **Rendering**: `getDaysForGrid()` generates 42 dates (6 weeks) starting from the Sunday before the 1st; `renderCalendar()` builds cells with day numbers and event pills.
  - **Navigation**: `goToPrevMonth()` / `goToNextMonth()` with year wrapping.
  - **CRUD**: `getEvents()` / `saveEvents()` read/write JSON array in localStorage; `addEvent()`, `updateEvent()`, `deleteEvent()` manage individual records with `evt_` + timestamp IDs.
  - **Modal**: `openModal(mode, data)` handles both add (date pre-filled) and edit (all fields pre-populated, delete button visible); `closeModal()` on Cancel, backdrop click, or Escape key; `handleFormSubmit()` validates title and date with inline error messages.

### Key Decisions
- Vanilla JS with no dependencies — keeps it simple and portable.
- 42-cell grid (6 rows) ensures every month layout fits without dynamic row count.
- Events stored as flat JSON array in localStorage for simplicity.
- Modal reused for both add and edit modes, toggling delete button visibility.

---

## Google Calendar Restyle

### Steps
- [x] Update header: "Today" button, chevron nav arrows, left-aligned layout
- [x] Uppercase day-name headers (SUN, MON, etc.)
- [x] Today highlight: blue circle on day number instead of blue cell background
- [x] Event pills: dot + text style instead of solid blue bars
- [x] Full-width layout, taller cells, Google-style colors/fonts
- [x] "Mar 1" / "Apr 1" format for first day of each month
- [x] `goToToday()` function for Today button

### Review
- **index.html**: Added `#today-btn`, changed arrows to `‹`/`›` chevrons, uppercased day names
- **styles.css**: Complete restyle — Google Calendar colors (#1a73e8), left-aligned header, blue circle for today, dot+text event pills, full-width grid, Roboto font
- **app.js**: Added `goToToday()` listener, first-of-month labels ("Mar 1" format)

---

## Accessibility (a11y) Audit

### Issues Found

1. **Modal missing `role="dialog"` and `aria-modal`** — Screen readers won't announce the modal as a dialog.
2. **Modal missing `aria-labelledby`** — The modal title isn't programmatically linked.
3. **Calendar grid has no semantic table/grid role** — Day cells are plain `<div>`s with no ARIA roles, so the grid is invisible to assistive tech.
4. **Day cells not keyboard-focusable** — Cells use click handlers but have no `tabindex` or `role="button"`, so keyboard users can't navigate or activate them.
5. **Event pills not keyboard-focusable** — Same issue: clickable but no `tabindex` or `role`.
6. **Day name row uses `<span>` not semantic markup** — Should use `role="columnheader"` or similar for grid context.
7. **No focus trap in modal** — Tab can escape the modal into background content.
8. **Focus not returned to trigger on modal close** — After closing, focus is lost.
9. **No visible focus indicators on nav buttons** — `:focus-visible` outlines are missing (browser default `outline: none` is not set, but no custom ring exists either).
10. **Error messages not linked with `aria-describedby`** — Validation errors aren't announced to screen readers.
11. **Error messages missing `role="alert"` or `aria-live`** — Errors appear silently for AT users.
12. **Color contrast: `--text-muted: #70757a` on `#fff`** — Ratio ~4.6:1, passes AA for normal text but fails for the small 0.7rem day names (which count as regular text at that size).
13. **Delete button has no confirmation** — Destructive action with no undo; not strictly a11y but relevant for cognitive accessibility.

### Fix Plan

- [x] 1. Add `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="modal-title"` to the modal overlay
- [x] 2. Add `role="grid"` to calendar grid, `role="row"` wrappers (or use `role="gridcell"` on day cells), and `role="columnheader"` on day names
- [x] 3. Make day cells focusable with `tabindex="0"` and `role="gridcell"`; add keyboard Enter/Space handler
- [x] 4. Make event pills focusable with `tabindex="0"` and `role="button"`; add keyboard handler
- [x] 5. Add focus trap inside modal (Tab/Shift+Tab cycle within modal)
- [x] 6. Return focus to the triggering element when modal closes
- [x] 7. Add `:focus-visible` styles for all interactive elements
- [x] 8. Link error messages with `aria-describedby` on inputs; add `aria-live="polite"` on error spans
- [x] 9. Bump `--text-muted` to `#5f6368` for better contrast (~5.9:1)

### Review
- **index.html**: Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on modal; `role="grid"` + `aria-label` on calendar grid; `role="row"` and `role="columnheader"` on day names; `aria-describedby` on form inputs; `aria-live="polite"` on error spans.
- **styles.css**: Added `:focus-visible` outlines (2px solid blue) on buttons, day cells, and event pills. Bumped `--text-muted` from `#70757a` to `#5f6368` for WCAG AA contrast.
- **app.js**: Day cells now have `role="gridcell"`, `tabindex="0"`, `aria-label` with full date text, and Enter/Space handlers. Event pills have `role="button"`, `tabindex="0"`, `aria-label`, and keyboard handlers. Modal traps focus (Tab/Shift+Tab cycle). Focus returns to trigger element on modal close.

---

## README Update

### Plan
- [x] Read all source files to capture accurate features, structure, and run instructions
- [x] Write README.md with the following sections:
  - Project title and description
  - Features (bullet list from code)
  - Prerequisites
  - Setup instructions (numbered, with exact commands)
  - Example usage / how to use the app
  - Tech stack
  - Project structure
- [x] Verify all commands and details are accurate against the actual files
- [x] Update tasks/todo.md with a review summary

### Review

**File created:** `README.md`

**Sections written:**
- **Project title and description** — one-paragraph summary explaining it is a zero-dependency, browser-only calendar that persists events in localStorage
- **Features** — 11 bullet points derived directly from reading `app.js`, `index.html`, and `styles.css` (month view, today highlight, navigation, add/edit/delete events, optional description, localStorage persistence, responsive layout, keyboard accessibility, screen reader support)
- **Prerequisites** — states only a modern browser is needed; explicitly calls out that there is no Node.js, npm, or build process
- **Setup instructions** — three numbered steps: clone, open `index.html`, optional Python local server; includes platform-specific `open`/`start`/`xdg-open` commands and a note that no install step is needed
- **Usage** — navigation reference table, step-by-step walkthroughs for add, edit, and delete flows, and a keyboard shortcuts table
- **Tech stack** — table listing HTML5, CSS3, and plain JavaScript with a note that no frameworks or build tools are used
- **Project structure** — ASCII file tree of the three source files with a description of each file's role, including the `localStorage` key name (`calendarEvents`) confirmed from `app.js` line 4

**Accuracy checks passed:**
- Three files (`index.html`, `styles.css`, `app.js`) confirmed present in the repo root
- `localStorage` key `calendarEvents` verified against `app.js` line 4
- No build commands invented — the app genuinely requires only opening a file in a browser
- Responsive breakpoint (600px) confirmed from `styles.css`
- ARIA attributes and keyboard behaviour confirmed from both `index.html` and `app.js`
