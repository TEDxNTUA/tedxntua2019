!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}({12:function(e,t){class r{constructor(e){this.el=e;this.chars=["_","+","-","/","^","*","&","_"],this.update=this.update.bind(this)}setText(e){const t=this.el.innerText,r=Math.max(t.length,e.length),n=new Promise(e=>this.resolve=e);this.queue=[];for(let n=0;n<r;n++){const r=t[n]||"",o=e[n]||"",u=Math.floor(40*Math.random()),i=u+Math.floor(178*Math.random());this.queue.push({from:r,to:o,start:u,end:i})}return cancelAnimationFrame(this.frameRequest),this.frame=0,this.update(),n}update(){let e="",t=0;for(let r=0,n=this.queue.length;r<n;r++){let{from:n,to:o,start:u,end:i,char:s}=this.queue[r];this.frame>=i?(t++,e+=o):this.frame>=u?((!s||Math.random()<.28)&&(s=this.randomChar(),this.queue[r].char=s),e+=`<span class="dud">${s}</span>`):e+=n}this.el.innerHTML=e,t===this.queue.length?this.resolve():(this.frameRequest=requestAnimationFrame(this.update),this.frame++)}randomChar(){return this.chars[Math.floor(Math.random()*this.chars.length)]}}const n=["TEDxNTUA","Enigma","April 06, 2019","Hellenic Cosmos","Peiraios 254, Tavros"];var o=document.querySelector(".textTed"),u=document.querySelector(".textEnigma"),i=(document.querySelector(".textDate"),document.querySelector(".textVenue"),document.querySelector(".textAddress"),new r(o)),s=new r(u);setTimeout(function(){s.setText(n[1])},0),setTimeout(function(){i.setText(n[0])},0)}});