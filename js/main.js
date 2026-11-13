const bookList = document.getElementById("book-list");

function renderBooks(list) {
  bookList.innerHTML = "";
  list.forEach(function (book) {
    const card = document.createElement("article");
    card.className = "book-card";
    card.innerHTML =
      "<h3>" + book.title + "</h3>" +
      "<p>" + book.author + " (" + book.year + ")</p>" +
      "<p>Genre: " + book.genre + "</p>" +
      "<p>" + (book.available ? "Available" : "Checked out") + "</p>";
    bookList.appendChild(card);
  });
}

renderBooks(books);