let urlSearchParams = new URLSearchParams(location.search);
let getId = urlSearchParams.get("id");
let id = getId;
let orderId = document.getElementById("orderId");
orderId.innerText = id;
localStorage.clear();