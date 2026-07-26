// ================================
// THE CITRON CO.
// script.js
// PART 1 OF 2
// Paste this first.
// I'll send PART 2 next.
// ================================

const products = [
{
    id:1,
    name:"Lime Slices",
    image:"images/lime.jpg",
    prices:{
        25:40,
        50:75,
        100:150,
        200:300,
        250:375,
        500:750,
        1000:1500
    }
},
{
    id:2,
    name:"Tajin Lime Slices",
    image:"images/tajin-lime.jpg",
    prices:{
        25:45,
        50:85,
        100:170,
        200:340,
        250:425,
        500:850,
        1000:1700
    }
},
{
    id:3,
    name:"Lemon Slices",
    image:"images/lemon.jpg",
    prices:{
        25:45,
        50:85,
        100:170,
        200:340,
        250:425,
        500:850,
        1000:1700
    }
},
{
    id:4,
    name:"Orange Slices",
    image:"images/orange.jpg",
    prices:{
        25:50,
        50:95,
        100:190,
        200:380,
        250:475,
        500:950,
        1000:1900
    }
},
{
    id:5,
    name:"Grapefruit Slices",
    image:"images/grapefruit.jpg",
    prices:{
        25:55,
        50:105,
        100:210,
        200:420,
        250:525,
        500:1050,
        1000:2100
    }
},
{
    id:6,
    name:"Mixed Citrus Pack",
    image:"images/mixed-citrus.jpg",
    prices:{
        25:60,
        50:115,
        100:230,
        200:460,
        250:575,
        500:1150,
        1000:2300
    }
},
{
    id:7,
    name:"Kiwi Slices",
    image:"images/kiwi.jpg",
    prices:{
        25:55,
        50:105,
        100:210,
        200:420,
        250:525,
        500:1050,
        1000:2100
    }
},
{
    id:8,
    name:"Apple Slices",
    image:"images/apple.jpg",
    prices:{
        25:55,
        50:105,
        100:210,
        200:420,
        250:525,
        500:1050,
        1000:2100
    }
},
{
    id:9,
    name:"Pineapple Slices",
    image:"images/pineapple.jpg",
    prices:{
        25:75,
        50:145,
        100:290,
        200:580,
        250:725,
        500:1450,
        1000:2900
    }
},
{
    id:10,
    name:"Dragonfruit Slices",
    image:"images/dragonfruit.jpg",
    prices:{
        25:75,
        50:145,
        100:290,
        200:580,
        250:725,
        500:1450,
        1000:2900
    }
}
];

let cart=[];

const productContainer=document.getElementById("products");
const cartCount=document.getElementById("cart-count");

function money(value){
    return "TT$"+value.toLocaleString("en-US",{
        minimumFractionDigits:2,
        maximumFractionDigits:2
    });
}

function renderProducts(){

productContainer.innerHTML="";

products.forEach((product)=>{

const card=document.createElement("div");
card.className="product-card";

card.innerHTML=`

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-details">

<h2>${product.name}</h2>

<label>Quantity</label>

<select id="qty-${product.id}">

<option value="25">25 PCS</option>
<option value="50">50 PCS</option>
<option value="100">100 PCS</option>
<option value="200">200 PCS</option>
<option value="250">250 PCS</option>
<option value="500">500 PCS</option>
<option value="1000">1000 PCS</option>

</select>

<div class="price" id="price-${product.id}">
${money(product.prices[25])}
</div>

<button
class="add-cart"
onclick="addToCart(${product.id})">

Add to Cart

</button>

</div>

`;

productContainer.appendChild(card);

const select=document.getElementById(`qty-${product.id}`);

select.addEventListener("change",()=>{

const qty=Number(select.value);

document.getElementById(`price-${product.id}`).innerHTML=
money(product.prices[qty]);

});

});

}

renderProducts();function addToCart(productId){

    const product = products.find(p => p.id === productId);

    const qty = Number(document.getElementById(`qty-${productId}`).value);

    const price = product.prices[qty];

    const existing = cart.find(
        item => item.id === productId && item.qty === qty
    );

    if(existing){
        existing.count++;
    }else{
        cart.push({
            id: product.id,
            name: product.name,
            qty: qty,
            price: price,
            count: 1
        });
    }

    updateCart();

}

function updateCart(){

    cartCount.textContent = cart.reduce(
        (total,item)=>total+item.count,
        0
    );

    const panel = document.getElementById("cart-panel");

    panel.innerHTML = "";

    const title = document.createElement("h2");
    title.innerHTML = "Shopping Cart";
    title.style.padding = "25px";
    panel.appendChild(title);

    if(cart.length===0){

        const empty=document.createElement("p");
        empty.style.padding="25px";
        empty.innerHTML="Your cart is empty.";
        panel.appendChild(empty);

        return;

    }

    let subtotal = 0;

    cart.forEach((item,index)=>{

        subtotal += item.price * item.count;

        const row=document.createElement("div");

        row.style.padding="20px";
        row.style.borderBottom="1px solid #ddd";

        row.innerHTML=`

            <strong>${item.name}</strong>

            <br>

            ${item.qty} PCS

            <br>

            ${money(item.price)}

            <br><br>

            Qty: ${item.count}

            <br><br>

            <button onclick="removeItem(${index})">

                Remove

            </button>

        `;

        panel.appendChild(row);

    });

    const total=document.createElement("div");

    total.style.padding="25px";

    total.innerHTML=`

        <h2>Total</h2>

        <h3>${money(subtotal)}</h3>

        <br>

        <button class="add-cart">

            Checkout

        </button>

    `;

    panel.appendChild(total);

}

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

document.querySelector(".cart-button").addEventListener("click",()=>{

    const panel=document.getElementById("cart-panel");

    if(panel.style.right==="0px"){

        panel.style.right="-420px";

    }else{

        panel.style.right="0px";

    }

});

updateCart();
