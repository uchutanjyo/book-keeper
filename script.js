const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector('.bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarksContainer = document.querySelector('#bookmarks-container');

let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
websiteNameEl.focus();
}


// Event Listeners
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Validate Form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('Please submit values for both name and url');
        return false;
    }
    if (urlValue.match(regex)) {
        alert("Succesful") }
            else {
            alert("no match");
            return false;
        }
        // Valid
        return true;
    };


// Build bookmarks DOM

function buildBookmarks() {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        // Item
        const item = document.createElement('div');     // creates div
        item.classList.add('item');                     //adds .item class to div (css)
        const closeIcon = document.createElement('i');     
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');  // sets title attribute to Delete Bookmark
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);  //setsonlick event to deleteBOokmark func (url which was clicked on)
        // Favicon/link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', 'favicon.png');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        // APpend to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    })
}


    // Fetch bookmarks from local storage
    function fetchBookmarks() {
        // Get bookmarks from storage if available
        if (localStorage.getItem('bookmarks')) {
            bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        } else {
            // Create bookmarks array
            bookmarks = [
                {
                    name: 'Google',
                    url: 'https://google.ca',
                },
            ];
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        };
        console.log(bookmarks);
        console.log(localStorage);
        
        buildBookmarks();
    }

// Delete Bookmarks
function deleteBookmark(url) {
bookmarks.forEach((bookmark, i) => {
if (bookmark.url === url) {
    bookmarks.splice(i, 1);
}
});
// Update bookmarks array in localStorage, re-populate DOM
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
fetchBookmarks();
}



// Handle Data From Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {     urlValue = `https://${urlValue}`; }
    // bookmarksContainer.appendChild(nameValue, urlValue);
    if(!validate(nameValue, urlValue)) 
    {return false};
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
    


};


// Bookmark event listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On load, fetch bookmarks
fetchBookmarks()