(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[72],{72:(t,s,i)=>{"use strict";i.r(s),i.d(s,{Edge:()=>h});var o=i(314);function h(t,s,i,h,r){this.weight=t,this.from=s,this.to=i;let e=o.s7.r,l=o.s7.b,n=o.s7.g;this.display=function(){if(null!=this.from&&null!=this.to){var t=r.atan2(this.from.y-this.to.y,this.from.x-this.to.x);r.push(),r.stroke(e,n,l),r.strokeWeight(this.weight),r.line(this.from.x,this.from.y,this.to.x+h*r.cos(t),this.to.y+h*r.sin(t)),r.pop(),r.push(),r.translate(this.to.x,this.to.y),r.rotate(t-r.HALF_PI),r.stroke(e,n,l),r.fill(r.color(255,255,255)),r.triangle(0,h/2,h/4,h,-h/4,h),r.pop()}},this.changeColor=function(t){e=t.r,n=t.g,l=t.b}}},314:(t,s,i)=>{"use strict";i.d(s,{hM:()=>o,Ej:()=>h,s7:()=>r});const o={r:254,g:160,b:144},h={r:89,g:199,b:235},r={r:154,g:160,b:167}}}]);