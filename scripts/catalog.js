document.addEventListener('DOMContentLoaded', function () {
    fetch('https://rmstoreapi-production.up.railway.app/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data){
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
    ROOT_PRODUCTS.innerHTML = html;
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