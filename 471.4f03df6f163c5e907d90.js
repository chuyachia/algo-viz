(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[471,878,964,726,129],{878:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Edge:()=>r});var o=i(964);function r(t,e,i,r,s,n){this.weight=t,this.from=e,this.to=i;let l=o.GREY.r,h=o.GREY.g,a=o.GREY.b;this.display=function(){null!=this.from&&null!=this.to&&(n?this.drawDirectedEdge():this.drawUndirectedEdge())},this.drawUndirectedEdge=function(){var t=s.atan2(this.from.y-this.to.y,this.from.x-this.to.x);s.push(),s.stroke(l,h,a),s.strokeWeight(this.weight),s.line(this.from.x,this.from.y,this.to.x+r/2*s.cos(t),this.to.y+r/2*s.sin(t)),s.pop()},this.drawDirectedEdge=function(){var t=s.atan2(this.from.y-this.to.y,this.from.x-this.to.x);s.push(),s.stroke(l,h,a),s.strokeWeight(this.weight),s.line(this.from.x,this.from.y,this.to.x+r*s.cos(t),this.to.y+r*s.sin(t)),s.pop(),s.push(),s.stroke(l,h,a),s.fill(s.color(255,255,255)),s.translate(this.to.x,this.to.y),s.rotate(t-s.HALF_PI),s.triangle(0,r/2,r/4,r,-r/4,r),s.pop()},this.changeColor=function(t){l=t.r,h=t.g,a=t.b}}},408:(t,e,i)=>{"use strict";i.r(e),i.d(e,{hierholzer:()=>l});var o=i(964),r=i(726),s=i(129),n=i(878);function*l(t,e){let i=(0,s.waitNFrame)(e),l=t.length,h=0,a=new Array(l);a.fill(0);let d=new Array(l);d.fill(0);for(const e of t){h+=e.edges.length,d[e.id]=e.edges.length;for(const t of e.edges)a[t.to.id]++}const f=new Array(h+1);let u,c,g,p=!0;for(let e=0;e<l;e++){let i=t[e],o=i.id;if(d[o]>0&&(g=i),Math.abs(d[o]-a[o])>1){p=!1;break}if(1===Math.abs(d[o]-a[o]))if(d[o]>a[o]){if(void 0!==u){p=!1;break}u=i}else{if(void 0!==c){p=!1;break}c=i}}if(!p)return!1;let y=u||g;const k=new r.LinkedList;for(k.addFirst(new n.Edge(0,null,y,0,0));void 0!==y&&d[y.id]>0;){y.changeColor(o.RED);let t=d[y.id];d[y.id]--;let e=y.edges[t-1];for(e.changeColor(o.RED),y=e.to,k.addFirst(e);!1===i.next().value;)yield;for(;0===d[y.id];){let t=k.poll(),e=t.to;for(t.changeColor(o.BLUE),e.changeColor(o.BLUE);!1===i.next().value;)yield;if(e.displayValue&&e.displayValue.length>0?e.displayValue+=","+h:e.displayValue=h.toString(),f[h]=e.id,h--,!(k.size()>0)){y=void 0;break}y=k.peek().to}}return f}},964:(t,e,i)=>{"use strict";i.r(e),i.d(e,{RED:()=>o,BLUE:()=>r,GREY:()=>s});const o={r:254,g:144,b:160},r={r:89,g:235,b:199},s={r:154,g:167,b:160}},726:(t,e,i)=>{"use strict";function o(){let t,e,i=0;this.addFirst=function(e){let o={value:e};o.next=t,t=o,i++},this.add=function(o){let r={value:o};null==t&&(t=r),null==e?e=r:(e.next=r,e=e.next),i++},this.peek=function(){return null!=t?t.value:void 0},this.poll=function(){const e=t;return t=t.next,i--,e.value},this.size=function(){return i}}i.r(e),i.d(e,{LinkedList:()=>o})},129:(t,e,i)=>{"use strict";function*o(t){for(;;){for(let e=0;e<t-1;e++)yield!1;yield!0}}i.r(e),i.d(e,{waitNFrame:()=>o})}}]);