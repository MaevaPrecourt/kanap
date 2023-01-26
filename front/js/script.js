//Requête de l'API et demande de l'ensemble des produits.
fetch("http://localhost:3000/api/products")

//Récupération et conversion de la réponse émise au format JSON.
.then(response => response.json())

//Parcours du résultat.
.then(couches => {
  
  /**Section au contenu commenté dans "index.html".
  *Contenu requêté via la classe ".items".*/
  const catalog = document.querySelector(".items");

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
    headingElement.innerHTML = couch.name;

    //paragraphElement = Product Description
    const paragraphElement = document.createElement("p");
    paragraphElement.classList.add("productDescription");
    cardElement.appendChild(paragraphElement);
    paragraphElement.innerHTML = couch.description;
  }
})