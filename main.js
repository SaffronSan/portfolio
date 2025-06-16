//Updates the local storages & nav buttons
function switchPage(page,id){
  showPage(page);
  saveToLocalStorage("last_page",page);
  saveToLocalStorage("pID",id);
  document.getElementById(`nav-${id}`).classList.add("nav-active");
  for(let i = 1; i < 5; i++){
    if(i != id){
      document.getElementById(`nav-${i}`).classList.remove("nav-active")
    }
  }
}
//Switchs pages by hiding non-active page
function showPage(page){
  pages.map((item)=>{
    if(item.toLocaleLowerCase() === page){
      document.querySelector(`#${item.toLocaleLowerCase()}`).classList.remove("hide");
      activePage = page;
    }else{
      document.querySelector(`#${item.toLocaleLowerCase()}`).classList.add("hide");
    }
  })
}
function getFromLocalStorage(key) {
  // Check if local storage is supported by the browser
  if (typeof(Storage) !== "undefined") {
    // Get the value for the given key from local storage
    return localStorage.getItem(key);
  } else {
    console.log("Sorry, local storage is not supported by your browser.");
  }
}
function saveToLocalStorage(key, value) {
  // Check if local storage is supported by the browser
  if (typeof(Storage) !== "undefined") {
    // Set the value for the given key in local storage
    localStorage.setItem(key, value);
  } else {
    alert("Sorry, local storage is not supported by your browser.");
  }
}
function toggleTheme(){
  document.body.classList.toggle("dark-mode");
  if(document.body.classList.contains("dark-mode")){
    saveToLocalStorage("theme","dark");
  }else{
    saveToLocalStorage("theme","light")
  }
}
function onLoad(){
    if(getFromLocalStorage("last_page") === null){
      switchPage("home",1);
    }else{
      switchPage(getFromLocalStorage("last_page"),getFromLocalStorage("pID"))
    }
    if(getFromLocalStorage("theme") == undefined || getFromLocalStorage("theme") == "light"){
      saveToLocalStorage("theme","light")
    }else{
      toggleTheme();
    }
    if(getFromLocalStorage("cards-data") == undefined){
      fetch("data/cards-data.json")
      .then((res)=> res.json())
      .then((data) => {
        const content = data;
        saveToLocalStorage("cards-data",JSON.stringify(content));
        content.content.map((item) => cardContainerFactory(item,item.location));
      })
    }else{  
      JSON.parse(getFromLocalStorage("cards-data")).content.forEach((item)=>{
        cardContainerFactory(item,item.location)
      })
    }
    //cardContainerFactory(education,"edu-cont");
    //cardContainerFactory(animes,"anime-cont");
    //cardContainerFactory(projects,"proj-cont");
    /*Creates Buttons for pages */
    pages.map((item,id)=>{
      let btn = document.createElement("button");
      btn.innerText = item;
      btn.className = "btn-none p-1 background foo-btn";
      btn.onclick = () => {
        switchPage(item.toLocaleLowerCase(),(id+1))
      }
      document.querySelector(".foo-pages-container").append(btn);
    })
    /* Creates Social Media links with icons */
    socialsIcons.map((item) => {
      let a = document.createElement("a"), i = document.createElement("i");
      a.className = "bg-inherit";
      a.href = item.href;
      a.target = "blank";
      i.className = `fa-brands fa-${item.icon}`;
      a.append(i);
      document.querySelector(".social-container").append(a);
    })
    document.querySelector(".bars-btn").addEventListener("click",()=>{
      let element = document.querySelector(".links-cont-parent");
      if (element.style.display === 'none') {
        element.style.display = 'flex';
      } else {
        element.style.display = 'none';
      }
    });
    document.querySelectorAll(".setting-cont").forEach((item)=>{
      item.addEventListener("click",()=>{
        if(item.children[0].classList.contains("fa-moon")){
          item.children[0].classList.remove("fa-moon");
          item.children[0].classList.add("fa-sun");
        }else{
          item.children[0].classList.remove("fa-sun");
          item.children[0].classList.add("fa-moon");
        }
        toggleTheme();
      })
    })

document.querySelector
}
const socialsIcons = [{icon: "github", href:
  "https://github.com/SaffronSan"
},{icon:"linkedin", href: ""}, {icon: "instagram",href:""}];

//Creates Many Cards & a Title 
function cardContainerFactory(data,location){
  let card_container = document.createElement("section"), card_container_title = document.createElement("h3");
  card_container.className = data.type ;
  card_container_title.className ="background shadow-md container-border font-title  w-fit"
  card_container_title.innerText = data.title;
  data.content.map((item => {
    card_container.append(cardInfo(item,data.type));
  }))
  document.querySelector(`#${location}`).className = "card-cont space-y-1";
  document.querySelector(`#${location}`).append(card_container_title);
  document.querySelector(`#${location}`).append(card_container);
}
// Creates A Single Card
function cardInfo(info,type){
  let md = document.createElement("div"),
      h = document.createElement("h3"),
      img = document.createElement("img"),
      btn = document.createElement("a"),
      des = document.createElement("p");
  md.className = "card";
  h.className = "text-title-1 font-title";
  h.innerText = info.title;
  img.src = info.src;
  img.className = "container-border";
  btn.className = "btn-pill border-full p-1 font-body shadow-md my-1";
  btn.innerText = info.buttonTxt;
  btn.target = "blank";
  btn.href = info.link
  des.innerText = info.des;
  des.className = "font-body"
  md.append(img);
  if(type.includes("flat")) {md.append(btn);}
  md.append(h);
  if(type.includes("flat")) {md.append(des);}
 return md;
}
let activePage = "Home", pages = ["Home", "About", "Project", "Contact"];
onLoad();
