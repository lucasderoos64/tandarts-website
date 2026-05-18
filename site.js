(function () {
  const calendar = document.querySelector(".month-calendar");
  const selectedSlot = document.querySelector("#selected-slot");
  const requestButton = document.querySelector("#request-appointment");
  const dayNames = {
    1: "maandag",
    2: "dinsdag",
    3: "woensdag",
    4: "donderdag",
    5: "vrijdag",
    8: "maandag",
    9: "dinsdag",
    10: "woensdag",
    11: "donderdag",
    12: "vrijdag",
    15: "maandag",
    16: "dinsdag",
    17: "woensdag",
    18: "donderdag",
    19: "vrijdag",
    22: "maandag",
    23: "dinsdag",
    24: "woensdag",
    25: "donderdag",
    26: "vrijdag",
    29: "maandag",
    30: "dinsdag"
  };

  if (calendar && selectedSlot) {
    calendar.addEventListener("click", function (event) {
      const button = event.target.closest(".calendar-cell");
      if (!button || button.disabled || button.classList.contains("empty")) return;

      document.querySelectorAll(".calendar-cell.selected").forEach((cell) => {
        cell.classList.remove("selected");
      });
      button.classList.add("selected");

      const day = button.dataset.day;
      const time = button.dataset.time || "op aanvraag";
      const weekday = dayNames[day] || "dag";
      selectedSlot.textContent = "Geselecteerd: " + weekday + " " + day + " juni om " + time;
    });
  }

  if (requestButton && selectedSlot) {
    requestButton.addEventListener("click", function () {
      requestButton.textContent = "Afspraakaanvraag klaar";
      requestButton.classList.add("button-confirmed");
      selectedSlot.textContent = selectedSlot.textContent + " · controleer je gegevens en verstuur in de echte app.";
    });
  }
})();
