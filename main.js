async function pageLoad(page,id){
  const url = 'pages/' + page + '?v=' + new Date().getTime();
  await fetch(url)
  .then(res => res.text())
  .then(html =>{
    document.querySelector(".main-content").innerHTML = html;
    document.getElementById(`nav-${id}`).classList.add("nav-active");
    document.querySelector("title").innerText = page.charAt(0).toUpperCase() + page.slice(1).replace(".html",'');
    for(let i = 1; i < 6; i++){
      if(i != id){
        document.getElementById(`nav-${i}`).classList.remove("nav-active")
      }
    }
    saveToLocalStorage("last_page",page);
    saveToLocalStorage("pID",id);
    return "Finished"
  })
  .catch((err)=>{
    return err
  })
}
function switchPage(page,id){
  pageLoad(page,id).then(()=>{
    loadExtra();
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
//It request the html & appends it to where it needs to go 
async function loadCompts(compt_location,html_location){
  const url = "components/"+compt_location+".html" + '?v=' + new Date().getTime();
  return fetch(url)
  .then((res => res.text()))
  .then(compt => {
    document.querySelector("."+html_location).innerHTML = compt;
    return "complete";
  })
  .catch((error) => {
    return error;
  })
}
function loadExtra(){
    if(getFromLocalStorage("pID") == 2){
      cardContainerFactory(education,"edu-cont");
      cardContainerFactory(animes,"anime-cont");
    }
     if(getFromLocalStorage("pID") == 3){
      cardContainerFactory(projects,"proj-cont");
    }
}
async function onLoad(){
  await loadCompts("navbar","navbar").then((res)=>{
    if(getFromLocalStorage("last_page") === "any"){
      switchPage("home.html",1);
    }else{
      switchPage(getFromLocalStorage("last_page"),getFromLocalStorage("pID"))

    }
    /* Imports footer */
    loadCompts("footer","mfoo").then((res)=>{
      /*Creates Buttons for pages */
    ["Home", "About", "Project", "Contact","Docs"].map((item,id)=>{
      let btn = document.createElement("button");
      btn.innerText = item;
      btn.className = "btn-none p-1 background foo-btn";
      btn.onclick = () => {
        switchPage(item.toLocaleLowerCase()+".html",(id+1))
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
    })
  })
  .catch((err)=>{
    console.log(err)
  })
}
const socialsIcons = [{icon: "github", href:
  "https://github.com/SaffronSan"
},{icon:"linkedin", href: ""}, {icon: "instagram",href:""}];

const education = {
  title : "Educations & Major",
  loction: "edu-cont",
  type: "banner",
  content: [
    {
      title: "Phillip O. Berry Academy of Technology",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/17/Pob_cardinal.gif",
      buttonTxt: "Learn more",
      des : "dhflsdjfljfdsjjlfj aj sdjak dajs djalkdj jlkdjaklsd jal dklsaj djald lkajdpkje123i -03012 dsd"
    },
    {
      title: "Unversity of North Carolina at Charlotte",
      src: "https://crva.imgix.net/UNCC-campus.jpeg?auto=compress%2Cformat&fit=crop&fm=webp&ixlib=php-3.1.0&q=80&v=1599589356&w=1000",
      buttonTxt: "Learn more",
      des : "dhflsdjfljfdsjjlfj aj sdjak dajs djalkdj jlkdjaklsd jal dklsaj djald lkajdpkje123i -03012 dsd"
    },
    {
      title: "Computer Science",
      src: "img/cs-wordArt.png",
      buttonTxt: "Learn more",
      des : "dhflsdjfljfdsjjlfj aj sdjak dajs djalkdj jlkdjaklsd jal dklsaj djald lkajdpkje123i -03012 dsd"
    }
  ]
}, animes = {
  title : "Favorite Anime",
  loction: "anime-cont",
  type: "banner",
  content: [
    {
      title: "One piece",
      src: "img/Anime/one_piece.jpg",
      buttonTxt: "Learn more",
      des : "dhflsdjfljfdsjjlfj aj sdjak dajs djalkdj jlkdjaklsd jal dklsaj djald lkajdpkje123i -03012 dsd"
    },
      {
      title: "Naruto",
      src: "img/Anime/Naruto.jpeg",
      buttonTxt: "Learn more",
      des : "dhflsdjfljfdsjjlfj aj sdjak dajs djalkdj jlkdjaklsd jal dklsaj djald lkajdpkje123i -03012 dsd"
    },
      {
      title: "Death Note",
      src: "img/Anime/Death_Note.jpg",
      buttonTxt: "Learn more",
      des : "dhflsdjfljfdsjjlfj aj sdjak dajs djalkdj jlkdjaklsd jal dklsaj djald lkajdpkje123i -03012 dsd"
    },
      {
      title: "Berserk",
      src: "img/Anime/Berserk.jpeg",
      buttonTxt: "Learn more",
      des : "dhflsdjfljfdsjjlfj aj sdjak dajs djalkdj jlkdjaklsd jal dklsaj djald lkajdpkje123i -03012 dsd"
    }]
}, projects = {
  title : "Projects Showcase",
  location : "proj-cont",
  type : "flat-grid",
  content: [
    {
      title : "First project",
      src : "img/Projects/msfw-proj.png",
      buttonTxt: "Visit Site",
      des: "First website I've ever made."
    },
    {
      title : "Tele Search",
      src : "img/Projects/tele-proj.png",
      buttonTxt: "Visit Site",
      des: "A website where you can find basic info one tv shows."
    },
    {
      title : "Road to Hire - High School project",
      src : "img/Projects/r2h-proj.png",
      buttonTxt: "Visit Site",
      des: "A website created for road to hire high school project."
    },
    {
      title : "V-Tac",
      src : "img/Projects/vTac-proj.png",
      buttonTxt: "Visit Site",
      des: "A website using Vue.js, lets you play tic-tac-toe; modes: 1v1 & bots."
    }
]
}
//Creates Many Cards & a Title 
function cardContainerFactory(data,location){
  let card_container = document.createElement("section"), card_container_title = document.createElement("h3");
  card_container.className = data.type;
  card_container.id = "inside-"+location;
  card_container_title.className ="background shadow-md p-2 container-border font-title text-sm primary w-fit"
  card_container_title.innerText = data.title;
  data.content.map((item => {
    card_container.append(cardInfo(item,data.type));
  }))
  document.querySelector(`#${location}`).append(card_container_title);
  document.querySelector(`#${location}`).append(card_container);
}
// Create A Single Card
function cardInfo(info,type){
  let md = document.createElement("div"),
      h = document.createElement("h3"),
      img = document.createElement("img"),
      btn = document.createElement("button"),
      des = document.createElement("p");
  md.className = "card container-border background shadow-md space-y-1";
  h.className = "text-title font-title accent";
  h.innerText = info.title;
  img.src = info.src;
  img.className = "container-border background shadow-md";
  btn.className = "btn-pill border-full p-1 font-body shadow-md";
  btn.innerText = info.buttonTxt;
  des.innerText = info.des;
  des.className = "font-body "
  md.append(h);
  if(type.includes("flat")) {md.append(btn);}
  md.append(img);
  if(type.includes("flat")) {md.append(des);}
 return md;
}








onLoad();
