const loading = document.querySelector('.loader');

let done = 0;

function showLoading() {
    loading.classList.add('show');

    done = 1;
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            if (search == 0) {
                loader();
            }
            else {
                searchfunc();
            }

        }, 300);
    }, 1000);
}

window.addEventListener('scroll', () => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 30 && done == 0) {
        showLoading();
    }
});

function loadsearch() {
    let searcher = document.getElementById("searcher");
    let test = document.createElement("div");
    test.className = "search";
    test.innerHTML += `<input placeholder="искать по названию" id="search-input" oninput="searchfunc()">`;
    searcher.appendChild(test);
}
loadsearch();




