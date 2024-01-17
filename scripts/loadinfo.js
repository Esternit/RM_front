let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = {};

document.addEventListener('DOMContentLoaded', function () {
    const Id =  new URLSearchParams(window.location.search).get('id');
    fetch('https://rmstoreapi-production.up.railway.app/getById', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ productId : Id})
    })
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data){
    
    const outData = data['base'];
    const innerData = data['sizes']
    const html = `
    <img src = "${outData[0]["img"]}" class="image"> 
    `;
    const ROOT_SIZIING = document.getElementById('sizing');
    const ROOT_PRODUCTS = document.getElementById('usercard');
    innerData.forEach(({ name_size, price}) => {
        let inner = document.createElement('div');
        inner.className = 'size';
        inner.innerHTML = ` ${name_size}<br />${price}&#165;`;
        inner.addEventListener("click", function () {
            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            }
            else {
                item = JSON.stringify({
                    title : outData[0]["title"],
                    pricing : price,
                    size_name : name_size,
                    id : outData[0]["id"],
                    img : outData[0]["img"]
                });
                console.log(item);
                tg.MainButton.setText("Перейти в чат с продавцом");
                tg.MainButton.show();
            }
        })

        ROOT_SIZIING.appendChild(inner);
    });

    ROOT_PRODUCTS.innerHTML = html;
    const ROOT_NAME=document.getElementById('naming');
    ROOT_NAME.innerText=outData[0]["title"];
}

/* async function loader(){
    const response = await fetch("./sample.json");
    const data = await response.json();
    const Id =  new URLSearchParams(window.location.search).get('id');
    
    let catalog =  data.find(el => el.product_id === Id);
    console.log(catalog);
    const html = `
    <img src = "${catalog["img"]}" class="image"> 
    `;
    
    const ROOT_PRODUCTS = document.getElementById('usercard');
    ROOT_PRODUCTS.innerHTML = html;
    const ROOT_NAME=document.getElementById('naming');
    ROOT_NAME.innerText=catalog["name"];
}
loader(); */

Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(item);
});