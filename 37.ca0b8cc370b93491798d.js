(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[37,72,294,701,231,338],{72:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Edge:()=>o});var s=i(314);function o(t,e,i,o,n,r){this.weight=t,this.from=e,this.to=i;let h=s.s7.r,d=s.s7.b,a=s.s7.g;this.display=function(){null!=this.from&&null!=this.to&&(r?this.drawDirectedEdge():this.drawUndirectedEdge())},this.drawUndirectedEdge=function(){n.push(),n.stroke(h,a,d),n.strokeWeight(this.weight),n.line(this.from.x,this.from.y,this.to.x,this.to.y),n.pop()},this.drawDirectedEdge=function(){var t=n.atan2(this.from.y-this.to.y,this.from.x-this.to.x);n.push(),n.stroke(h,a,d),n.strokeWeight(this.weight),n.line(this.from.x,this.from.y,this.to.x+o*n.cos(t),this.to.y+o*n.sin(t)),n.pop(),n.push(),n.translate(this.to.x,this.to.y),n.rotate(t-n.HALF_PI),n.stroke(h,a,d),n.fill(n.color(255,255,255)),n.triangle(0,o/2,o/4,o,-o/4,o),n.pop()},this.changeColor=function(t){h=t.r,a=t.g,d=t.b}}},294:(t,e,i)=>{"use strict";i.r(e),i.d(e,{drawVertices:()=>o,getClosestVertex:()=>n});var s=i(231);function o(t,e,i,o,n,r,h){const d=[];let a=t.TWO_PI/e,c=0;for(let l=0;l<e;l++){let e=n*t.cos(c)+i/2,u=n*t.sin(c)+o/2;d.push(new s.Vertex(l,e,u,r,t,h)),c+=a}return d}function n(t,e){for(const i of e)if(t.dist(t.mouseX,t.mouseY,i.x,i.y)<20)return i}},701:(t,e,i)=>{"use strict";i.r(e),i.d(e,{GrowingEdge:()=>o});var s=i(314);function o(t,e,i){this.weight=1,this.increaseWeight=function(){this.weight+=1/i.deltaTime,this.weight=this.weight%10},this.display=function(){i.push(),i.stroke(s.s7.r,s.s7.g,s.s7.b),i.strokeWeight(this.weight),i.line(t,e,i.mouseX,i.mouseY),i.pop()}}},231:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Vertex:()=>n});var s=i(314),o=i(72);function n(t,e,i,n,r,h){this.id=t,this.x=e,this.y=i,this.edges=[],this.value,this.displayValue=h;let d=s.s7.r,a=s.s7.b,c=s.s7.g,l=0,u=new Set;this.display=function(){r.push(),r.stroke(d,a,c,80),r.strokeWeight(l),r.fill(d,a,c),r.circle(this.x,this.y,n),r.fill(0,0,0),r.strokeWeight(0);let t=this.displayValue.length>0?" : "+this.displayValue:"";r.textAlign(r.CENTER),r.text(this.id+t,this.x,this.y+n),r.pop()},this.displayEdges=function(){for(const t of this.edges)t.display()},this.changeColor=function(t){d=t.r,c=t.g,a=t.b},this.getColor=function(){return{r:d,g:c,b:a}},this.changeStrokeWeight=function(t){l=t},this.addEdge=function(t,e){t.id==this.id||u.has(t.id)||(u.add(t.id),this.edges.push(new o.Edge(e,this,t,n,r,!0)))}}},338:(t,e,i)=>{"use strict";i.r(e),i.d(e,{dijkstraSolver:()=>r});var s=i(314);function o(t){let e={},i={},s=[],o=0;function n(i){let s=c(i);for(;void 0!==s&&t(e[i],e[s])<0;)h(i,s),s=c(i)}function r(i){let s=d(i),o=a(i);for(;void 0!==s;){let n=s;if(void 0!==o&&t(e[s],e[o])>0&&(n=o),t(e[i],e[n])<0)break;h(i,n),s=d(i),o=a(i)}}function h(t,e){var o=i[t],n=i[e];s[o]=e,s[n]=t,i[t]=n,i[e]=o}function d(t){var e=2*i[t]+1;return e<o&&e>=0?s[e]:void 0}function a(t){var e=2*i[t]+2;return e<o&&e>=0?s[e]:void 0}function c(t){var e,n=(e=i[t])%2==0?(e-2)/2:(e-1)/2;return n<o&&n>=0?s[n]:void 0}this.peek=function(){if(o<=0)throw new Error("Queue is empty");return e[s[0]]},this.poll=function(){if(o<=0)throw new Error("Queue is empty");let t=s[0],i=e[t];return this.remove(t),i},this.add=function(t,r){if(this.contains(t))throw new Error("Key already exists");e[t]=r,i[t]=o,s[o]=t,o++,n(t)},this.remove=function(t){if(!this.contains(t))throw new Error("Key does not exist");let d=s[o-1];h(t,d),delete e[t],i[t]=void 0,s[o-1]=void 0,o--,n(d),r(d)},this.update=function(t,i){if(!this.contains(t))throw new Error("Key does not exist");e[t]=i,n(t),r(t)},this.contains=function(t){return void 0!==i[t]},this.get=function(t){return e[t]},this.size=function(){return o}}var n=i(982);function*r(t,e){const i=new Array(e),r=new Array(e),h=new Array(e);let d=(0,n.f)(50);const a=new o(((t,e)=>t[0]-e[0]));for(t.changeStrokeWeight(5),a.add(t.id,[0,t]),i[t.id]=0,t.displayValue="0";a.size()>0;){let[t,e]=a.poll();if(!h[e.id]){for(h[e.id]=!0,e.changeColor(s.hM);!1===d.next().value;)yield;for(const o of e.edges){let e=t+o.weight,n=o.to;if(!h[n.id]){for(o.changeColor(s.hM),n.changeColor(s.Ej),(void 0===i[n.id]||e<i[n.id])&&(i[n.id]=e,n.displayValue=e.toFixed(2),a.contains(n.id)?a.update(n.id,[e,n]):a.add(n.id,[e,n]),r[n.id]=o);!1===d.next().value;)yield;o.changeColor(s.s7)}}e.changeColor(s.Ej)}}for(let t of r)void 0!==t&&t.changeColor(s.Ej)}},37:(t,e,i)=>{"use strict";i.r(e),i.d(e,{sketch:()=>h,explainText:()=>d});var s=i(314),o=i(294),n=i(701),r=i(338);function h(t){const e=30;let i,h,d,a,c,l=[],u=0;t.setup=function(){t.createCanvas(550,550),i=t.createButton(""),i.position(10,40),i.addClass("action-button"),l=(0,o.drawVertices)(t,20,550,550,200,e,"Inf")},t.draw=function(){t.background(255,255,255),function(){switch(u){case 0:t.text("Click on nodes to add link. Keep mouse pressed to increase link weight.\nOnce the graph is done, click on the button to find shortest distance",10,10),i.html("Find shortest distance"),i.show(),i.mousePressed((function(){u=1}));break;case 1:t.text("Choose a start node to begin",10,10),i.hide();break;case 2:t.text("Finding shortest distance from node "+h.id,10,10);break;case 3:t.text("Shortest distance from node "+h.id+" found",10,10),i.show(),i.html("Restart"),i.mousePressed((function(){l=[],h=void 0,d=void 0,u=0,l=(0,o.drawVertices)(t,20,550,550,200,e,"Inf")}))}}(),t.push(),t.strokeWeight(0),t.fill(s.s7.r,s.s7.b,s.s7.g),t.circle(e,520,e),t.fill(0,0,0),t.textAlign(t.LEFT),t.text("ID : distance",60,520),t.fill(s.hM.r,s.hM.b,s.hM.g),t.circle(e,490,e),t.text("Visiting",60,490),t.fill(s.Ej.r,s.Ej.b,s.Ej.g),t.circle(e,460,e),t.text("Reachable",60,460),t.pop(),0===u?void 0!==a&&(t.mouseIsPressed&&a.increaseWeight(),a.display()):2===u&&d.next().done&&(u=3);for(const t of l)t.displayEdges();for(const t of l)t.display()},t.mouseClicked=function(){1==u&&(h=(0,o.getClosestVertex)(t,l),void 0!==h&&(d=(0,r.dijkstraSolver)(h,20),u=2))},t.mouseReleased=function(){if(u>0)return;const e=(0,o.getClosestVertex)(t,l);if(void 0!==e)if(void 0===c)c=e,a=new n.GrowingEdge(c.x,c.y,t);else{let t=Math.round(1e3*a.weight)/1e3;c.addEdge(e,t),c=void 0,a=void 0}}}const d="<p><strong>Dijkstra's algorithm</strong> finds the shortest distance from one node to all other nodes in graphs with non negative edges. It starts with a node, updates the distance to all its neighbors if the current distance to the neighbor is smaller than previously calculated distance. The current distance from a node to it's neighbor is the sum of the distance to the node and the weight of the edge leading to the neighbor.</p><p>Once all neighbors of a node are visited, the algorithm continues the same procedure with the node that is currently reachable with the shortest distance. Nodes that are already visited will not be revisited. Priority queue (binary heap) can be used to keep track of the reachable nodes and their distances. Head of the queue will have the current reachable node with the shortest distance.</p>"},314:(t,e,i)=>{"use strict";i.d(e,{hM:()=>s,Ej:()=>o,s7:()=>n});const s={r:254,g:160,b:144},o={r:89,g:199,b:235},n={r:154,g:160,b:167}},982:(t,e,i)=>{"use strict";function*s(t){for(;;){for(let e=0;e<t-1;e++)yield!1;yield!0}}i.d(e,{f:()=>s})}}]);