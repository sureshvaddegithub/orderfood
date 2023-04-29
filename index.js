


const caterory_food = document.querySelector(".caterory_food");
caterory_food.className = "caterory_food";

const card_items = document.querySelector(".items");
const button = document.querySelectorAll("button");
const paybill = document.getElementById("pay");
const confirm = document.getElementById("confirm");
let list = [];




async function getMenu(){

    const url = `https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`;

    const prom = await fetch(url);

    const response = await prom.json();
    
    renderFoodItems(response);

   
    
}

getMenu();



async function renderFoodItems(category){
   
     
  let itemlist=  category.map((ele)=>{


           const food = document.createElement("div");
           food.className="food";
           const img = document.createElement("img");
           img.src = ele.imgSrc;
           food.appendChild(img);
           const name = document.createElement("p");
           name.innerText = ele.name;
           food.appendChild(name);
           const ellipsis = document.createElement("div");
            ellipsis.className ="ellipsis";
            const style = document.createElement("p");
            style.innerText="North food,south food ..."
            ellipsis.appendChild(style);
            const rate = document.createElement("p");
            rate.innerText = ele.price;
            ellipsis.appendChild(rate);
            food.appendChild(ellipsis);
            caterory_food.appendChild(food);
            
            return food;
    })

    const foodContainers = document.querySelectorAll('.food');

    foodContainers.forEach((container) => {
      container.addEventListener('click', () => {
        const title = container.querySelector('p').textContent;
        const price = container.querySelector('.ellipsis p:last-of-type').textContent;
         takeOrder(title,price);
      });
    });
          
    
}

async function takeOrder(name ,price){
    let obj={
        name:name,
        price:price
    }
    list.push(obj);
    button[0].className="display";
    button[0].disabled = false;
    const div = document.createElement("div");
    div.className="orderItems";
    const span =document.createElement("span");
    span.innerText = list.length;
    div.appendChild(span);
    const span1 =document.createElement("span");
    span1.innerText = name;
    div.appendChild(span1);
    const span2 =document.createElement("span");
    span2.innerText = price;
    div.appendChild(span2);
     card_items.appendChild(div);
    

}


async function orderPrep(){
    let promise = new Promise((resolve,reject)=>{
     setTimeout(()=>{
         resolve({order_status:true, paid:false});
     },1500)
     })
     return promise;
 }




confirm.addEventListener("click",async()=>{
    let a = 0;
      list.forEach((ele)=>{
          a+=Number(ele.price);
      })
  
      const div = document.createElement("div");
      div.className="space-bt";
      const span = document.createElement("span");
      span.innerText = "Total";
      div.appendChild(span);
      const span1 = document.createElement("span");
      span1.innerText = a;
      div.appendChild(span1);
      card_items.appendChild(div);
  
      button[0].disabled = true;
       button[1].disabled = false;
      let order = await orderPrep();
      button[1].className="display";
  })
  
  
  paybill.addEventListener("click",async()=>{
      let wait = await payOrder();
      if(wait.paid ===true)
      thankyouFnc();
      
  })


  async function payOrder(){
    let prom = new Promise((resolve,reject)=>{
       setTimeout(()=>{
          resolve({order_status:true, paid:true})
       },1000)
    })
    return prom;
  }

  function thankyouFnc(){
    alert("thankyou for eating with us today!");
    button[1].disabled = true;
  }