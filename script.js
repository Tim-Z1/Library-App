const table = document.querySelector('.table');
const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('.closeBtn');
const showDialogBtn = document.querySelector('.showDialog-btn');
const submitButton = document.querySelector('.submit-btn');

const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');
const notReadInput = document.querySelector('#not_read');

let deleteBtn;
let i = 0;
let toggleBtnColorArray = Array.from(document.querySelectorAll('.toggle-btn-color'));

showDialogBtn.addEventListener("click", () => {
    dialog.showModal();
});

attachEventListenerLoop();

const myLibrary = [
    {title: 'The Hobbit', author: 'J.R.R Tolkein', pages: '304 pages', read: 'Not Read'}
    // ,{title: 'Harry Potter', author: 'J.K Rowling', pages: '500 pages', read: 'Not Read'}
];

submitButton.addEventListener('click', () => {
        i++;
        let fReadInput;
        if (readInput.checked == true) {
            fReadInput = readInput.value;
        } else {
            fReadInput = notReadInput.value;
        }

        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, fReadInput, i)
        myLibrary.push(newBook);

        displayBook();    
        attachEventListenerLoop();
        toggleBtnColorArray = Array.from(document.querySelectorAll('.toggle-btn-color'));

        if (fReadInput == 'Read') {
            toggleBtnColorArray[i].style.left = '77px';
        }

        function resetInputValues() {
            titleInput.value = '';
            authorInput.value = '';
            pagesInput.value = '';
            readInput.checked = false;
            notReadInput.checked = false;
        }
        resetInputValues();
});

function displayBook() {
    let tr = document.createElement("tr");
    tr.innerHTML = 
        ` 
            <td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td> 
            <td>${myLibrary[i].pages}</td> 
            <td>
                <div class="form-box">
                    <div class="button-box">
                        <div class="toggle-btn-color"></div>
                        <button type="button" class="toggle-btn L" data-identity="${i}">Not Read</button>
                        <button type="button" class="toggle-btn R" data-identity="${i}">Read</button>
                    </div>
                </div>
            </td>
            <td><button class="deleteBtn" data-identity="${i}">-</button></td>
        `;
    table.appendChild(tr);
}

function attachEventListenerLoop() {
    deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach(element => {
        element.addEventListener('click', deleteItem)
    });

    leftBtn = document.querySelectorAll('.L');
    leftBtn.forEach(element => {
        element.addEventListener('click', leftClick)
    });

    rightBtn = document.querySelectorAll('.R');
    rightBtn.forEach(element => {
        element.addEventListener('click', rightClick)
    });
}

//named function for event listener because anonymous functions caused multiple click event listeners to be added when more 'books' are added to the list/table
function deleteItem(e) {
    i--;
    console.log(`Clicked Array Item number is: ${e.target.dataset.identity}`);
    myLibrary.splice(e.target.dataset.identity, 1)

    console.log('Current myLibrary array is:')
    myLibrary.forEach(element => {
        console.log(element);
    });

    showDefaultTable();

    updateTable(myLibrary);
    attachEventListenerLoop();
    toggleBtnColorArray = Array.from(document.querySelectorAll('.toggle-btn-color'));

    for (let x = 0; x < myLibrary.length; x++) {
        if (myLibrary[x].read == 'Read') {
            toggleBtnColorArray[x].style.left = '77px';
        }
    }
    
    //click delete -> correlated array item is removed from array -> new table is updated (1. showDefault table  2. displayBooks + add new delete buttons to each tr)
}

function updateTable(array) {
    for (let i = 0; i < array.length; i++) {
        let tr = document.createElement("tr");

        tr.innerHTML = 
            ` 
                <td>${array[i].title}</td>
                <td>${array[i].author}</td> 
                <td>${array[i].pages}</td> 
                <td>
                    <div class="form-box">
                        <div class="button-box">
                            <div class="toggle-btn-color"></div>
                            <button type="button" class="toggle-btn L" data-identity="${i}">Not Read</button>
                            <button type="button" class="toggle-btn R" data-identity="${i}">Read</button>
                        </div>
                    </div>
                </td>

                <td><button class="deleteBtn" data-identity="${i}">-</button></td>
            `;
    
        table.appendChild(tr);
    }
}

function showDefaultTable() {
    table.innerHTML = 
    `
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Status</th>
                <th>Delete</th>
            </tr>
        </thead>
    `;
}

//Object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.arrayID = arrayID;
}

function leftClick(e) {
    let dataID = e.target.dataset.identity;
    toggleBtnColorArray[dataID].style.left = '0';
    myLibrary[dataID].read = 'Not Read';

    console.log(`Clicked Left Button, data ID is: ${dataID}`);
    console.log('Current myLibrary array is:')
    myLibrary.forEach(element => {
        console.log(element);
    });
}
function rightClick(e) {
    let dataID = e.target.dataset.identity;
    toggleBtnColorArray[dataID].style.left = '77px';
    myLibrary[dataID].read = 'Read';

    console.log(`Clicked Right Button, data ID is: ${dataID}`);
    console.log('Current myLibrary array is:')
    myLibrary.forEach(element => {
        console.log(element);
    });
}

// the 4 lines of code below are only for first book entry i believe, can be removed/optimised later
const left = document.querySelector('.L');
const right = document.querySelector('.R');
left.addEventListener('click', leftClick);
right.addEventListener('click', rightClick);

//-----------------------------
//PSEUDO CODE / IDEA PLANNING
/* 
Making each book item's delete button function:
1. add a data key to each book object on creation during submit btn click event, e.g Book object{read: 'Not Read', data: [i]}

2. on clicking delete button, access that book objects data key and delete the corresponding myLibrary[i] according to that data key e.g. book objects data: 3 then removes myLibrary[3]

3. After book object gets removed from myLibrary array -> run a different displayBook function that 'updates' the table display, perhaps using table.innerHTML 
    -might mean I have to re add delete button click events for every book?


additional things to work on:
    -reduce the amount of global scope variables for good practice in the future
   -when submit button is clicked, it then closes the modal dialog and updates the current 
   myLibrary (i.e. adds it to the array and also resets and displays a new/updated HTML table)

   -make the webpage/library app more aesthetically pleasing, maybe synthwave themed, if i want to go even further I could try to make it into a yugioh decklist 

*/

//-----------------------
/* OLD / UNUSED CODE

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        let tr = document.createElement("tr");

        tr.innerHTML = 
            ` 
                <td>${myLibrary[i].title}</td>
                <td>${myLibrary[i].author}</td> 
                <td>${myLibrary[i].pages}</td> 
                <td>${myLibrary[i].read}</td> 
            `;

        table.appendChild(tr);
    }
}

deleteButton.addEventListener('click', () => {
    console.log('hewwo');
});

const outputBox = document.querySelector('output');

let dBtnArray = [];
dBtnArray.push((Array.from(deleteBtn))[i-1]);
console.log(dBtnArray);

dBtnArray[i-1].addEventListener('click', (e) => {
    console.log(`test delete ${i}`);
    console.log(dBtnArray[i-1].dataset.identity);
    console.log(e.target);
});


let deleteButton2 = document.querySelectorAll('.deleteBtn2');
deleteButton2.forEach(element => {
    element.addEventListener('click', ()=> {
        console.log('herro');
    })
});
*/