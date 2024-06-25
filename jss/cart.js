let openshoping=document.querySelector('.shoping');
let closeshoping=document.querySelector('.closeshoping');
let list=document.querySelector('.list');
let listcard=document.querySelector('.listcard');
let body=document.querySelector('body');
let total=document.querySelector('.total');
let quantity=document.querySelector('.quantity');

openshoping.addEventListener('click',()=>{
    body.classList.add('active');
})

closeshoping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products =[
   
    {
        id:1,
        name:'css',
        image:'cs.jpg',
        price:4000
    },
    {
        id:2,
        name:'Javascript',
        image:'js.jpg',
        price:5000
    },
    {
        id:3,
        name:'data-structure',
        image:'das.jpg',
        price:6000
    },
    {
        id:4,
        name:'algorithms',
        image:'al.jpg',
        price:4000
    },
    {
        id:5,
        name:'artificial-inteligence',
        image:'ai.jpg',
        price:7000
    },
    {
        id:6,
        name:'cyber-security',
        image:'cys.jpg',
        price:8000
    },
    {
        id:7,
        name:'data-science',
        image:'ds.jpg',
        price:9000
    },
    {
        id:8,
        name:'html',
        image:'ht.jpg',
        price:4500
    },
    {
        id:9,
        name:'python',
        image:'phy.jpg',
        price:7000
    },
    {
        id:10,
        name:'java',
        image:'ja.jpg',
        price:5000
    },
    {
        id:11,
        name:'operating-system',
        image:'os.jpg',
        price:11000
    },
    {
        id:12,
        name:'ux-ui',
        image:'ux.jpg',
        price:12000
    },
];

let listcards=[];

function initapp(){
    products.forEach((value, key)=>{
        let newdiv=document.createElement('div');
        newdiv.classList.add('item');
        newdiv.innerHTML=`
        <img src="image/${value.image}"/>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addtocard(${key})">addtocart</button>
        `
        list.appendChild(newdiv);
    });
}

initapp();

function addtocard(key)
{
    if(listcards[key]==null)
    {
        listcards[key]=products[key];
        listcards[key].quantity=1;
    }
    reloadcard();
}

function reloadcard()
{
    listcard.innerHTML='';
    let count =0;
    let totalprice =0;
    listcards.forEach((value, key)=>{
        totalprice = totalprice + value.price;
        count = count + value.quantity;

        if(value!=null)
        {
            let newdiv=document.createElement('li');
            newdiv.innerHTML=`
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                <button onclick="changequantity(${key}, ${value.quantity -1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changequantity(${key}, ${value.quantity +1})">+</button>
                </div>
            `;
            listcard.appendChild(newdiv);
        }

    })
    total.innerText = totalprice.toLocaleString();
    quantity.innerText= count;
}


function changequantity(key,quantity)
{
    if(quantity==0)
    {
        delete listcards[key];
        
    }
    else
    {
        listcards[key].quantity = quantity;
        listcards[key].price = quantity * products[key].price;
        
    }
    reloadcard();
}