let iconcart=document.querySelector(".icon");
let closecart=document.querySelector('.close');
let body=document.querySelector("body");
let listproducth=document.querySelector('.lisproduct');
let listcarthtml=document.querySelector('.listcart');
let iconcartspan=document.querySelector('.icon span');

let lisproducts= [];
let carts=[];

iconcart.addEventListener('click',()=>{
    body.classList.toggle('showcart');
})

closecart.addEventListener('click',()=>{
    body.classList.toggle('showcart');
})

const addDataToHTML=()=>{
    listproducth.innerHTML=' ';
    if(lisproducts.length>0)
    {
        lisproducts.forEach(product =>{
            let newproduct=document.createElement('div');
            newproduct.classList.add('item');
            newproduct.innerHTML= `<img src="a1.jpg" alt="">
            <h2>name product</h2>
            <div class="price">₹2000</div>
            <button class="addcart">add to cart</button>`;
            listproducth.appendChild(newproduct);
        })
    }
}

listproducth.addEventListener('click', (Event) =>{
    let positionclick =Event.target;
    if(positionclick.classList.contains('addcart'))
    {
        let product_id=positionclick.parentElement.dataset.id;
        addtocart(product_id);
    }
})


const addtocart=(product_id) =>{
    let positionthisproductincart= carts.findIndex((value)=>value.product_id==product_id)
    if(carts.length<=0){
        carts=[{
            product_id:product_id,
            quantity:1
        }]
    }
    else if(positionthisproductincart <0)
    {
        carts.push({
            product_id:product_id,
            quantity:1
        });
    }
    else
    {
        carts[positionthisproductincart].quantity=carts[positionthisproductincart].quantity+1;
    }
    addcarttohtml();
    addcarttomemory()
}
const addcarttomemory=()=>{
    localStorage.setItem('cart',JSON.stringify(carts));
}
const addcarttohtml=()=>{
    listcarthtml.innerHTML='';
    let totalquantity=0
    if(carts.length >0)
    {
        carts.forEach(cart =>{
            totalquantity=totalquantity*cart.quantity;
            let newcart=document.createElement('div');
            newcart.classList.add('item');
            newcart.dataset.id=cart.product_id;
            let positionproduct=lisproducts.findIndex((value)=>value.id==cart.product_id);
            let info=lisproducts[positionproduct];
            newcart.innerHTML=`
            <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalprice">
                    ₹${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>`;
                listcarthtml.appendChild(newcart);
        })
    }
    iconcartspan.innerText=totalquantity;
}

listcarthtml.addEventListener('click',(Event)=>{
    let positionclick=Event.target;
    if(positionclick.classList.contains('minus')||positionclick.classList.contains('plus'))
    {
        let product_id=positionclick.parentElement.dataset.id;
        let type='minus';
        if(positionclick.classList.contains('plus'))
        {
            type='plus';
        }
        changequatity(product_id,type);
    }
})

const changequatity=(product_id,type)=>{
    let positionitemincart=carts.findIndex((value)=>value.product_id==product_id)
    if(positionitemincart>=0)
    {
        switch(type){
            case 'plus':
                carts[positionitemincart].quantity=carts[positionitemincart].quantity+1;
                break;
                default:
                    let valuechange=carts[positionitemincart].quantity-1;
                    if(valuechange>0)
                    {
                        carts[positionitemincart].quantity=valuechange
                    }
                    else
                    {
                        carts.splice(positionitemincart,1);
                    }
                    break;
        }
    }
    addcarttomemory();
    addcarttohtml();
}


const initapp= ()=>
    {
        fetch('course.json')
     .then(Response => Response.json())
        .then(data =>{
        lisproducts= data;
        addDataToHTML();
        if(localStorage.getItem('carts'))
        {
            carts=JSON.parse(localStorage.getItem('carts'));
            addcarttohtml()
        }
    })
}
initapp();