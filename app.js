const services = [
    { name: "Мийка кузова", price: 100 },
    { name: "Хімчистка салону", price: 200 },
    { name: "Полірування", price: 300 }
];

const times = ["10:00", "11:00", "12:00", "13:00", "14:00"];

const booked = {
    "2026-04-22": ["11:00", "13:00"]
};

let selectedTime = null;

const select = document.getElementById("service");

if (select) {
    services.forEach((s, i) => {
        let opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `${s.name} (${s.price} грн)`;
        select.appendChild(opt);
    });
}

function renderSlots() {
    const container = document.getElementById("timeSlots");
    if (!container) return;

    container.innerHTML = "";
    let date = document.getElementById("date").value;

    times.forEach(time => {
        let div = document.createElement("div");
        div.className = "slot";
        div.innerText = time;

        if (booked[date]?.includes(time)) {
            div.classList.add("disabled");
        } else {
            div.onclick = () => selectTime(div, time);
        }

        container.appendChild(div);
    });
}

function selectTime(el, time) {
    document.querySelectorAll(".slot").forEach(s => s.classList.remove("active"));
    el.classList.add("active");
    selectedTime = time;
}

function book() {
    let date = document.getElementById("date").value;
    let service = services[select.value];

    if (!date || !selectedTime) {
        alert("Оберіть дату і час");
        return;
    }

    showPopup(`✅ Ви записані<br><b>${service.name}</b><br>${date} о ${selectedTime}`);
}

function showPopup(text) {
    const popup = document.createElement("div");
    popup.className = "popup";

    popup.innerHTML = `
        <div class="popup-content">
            <p>${text}</p>
            <button onclick="this.closest('.popup').remove()">OK</button>
        </div>
    `;

    document.body.appendChild(popup);
}

const dateInput = document.getElementById("date");
if (dateInput) {
    dateInput.addEventListener("change", renderSlots);
}

const container = document.getElementById("services");
if (container) {
    services.forEach(s => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${s.name}</h3><p>${s.price} грн</p>`;
        container.appendChild(div);
    });
}