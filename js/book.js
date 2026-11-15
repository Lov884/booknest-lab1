const detail = document.getElementById("book-detail");

const isbns = {
  1: "9780156012195", 2: "9780451524935", 3: "9780141439518",
  4: "9780547928227", 5: "9780143058144", 6: "9780553380163",
  7: "9780061120084", 8: "9780743273565", 9: "9780060850524",
  10: "9780590353427", 11: "9780316769488", 12: "9780141441146",
  13: "9780062316110", 14: "9780441172719", 15: "9780062315007",
  16: "9780062693662", 17: "9780143108276", 18: "9781400079988",
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

function addText(parent, tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text;
  parent.appendChild(el);
  return el;
}

/* book.html?id=3 -> show book number 3 (first book if no id) */
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id")) || books[0].id;
const book = books.find(function (b) { return b.id === id; });

if (!book) {
  addText(detail, "p", "empty", "Book not found.");
} else {
  document.title = book.title + " - BookNest";

  const box = document.createElement("article");
  box.className = "detail";

  const cover = document.createElement("div");
  cover.className = "cover";
  cover.style.backgroundColor = genreColors[book.genre] || "#495057";
  addText(cover, "span", "cover-title", book.title);
  addText(cover, "span", "cover-author", book.author);

  if (isbns[book.id]) {
    const img = document.createElement("img");
    img.className = "cover-img";
    img.alt = "Cover of " + book.title;
    img.src = "https://covers.openlibrary.org/b/isbn/" + isbns[book.id] + "-L.jpg?default=false";
    img.addEventListener("error", function () { img.remove(); });
    cover.appendChild(img);
  }

  const info = document.createElement("div");
  info.className = "detail-info";
  addText(info, "h3", "", book.title);
  addText(info, "p", "", "Author: " + book.author);
  addText(info, "p", "", "Year: " + book.year);
  addText(info, "p", "", "Genre: " + book.genre);
  if (book.pages) addText(info, "p", "", "Pages: " + book.pages);
  addText(
    info,
    "p",
    "status " + (book.available ? "available" : "checked-out"),
    book.available ? "Available" : "Checked out"
  );

  box.append(cover, info);
  detail.appendChild(box);
}