(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[345,72,294,701,231,455],{72:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Edge:()=>o});var s=i(314);function o(t,e,i,o,n,r){this.weight=t,this.from=e,this.to=i;let l=s.s7.r,h=s.s7.b,d=s.s7.g;this.display=function(){null!=this.from&&null!=this.to&&(r?this.drawDirectedEdge():this.drawUndirectedEdge())},this.drawUndirectedEdge=function(){n.push(),n.stroke(l,d,h),n.strokeWeight(this.weight),n.line(this.from.x,this.from.y,this.to.x,this.to.y),n.pop()},this.drawDirectedEdge=function(){var t=n.atan2(this.from.y-this.to.y,this.from.x-this.to.x);n.push(),n.stroke(l,d,h),n.strokeWeight(this.weight),n.line(this.from.x,this.from.y,this.to.x+o*n.cos(t),this.to.y+o*n.sin(t)),n.pop(),n.push(),n.translate(this.to.x,this.to.y),n.rotate(t-n.HALF_PI),n.stroke(l,d,h),n.fill(n.color(255,255,255)),n.triangle(0,o/2,o/4,o,-o/4,o),n.pop()},this.changeColor=function(t){l=t.r,d=t.g,h=t.b}}},294:(t,e,i)=>{"use strict";i.r(e),i.d(e,{drawVertices:()=>o,getClosestVertex:()=>n});var s=i(231);function o(t,e,i,o,n,r,l){const h=[];let d=t.TWO_PI/e,a=0;for(let u=0;u<e;u++){let e=n*t.cos(a)+i/2,c=n*t.sin(a)+o/2;h.push(new s.Vertex(u,e,c,r,t,l)),a+=d}return h}function n(t,e){for(const i of e)if(t.dist(t.mouseX,t.mouseY,i.x,i.y)<20)return i}},701:(t,e,i)=>{"use strict";i.r(e),i.d(e,{GrowingEdge:()=>o});var s=i(314);function o(t,e,i){this.weight=1,this.increaseWeight=function(){this.weight+=1/i.deltaTime,this.weight=this.weight%10},this.display=function(){i.push(),i.stroke(s.s7.r,s.s7.g,s.s7.b),i.strokeWeight(this.weight),i.line(t,e,i.mouseX,i.mouseY),i.pop()}}},231:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Vertex:()=>n});var s=i(314),o=i(72);function n(t,e,i,n,r,l){this.id=t,this.x=e,this.y=i,this.edges=[],this.value,this.displayValue=l;let h=s.s7.r,d=s.s7.b,a=s.s7.g,u=0,c=new Set;this.display=function(){r.push(),r.stroke(h,d,a,80),r.strokeWeight(u),r.fill(h,d,a),r.circle(this.x,this.y,n),r.fill(0,0,0),r.strokeWeight(0);let t=this.displayValue.length>0?" : "+this.displayValue:"";r.textAlign(r.CENTER),r.text(this.id+t,this.x,this.y+n),r.pop();for(const t of this.edges)t.display()},this.changeColor=function(t){h=t.r,a=t.g,d=t.b},this.getColor=function(){return{r:h,g:a,b:d}},this.changeStrokeWeight=function(t){u=t},this.addEdge=function(t,e){t.id==this.id||c.has(t.id)||(c.add(t.id),this.edges.push(new o.Edge(e,this,t,n,r,!0)))}}},455:(t,e,i)=>{"use strict";i.r(e),i.d(e,{hierholzer:()=>l});var s=i(314),o=i(155),n=i(982),r=i(72);function*l(t){let e=(0,n.f)(50),i=t.length,l=0,h=new Array(i);h.fill(0);let d=new Array(i);d.fill(0);for(const e of t){l+=e.edges.length,d[e.id]=e.edges.length;for(const t of e.edges)h[t.to.id]++}let a,u,c=!0,f=!0;for(let e=0;e<i;e++){let i=t[e],s=i.id;if(Math.abs(d[s]-h[s])>1){c=!1,f=!1;break}if(1===Math.abs(d[s]-h[s]))if(d[s]>h[s]){if(void 0!==a){c=!1;break}a=i,f=!1}else{if(void 0!==u){c=!1;break}u=i,f=!1}}if(!f&&!c)return!1;let g=a||t[0];const p=new o.S;for(p.addFirst(new r.Edge(0,null,g,0,0));void 0!==g&&d[g.id]>0;){g.changeColor(s.hM);let t=d[g.id];d[g.id]--;let i=g.edges[t-1];for(i.changeColor(s.hM),g=i.to,p.addFirst(i);!1===e.next().value;)yield!0;for(;0===d[g.id];){let t=p.poll(),i=t.to;for(t.changeColor(s.Ej),i.changeColor(s.Ej);!1===e.next().value;)yield!0;if(i.displayValue.length>0?i.displayValue+=","+l:i.displayValue=l.toString(),l--,!(p.size()>0)){g=void 0;break}g=p.peek().to}}}},345:(t,e,i)=>{"use strict";i.r(e),i.d(e,{sketch:()=>l,explainText:()=>h});var s=i(314),o=i(294),n=i(701),r=i(455);function l(t){let e,i,l,h,d=[],a=0,u=!1;t.setup=function(){t.createCanvas(550,550),l=t.createButton(""),l.position(10,40),d=(0,o.drawVertices)(t,20,550,550,200,30,"")},t.draw=function(){if(t.background(255,255,255),function(){switch(a){case 0:t.text("Click on nodes to add link.\nOnce the graph is done, click on the button to find Eularian path",10,10),l.html("Find Eularian path"),l.show(),l.mousePressed((function(){a=1,h=(0,r.hierholzer)(d)}));break;case 1:t.text("Finding Eularian path",10,10),l.hide();break;case 2:u?t.text("Eularian path found",10,10):t.text("Eularian path does not exist on graph",10,10),l.show(),l.html("Restart"),l.mousePressed((function(){d=[],h=void 0,a=0,d=(0,o.drawVertices)(t,20,550,550,200,30,"")}))}}(),t.push(),t.strokeWeight(0),t.fill(s.s7.r,s.s7.b,s.s7.g),t.circle(30,520,30),t.textAlign(t.LEFT),t.fill(0,0,0),t.text("ID : visit order",60,520),t.pop(),0==a)void 0!==e&&e.display();else if(1==a){let t=h.next();console.log(t),t.done?a=2:u=t.value}for(const t of d)t.display()},t.mouseReleased=function(){if(a>0)return;const s=(0,o.getClosestVertex)(t,d);void 0!==s&&(void 0===i?(i=s,e=new n.GrowingEdge(i.x,i.y,t)):(i.addEdge(s,1),i=void 0,e=void 0))}}const h=""},314:(t,e,i)=>{"use strict";i.d(e,{hM:()=>s,Ej:()=>o,s7:()=>n});const s={r:254,g:160,b:144},o={r:89,g:199,b:235},n={r:154,g:160,b:167}},155:(t,e,i)=>{"use strict";function s(){let t,e,i=0;this.addFirst=function(e){let s={value:e};s.next=t,t=s,i++},this.add=function(s){let o={value:s};null==t&&(t=o),null==e?e=o:(e.next=o,e=e.next),i++},this.peek=function(){return null!=t?t.value:void 0},this.poll=function(){const e=t;return t=t.next,i--,e.value},this.size=function(){return i}}i.d(e,{S:()=>s})},982:(t,e,i)=>{"use strict";function*s(t){for(;;){for(let e=0;e<t-1;e++)yield!1;yield!0}}i.d(e,{f:()=>s})}}]);