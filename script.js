console.log('form-validation git branch test');

const table = document.querySelector('.table');
const tableBody = document.querySelector('.tbody');
const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('.closeBtn');
const showDialogBtn = document.querySelector('.showDialog-btn');
const submitButton = document.querySelector('.save-btn');

const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read-radio');
const notReadInput = document.querySelector('#not_read-radio');

let deleteBtn;

showDialogBtn.addEventListener("click", () => {
    dialog.showModal();
});

let myLibrary = [
    // {title: 'The Hobbit', author: 'J.R.R Tolkein', pages: '304 pages', read: 'Not Read', uniqueID: crypto.randomUUID()},
    // {title: 'Harry Potter', author: 'J.K Rowling', pages: '500 pages', read: 'Not Read', uniqueID: crypto.randomUUID()},
    // {title: 'The Name of the Wind', author: 'Patrick Rothfuss', pages: 'Around 550 pages', read: 'Read', uniqueID: crypto.randomUUID()}
];

myLibrary.push(
    new Book('The Hobbit', 'J.R.R Tolkein', '304 pages', 'Not Read'),
    new Book('Harry Potter', 'J.K Rowling', '500 pages', 'Not Read'),
    new Book('The Name of the Wind', 'Patrick Rothfuss', '550 pages', 'Read'),
);
displayBooks(myLibrary);
attachEventListenerLoop();

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

submitButton.addEventListener('click', () => {
        // i++;
        let fReadInput;
        if (readInput.checked == true) {
            fReadInput = readInput.value;
        } else {
            fReadInput = notReadInput.value;
        }

        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, fReadInput);
        displayBooks(myLibrary);
        attachEventListenerLoop();
        // toggleBtnColorArray = Array.from(document.querySelectorAll('.toggle-btn-color'));

        // if (fReadInput == 'Read') {
        //     toggleBtnColorArray[i].style.left = '77px';
        // }

        resetInputValues();
});

function resetInputValues() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;
    notReadInput.checked = false;
}

function displayBooks(array) {
    let displayString = [];
    let readStatus;

    array.forEach((item) => {
        displayString.push('<tr>');
        for (const property in item) {
            let localProperty = item.hasOwnProperty(property);  //prevents displaying prototype properties (like toggleReadStatus fn)
            
            if (localProperty) {
                if (property != 'uniqueID' && property != 'read') {
                    displayString.push(`<td>${item[property]}</td>`);
                } else if (property == 'read') {
                    readStatus = item[property];
                } else displayString.push(`
                    <td><button class="readStatusBtn" data-identity="${item[property]}">${readStatus}</button></td>
                    <td><button class="deleteBtn" data-identity="${item[property]}">-</button></td>
                    `);
            }
        }
        displayString.push('</tr>')
    });

    tableBody.innerHTML = displayString.join('');
}

function attachEventListenerLoop() {
    deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach(element => {
        element.addEventListener('click', deleteItem)
    });

    readStatusBtn = document.querySelectorAll('.readStatusBtn');
    readStatusBtn.forEach(element => {
        element.addEventListener('click', toggleBookReadStatus)
    });
}

//named function for event listener because anonymous functions caused multiple click event listeners to be added when more 'books' are added to the list/table
function deleteItem(e) {
    // console.log(`Clicked uniqueID is: ${e.target.dataset.identity}`);
    myLibrary = myLibrary.filter(item => item.uniqueID != e.target.dataset.identity);
    displayBooks(myLibrary);
    attachEventListenerLoop();
    // i--;
    // console.log(`Clicked Array Item number is: ${e.target.dataset.identity}`);
    // myLibrary.splice(e.target.dataset.identity, 1)

    // console.log('Current myLibrary array is:')
    // myLibrary.forEach(element => {
    //     console.log(element);
    // });

    // showDefaultTable();

    // updateTable(myLibrary);
    // attachEventListenerLoop();
    // toggleBtnColorArray = Array.from(document.querySelectorAll('.toggle-btn-color'));

    // for (let x = 0; x < myLibrary.length; x++) {
    //     if (myLibrary[x].read == 'Read') {
    //         toggleBtnColorArray[x].style.left = '77px';
    //     }
    // }
    
    //click delete -> correlated array item is removed from array -> new table is updated (1. showDefault table  2. displayBooks + add new delete buttons to each tr)
}

function toggleBookReadStatus(e) {
    //this code finds the array item that corresponds to the matching uniqueID code
    myLibrary[myLibrary.findIndex(item => item.uniqueID == e.target.dataset.identity)].toggleReadStatus();
    displayBooks(myLibrary);
    attachEventListenerLoop();
}

function Book(title, author, pages, read) {
    [this.title, this.author, this.pages, this.read, this.uniqueID] = [title, author, pages, read, crypto.randomUUID()];
}
Book.prototype.toggleReadStatus = function() {
    (this.read == 'Read') ? this.read = 'Not Read' : this.read = 'Read';
};


const x_btn = document.querySelector('.X-btn');
const cancel_btn = document.querySelector('.cancel-btn');

//using unnamed array to group elements for same event listener
[ x_btn, cancel_btn ].forEach(element => {
    element.addEventListener("click", function() {
        resetInputValues();
        dialog.close();    
    });
 });


//-----------------------------
//PSEUDO CODE / IDEA PLANNING
/* 
additional things to work on:
    -toggle Read btn color for better visual distinction between 'Read' and 'Not Read'
*/

//-----------------------
/* OLD / UNUSED CODE SECTION
--empty currently--
*/
