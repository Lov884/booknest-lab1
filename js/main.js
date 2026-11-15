const bookList = document.getElementById("book-list");

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

function renderBooks(list) {
  bookList.innerHTML = "";

  if (list.length === 0) {
    bookList.innerHTML = '<p class="empty">No books found.</p>';
    return;
  }

  list.forEach(function (book) {
    const card = document.createElement("article");
    card.className = "book-card";
    card.innerHTML =
      '<div class="cover" style="background-color:' + getColor(book.genre) + '">' +
        '<span class="cover-title">' + book.title + "</span>" +
        '<span class="cover-author">' + book.author + "</span>" +
      "</div>" +
      "<h3>" + book.title + "</h3>" +
      "<p>" + book.author + " (" + book.year + ")</p>" +
      "<p>Genre: " + book.genre + "</p>" +
      '<p class="status ' + (book.available ? "available" : "checked-out") + '">' +
        (book.available ? "Available" : "Checked out") + "</p>";
    bookList.appendChild(card);
  });
}

/* ---------- Genre buttons ---------- */
const filters = document.createElement("div");
filters.className = "filters";
bookList.parentNode.insertBefore(filters, bookList);

function showGenre(genre) {
  if (genre === "All") {
    renderBooks(books);
  } else {
    renderBooks(books.filter(function (b) { return b.genre === genre; }));
  }
  document.querySelectorAll(".filters button").forEach(function (btn) {
    btn.classList.toggle("active", btn.textContent === genre);
  });
}

const genres = ["All"];
books.forEach(function (b) {
  if (!genres.includes(b.genre)) genres.push(b.genre);
});

genres.forEach(function (genre) {
  const btn = document.createElement("button");
  btn.textContent = genre;
  btn.onclick = function () { showGenre(genre); };
  filters.appendChild(btn);
});

showGenre("All");