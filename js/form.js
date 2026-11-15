const form = document.getElementById("add-form");
const message = document.getElementById("form-message");

function showMessage(text, ok) {
  message.textContent = text;
  message.className = "form-message " + (ok ? "ok" : "error");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("book-author").value.trim();
  const year = Number(document.getElementById("book-year").value);
  const pages = Number(document.getElementById("book-pages").value);
  const genre = document.getElementById("book-genre").value;
  const available = document.getElementById("book-available").checked;

  /* extra checks in JavaScript (on top of the HTML rules) */
  if (title.length < 2 || author.length < 2) {
    showMessage("Title and author need at least 2 characters (spaces do not count).", false);
    return;
  }
  if (!/[A-Za-z\u0400-\u04FF]/.test(author)) {
    showMessage("The author name must contain letters.", false);
    return;
  }
  if (year > new Date().getFullYear()) {
    showMessage("The year cannot be in the future.", false);
    return;
  }
  const exists = books.some(function (b) {
    return b.title.toLowerCase() === title.toLowerCase();
  });
  if (exists) {
    showMessage("This book is already in the catalog.", false);
    return;
  }

  const newBook = {
    id: Math.max.apply(null, books.map(function (b) { return b.id; })) + 1,
    title: title,
    author: author,
    year: year,
    genre: genre,
    pages: pages,
    available: available
  };
  books.push(newBook);

  /* remember the new book in this browser */
  try {
    const saved = JSON.parse(localStorage.getItem("booknest-extra") || "[]");
    saved.push(newBook);
    localStorage.setItem("booknest-extra", JSON.stringify(saved));
  } catch (e) {}

  form.reset();
  currentGenre = "All";
  currentQuery = "";
  search.value = "";
  applyFilters();
  showMessage('"' + title + '" was added to the catalog.', true);
});