//Intégration des paramètres de recherche de l'URL.
const urlSearchParams = new URLSearchParams(location.search);

//Obtention du canapé sélectionné.
const couchId = urlSearchParams.get("id");
const apiCouch = `http://localhost:3000/api/products/${couchId}`;
const couch = "";

//Requête de l'API produit.
fetch(apiCouch)

//Récupération de la réponse.
.then(function(response){
  
  //Connexion au serveur réussie.
  if(response.ok){

    //Conversion de la réponse émise au format JSON.
    return response.json();
  }
})
  
//Parcours du résultat.
.then(function(couch){

  //divElement = Product Div
  let divElement = document.getElementsByClassName("item__img")[0];

  //imageElement = Product Image
  //Il faut d'abord paramétrer "imageElement", pour les besoins de la prochaine étape.
  let imageElement = document.createElement("img");
  imageElement.src = couch.imageUrl;
  imageElement.alt = couch.altTxt;
  let couchImageUrl = couch.imageUrl;
  let couchAltTxt = couch.altTxt;
  
  //"divElement" a "imageElement" pour enfant.
  divElement.appendChild(imageElement);

  //nameElement = Product Name
  let nameElement = document.getElementById("title");
  nameElement.innerText = couch.name;
  let couchName = couch.name;
  document.title = couch.name;

  //priceElement = Product Price
  let priceElement = document.getElementById("price");
  priceElement.innerText = couch.price;
  let couchPrice = couch.price;

  //descriptionElement = Product Description
  let descriptionElement = document.getElementById("description");
  descriptionElement.innerText = couch.description;
  let couchDescription = couch.description;

  /**Tableau d'objets (cf. "Product.js").
  *Si tableau, alors boucle "for ... of ...".*/
  for(let color of couch.colors){

    //colorElement = Product Color
    let colorElement = document.getElementById("colors");
    
    //optionElement = Product Option
    //Il faut d'abord paramétrer "optionElement", pour les besoins de la prochaine étape.
    let optionElement = document.createElement("option");
    optionElement.value = color;
    optionElement.innerText = color;

    //"colorElement" a "optionElement" pour enfant.
    colorElement.appendChild(optionElement);
  }

  //Il faut déclarer "colorElement" à nouveau, pour les besoins de la prochaine étape.
  let colorElement = document.getElementById("colors");

  //Changement de la valeur de "colorElement".
  colorElement.addEventListener("change", function(event){

    //Désactivation du comportement par défaut du navigateur (modification de l'URL de l'onglet, et chargement d'une nouvelle page).
    event.preventDefault();

    //"productColor" désigne la nouvelle valeur de "colorElement".
    productColor = colorElement.value;
  })

  //Il faut déclarer "quantityElement", pour les besoins de la prochaine étape.
  let quantityElement = document.getElementById("quantity");

  //Changement de la valeur de "quantityElement".
  quantityElement.addEventListener("change", function(event){

    //Désactivation du comportement par défaut du navigateur (modification de l'URL de l'onglet, et chargement d'une nouvelle page).
    event.preventDefault();

    //"productQuantity" désigne la nouvelle valeur de "quantityElement". La fonction parseInt() convertit le résultat en nombre entier.
    productQuantity = parseInt(quantityElement.value);
  })

  //Appel de la fonction "addToCart(couch)" ci-dessous.
  addToCart(couch);
})

//Afficher ce message d'erreur, en cas d'échec de connexion à l'API.
.catch(function(fetchingFail){
  alert("Connexion au serveur échouée.");
})

//Pour ne pas obtenir le résultat "undefined", il faut déclarer au préalable les caractéristiques produit de "yourCouch".
let productAltTxt;
let productColor;
let productDescription;
let productId;
let productImage;
let productName;
let productPrice;
let productQuantity;

//Ajout des canapés au panier.
function addToCart(couch){

  //Il faut déclarer "addButton", pour les besoins de la prochaine étape.
  let addButton = document.getElementById("addToCart");

  //Clic sur "addButton".
  addButton.addEventListener("click", function(event){

    //Désactivation du comportement par défaut du navigateur (modification de l'URL de l'onglet, et chargement d'une nouvelle page).
    event.preventDefault();

    //Quantité de canapés comprise entre 1 et 100.
    if(productQuantity > 0 && productQuantity <= 100 && productColor){

      //Récupération du panier dans le localStorage.
      if(localStorage.getItem("cart")){

        //Résultat de l'analyse du panier, au format JSON.
        let cart = JSON.parse(localStorage.getItem("cart"));

        //Recherche des produits identiques dans le panier.
        let cartFind = cart.find(

          //Paramétrage de ladite recherche.
          (p) => p.productId == productId && p.productColor == productColor
        )

        //Si le canapé sélectionné se trouve déjà dans le panier, alors sa quantité doit être incrémentée.
        if(cartFind !== undefined){
          cartFind.productQuantity += productQuantity;

          //Erreur : Valeur supérieure à 100 pour le nombre d'articles.
          if(cartFind.productQuantity > 100){
            alert("Veuillez ne pas renseigner de valeur supérieure à 100 pour le nombre d'articles.");
          }
          else{

            //Création du nouveau panier.
            localStorage.setItem("cart", JSON.stringify(cart));

            //Confirmation de l'incrémentation.
            addToCartConfirm();
          }
        }

        //Si le canapé sélectionné ne se trouve pas déjà dans le panier, alors ce canapé doit être incrémenté.
        else{

          //Caractéristiques produit de "yourCouch".
          let yourCouch = {
            productAltTxt: couch.altTxt,
            productColor: productColor,
            productDescription: couch.description,
            productId: productId,
            productImage: couch.imageUrl,
            productName: couch.name,
            productPrice: couch.price,
            productQuantity: productQuantity
          }

          //On incrémente l'objet "yourCouch" à la fin de l'array "cart".
          cart.push(yourCouch);

          //Création du nouveau panier, et conversion du panier JS en chaîne de caractères JSON.
          localStorage.setItem("cart", JSON.stringify(cart));

          //Confirmation de l'incrémentation.
          addToCartConfirm();
        }
      }

      //Récupération du panier impossible, quand le localStorage est vide.
      else{

        //Création du panier dans le localStorage.
        let cart = [];

        //Caractéristiques produit de "yourCouch".
        let yourCouch = {
          productAltTxt: couch.altTxt,
          productColor: productColor,
          productDescription: couch.description,
          productId: productId,
          productImage: couch.imageUrl,
          productName: couch.name,
          productPrice: couch.price,
          productQuantity: productQuantity
        }

        //On incrémente l'objet "yourCouch" à la fin de l'array "cart".
        cart.push(yourCouch);

        //Création du nouveau panier, et conversion du panier JS en chaîne de caractères JSON.
        localStorage.setItem("cart", JSON.stringify(cart));

        //Confirmation de l'incrémentation.
        addToCartConfirm();
      }
    }

    //Erreur : Valeur supérieure à 100 pour le nombre d'articles.
    else if(productQuantity > 100 && productColor){
      alert("Veuillez ne pas renseigner de valeur supérieure à 100 pour le nombre d'articles.");
    }
    
    //Erreur : Absence d'option de couleur, et de quantité.
    else{
      alert("Veuillez sélectionner une option de couleur, et renseigner un nombre d'articles entre 1 et 100.");
    }
  })

  //Confirmation des ajouts au panier.
  function addToCartConfirm(){
    if(confirm("Produit(s) ajouté(s) au panier.")){
    }
  }
}