let limit = 10;
let page = 1;
let amount = 1;
let search = 0;
let searchValue = "";
let tg = window.Telegram.WebApp;
let doning = 0;

tg.expand();
tg.MainButton.hide();

function loadSearchHTMLTable(data) {
    const ROOT_PRODUCTS = document.getElementById('listing');
    if (data.length > 0) {
        let catalog = '';
        
        data.forEach(({ img, title, start_price, id }) => {
            catalog += `
            <div class="card" id="${id}">
                <div class="item">
                    <img src="${img}" alt="" class="img">
                </div>
                <div class="itemname">${title}</div>
                <div class="price">${start_price} ₽</div>
                <a class="btn" href="detail.html?id=${id}&page=${page}">Заказать</a>
            </div>
            `;
            /* ₽ */
        });
        const html = `
        <div class="inner">
            ${catalog}
        </div>
        `;
        if (page == 1) {
            ROOT_PRODUCTS.innerHTML = html;
        }
        else {
            ROOT_PRODUCTS.innerHTML += html;
        }


    }
    done = 0;
}

function searchfunc() {
    if (document.querySelector('#search-input') != null) {
        searchValue = document.querySelector('#search-input').value;
    }

    if (searchValue.length == 0) {
        page = 1;
        loader();
    }
    else {
        if (search == 0) {
            page = 1;
        }
        search = 1;
        fetch('https://rmstoreapi-production.up.railway.app/search/' + searchValue, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ limiter: limit, paging: page })
        })
            .then(response => response.json())
            .then(data => loadSearchHTMLTable(data['data']));
    }

}

function loader() {
    search = 0;
    params=new URLSearchParams(window.location.search);
    const cookieValue = params.get('page');
    console.log(cookieValue);
    if(doning == 1 || cookieValue == null){
        console.log("here");
        
        fetch('https://rmstoreapi-production.up.railway.app/getAll', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ limiter: limit, paging: page })
        })
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data']));
    }
    else{
        
        
        console.log(cookieValue,doning);
        fetch('https://rmstoreapi-production.up.railway.app/getAllDataFromStart', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ limiter: limit, paging: cookieValue })
        })
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data']));
    }

}

document.addEventListener('DOMContentLoaded', loader());

function loadHTMLTable(data) {
    

    if (data.length > 0) {
        let catalog = '';

        data.forEach(({ img, title, start_price, id }) => {
            catalog += `
            <div class="card" id="${id}">
                <div class="item">
                    <img src="${img}" alt="" class="img">
                </div>
                <div class="itemname">${title}</div>
                <div class="price">${start_price} ₽</div>
                <a class="btn" href="detail.html?id=${id}&page=${page}" onclick="getPage()">Заказать</a>
            </div>
            `;
            amount++;
        });
        const html = `
        <div class="inner">
            ${catalog}
        </div>
        `;

        const ROOT_PRODUCTS = document.getElementById('listing');
        if (page == 1) {
            ROOT_PRODUCTS.innerHTML = html;
        }
        else {
            ROOT_PRODUCTS.innerHTML += html;
        }

    }
    done = 0;
    params=new URLSearchParams(window.location.search);
    const spuds = params.get('spuds');

    if(doning == 0){
        if(spuds != null){
            window.scrollTo(0, document.body.scrollHeight);
        }
        
        doning = 1;
    }
    tg.MainButton.hide();
}

function isTextInput(node) {
    return ['INPUT', 'TEXTAREA'].indexOf(node.nodeName) !== -1;
}

document.addEventListener('touchstart', function (e) {
    if (!isTextInput(e.target) && isTextInput(document.activeElement)) {
        document.activeElement.blur();
        console.log(document.activeElement);
    }
}, false);


function myFunction() {
    
    tg.openLink("https://rmpoizon.store");
    console.log("opened");
}


function myFunction2() {
    
    tg.openTelegramLink("https://t.me/pavtoko");
    console.log("opened");
}

function showLoading() {
    loading.classList.add('show');

    done = 1;
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            
            loader();
            

        }, 300);
    }, 1000);
}

window.addEventListener('scroll', () => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 30 && done == 0) {
        showLoading();
    }
});
