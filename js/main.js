const bookList = document.getElementById("book-list");

/* Open Library cover by ISBN, keyed by book id in data.js */
const isbns = {
  1: "9780156012195", 2: "9780451524935", 3: "9780141439518",
  4: "9780547928227", 5: "9780143058144", 6: "9780553380163",
  7: "9780061120084", 8: "9780743273565", 9: "9780060850524",
  10: "9780590353427", 11: "9780316769488", 12: "9780141441146",
  13: "9780062316110", 14: "9780441172719", 15: "9780062315007",
  16: "9780062693662", 17: "9780141180144", 18: "9781400079988",
  19: "9781451673319", 20: "9780345539434"
};

const genreColors = {
  "Fantasy": "#7048e8",
  "Dystopia": "#c92a2a",
  "Romance": "#d6336c",
  "Drama": "#9c2a1e",
  "Fiction": "#2f9e44",
  "Non-fiction": "#1971c2",
  "Science Fiction": "#0b7285",
  "Science": "#e8590c"
};

function getColor(genre) {
  return genreColors[genre] || "#495057";
}

function addText(parent, tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text;
  parent.appendChild(el);
  return el;
}

function renderBooks(list) {
  bookList.innerHTML = "";

  if (list.length === 0) {
    addText(bookList, "p", "empty", "No books found.");
    return;
  }

  list.forEach(function (book) {
    const card = document.createElement("article");
    card.className = "book-card";

    const cover = document.createElement("div");
    cover.className = "cover";
    cover.style.backgroundColor = getColor(book.genre);
    addText(cover, "span", "cover-title", book.title);
    addText(cover, "span", "cover-author", book.author);

    if (isbns[book.id]) {
      const img = document.createElement("img");
      img.className = "cover-img";
      img.alt = "Cover of " + book.title;
      img.loading = "lazy";
      img.src = "https://covers.openlibrary.org/b/isbn/" + isbns[book.id] + "-L.jpg?default=false";
      img.addEventListener("error", function () { img.remove(); });
      cover.appendChild(img);
    }
    card.appendChild(cover);

    addText(card, "h3", "", book.title);
    addText(card, "p", "", book.author + " (" + book.year + ")");
    addText(card, "p", "", "Genre: " + book.genre);
    addText(
      card,
      "p",
      "status " + (book.available ? "available" : "checked-out"),
      book.available ? "Available" : "Checked out"
    );

    bookList.appendChild(card);
  });
}

/* ---------- Search + genre filters ---------- */
let currentGenre = "All";
let currentQuery = "";

const controls = document.createElement("div");
controls.className = "controls";

const search = document.createElement("input");
search.type = "search";
search.className = "search";
search.placeholder = "Search by title or author...";

const filters = document.createElement("div");
filters.className = "filters";

controls.append(search, filters);
bookList.parentNode.insertBefore(controls, bookList);

function applyFilters() {
  const filtered = books.filter(function (b) {
    const okGenre = currentGenre === "All" || b.genre === currentGenre;
    const okQuery =
      currentQuery === "" ||
      b.title.toLowerCase().includes(currentQuery) ||
      b.author.toLowerCase().includes(currentQuery);
    return okGenre && okQuery;
  });

  renderBooks(filtered);

  filters.querySelectorAll("button").forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.genre === currentGenre);
  });
}

search.addEventListener("input", function () {
  currentQuery = search.value.trim().toLowerCase();
  applyFilters();
});

const genres = ["All"];
books.forEach(function (b) {
  if (!genres.includes(b.genre)) genres.push(b.genre);
});

genres.forEach(function (genre) {
  const btn = document.createElement("button");
  btn.textContent = genre;
  btn.dataset.genre = genre;
  btn.addEventListener("click", function () {
    currentGenre = genre;
    applyFilters();
  });
  filters.appendChild(btn);
});

applyFilters();