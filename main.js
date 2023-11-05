//fetch("https://m7s-trainingsite.000webhostapp.com/movies/").then(
  //  (result)=>{
//let allrepos = result.json();
//console.log(allrepos)});
let header = document.querySelector(`header`)

window.addEventListener(`scroll`,()=>{
  header.classList.toggle(`shadow`, window.scrollY > 0);
});
let menu = document.querySelector(`#menu-icon`);
let navbar = document.querySelector(`.navbar`)

menu.onclick =() =>{
menu.classList.toggle(`bx-x`);
navbar. classList.toggle(`active`);
}

var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });




  var swiper = new Swiper(".coming-contanier", {
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
breakpoints:{
  0: {
       slidesPerView: 2,    
  },
  568: {
    slidesPerView: 3,    
},
768: {
  slidesPerView: 4,    
},
968: {
  slidesPerView: 5,    
},

}
  });
  

  