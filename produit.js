API = " http://localhost:3000/api/teddies/";
const panier = JSON.parse(localStorage.getItem('panier')) || [];

var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

console.log(id);

let currentTeddy

function getParameter(teddy) {
    currentTeddy = teddy
    let src = document.querySelector('.imgproduitpanier').src = `${teddy.imageUrl}`;
    let name = document.querySelector('.nameproduct');
    let description = document.querySelector('.imgdescription');

    description.innerText = `${teddy.description}`
    name.innerText = `${teddy.name}`

    let price = document.querySelector('.priceproduct');
    price.innerText = `${ (teddy.price/100).toFixed(2)} €`
    console.log(src);
    console.log(teddy);
    console.log(description)

    const boutonajout = document.getElementById('boutonajoutpanier');
    boutonajout.addEventListener('click', function () {
        console.log('click');

        ajoutAuPanier();

    })
}



fetch(API + id)
    .then(function (response) {
        return response.json();
    })
    .then(getParameter)
    .catch(function (error) {
        console.log(error)
    });



function ajoutAuPanier() {
    const colorTag = document.getElementById('color');
    const addTeddy = {
        _id: currentTeddy._id,
        name: currentTeddy.name,
        price: currentTeddy.price,
        color: colorTag.value,
        quantity: 1
    }
    
    panier.push(addTeddy);
    localStorage.setItem('panier', JSON.stringify(panier))
}