!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=13)}({13:function(e,t){class r{constructor(e){this.el=e,this.chars="!<>-_\\/[]{}—=+*^?#________",this.update=this.update.bind(this)}setText(e){const t=this.el.innerText,r=Math.max(t.length,e.length),n=new Promise(e=>this.resolve=e);this.queue=[];for(let n=0;n<r;n++){const r=t[n]||"",o=e[n]||"",i=Math.floor(40*Math.random()),u=i+Math.floor(15*Math.random());this.queue.push({from:r,to:o,start:i,end:u})}return cancelAnimationFrame(this.frameRequest),this.frame=0,this.update(),n}update(){let e="",t=0;for(let r=0,n=this.queue.length;r<n;r++){let{from:n,to:o,start:i,end:u,char:s}=this.queue[r];this.frame>=u?(t++,e+=o):this.frame>=i?((!s||Math.random()<.28)&&(s=this.randomChar(),this.queue[r].char=s),e+=`<span class="dud">${s}</span>`):e+=n}this.el.innerHTML=e,t===this.queue.length?this.resolve():(this.frameRequest=requestAnimationFrame(this.update),this.frame++)}randomChar(){return this.chars[Math.floor(Math.random()*this.chars.length)]}}const n=["TEDxNTUA","Enigma","April 06, 2019","Hellenic Cosmos","Peiraios 254, Tavros"];var o=document.querySelector(".textTed"),i=document.querySelector(".textEnigma"),u=document.querySelector(".textDate"),s=document.querySelector(".textVenue"),a=document.querySelector(".textAddress"),c=new r(o),l=new r(i),m=new r(u),h=new r(s),f=new r(a);time=900,setTimeout(function(){c.setText(n[0])},time),time+=800,setTimeout(function(){l.setText(n[1])},time),time+=900,setTimeout(function(){m.setText(n[2])},time),time+=900,setTimeout(function(){h.setText(n[3])},time),time+=900,setTimeout(function(){f.setText(n[4])},time),next()}});