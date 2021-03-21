(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[250,878,401,14,745,633,964,726,252,129],{878:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Edge:()=>s});var o=i(964);function s(t,e,i,s,n,r){this.weight=t,this.from=e,this.to=i;let d=o.GREY.r,l=o.GREY.g,h=o.GREY.b;this.display=function(){null!=this.from&&null!=this.to&&(r?this.drawDirectedEdge():this.drawUndirectedEdge())},this.drawUndirectedEdge=function(){var t=n.atan2(this.from.y-this.to.y,this.from.x-this.to.x);n.push(),n.stroke(d,l,h),n.strokeWeight(this.weight),n.line(this.from.x,this.from.y,this.to.x+s/2*n.cos(t),this.to.y+s/2*n.sin(t)),n.pop()},this.drawDirectedEdge=function(){var t=n.atan2(this.from.y-this.to.y,this.from.x-this.to.x);n.push(),n.stroke(d,l,h),n.strokeWeight(this.weight),n.line(this.from.x,this.from.y,this.to.x+s*n.cos(t),this.to.y+s*n.sin(t)),n.pop(),n.push(),n.stroke(d,l,h),n.fill(n.color(255,255,255)),n.translate(this.to.x,this.to.y),n.rotate(t-n.HALF_PI),n.triangle(0,s/2,s/4,s,-s/4,s),n.pop()},this.changeColor=function(t){d=t.r,l=t.g,h=t.b}}},401:(t,e,i)=>{"use strict";i.r(e),i.d(e,{drawVertices:()=>s,getClosestVertex:()=>n});var o=i(745);function s(t,e,i,s,n,r,d){const l=[],h=t.TWO_PI/e;let a=0;for(let c=0;c<e;c++){const e=n*t.cos(a)+i/2,u=n*t.sin(a)+s/2,g=new o.Vertex(c,e,u,r,t);g.displayValue=d,l.push(g),a+=h}return l}function n(t,e){for(const i of e)if(t.dist(t.mouseX,t.mouseY,i.x,i.y)<20)return i}},14:(t,e,i)=>{"use strict";i.r(e),i.d(e,{GrowingEdge:()=>s});var o=i(964);function s(t,e,i){this.weight=1,this.increaseWeight=function(){this.weight+=1/i.deltaTime,this.weight=this.weight%10},this.display=function(){i.push(),i.stroke(o.GREY.r,o.GREY.g,o.GREY.b),i.strokeWeight(this.weight),i.line(t,e,i.mouseX,i.mouseY),i.pop()}}},745:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Vertex:()=>n});var o=i(964),s=i(878);function n(t,e,i,n,r){this.id=t,this.x=e,this.y=i,this.edges=[],this.value,this.displayValue;let d=o.GREY.r,l=o.GREY.g,h=o.GREY.b,a=0,c=new Set;this.display=function(){if(void 0===this.x||void 0===this.y)return;r.push(),r.stroke(d,l,h,80),r.strokeWeight(a),r.fill(d,l,h),r.circle(this.x,this.y,n),r.fill(0,0,0),r.strokeWeight(0);let t=this.displayValue.length>0?" : "+this.displayValue:"";r.textAlign(r.CENTER),r.text(this.id+t,this.x,this.y+n),r.pop()},this.displayEdges=function(){for(const t of this.edges)t.display()},this.changeColor=function(t){d=t.r,l=t.g,h=t.b},this.getColor=function(){return{r:d,g:l,b:h}},this.changeStrokeWeight=function(t){a=t},this.addEdge=function(t,e){t.id==this.id||c.has(t.id)||(c.add(t.id),this.edges.push(new s.Edge(e,this,t,n,r,!0)))}}},250:(t,e,i)=>{"use strict";i.r(e),i.d(e,{sketch:()=>d,explainText:()=>l});var o=i(964),s=i(401),n=i(14),r=i(633);function d(t){const e=30;let i,d,l,h,a=[],c=0,u=[];t.setup=function(){t.createCanvas(550,550),l=t.createButton(""),l.position(10,40),l.addClass("action-button"),a=(0,s.drawVertices)(t,20,550,550,200,e,"?")},t.draw=function(){if(t.background(255,255,255),function(){switch(c){case 0:t.text("Click on nodes to add link.\nOnce the graph is done, click on the button to find the topological ordering of the nodes",10,10),l.html("Find topological ordering"),l.show(),l.mousePressed((function(){c=1,h=(0,r.topologicalSort)(a,50)}));break;case 1:t.text("Finding topological ordering",10,10),l.hide();break;case 2:0==u.length?t.text("Graph contains cycle. Topological ordering does not exist",10,10):t.text("Topological ordering found",10,10),l.show(),l.html("Restart"),l.mousePressed((function(){a=[],h=void 0,c=0,a=(0,s.drawVertices)(t,20,550,550,200,e,"?")}))}}(),t.push(),t.strokeWeight(0),t.fill(o.GREY.r,o.GREY.g,o.GREY.b),t.circle(e,520,e),t.textAlign(t.LEFT),t.fill(0,0,0),t.text("ID : order",60,520),t.fill(o.RED.r,o.RED.g,o.RED.b),t.circle(e,490,e),t.text("Visiting",60,490),t.fill(o.BLUE.r,o.BLUE.g,o.BLUE.b),t.circle(e,460,e),t.text("Visited",60,460),t.pop(),0==c)void 0!==i&&i.display();else if(1==c){let t=h.next();t.done&&(u=t.value,c=2)}for(const t of a)t.displayEdges();for(const t of a)t.display()},t.mouseReleased=function(){if(c>0)return;const e=(0,s.getClosestVertex)(t,a);void 0!==e&&(void 0===d?(d=e,i=new n.GrowingEdge(d.x,d.y,t)):(d.addEdge(e,1),d=void 0,i=void 0))}}const l="<p><strong>Topological ordering</strong> of a graph is an ordering of the nodes in the graph following which all of one node's dependencies will visited before itself. The dependencies of a node are the nodes connected to it by incoming edges. Topological ordering does not exist on graphs that contain cycles</p><p>Topological sort algorithm starts at a random node and performs depth first search to visit all its neighbors and their neighbors until no unvisited node can be reached. At this point, the algorithm backtracks and adds nodes to the back of a list of ordered nodes. After backtracking is done, the algorithm pick the next unvisited node and repeat the procedure until all nodes are visited.</p>"},633:(t,e,i)=>{"use strict";i.r(e),i.d(e,{topologicalSort:()=>d});var o=i(964),s=i(252),n=i(129),r=i(878);function*d(t,e){const i=[],d=[];let l=t.length,h=!1,a=(0,n.waitNFrame)(e);const c=new s.Stack,u=new s.Stack;for(let e of t){let t=0;if(h)break;if(2!==i[e.id])for(c.push({seq:t,edge:new r.Edge(0,null,e,0,0)}),u.push({seq:t,edge:new r.Edge(0,null,e,0,0)}),t++;c.size()>0;){let e=c.pop().edge,s=e.to;for(i[s.id]=1,e.changeColor(o.RED),s.changeColor(o.RED);!1===a.next().value;)yield;for(const e of s.edges){let o=e.to;if(2!=i[o.id]){if(1==i[o.id]){h=!0;break}c.push({seq:t,edge:e}),u.push({seq:t,edge:e}),t++}}for(;u.size()>0&&(0==c.size()||c.peek().seq!=u.peek().seq);){let{edge:t}=u.pop(),e=t.to;for(i[e.id]=2,t.changeColor(o.GREY),e.changeColor(o.BLUE),e.displayValue=null==(g=l)?"NA":1==g?g+"st":2==g?g+"nd":3==g?g+"rd":g+"th",d[--l]=e.id;!1===a.next().value;)yield}}}var g;return h?[]:d}},964:(t,e,i)=>{"use strict";i.r(e),i.d(e,{RED:()=>o,BLUE:()=>s,GREY:()=>n});const o={r:254,g:144,b:160},s={r:89,g:235,b:199},n={r:154,g:167,b:160}},726:(t,e,i)=>{"use strict";function o(){let t,e,i=0;this.addFirst=function(e){let o={value:e};o.next=t,t=o,i++},this.add=function(o){let s={value:o};null==t&&(t=s),null==e?e=s:(e.next=s,e=e.next),i++},this.peek=function(){return null!=t?t.value:void 0},this.poll=function(){const e=t;return t=t.next,i--,e.value},this.size=function(){return i}}i.r(e),i.d(e,{LinkedList:()=>o})},252:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Stack:()=>s});var o=i(726);function s(){let t=new o.LinkedList;this.push=function(e){t.addFirst(e)},this.pop=function(){return t.poll()},this.peek=function(){return t.peek()},this.size=function(){return t.size()}}},129:(t,e,i)=>{"use strict";function*o(t){for(;;){for(let e=0;e<t-1;e++)yield!1;yield!0}}i.r(e),i.d(e,{waitNFrame:()=>o})}}]);