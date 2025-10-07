//const submitButton = document.getElementsByClassName("submitButton")[0] getElemet te de tırnak içi şart ; getElemenets dizi döndürür bu kullanım şart

/*const submitButton = document.querySelector(".submitButton") //Tercih edilen yapı budur daha modern ve css mantığı ile içi doldurulur
submitButton.addEventListener("click", e => { butona her basıldığında
    infoNotify()
    console.log("submitButton tıklandı!")
})*/

const form = document.querySelector(".form");
const infoBlock = document.querySelector(".info");
const table = document.querySelector(".table");
let savedArray = JSON.parse(localStorage.getItem("books")) || []; //JSON String yeniden array formatında EĞER Kİ ÖNCESİNDE VERİ VARSA ŞART

updateTable();

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Refresh engellendi

  /* BU ŞEKİLDE DE INPUTLARI ALABİLİRDİN
  const formData = new FormData(e.currentTarget);
  const a = formData.get("bookName");
  console.log(Object.fromEntries(formData));
  */

  save();
  form.reset();
  updateTable();
  console.log("Form saved successfully");
});

function toast(situation) {
  infoBlock.style.textAlign = "center";
  infoBlock.style.width = "100%";
  infoBlock.style.height = "5vh";
  infoBlock.style.lineHeight = "5vh"; // Dikey ortalama
  infoBlock.style.color = "white";
  infoBlock.style.fontSize = "20px";
  infoBlock.style.visibility = "visible";
  switch (situation) {
    case -1:
      infoBlock.textContent = "Book Has Been Deleted";
      infoBlock.style.backgroundColor = "red";
      break; //ŞART YOKSA İLK GİRİLEN CASE DEN ÇIKIŞ OLAMAZ !!!!
    case 0:
      infoBlock.textContent = " Error: Book Has Already Been Added";
      infoBlock.style.backgroundColor = "rgb(198, 161, 29)";
      break;

    case 1:
      infoBlock.textContent = "Saved to the Library";
      infoBlock.style.backgroundColor = "green";
      break;
  }

  setTimeout(() => {
    infoBlock.style.visibility = "hidden";
    infoBlock.style.height = "0vh";
    infoBlock.style.lineHeight = "0vh";
  }, 2000);
}

function save() {
  const bookName = form.elements["bookName"].value;
  const author = form.elements["authorName"].value;
  const isbn = form.elements["isbn"].value;

  console.log("Name: %s ;;; Author: %s ;;; ISBN: %s", bookName, author, isbn);

  const isDuplicate = savedArray.some((book) => book.isbn === isbn);

  if (isDuplicate) {
    toast(0); // Zaten varsa uyar
  } else {
    savedArray.push({ bookName, author, isbn }); // Yoksa ekle
    toast(1);
    localStorage.setItem("books", JSON.stringify(savedArray)); //savedArray = JSON.parse(localStorage.getItem("books"))
    console.log(savedArray);
  }
}

function updateTable() {
  // Önce eski satırları sil (başlık dışındakileri)
  const oldRows = document.querySelectorAll(".tableRows:not(:first-child)");
  oldRows.forEach((row) => row.remove());

  // savedArray'e göre yeniden oluştur/
  // const row = document.createElement("div.tableRows") BU OLMADI
  savedArray.forEach((book, index) => {
    const row = document.createElement("div");
    row.classList.add("tableRows");

    const name = document.createElement("div");
    name.classList.add("tableColumns");
    name.textContent = book.bookName;
    name.title = book.bookName;

    const author = document.createElement("div");
    author.classList.add("tableColumns");
    author.textContent = book.author;
    author.title = book.author;

    const isbn = document.createElement("div");
    isbn.classList.add("tableColumns");
    isbn.textContent = book.isbn;
    isbn.title = book.isbn;

    const del = document.createElement("div");
    del.classList.add("tableColumnDelete");
    del.textContent = "X";

    // Silme işlemi
    del.addEventListener("click", () => {
      savedArray.splice(index, 1); // Diziden sil
      localStorage.setItem("books", JSON.stringify(savedArray));
      toast(-1);
      updateTable(); // Tüm tabloyu yeniden çiz
    });

    row.append(name, author, isbn, del);
    table.append(row);
  });
}
