  //These change the output result
  const seconds = 8;  //Total duration of the animation
  const transition = "linear"; // Tranisiton animation of each path (not total)
  const max_lines = 1000;
  const colors = [{'b': '#323232', 'f': '#c1e3d2'}];
  //const scale = 1/1.2 // The bigger the denominator, the bigger the svg
  const perScreen = 2; // pipe svgs per screen
  var num = 7; // number of svgs to render

  var Color = colors[0];
  var background_color = window.getComputedStyle(document.body)["background-color"];
  var _ = require('underscore');
  var svgs = document.querySelectorAll('svg');
  var enigma_height = document.querySelector('.enigma-animation-container').clientHeight
  var footer_height = document.querySelector('#footer').clientHeight
  var whole_doc = $(document).height();
  var screen_height = $(window).height();
  pipestotal = whole_doc - enigma_height - footer_height;
  num = Math.floor((pipestotal/screen_height)*perScreen) //compute num (comment out if num is set by hand)
  var some_big_date = new Date(2025, 0, 1);
  var timescalled = [];
  var startTime = [];
  for(y=0; y<2*num; y++){
    timescalled.push(0);
  }
  for(y=0; y<2*num; y++){
    startTime.push(some_big_date);
  }

  for(i=0; i<svgs.length; i++){
    var svg = svgs[i];
    var w = svg.parentElement.clientWidth;
    var h = screen_height/perScreen;
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    //svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.marginLeft = 0;
  }
  var footer_left = svgs[0].parentElement.clientWidth;
  var ourfooter = document.querySelector('#footer');
  ourfooter.style["margin-left"] = footer_left + "px";

function animate_paths() {
          var paths = document.querySelectorAll('path');
          var TotalLengths = new Array(max_lines).fill(0); // TotalLength of line
          var allLines = 0;
          var groups = new Array(max_lines).fill(0); // keeps number of groups[line] = # of groups in line
          for (i = 0; i < paths.length; ++i) {
            if(paths[i].style['fill'] !="rgb(255, 255, 255)"){
              gr = paths[i].getAttribute('g')*1;
              li = paths[i].getAttribute('l')*1;
              if(gr >= groups[li]){
                groups[li] = gr;
              }
              if(li > allLines ){
                allLines  = li;
              }
              paths[i].setAttribute('fill-opacity', "0");
              var len = paths[i].getTotalLength();
              paths[i].style.strokeDashoffset = len;
              paths[i].style.strokeDasharray = len + ',' + len;
              if(paths[i].style['stroke'] === 'rgb(193, 227, 210)'){
                paths[i].style['stroke'] = Color.b;
              }
              else{
                paths[i].style['stroke'] = Color.f;
              }
              if(paths[i].parentElement.parentElement.id === 'svgpipes1'){
                TotalLengths[li] += len;
              }
            }
            else{
              paths[i].style['fill'] = background_color;
            }
          }
          // Set transition delay for each path
          var time_to_excecute = 0;
          for(line=0; line <=allLines ; line++ ){
            var ttw = 0;
            for (i = 0; i <=groups[line]; ++i) {
              path_group = document.querySelectorAll(`[g="${i}"][l="${line}"]`);
              for (j = 0; j < path_group.length; ++j) {
                mylength = path_group[j].getTotalLength();
                time_to_excecute = (mylength/TotalLengths[line]);
                path_group[j].style['transition-delay'] = ttw*seconds + "s";
              }
              ttw += time_to_excecute;
            }
          }
          svgs = document.querySelectorAll('svg');
          $(window).on('resize scroll', function() {
            for(i=1; i<=svgs.length; i++){
              if(isInViewport(document.querySelector('#svgpipes' + i))){
                chooseAnimation(i, TotalLengths);
              }
            }
          });
    }

    function isInViewport (element) {
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    function chooseAnimation(i, TotalLengths){

      if(i==1){
        animate(TotalLengths, i);
      }
      else if(i>1){
        if(((new Date() - startTime[i-1])/1000 > seconds)){
          animate(TotalLengths, i);
        }
      }
    }
    function animate(TotalLengths, i) {
      timescalled[i]++;
      if(timescalled[i] == 1){
        if(startTime[i].getTime() === some_big_date.getTime()){
          startTime[i] = new Date();
        }
        var mysvg = document.querySelector('#svgpipes' + i);
        var paths = mysvg.querySelectorAll('path');
        for (i = 0; i < paths.length; ++i) {
            var length = paths[i].getTotalLength();
            // Set up the starting positions
            paths[i].style.strokeDasharray = length + ' ' + length;
            paths[i].style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            paths[i].getBoundingClientRect();
            // Define our transition
            var li = paths[i].getAttribute('l');
            var total = TotalLengths[li]; // Get TotalLength of current paths, line
            time_to_excecute = (length/total)*seconds; // paths animation duration
            paths[i].style['transition-property'] = 'stroke-dashoffset';
            paths[i].style['transition-duration'] = time_to_excecute + "s";
            paths[i].style['transition-timing-function'] = transition;
            // Go!
            paths[i].style.strokeDashoffset = '0';
        }
      }
    }

    function make_svgs(number, callback){
      for(w=2; w<=number; w++){
        var current = w;
        var currentString = "";
        for(j=0; j<current; j++){
          currentString += "--0";
        }
        var oldsvg = document.querySelector('#svgpipes1');
        var newsvg = oldsvg.cloneNode(true);
        var parent = document.querySelector('#svgpipes1').parentElement;
        newsvg.setAttribute('id', 'svgpipes' + current);
        var newpaths = newsvg.querySelectorAll('path');
        for (i = 0; i < newpaths.length; ++i) {
          newpaths[i].setAttribute('id', newpaths[i].getAttribute('id') + currentString);
        }
        parent.appendChild(newsvg);
      }
      if(w==number+1){
        callback()
      }
    }

make_svgs(num, function(){
  animate_paths();
});
