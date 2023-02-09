//Déclaration et initialisation de l'API.
const api = "http://localhost:3000/api/products";

//Demande de l'ensemble des produits.
function getAllCouches(){

  //Requête de l'API.
  fetch(api)

  //Récupération de la réponse.
  .then(function(response){

    //Connexion au serveur réussie.
    if(response.ok){

      //Conversion de la réponse émise au format JSON.
      return response.json()
    }
  })

  //Parcours du résultat.
  .then(function(couches){
  
    /**Section au contenu commenté dans "index.html".
    *Contenu requêté via la classe ".items".*/
    const catalog = document.getElementsByClassName("items")[0];

    /**Tableau d'objets (cf. "Product.js").
    *Si tableau, alors boucle "for ... of ...".*/
    for (let couch of couches){
    
      //anchorElement = Product Link
      const anchorElement = document.createElement("a");
      catalog.appendChild(anchorElement);
      anchorElement.href = "./product.html?id=" + couch._id;

      //cardElement = Product Card
      const cardElement = document.createElement("article");
      anchorElement.appendChild(cardElement);

      //imageElement = Product Image
      const imageElement = document.createElement("img");
      cardElement.appendChild(imageElement);
      imageElement.src = couch.imageUrl;
      imageElement.alt = couch.altTxt;

      //headingElement = Product Name
      const headingElement = document.createElement("h3");
      headingElement.classList.add("productName");
      cardElement.appendChild(headingElement);
      headingElement.innerText = couch.name;

      //paragraphElement = Product Description
      const paragraphElement = document.createElement("p");
      paragraphElement.classList.add("productDescription");
      cardElement.appendChild(paragraphElement);
      paragraphElement.innerText = couch.description;
    }
  })

  //Afficher ce message d'erreur, en cas d'échec de connexion à l'API.
  .catch(function(fetchingFail){
    alert("Connexion au serveur échouée.");
  })
}

//Appel de la fonction "getAllCouches()".
getAllCouches();