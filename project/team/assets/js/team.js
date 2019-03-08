var mouse_monitor = function(e, elem) {
   let x = e.clientX/innerWidth;
   let y = e.clientY/innerHeight;
   let move_x = (x>0.5) ? '-30px' : '30px';
   let move_y = (y>0.5) ? '-20px' : '20px';
   elem.style.setProperty("--translate-x", move_x);
   elem.style.setProperty("--translate-y", move_y);
}



let elements =  document.getElementsByClassName("card")
for (let elem of elements){
  elem.addEventListener("mousemove", function(e){
    mouse_monitor(e, elem)
  })
}


let img_el =  document.getElementsByClassName("cover-img")
for (let elem of img_el){
  elem.style.backgroundImage = "url('/media/" + elem.id + "')"
}


let img_el2 =  document.getElementsByClassName("cover-img2")
for (let elem of img_el2){
    elem.style.backgroundImage = "url('/media/" + elem.id + "')"
}
