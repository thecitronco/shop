function addToCart(productId){

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
