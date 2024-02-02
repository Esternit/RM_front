let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';


if (tg.MainButton.isVisible) {
    tg.MainButton.hide();
}

let item = {};
var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();
BackButton.onClick(function () {
    const Id = new URLSearchParams(window.location.search).get('id');
    const paging = new URLSearchParams(window.location.search).get('page');
    document.cookie = "spuds="+Id;
    window.location.href='index.html?page='+paging+"&spuds="+Id;
    BackButton.hide();
    tg.MainButton.hide();
});

document.addEventListener('DOMContentLoaded', function () {
    const Id = new URLSearchParams(window.location.search).get('id');
    fetch('https://rmstoreapi-production.up.railway.app/getById', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ productId: Id })
    })
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data) {

    const outData = data['base'];
    const innerData = data['sizes']
    const html = `
    <img src = "${outData[0]["img"]}" class="image"> 
    `;
    const ROOT_SIZIING = document.getElementById('sizing');
    const ROOT_PRODUCTS = document.getElementById('usercard');

    const PRICE = document.getElementById('price');
    PRICE.innerText = innerData[0].price + " ₽";

    innerData.forEach(({ name_size, price }) => {
        let inner = document.createElement('div');
        inner.className = 'size';
        inner.innerHTML = ` ${name_size}<br />${price} ₽`;
        inner.addEventListener("click", function () {
            // replacing price
            const PRICE = document.getElementById('price');
            PRICE.innerText = price + " ₽";

            // showing purchase button
            item = JSON.stringify({
                title: outData[0]["title"],
                pricing: price,
                size_name: name_size,
                id: outData[0]["id"],
                img: outData[0]["img"]
            });
            tg.MainButton.setText("Перейти в чат с менеджером");
            tg.MainButton.show();
        })

        ROOT_SIZIING.appendChild(inner);
    });


    ROOT_PRODUCTS.innerHTML = html;
    const ROOT_NAME = document.getElementById('naming');
    ROOT_NAME.innerText = outData[0]["title"];
}

Telegram.WebApp.onEvent("mainButtonClicked", function () {
    tg.sendData(item);
});

function test(){
    const Id = new URLSearchParams(window.location.search).get('id');
    const paging = new URLSearchParams(window.location.search).get('page');
    document.cookie = "spuds="+Id;
    window.location.href='index.html?page='+paging+"&spuds="+Id;
}