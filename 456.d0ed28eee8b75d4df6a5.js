(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[456,875,441,964,129],{875:(e,t,r)=>{"use strict";r.r(t),r.d(t,{binarySearchSolver:()=>l,binarySearch:()=>a});var n=r(441),o=r(964),i=r(129);function*l(e,t,r,l){"function"!=typeof r&&(r=e=>e),void 0===l&&(l=0);const a=e[0]instanceof n.Cell,s=(0,i.waitNFrame)(l);let c=0,u=e.length;for(;c<u;){let n=c+Math.floor((u-c)/2);if(a){for(let t=c;t<u;t++)e[t].changeColor(o.BLUE);for(e[n].changeColor(o.RED);!1===s.next().value;)yield}if(r(e[n])<t){if(a)for(let t=c;t<=n;t++)e[t].changeColor(o.GREY);c=n+1}else{if(!(r(e[n])>t)){if(a){for(let t=c;t<u;t++)e[t].changeColor(o.GREY);e[n].changeColor(o.RED)}return n}if(a)for(let t=n;t<u;t++)e[t].changeColor(o.GREY);u=n}}return void 0===e[c]?-(c+1):r(e[c])===t?(a&&e[c].changeColor(o.RED),c):-(c+1)}function a(e,t){let r;for(r=l(e,t).next();!r.done;);return r.value}},456:(e,t,r)=>{"use strict";r.r(t),r.d(t,{sketch:()=>l,explainText:()=>a});var n=r(441),o=r(964),i=r(875);function l(e){let t,r,l,a=!1;const s=[];function c(n){n.keyCode===e.ENTER&&(r=parseInt(t.value()),t.value(""),Number.isNaN(r)||(l=(0,i.binarySearchSolver)(s,r,u,30),a=!0,t.attribute("disabled","")))}function u(e){return e.value}e.setup=function(){e.createCanvas(550,550),t=e.createInput(""),t.attribute("placeholder","Enter number"),t.position(10,40),t.elt.addEventListener("keypress",c)},e.draw=function(){if(e.background(255,255,255),e.text("Enter a number to search. If the number is found in the list, it will be highlighted. \nElse, it will be inserted at the appropriate place.",10,10),a&&void 0!==l){const e=l.next();if(e.done&&(a=!1,t.removeAttribute("disabled"),e.value<0)){const t=-(e.value+1);let i=new n.Cell(0,0,r);i.changeColor(o.RED),s.splice(t,0,i)}}for(const[t,r]of s.entries()){let n=Math.floor(t/10),o=t%10;r.display(e,40,30,10+50*o,80+40*n)}}}const a="<p><strong>Binary search</strong></p>"},441:(e,t,r)=>{"use strict";r.r(t),r.d(t,{Cell:()=>o});var n=r(964);function o(e,t,r){this.value=r,this.x=e,this.y=t,this.prev;let o=n.GREY.r,i=n.GREY.g,l=n.GREY.b;this.display=function(e,t,r,n,a){e.push(),e.fill(o,i,l),e.stroke(o,i,l),e.rect(n,a,t,r),e.fill(0,0,0),e.text(this.value,n+t/2,a+r/2),e.pop()},this.changeColor=function(e){o=e.r,i=e.g,l=e.b}}},964:(e,t,r)=>{"use strict";r.r(t),r.d(t,{RED:()=>n,BLUE:()=>o,GREY:()=>i});const n={r:254,g:144,b:160},o={r:89,g:235,b:199},i={r:154,g:167,b:160}},129:(e,t,r)=>{"use strict";function*n(e){for(;;){for(let t=0;t<e-1;t++)yield!1;yield!0}}r.r(t),r.d(t,{waitNFrame:()=>n})}}]);