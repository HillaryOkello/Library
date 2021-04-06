function Book(author, title, pages, status = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

function getSavedLibrary() {
  const libraryJSON = localStorage.getItem('library');

  try {
    return libraryJSON ? JSON.parse(libraryJSON) : [];
  } catch (e) {
    return [];
  }
}


const libraryModule = ((library) => {
  const addBook = (book) => {
    library.push(book);
  };

  const toLocalStorage = () => {
    localStorage.setItem('library', JSON.stringify(library));
  };

  const changeBookStatus = (index) => {
    library[index].status = !library[index].status;
  };

  const createButton = (tr, index, _classList, _textContent) => {
    const td = document.createElement('td');
    const checkBtn = document.createElement('button');
    checkBtn.classList.add(_classList);
    checkBtn.setAttribute('data-attribute', index);
    checkBtn.textContent = _textContent;
    td.appendChild(checkBtn);
    tr.appendChild(td);
    return checkBtn;
  };

  const removeBook = (index) => {
    library.splice(index, 1);
  };

  const display = () => {
    const bookBody = document.querySelector('#book-list');
    bookBody.innerHTML = '';

    library.forEach((book, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>${book.pages}</td>
        <td>${book.status ? 'Read already' : 'Unread'}</td>
      `;
      bookBody.appendChild(tr);
      const checkBtn = createButton(tr, index, 'change_status_button', (book.status ? 'Unread it?' : 'Read it?'));
      const rmBtn = createButton(tr, index, 'delete_button', 'delete');
      checkBtn.className = 'btn btn-primary';
      rmBtn.className = 'btn btn-primary';
      checkBtn.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-attribute');
        changeBookStatus(index);
        toLocalStorage();
        display();
      });
      rmBtn.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-attribute');
        removeBook(index);
        toLocalStorage();
        display();
      });
    });
  };

  return { addBook, display, toLocalStorage };
})(getSavedLibrary());


libraryModule.display();
