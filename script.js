document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 1. Accordion Toggle
  // =========================
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const content = btn.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });

  // =========================
  // 2. Search Filter
  // =========================
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("keyup", () => {
      const query = searchBar.value.toLowerCase();
      document.querySelectorAll(".card").forEach(card => {
        const name = card.getAttribute("data-name").toLowerCase();
        card.style.display = name.includes(query) ? "block" : "none";
      });
    });
  }

  // =========================
  // 3. Dark Mode Toggle
  // =========================
  const darkModeBtn = document.getElementById("darkModeBtn");
  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀ Light Mode" : "🌙 Dark Mode";
      localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Apply saved dark mode
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      darkModeBtn.textContent = "☀ Light Mode";
    }
  }

  // =========================
  // 4. Favorites Feature
  // =========================
  const favBtns = document.querySelectorAll(".fav-btn");
  const favList = document.getElementById("favList");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function displayFavorites() {
    favList.innerHTML = "";
    if (favorites.length === 0) {
      favList.innerHTML = "<p>No favorites yet.</p>";
      return;
    }
    favorites.forEach(item => {
      const div = document.createElement("div");
      div.className = "fav-item";
      div.innerHTML = `<strong>${item.name}</strong> 
                       <a href="${item.link}" target="_blank" class="btn">Open</a>
                       <button class="remove-btn" data-name="${item.name}">❌ Remove</button>`;
      favList.appendChild(div);
    });

    // Remove favorite
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-name");
        favorites = favorites.filter(f => f.name !== name);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
      });
    });
  }

  favBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const name = card.getAttribute("data-name");
      const link = card.getAttribute("data-link");

      if (!favorites.find(f => f.name === name)) {
        favorites.push({ name, link });
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
      } else {
        alert("Already in favorites!");
      }
    });
  });

  displayFavorites();

  // =========================
  // 5. Countdown Timer
  // =========================
  const examDate = new Date("2025-09-29T09:00:00");
  const timerEl = document.getElementById("examTimer");

  function updateCountdown() {
    if (!timerEl) return;
    const now = new Date();
    const diff = examDate - now;

    if (diff <= 0) {
      timerEl.textContent = "Exam Started!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    timerEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // =========================
  // 6. Motivational Quotes
  // =========================
  const quotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream big and dare to fail.",
    "Your limitation—it’s only your imagination.",
    "Sometimes later becomes never. Do it now.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Success doesn’t come to you, you go to it."
  ];

  const quoteEl = document.getElementById("quote");
  const newQuoteBtn = document.getElementById("newQuoteBtn");

  function showRandomQuote() {
    if (!quoteEl) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[randomIndex];
  }

  showRandomQuote();
  if (newQuoteBtn) newQuoteBtn.addEventListener("click", showRandomQuote);

});