const loading  = document.querySelector('.loader');


let limit = 16;
let page = 1;

function loader (){
    fetch('https://rmstoreapi-production.up.railway.app/getAll', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ limiter : limit, paging : page})
    })
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

document.addEventListener('DOMContentLoaded', loader());

function loadHTMLTable(data){
    if(data.length > 0){
        let catalog = '';
    
        data.forEach(({ img, title, start_price ,id}) => {
            catalog += `
            <a class="item" href = "detail.html?id=${id}">
                <img src="${img}" alt="" class="img">
                <div class="btn">${title}</div>
                <div >${start_price} - это цена если что, её тоже желательно оформить</div>
            </a>
            `;
        });
        const html = `
        <div class="inner">
            ${catalog}
        </div>
        `;
    
        const ROOT_PRODUCTS = document.getElementById('listing');
        ROOT_PRODUCTS.innerHTML += html;
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

function showLoading(){
    console.log(loading);
    loading.classList.add('show');

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
    if (scrollTop + clientHeight >= scrollHeight - 5){
        
        showLoading();
    }
});