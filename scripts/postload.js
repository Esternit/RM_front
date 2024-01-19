const loading = document.querySelector('.loader');

function showLoading() {
    loading.classList.add('show');

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
    console.log(scrollTop, scrollHeight, clientHeight)
    if (scrollTop + clientHeight >= scrollHeight - 20) {
        console.log("here");
        showLoading();
    }
});

function loadsearch() {
    let searcher = document.getElementById("searcher");
    let test = document.createElement("div");
    test.className = "search";
    test.innerHTML += `<input placeholder="искать по названию" id="search-input" oninput="searchfunc()">`;
    searcher.appendChild(test);
    console.log(test);
}
loadsearch();



