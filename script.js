console.log("Bookmark Console -- created by Arindam")

const bookmarkContainer = document.getElementById("bookmarks-container");
const addBookmark = document.getElementById("add-bookmark");
const closeModal = document.getElementById("close-modal");
const modal = document.getElementById("modal-container");
const modalPage = document.getElementById("modal-page");
const saveButton = document.getElementById("save-button");
const modalForm = document.getElementById("modal-form");

modal.style.display = "none";
var bookmarksArray = [];

addBookmark.addEventListener("click", function () {
    modal.style.display = "block";
});
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (e) {
    if (e.target === modalPage) {
        modal.style.display = "none";
    }
});

function storeBookmark(e) {
    e.preventDefault();
    const name = e.srcElement[0].value;
    var URL = e.srcElement[1].value;

    const bookmark = {
        webName: name,
        webUrl: URL
    }

    bookmarksArray.push(bookmark);
    modalForm.reset();

    localStorage.setItem("bookmark", JSON.stringify(bookmarksArray));
    fetchBookmarks();
}

function fetchBookmarks() {
    // bookmark if available in localstorage
    if (localStorage.getItem("bookmark")) {
        bookmarksArray = JSON.parse(localStorage.getItem("bookmark"));
    }
    buildBookmarks();
}

modalForm.addEventListener("submit", storeBookmark);

fetchBookmarks();

function buildBookmarks() {
    bookmarkContainer.textContent=" ";
    bookmarksArray.forEach((bookmark) => {
        const { webName, webUrl } = bookmark;

        const item = document.createElement("div");
        item.classList.add("bookmarks");
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("far", "fa-window-close");
        closeIcon.setAttribute("title","Delete Bookmark");
        closeIcon.setAttribute( "onclick",`deleteBookmark('${webUrl}')` );

        const linkInfo = document.createElement("div");
        linkInfo.classList.add("bookmark-content");
        const favicon = document.createElement("img");
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${webUrl}`);
        const link = document.createElement("a");
        link.setAttribute("href", `${webUrl}`);
        link.setAttribute("target", "_blank");
        link.textContent = webName;
        
        linkInfo.append(favicon, link);
        item.append(closeIcon,linkInfo);
        bookmarkContainer.appendChild(item);
    })
}
buildBookmarks();

function deleteBookmark(url){
    bookmarksArray.forEach( (bookmark,i)=>
    {
        if(bookmark.webUrl === url){
            bookmarksArray.splice(i,1);
        }
    })
    localStorage.setItem("bookmark",JSON.stringify(bookmarksArray));
    fetchBookmarks();
}