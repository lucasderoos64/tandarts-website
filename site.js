(function () {
  const calendar = document.querySelector("#appointment-calendar");
  const selectedSlot = document.querySelector("#selected-slot");
  const requestButton = document.querySelector("#request-appointment");
  const monthLabel = document.querySelector("#current-month-label");
  const prevMonth = document.querySelector("#prev-month");
  const nextMonth = document.querySelector("#next-month");
  const monthTabs = Array.from(document.querySelectorAll(".month-tab"));

  const monthNames = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ];
  const shortMonthNames = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  const monthOffsets = [3, 6, 6, 2, 4, 0, 2, 5, 1, 3, 6, 1];
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
  const weekdayNames = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];
  const timePattern = ["09:00", "10:30", "13:00", "15:30", "Op aanvraag", "08:30", "14:00", "11:30"];

  let currentMonth = 5;

  function monthData(index) {
    const slots = {};
    for (let day = 1; day <= monthLengths[index]; day += 1) {
      const weekday = (monthOffsets[index] + day - 1) % 7;
      if (weekday >= 5) continue;
      if ((day + index) % 11 === 0) continue;
      slots[day] = timePattern[(day + index) % timePattern.length];
    }
    return {
      label: monthNames[index] + " 2026",
      short: shortMonthNames[index],
      offset: monthOffsets[index],
      days: monthLengths[index],
      slots
    };
  }

  function weekdayName(month, day) {
    const index = (month.offset + day - 1) % 7;
    return weekdayNames[index];
  }

  function renderMonth(index) {
    if (!calendar || !monthLabel) return;
    currentMonth = Math.max(0, Math.min(11, index));
    const month = monthData(currentMonth);
    monthLabel.textContent = month.label;
    calendar.setAttribute("aria-label", "Kalender " + month.label.toLowerCase());
    calendar.innerHTML = weekdays.map((day) => "<span>" + day + "</span>").join("");

    for (let i = 0; i < month.offset; i += 1) {
      calendar.insertAdjacentHTML("beforeend", '<button class="calendar-cell empty" type="button" aria-hidden="true"></button>');
    }

    for (let day = 1; day <= month.days; day += 1) {
      const weekday = (month.offset + day - 1) % 7;
      const isWeekend = weekday >= 5;
      const time = month.slots[day];
      const isRequest = time === "Op aanvraag";
      const isFull = isWeekend || !time;
      const selected = currentMonth === 5 && day === 3 ? " selected" : "";
      const classes = ["calendar-cell", isWeekend ? "weekend" : "", isFull ? "full" : "", isRequest ? "request" : "", selected].filter(Boolean).join(" ");
      const disabled = isFull ? " disabled" : "";
      const label = isFull ? "Vol" : time;
      calendar.insertAdjacentHTML(
        "beforeend",
        '<button class="' + classes + '" type="button" data-day="' + day + '" data-time="' + (time || "") + '"' + disabled + ">" + day + "<small>" + label + "</small></button>"
      );
    }

    const remainder = (calendar.children.length - weekdays.length) % 7;
    if (remainder !== 0) {
      for (let i = remainder; i < 7; i += 1) {
        calendar.insertAdjacentHTML("beforeend", '<button class="calendar-cell empty" type="button" aria-hidden="true"></button>');
      }
    }

    monthTabs.forEach((tab, tabIndex) => tab.classList.toggle("active", tabIndex === currentMonth));
    if (selectedSlot) {
      const selected = calendar.querySelector(".calendar-cell.selected");
      if (selected) {
        updateSelected(selected);
      } else {
        selectedSlot.textContent = "Kies een beschikbare dag in " + month.label.toLowerCase() + ".";
      }
    }
  }

  function updateSelected(button) {
    if (!selectedSlot) return;
    const month = monthData(currentMonth);
    const day = button.dataset.day;
    const time = button.dataset.time || "op aanvraag";
    selectedSlot.textContent = "Geselecteerd: " + weekdayName(month, Number(day)) + " " + day + " " + month.short + " om " + time;
  }

  if (calendar) {
    calendar.addEventListener("click", function (event) {
      const button = event.target.closest(".calendar-cell");
      if (!button || button.disabled || button.classList.contains("empty")) return;
      calendar.querySelectorAll(".calendar-cell.selected").forEach((cell) => cell.classList.remove("selected"));
      button.classList.add("selected");
      updateSelected(button);
    });
  }

  monthTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      renderMonth(Number(tab.dataset.monthIndex));
    });
  });

  if (prevMonth) prevMonth.addEventListener("click", () => renderMonth(currentMonth - 1));
  if (nextMonth) nextMonth.addEventListener("click", () => renderMonth(currentMonth + 1));

  if (requestButton && selectedSlot) {
    requestButton.addEventListener("click", function () {
      requestButton.textContent = "Afspraakaanvraag klaar";
      requestButton.classList.add("button-confirmed");
      selectedSlot.textContent = selectedSlot.textContent + " · controleer je gegevens en verstuur in de echte app.";
    });
  }

  renderMonth(currentMonth);
})();
