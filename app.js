(function () {
  "use strict";

  const STORAGE_KEY = "calendarEvents";

  // State
  let currentYear;
  let currentMonth; // 0-indexed
  let modalMode = "add"; // "add" or "edit"

  // DOM references
  const monthYearLabel = document.getElementById("month-year-label");
  const calendarGrid = document.getElementById("calendar-grid");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const eventForm = document.getElementById("event-form");
  const eventIdInput = document.getElementById("event-id");
  const titleInput = document.getElementById("event-title-input");
  const dateInput = document.getElementById("event-date-input");
  const descInput = document.getElementById("event-desc-input");
  const titleError = document.getElementById("title-error");
  const dateError = document.getElementById("date-error");
  const deleteBtn = document.getElementById("delete-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  // ─── Initialization ───────────────────────────────────────

  function init() {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();

    prevBtn.addEventListener("click", goToPrevMonth);
    nextBtn.addEventListener("click", goToNextMonth);
    eventForm.addEventListener("submit", handleFormSubmit);
    deleteBtn.addEventListener("click", handleDelete);
    cancelBtn.addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
        closeModal();
      }
    });

    renderCalendar();
  }

  // ─── Calendar Rendering ───────────────────────────────────

  function renderCalendar() {
    calendarGrid.innerHTML = "";
    monthYearLabel.textContent = getMonthYearLabel(currentYear, currentMonth);

    const days = getDaysForGrid(currentYear, currentMonth);
    const events = getEvents();
    const todayStr = formatDateString(new Date());

    days.forEach(function (date) {
      const dateStr = formatDateString(date);
      const isCurrentMonth = date.getMonth() === currentMonth;
      const cell = createDayCell(date, isCurrentMonth, dateStr === todayStr);

      const dayEvents = events.filter(function (evt) {
        return evt.date === dateStr;
      });
      dayEvents.forEach(function (evt) {
        cell.appendChild(createEventPill(evt));
      });

      calendarGrid.appendChild(cell);
    });
  }

  function getDaysForGrid(year, month) {
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay(); // 0=Sun
    const startDate = new Date(year, month, 1 - startOffset);

    const days = [];
    for (let i = 0; i < 42; i++) {
      days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
    }
    return days;
  }

  function createDayCell(date, isCurrentMonth, isToday) {
    const cell = document.createElement("div");
    cell.className = "day-cell";
    if (!isCurrentMonth) cell.classList.add("other-month");
    if (isToday) cell.classList.add("today");

    const num = document.createElement("div");
    num.className = "day-number";
    num.textContent = date.getDate();
    cell.appendChild(num);

    cell.addEventListener("click", function () {
      openModal("add", { date: formatDateString(date) });
    });

    return cell;
  }

  function createEventPill(evt) {
    const pill = document.createElement("div");
    pill.className = "event-pill";
    pill.textContent = evt.title;

    pill.addEventListener("click", function (e) {
      e.stopPropagation();
      openModal("edit", evt);
    });

    return pill;
  }

  // ─── Navigation ───────────────────────────────────────────

  function goToPrevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  }

  function goToNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  }

  // ─── localStorage CRUD ────────────────────────────────────

  function getEvents() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  function addEvent(title, date, description) {
    const events = getEvents();
    events.push({
      id: "evt_" + Date.now(),
      title: title,
      date: date,
      description: description || "",
    });
    saveEvents(events);
  }

  function updateEvent(id, title, date, description) {
    const events = getEvents();
    const idx = events.findIndex(function (e) { return e.id === id; });
    if (idx !== -1) {
      events[idx].title = title;
      events[idx].date = date;
      events[idx].description = description || "";
      saveEvents(events);
    }
  }

  function deleteEvent(id) {
    const events = getEvents().filter(function (e) { return e.id !== id; });
    saveEvents(events);
  }

  // ─── Modal ────────────────────────────────────────────────

  function openModal(mode, data) {
    modalMode = mode;
    clearErrors();

    if (mode === "edit" && data) {
      modalTitle.textContent = "Edit Event";
      eventIdInput.value = data.id;
      titleInput.value = data.title;
      dateInput.value = data.date;
      descInput.value = data.description || "";
      deleteBtn.classList.remove("hidden");
    } else {
      modalTitle.textContent = "Add Event";
      eventIdInput.value = "";
      titleInput.value = "";
      dateInput.value = (data && data.date) || "";
      descInput.value = "";
      deleteBtn.classList.add("hidden");
    }

    modalOverlay.classList.remove("hidden");
    titleInput.focus();
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
    clearErrors();
  }

  function clearErrors() {
    titleError.textContent = "";
    dateError.textContent = "";
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    clearErrors();

    const title = titleInput.value.trim();
    const date = dateInput.value;
    const description = descInput.value.trim();
    let valid = true;

    if (!title) {
      titleError.textContent = "Title is required.";
      valid = false;
    }
    if (!date) {
      dateError.textContent = "Date is required.";
      valid = false;
    }
    if (!valid) return;

    if (modalMode === "edit") {
      updateEvent(eventIdInput.value, title, date, description);
    } else {
      addEvent(title, date, description);
    }

    closeModal();
    renderCalendar();
  }

  function handleDelete() {
    if (eventIdInput.value) {
      deleteEvent(eventIdInput.value);
      closeModal();
      renderCalendar();
    }
  }

  // ─── Helpers ──────────────────────────────────────────────

  function formatDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function getMonthYearLabel(year, month) {
    const names = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return names[month] + " " + year;
  }

  // ─── Start ────────────────────────────────────────────────
  init();
})();
