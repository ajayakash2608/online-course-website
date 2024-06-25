const days=document.querySelector('#days')
const hours=document.querySelector('#hours')
const min=document.querySelector('#min')
const sec=document.querySelector('#sec')

function update()
{

const currentyear= new Date().getFullYear()

console.log(currentyear)


const newyear=new Date(`march 20 ${currentyear} 00:00:00:`)

console.log(newyear)

const currentdate=new Date()

console.log(currentdate)

const date=newyear-currentdate

console.log(date/1000/60/60/24)

const d=Math.floor(date/1000/60/60/24);
const h=Math.floor((date/1000/60/60)%24);
const m=Math.floor((date/1000/60)%60);
const s=Math.floor((date/1000)%60);

days.innerHTML=d<10?"0"+d:d;
hours.innerHTML=h<10?"0"+h:h;
min.innerHTML=m<10?"0"+m:m;
sec.innerHTML=s<10?"0"+s:s;

}

setInterval(update,1000)