let limit = 16;
let page = 1;
let search = 0;
let searchValue = "";

function loadSearchHTMLTable(data) {
    const ROOT_PRODUCTS = document.getElementById('listing');
    if (data.length > 0) {
        let catalog = '';

        data.forEach(({ img, title, start_price, id }) => {
            catalog += `
            <div class="card">
                <a class="item" href = "detail.html?id=${id}">
                    <img src="${img}" alt="" class="img">
                </a>
                <div class="itemname">${title}</div>
                <div class="price">${start_price} ₽</div>
                <div class="btn">Купить</div>
            </div>
            `;
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

document.addEventListener('DOMContentLoaded', loader());


function loadHTMLTable(data) {

    if (data.length > 0) {
        let catalog = '';

        data.forEach(({ img, title, start_price, id }) => {
            catalog += `
            <div class="card">
                <a class="item" href = "detail.html?id=${id}">
                    <img src="${img}" alt="" class="img">
                </a>
                <div class="itemname">${title}</div>
                <div class="price">${start_price} ₽</div>
                <div class="btn">Купить</div>
            </div>
            `;
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
}


/* async function loader() {
    const response = await fetch("./sample.json");
    const data = await response.json();
    let catalog = '';
    data.forEach(({ img, name, product_id }) => {
        catalog += `
        <a class="item" href = "detail.html?id=${product_id}">
            <img src="${img}" alt="" class="img">
            <div class="btn">${name}</div>
        </a>
        `;
    })
    const html = `
    <div class="inner">
        ${catalog}
    </div>
    `;

    const ROOT_PRODUCTS = document.getElementById('listing');
    ROOT_PRODUCTS.innerHTML = html;
}
loader();
 */





