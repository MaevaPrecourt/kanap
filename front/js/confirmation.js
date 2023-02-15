//Intégration des paramètres de recherche de l'URL.
let urlSearchParams = new URLSearchParams(location.search);
let getId = urlSearchParams.get("id");
let id = getId;

//Obtention et affichage du numéro de commande.
let orderId = document.getElementById("orderId");
orderId.innerText = id;

//Suppression de la commande du localStorage.
localStorage.clear();