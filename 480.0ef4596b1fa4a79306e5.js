(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[480,72,294,701,231,91],{72:(e,t,i)=>{"use strict";i.r(t),i.d(t,{Edge:()=>o});var s=i(314);function o(e,t,i,o,n,r){this.weight=e,this.from=t,this.to=i;let d=s.s7.r,l=s.s7.b,a=s.s7.g;this.display=function(){null!=this.from&&null!=this.to&&(r?this.drawDirectedEdge():this.drawUndirectedEdge())},this.drawUndirectedEdge=function(){n.push(),n.stroke(d,a,l),n.strokeWeight(this.weight),n.line(this.from.x,this.from.y,this.to.x,this.to.y),n.pop()},this.drawDirectedEdge=function(){var e=n.atan2(this.from.y-this.to.y,this.from.x-this.to.x);n.push(),n.stroke(d,a,l),n.strokeWeight(this.weight),n.line(this.from.x,this.from.y,this.to.x+o*n.cos(e),this.to.y+o*n.sin(e)),n.pop(),n.push(),n.translate(this.to.x,this.to.y),n.rotate(e-n.HALF_PI),n.stroke(d,a,l),n.fill(n.color(255,255,255)),n.triangle(0,o/2,o/4,o,-o/4,o),n.pop()},this.changeColor=function(e){d=e.r,a=e.g,l=e.b}}},294:(e,t,i)=>{"use strict";i.r(t),i.d(t,{drawVertices:()=>o,getClosestVertex:()=>n});var s=i(231);function o(e,t,i,o,n,r,d){const l=[];let a=e.TWO_PI/t,h=0;for(let c=0;c<t;c++){let t=n*e.cos(h)+i/2,u=n*e.sin(h)+o/2;l.push(new s.Vertex(c,t,u,r,e,d)),h+=a}return l}function n(e,t){for(const i of t)if(e.dist(e.mouseX,e.mouseY,i.x,i.y)<20)return i}},701:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GrowingEdge:()=>o});var s=i(314);function o(e,t,i){this.weight=1,this.increaseWeight=function(){this.weight+=1/i.deltaTime,this.weight=this.weight%10},this.display=function(){i.push(),i.stroke(s.s7.r,s.s7.g,s.s7.b),i.strokeWeight(this.weight),i.line(e,t,i.mouseX,i.mouseY),i.pop()}}},231:(e,t,i)=>{"use strict";i.r(t),i.d(t,{Vertex:()=>n});var s=i(314),o=i(72);function n(e,t,i,n,r,d){this.id=e,this.x=t,this.y=i,this.edges=[],this.value,this.displayValue=d;let l=s.s7.r,a=s.s7.b,h=s.s7.g,c=0,u=new Set;this.display=function(){r.push(),r.stroke(l,a,h,80),r.strokeWeight(c),r.fill(l,a,h),r.circle(this.x,this.y,n),r.fill(0,0,0),r.strokeWeight(0);let e=this.displayValue.length>0?" : "+this.displayValue:"";r.textAlign(r.CENTER),r.text(this.id+e,this.x,this.y+n),r.pop()},this.displayEdges=function(){for(const e of this.edges)e.display()},this.changeColor=function(e){l=e.r,h=e.g,a=e.b},this.getColor=function(){return{r:l,g:h,b:a}},this.changeStrokeWeight=function(e){c=e},this.addEdge=function(e,t){e.id==this.id||u.has(e.id)||(u.add(e.id),this.edges.push(new o.Edge(t,this,e,n,r,!0)))}}},480:(e,t,i)=>{"use strict";i.r(t),i.d(t,{sketch:()=>d,explainText:()=>l});var s=i(314),o=i(294),n=i(701),r=i(91);function d(e){let t,i,d,l,a=[],h=0;e.setup=function(){e.createCanvas(550,550),d=e.createButton(""),d.position(10,40),d.addClass("action-button"),a=(0,o.drawVertices)(e,20,550,550,200,30,"?")},e.draw=function(){e.background(255,255,255),function(){switch(h){case 0:e.text("Click on nodes to add link.\nOnce the graph is done, click on the button to find strongly connected components (SCC)",10,10),d.html("Find SCC"),d.show(),d.mousePressed((function(){h=1,l=(0,r.tarjan)(a)}));break;case 1:e.text("Finding strongly connected components",10,10),d.hide();break;case 2:e.text("Strongly connected components found",10,10),d.show(),d.html("Restart"),d.mousePressed((function(){a=[],l=void 0,h=0,a=(0,o.drawVertices)(e,20,550,550,200,30,"?")}))}}(),e.push(),e.strokeWeight(0),e.fill(s.s7.r,s.s7.b,s.s7.g),e.circle(30,520,30),e.textAlign(e.LEFT),e.fill(0,0,0),e.text("ID : group",60,520),e.pop(),0==h?void 0!==t&&t.display():1==h&&l.next().done&&(h=2);for(const e of a)e.displayEdges();for(const e of a)e.display()},e.mouseReleased=function(){if(h>0)return;const s=(0,o.getClosestVertex)(e,a);void 0!==s&&(void 0===i?(i=s,t=new n.GrowingEdge(i.x,i.y,e)):(i.addEdge(s,1),i=void 0,t=void 0))}}const l="<p><strong>Tarjan's algorithm</strong> finds strongly connected components in a graph. A strongly connected component is a group of nodes in which every node is reachable by any other node.</p><p>The algorithm starts at a random node and uses depth first search to visit all its neighbors and their neighbors. When visiting a node, a low link value is assigned to the node which represents the lowest node reachable from current node. Low link value is initialized to 0 and increment each time it's assigned to a node.</p><p>When meeting a node already visited during current depth first search, the algorithm backtracks and update the low link value to the lower value between the already visited node and the currently visiting node.</p><p>After visiting all reachable nodes from current depth first search start point, the algorithm picks the next random univisted node and repeat the procedure. Note that low link value should only be updated when meeting node visited during current depth first search, not the previously visited ones.</p><p>Nodes with the same low link value belong to one strongly connected component.</p>"},91:(e,t,i)=>{"use strict";i.r(t),i.d(t,{tarjan:()=>d});var s=i(314),o=i(155),n=i(982),r=i(72);function*d(e){let t=(0,n.f)(50);const i=new Array(e.length),d=new o.S,l=new o.S;let a=0;for(const o of e){if(2===i[o.id])continue;let e=a,n=0;for(d.addFirst({seq:n,edge:new r.Edge(0,null,o,0,0)}),l.addFirst({seq:n,edge:new r.Edge(0,null,o,0,0)}),n++;d.size()>0;){let o=d.poll().edge,r=o.to;i[r.id]=1,r.value=a,r.displayValue="group "+a++;const h={r:Math.floor(256*Math.random()),g:Math.floor(256*Math.random()),b:Math.floor(256*Math.random())};for(o.changeColor(s.hM),r.changeColor(h);!1===t.next().value;)yield;for(const o of r.edges){let r=o.to;if(void 0===i[r.id])d.addFirst({seq:n,edge:o}),l.addFirst({seq:n,edge:o}),n++;else if(r.value>=e){for(o.changeColor(s.hM);!1===t.next().value;)yield;for(o.changeColor(s.s7);l.size()>0&&(0===d.size()||l.peek().seq!==d.peek().seq);){let e=l.poll().edge,o=e.to;for(i[o.id]=2,r.value<o.value&&(o.displayValue=r.displayValue,o.changeColor(r.getColor())),e.changeColor(s.s7);!1===t.next().value;)yield}}}for(;l.size()>0&&(0===d.size()||l.peek().seq!==d.peek().seq);){let e=l.poll().edge,o=e.to;for(e.changeColor(s.s7),i[o.id]=2;!1===t.next().value;)yield}}}}},314:(e,t,i)=>{"use strict";i.d(t,{hM:()=>s,Ej:()=>o,s7:()=>n});const s={r:254,g:160,b:144},o={r:89,g:199,b:235},n={r:154,g:160,b:167}},155:(e,t,i)=>{"use strict";function s(){let e,t,i=0;this.addFirst=function(t){let s={value:t};s.next=e,e=s,i++},this.add=function(s){let o={value:s};null==e&&(e=o),null==t?t=o:(t.next=o,t=t.next),i++},this.peek=function(){return null!=e?e.value:void 0},this.poll=function(){const t=e;return e=e.next,i--,t.value},this.size=function(){return i}}i.d(t,{S:()=>s})},982:(e,t,i)=>{"use strict";function*s(e){for(;;){for(let t=0;t<e-1;t++)yield!1;yield!0}}i.d(t,{f:()=>s})}}]);