let tgk = window.Telegram.WebApp;

tgk.expand();
var BackButton = window.Telegram.WebApp.BackButton;
BackButton.onClick(function () {
    window.location.href = 'index.html';

    BackButton.hide();
    tgk.MainButton.hide();
});

const loading = document.querySelector('.loader');

let done = 0;

function loadsearch() {
    const sh = new URLSearchParams(window.location.search).get('search');
    let searcher = document.getElementById("searcher");
    let test = document.createElement("div");
    test.className = "search";
    test.innerHTML += `<input placeholder="Поиск по названию" id="search-input" class = "wideinputbox" oninput="searchfunc()" />`;
    BackButton.show();

    searcher.appendChild(test);
    if (sh != null) {
        document.getElementById("search-input").value = sh;

    }
    
}

function testFunc() {
    console.log(window.location.href)
    if (window.location.href.indexOf("search.html") == -1) {

        window.location.href = "search.html";
        console.log(document.getElementById("search-input"));
    }
}
loadsearch();