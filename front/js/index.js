//api_url
const apiProducts="http://localhost:3000/api/products";

//defining_async_function
async function getApi(url) {

//storing_response
const response = await fetch(url);}

//calling_that_async_function
getApi(apiProducts);


/** Ressources Utilisées - Mentorat
 * https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911151-envoyez-une-requete-depuis-le-navigateur
 * https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/
*/