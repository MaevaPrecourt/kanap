//Le lien "./product.html?id=" contient un "?" suivi par les paramètres de l'URL, selon le modèle de query string "location.search".
const windowLocation = window.location.search;

//Obtention de l'ID de chaque produit, via la méthode "GET".
const urlSearchParams = new URLSearchParams(windowLocation);
let productId = urlSearchParams.get("id");

//Requête de l'API et demande de chaque produit.
fetch(`http://localhost:3000/api/products/${productId}`)

//Récupération et conversion de la réponse émise au format JSON.
.then(response => response.json())

//Parcours du résultat.
.then(couch => {

    //imageElement = Product Image
    let imageElement = document.createElement("img");

    //Caractéristiques produit requêtées via la classe ".item__img", car l'image doit apparaître en premier.
    document.querySelector(".item__img").appendChild(imageElement);
    imageElement.src = couch.imageUrl;
    imageElement.alt = couch.altTxt;

    //nameElement = Product Name
    let nameElement = document.getElementById('title');
    nameElement.innerText = couch.name;

    //priceElement = Product Price
    let priceElement = document.getElementById('price');
    priceElement.innerText = couch.price;

    //descriptionElement = Product Description
    let descriptionElement = document.getElementById('description');
    descriptionElement.innerText = couch.description;
})