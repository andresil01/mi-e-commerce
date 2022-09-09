import {dataDB} from "./js/data.js";

const contentClothes = document.querySelector(".content-clothes");
const contentCardBody = document.querySelector(".content-cart-body");
const contentCardTotal = document.querySelector("#total");
const botonComprar= document.querySelector(".content-cart-total");

let html= "";
let Cart= {};

dataDB.forEach(({id,name,urlImages,stock,price}) => {
    html += `
    <div class="clothes">
        <div class="clothes-img">
            <img src="${urlImages}" alt="${name}">
        </div>
        <div class="clothes-body" id="${id}">
            <h2 class="clothes-body-title">${name}</h2>
            <p>price:${price}</p>
            <p>stock:${stock}</p>
            <button class="btn btn__add">add</button>
        </div>
    </div>
    `;
});
contentClothes.innerHTML=html;

const iconCart= document.querySelector("#icon-cart");
const contentCart= document.querySelector("#content-cart");

iconCart.addEventListener("click",(e)=> {
    contentCart.classList.toggle("content-cart-show");
});

function printClothesInCart() {
   
   let html = "";
   const arrayCart= Object.values(Cart);

   arrayCart.forEach(({id,name,urlImages,amount,price}) => {
      html += `
        <div class="item-cart"> 
          <div class="item-cart-img">
              <img src="${urlImages}" alt="buso Blanco">
          </div>  

          <h4 class="item-cart-title">${name}</h4>
           <div class="item-cart-options" id=${id}>
              <i class='bx bx-plus' ></i>
              <span id="amount">${amount}</span>
              <span id="price">${price}$</span>
              <i class='bx bx-minus' ></i>
              <i class='bx bx-trash' ></i>
          </div>
       </div> 
      `;
   });

   contentCardBody.innerHTML=html;
}

contentClothes.addEventListener ("click",(e)=> {
    if (e.target.classList.contains("btn__add")) {
        const idClothes= +e.target.parentElement.id;
       
        const findClothes= dataDB.find((item) => item.id === idClothes);
        
        if (Cart[idClothes]) {
            Cart[idClothes].amount ++ ;
            contentCardTotal.innerHTML= +contentCardTotal.innerHTML+Cart[idClothes].price;    
           
        }else {
            Cart[idClothes]=findClothes;
            Cart[idClothes].amount=1;
        contentCardTotal.innerHTML= +contentCardTotal.innerHTML+Cart[idClothes].price;    
          }
        
        if (Cart[idClothes].amount >= 7){
                
                window.alert("no hay mas stock")
                Cart[idClothes].amount= 6;
                contentCardTotal.innerHTML= +contentCardTotal.innerHTML- Cart[idClothes].price;
          }
         printClothesInCart();
        
    }
});

contentCardBody.addEventListener ("click", (e)=> {
    if (e.target.classList.contains("bx-minus")) {
        const idClothes= +e.target.parentElement.id;
        
        Cart[idClothes].amount--;
        contentCardTotal.innerHTML= +contentCardTotal.innerHTML-Cart[idClothes].price
         if (Cart[idClothes].amount === 0){
            
            delete Cart[idClothes]
      }
    }

    if (e.target.classList.contains("bx-plus")) {
        const idClothes= +e.target.parentElement.id;
                 
        Cart[idClothes].amount++;
        contentCardTotal.innerHTML= +contentCardTotal.innerHTML+Cart[idClothes].price

        if (Cart[idClothes].amount >= 7){
            window.alert("no hay mas stock")
            Cart[idClothes].amount= 6;
            contentCardTotal.innerHTML= +contentCardTotal.innerHTML-Cart[idClothes].price
      }
    }

    if (e.target.classList.contains("bx-trash")) {
        const idClothes= +e.target.parentElement.id;
        contentCardTotal.innerHTML= +contentCardTotal.innerHTML-(Cart[idClothes].price*Cart[idClothes].amount)
        delete Cart[idClothes];
        
    }
    printClothesInCart();
})

botonComprar.addEventListener ("click" , (e)=> {
    if (e.target.classList.contains("btn-buy") || e.target.classList.contains("#comprar")) {
        window.alert("gracias por su compra")
        location.reload();
       ;
    }
   
    printClothesInCart();
})