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
    let sizing = '';

    innerData.forEach(({ name_size, price}) => {
        sizing += `
        <div class="size">${name_size}<br />${price}&#165;</div>
        `;
    });

    const ROOT_PRODUCTS = document.getElementById('usercard');
    ROOT_PRODUCTS.innerHTML = html;
    const ROOT_NAME=document.getElementById('naming');
    ROOT_NAME.innerText=outData[0]["title"];
    const ROOT_SIZIING = document.getElementById('sizing');
    ROOT_SIZIING.innerHTML = sizing;
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