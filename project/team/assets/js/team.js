cards = $('.card')

for(let card of cards){
  var width = card.clientWidth;
  $(card).css("height", width);
}

var mouse_monitor = function(e, elem) {
   let x = e.clientX/innerWidth;
   let y = e.clientY/innerHeight;
   console.log(e.clientX)
   let somex = String(Math.floor(e.clientX/100))
   let somey = String(Math.floor(e.clientY/100))
   console.log(somex)
   let move_x = (x>0.5) ? '-' + somex + 'px' : somex + 'px';
   let move_y = (y>0.5) ? '-' + somey + 'px' : somey + 'px';
   elem.style.setProperty("--translate-x", move_x);
   elem.style.setProperty("--translate-y", move_y);
}



let elements =  document.getElementsByClassName("card")
for (let elem of elements){
  elem.addEventListener("mousemove", function(e){
    mouse_monitor(e, elem)
  })
}

$(window).resize(function() {
  cards = $('.card')

  for(let card of cards){
    var width = card.clientWidth;
    $(card).css("height", width);
  }
});
