function switchPage(page,id){
  fetch(page)
  .then(res => res.text())
  .then(html =>{
    document.querySelector(".main-content").innerHTML = html;
    console.log(document.getElementById(`btn-${id}`));
    document.getElementById(`btn-${id}`).classList.add("nav-active");
    for(let i = 0; i < 2; i++){
      if(i != id){
        document.getElementById(`btn-${i}`).classList.remove("nav-active")
      }
    }
  })
}
switchPage('home.html');