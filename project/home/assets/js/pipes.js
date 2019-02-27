  //These change the output result
  const seconds = 5;  //Total duration of the animation
  const transition = "ease-in-out"; // Tranisiton animation of each path (not total)
  const max_lines = 50;
  const widthPercentage = 0.2 // Width percentage on screen
  const heightPercentage = 0.8 // Height percentage on screen
  //const scale = 1/1.2 // The bigger the denominator, the bigger the svg
  const actual_margin_left = 12; // Affects first item of viebox
  // end
  var background_color = window.getComputedStyle(document.body)["background-color"];
  var svg = document.querySelector('#svgpipes');
  var w = screen.width;
  var h = screen.height;
  svg.setAttribute('width', widthPercentage*w);
  svg.setAttribute('height', heightPercentage*h);
  svg.setAttribute("transform", "scale(1.0)");
  vbox = svg.getAttribute('viewBox').trim().split(" ");
  vbox[0] = actual_margin_left;
  newbox = vbox.join(" ");
  svg.setAttribute('viewBox', newbox);
  var headertop = document.getElementById('header').clientHeight;
  svg.style.marginLeft = 0;
  svg.style.marginTop = headertop;
  //Listen for screen changes
  window.addEventListener('resize', function(event){
    headertop = document.getElementById('header').clientHeight;
    var w = screen.width;
    var h = screen.height;
    console.log(w);
    svg.setAttribute('width', widthPercentage*w);
    svg.setAttribute('height', heightPercentage*h);
    svg.setAttribute("transform", "scale(1.0)");
    svg.style.marginLeft = 0;
    svg.style.marginTop = document.getElementById('header').clientHeight;
    vbox = svg.getAttribute('viewBox').trim().split(" ");
    vbox[0] = actual_margin_left;
    newbox = vbox.join(" ");
    svg.setAttribute('viewBox', newbox);
  });
function animate_paths() {
          var paths = document.querySelectorAll('path');
          var TotalLengths = new Array(max_lines).fill(0); // TotalLength of line
          var allLines = 0;
          var groups = new Array(max_lines).fill(0); // keeps number of groups[line] = # of groups in line
          for (i = 0; i < paths.length; ++i) {
            if(paths[i].style['fill'] !="rgb(255, 255, 255)"){
              gr = paths[i].getAttribute('g')*1;
              li = paths[i].getAttribute('l');
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
              TotalLengths[li] += len;
            }
            else{
              paths[i].style['fill'] = background_color;
            }
          }
          // Set transition delay for each path
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
          /*
          window.onscroll =  _.debounce(function() {
              animate(TotalLengths);
          }, 250);
          */
          animate(TotalLengths);
    }

    function animate(TotalLengths) {
      var paths = document.querySelectorAll('path');
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
