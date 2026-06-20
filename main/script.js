// Navbar Scroll

window.addEventListener("scroll",()=>{

const navbar =
document.querySelector(".custom-navbar");

if(window.scrollY > 50){

navbar.classList.add("navbar-scrolled");

}else{

navbar.classList.remove("navbar-scrolled");

}

});

// Dropdown

document.addEventListener("DOMContentLoaded",()=>{

const serviceBtn =
document.querySelector(".service-btn");

const dropdown =
document.querySelector(".service-dropdown");

if(!serviceBtn || !dropdown) return;

serviceBtn.addEventListener("click",(e)=>{

e.preventDefault();

dropdown.classList.toggle("show");

});

document.addEventListener("click",(e)=>{

if(
!serviceBtn.contains(e.target)
&&
!dropdown.contains(e.target)
){

dropdown.classList.remove("show");

}

});

});