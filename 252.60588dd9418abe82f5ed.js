(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[252,726],{726:(t,n,e)=>{"use strict";function i(){let t,n,e=0;this.addFirst=function(n){let i={value:n};i.next=t,t=i,e++},this.add=function(i){let u={value:i};null==t&&(t=u),null==n?n=u:(n.next=u,n=n.next),e++},this.peek=function(){return null!=t?t.value:void 0},this.poll=function(){const n=t;return t=t.next,e--,n.value},this.size=function(){return e}}e.r(n),e.d(n,{LinkedList:()=>i})},252:(t,n,e)=>{"use strict";e.r(n),e.d(n,{Stack:()=>u});var i=e(726);function u(){let t=new i.LinkedList;this.push=function(n){t.addFirst(n)},this.pop=function(){return t.poll()},this.peek=function(){return t.peek()},this.size=function(){return t.size()}}}}]);