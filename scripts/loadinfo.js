async function loader(){
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
loader();