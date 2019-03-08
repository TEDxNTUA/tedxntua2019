  //These change the output result
  const seconds = 10;  //Total duration of the animation
  const transition = "linear"; // Tranisiton animation of each path (not total)
  const max_lines = 50;
  const widthPercentage = 0.2 // Width percentage on screen
  const heightPercentage = 0.8 // Height percentage on screen
  const colors = [{'b': '#c1e3d2', 'f': '#323232'}];
  //const scale = 1/1.2 // The bigger the denominator, the bigger the svg
  const actual_margin_left = 0.07; // Affects first item of viebox
  // endz
  startTime = -100;
  var columns = document.querySelectorAll(".col-lg-6");
  median = 0;
  minimum = columns[0].clientHeight;
  maximum = columns[0].clientHeight;
  for(i=0; i<columns.length; i++){
    median += columns[i].clientHeight;
    if(columns[i].clientHeight < minimum){
      minimum = columns[i];
    }
    if(columns[i].clientHeight > maximum){
      maximum = columns[i].clientHeight;
    }
  }
  median = median/columns.length;
  var randColor = colors[Math.floor(Math.random() * colors.length)];
  var background_color = window.getComputedStyle(document.body)["background-color"];
  var _ = require('underscore');
  var svgs = document.querySelectorAll('svg');
  for(i=0; i<svgs.length; i++){
    var svg = svgs[i];
    var h = maximum;
    var w = svg.parentElement.clientWidth;
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    //svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.marginLeft = 0;
  }
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
                paths[i].style['stroke'] = randColor.b;
              }
              else{
                paths[i].style['stroke'] = randColor.f;
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
        animate1(TotalLengths);

      }
      else if(i==2){
        var endTime = new Date()
        if(((endTime - startTime)/1000 > seconds)){
          animate2(TotalLengths);
        }
      }
      else if(i==3){
        console.log('ee')
        var endTime1 = new Date()
        if(((endTime1 - startTime)/1000 > 2*seconds)){
          animate3(TotalLengths);
        }
      }
    }
    function animate1(TotalLengths) {
      animate1 = function(){};
      startTime = new Date()
      var mysvg = document.querySelector('#svgpipes1');
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
      return 0;
    }

    function animate2(TotalLengths) {
      animate2 = function(){};
      var mysvg = document.querySelector('#svgpipes2');
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
    function animate3(TotalLengths) {
      animate3 = function(){};
      var mysvg = document.querySelector('#svgpipes3');
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

animate_paths();
