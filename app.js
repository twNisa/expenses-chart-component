console.log("THIS IS JS");

// const response =  fetch("data.json").then(resp => resp.json());
async function fetchAndReturn(){
  const res = await fetch("data.json")
  const data = await res.json()
  // console.log(data);
  return data;
}

function populateChart(data, chart){
  // data = data.then(res=> res)
  console.log(data);
  // btns.forEach((btn, index) => {
  //   console.log(btn);
  //   // const temp = 
  //   // `
  //   //   <button aria-label="${data[index]["day"]}'s spending was $${data[index].day} ">
  //   //     <div class="bar"></div>
  //   //     <p>${data[index].day}</p>
  //   //     <p class="popup">$${data[index].amount}</p>
  //   // </button>
  //   // `;
  //   // btn.innerHTML = temp;
  // });

  const entries = data.map(item=> item["amount"])
  console.log(entries);
  const max = entries.reduce((prev, curr, index, arr)=>{
    if(prev > curr){
      return prev
    } else {
      return curr
    }
  })

  //build button
  const today = new Date();
  const d = today.getDay()
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

  data.forEach((day, index) => {
    const height = data[index]["amount"]*2;
    const button = document.createElement("button");
    button.ariaLabel=`${data[index]["day"]}'s spending was $${data[index]["amount"]}`;
    
    const div = document.createElement("div");
    div.classList.add("bar");
    div.style.height=`${height}px`;

    const pDay = document.createElement("p");
    pDay.textContent = `${data[index]["day"]}`;

    const pPopup = document.createElement("p");
    pPopup.classList.add("popup");
    pPopup.classList.add("hidden");
    pPopup.textContent=`$${data[index]["amount"]}`
    pPopup.style.top= `${max-height+50}px`

    button.appendChild(div);
    button.appendChild(pDay);
    button.appendChild(pPopup);
    chart.appendChild(button)

    if(data[index]["day"] === weekdays[d]){

      div.classList.add("focus")
      pPopup.classList.add("focus")
    }
  });

  // const button = document.createElement("button");

}
const chart = document.querySelector(".chart");

// const data = fetchAndReturn();
// populateChart(data,btns);

function addEventListener(){
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button,index, arr) => {
    button.addEventListener("mouseover", ()=>{
      button.lastElementChild.classList.toggle("hidden");
    })
    button.addEventListener("mouseout", ()=>{
      button.lastElementChild.classList.toggle("hidden");
    });
    
  })

}
async function init(){
  const data = await fetchAndReturn();
  populateChart(data, chart);
  addEventListener();
}

init();
// console.log(fetchAndReturn());
// const data = fetch("data.json")
//   .then(response => response.json())
//   .then(data => data).catch(()=>"error");


//format of buttons
/* <button aria-label="Monday's spending was ">
  <div class="bar"></div>
  <p>mon</p>
  <p class="popup">$129</p>
</button> */

