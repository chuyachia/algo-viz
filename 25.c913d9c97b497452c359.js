(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[25,993,617,964,726,252,129],{993:(t,e,i)=>{"use strict";i.r(e),i.d(e,{AVLTree:()=>n});var o=i(964),r=i(252),l=i(129),h=i(617);function n(t,e,i){this.root;let n=(0,l.waitNFrame)(e);function s(t){if(void 0===t)return null;for(;void 0!==t.leftChild;)t=t.leftChild;return t.value}function a(t){let e=t.leftChild?t.leftChild.height:-1,i=t.rightChild?t.rightChild.height:-1;t.height=1+Math.max(e,i),t.balanceFactor=i-e}function*d(t){for(t.changeColor(o.RED);!1===n.next().value;)yield;if(t.balanceFactor>1){if(t.rightChild.balanceFactor>=0){for(t.changeColor(o.RED),t.showLeftRotationArrow=!0;!1===n.next().value;)yield;return t.showLeftRotationArrow=!1,t.changeColor(o.GREY),f(t)}for(t.rightChild.changeColor(o.RED),t.rightChild.showRightRotationArrow=!0;!1===n.next().value;)yield;for(t.rightChild.changeColor(o.GREY),t.rightChild.showRightRotationArrow=!1,t.rightChild=u(t.rightChild),t.changeColor(o.RED),t.showLeftRotationArrow=!0;!1===n.next().value;)yield;return t.showLeftRotationArrow=!1,t.changeColor(o.GREY),f(t)}if(t.balanceFactor<-1){if(t.leftChild.balanceFactor<=0){for(t.changeColor(o.RED),t.showRightRotationArrow=!0;!1===n.next().value;)yield;return t.showRightRotationArrow=!1,t.changeColor(o.GREY),u(t)}for(t.leftChild.changeColor(o.RED),t.leftChild.showLeftRotationArrow=!0;!1===n.next().value;)yield;for(t.leftChild.showLeftRotationArrow=!1,t.leftChild.changeColor(o.GREY),t.leftChild=f(t.leftChild),t.changeColor(o.RED),t.showRightRotationArrow=!0;!1===n.next().value;)yield;return t.showRightRotationArrow=!1,t.changeColor(o.GREY),u(t)}return t.changeColor(o.GREY),t}function u(t){let e=t.leftChild;return t.leftChild=e.rightChild,e.rightChild=t,a(t),a(e),e}function f(t){let e=t.rightChild;return t.rightChild=e.leftChild,e.leftChild=t,a(t),a(e),e}this.insert=function(t){let e,i=this.iteInsert(t);for(;!e||!e.done;)e=i.next()},this.remove=function(t){let e,i=this.iteRemove(t);for(;!e||!e.done;)e=i.next()},this.iteInsert=function*(e){const l=new r.Stack;let s=this.root;for(;void 0!==s;){for(s.changeColor(o.RED);!1===n.next().value;)yield;if(s.changeColor(o.GREY),l.push(s),e>s.value)s=s.rightChild;else{if(!(e<s.value))return;s=s.leftChild}}let u=new h.Node(e,t,i);for(;l.size()>0;){s=l.pop(),void 0!==u&&(u.value<s.value?s.leftChild=u:s.rightChild=u),a(s);let t,e=d(s);for(;void 0===t||!t.done;)t=e.next(),yield;s=t.value,u=s}this.root=u},this.iteRemove=function*(t){const e=new r.Stack;let i,l=this.root;for(;void 0!==l;){for(l.changeColor(o.RED);!1===n.next().value;)yield;if(l.changeColor(o.GREY),t>l.value)e.push(l),l=l.rightChild;else if(t<l.value)e.push(l),l=l.leftChild;else{if(void 0===l.leftChild||void 0===l.rightChild){let t=void 0===l.leftChild?l.rightChild:l.leftChild;e.size()>0?l.value>=e.peek().value?e.peek().rightChild=t:e.peek().leftChild=t:i=t;break}{let i=s(l.rightChild);l.value=i,e.push(l),t=i,l=l.rightChild}}}for(;e.size()>0;){l=e.pop(),void 0!==i&&(i.value>l.value?l.rightChild=i:l.leftChild=i),a(l);let t,o=d(l);for(;void 0===t||!t.done;)t=o.next(),yield;l=t.value,i=l}this.root=i}}},25:(t,e,i)=>{"use strict";i.r(e),i(666);const o=new(i(993).AVLTree)(0,0,void 0);function r(t){if(void 0===t)return!0;let e=!0,i=-1,o=-1;void 0!==t.leftChild&&(i=t.leftChild.height,e=t.value>t.leftChild.value),void 0!==t.rightChild&&(o=t.rightChild.height,e=t.value<t.rightChild.value);let l=Math.abs(i-o)<=1;return!(!e||!l)&&r(t.rightChild)&&r(t.leftChild)}test("Insert to empty tree set root node",(()=>{o.insert(5),expect(o.root.value).toBe(5)})),test("Insert larger value add to right child",(()=>{o.insert(8),expect(o.root.rightChild.value).toBe(8)})),test("Insert smaller value add to left child",(()=>{o.insert(3),expect(o.root.leftChild.value).toBe(3)})),test("Insert larger value add to right child",(()=>{o.insert(9),expect(o.root.rightChild.rightChild.value).toBe(9)})),test("Insert multiple values tree valid",(()=>{o.insert(7),o.insert(8),o.insert(9),o.insert(10),o.insert(12),o.insert(-4),o.insert(-5),expect(r(o.root)).toBe(!0)})),test("Remove multiple values tree valid",(()=>{o.remove(8),o.remove(9),expect(r(o.root)).toBe(!0)}))},617:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Node:()=>r});var o=i(964);function r(t,e,i){this.value=t,this.leftChild,this.rightChild,this.leftChildEdge,this.rightChildEdge,this.strokeWeight=0,this.height=0,this.balanceFactor=0,this.showLeftRotationArrow=!1,this.showRightRotationArrow=!1,this.index,this.x,this.y;let r=o.GREY.r,l=o.GREY.b,h=o.GREY.g;this.display=function(){void 0!==this.x&&void 0!==this.y&&(i.push(),i.stroke(r,l,h,80),i.strokeWeight(this.strokeWeight),i.fill(r,l,h),i.circle(this.x,this.y,e),i.fill(0,0,0),i.textAlign(i.CENTER),i.text(this.value,this.x,this.y),i.pop(),this.showRightRotationArrow&&this.rightArrow(),this.showLeftRotationArrow&&this.leftArrow())},this.removeArrow=function(){this.showLeftRotationArrow=!1,this.showRightRotationArrow=!1},this.rightArrow=function(){let t=e+15;i.push(),i.noFill(),i.arc(this.x,this.y,t,t,i.PI,i.TWO_PI);let o=this.x+t/2;i.triangle(o,this.y+10,o-5,this.y,o+5,this.y),i.stroke(0,0,0),i.pop()},this.leftArrow=function(){let t=e+15;i.push(),i.noFill(),i.arc(this.x,this.y,t,t,i.PI,i.TWO_PI);let o=this.x-t/2;i.triangle(o,this.y+10,o-5,this.y,o+5,this.y),i.stroke(0,0,0),i.pop()},this.changeColor=function(t){r=t.r,h=t.g,l=t.b},this.getColor=function(){return{r,g:h,b:l}}}},964:(t,e,i)=>{"use strict";i.r(e),i.d(e,{RED:()=>o,BLUE:()=>r,GREY:()=>l});const o={r:254,g:160,b:144},r={r:89,g:199,b:235},l={r:154,g:160,b:167}},726:(t,e,i)=>{"use strict";function o(){let t,e,i=0;this.addFirst=function(e){let o={value:e};o.next=t,t=o,i++},this.add=function(o){let r={value:o};null==t&&(t=r),null==e?e=r:(e.next=r,e=e.next),i++},this.peek=function(){return null!=t?t.value:void 0},this.poll=function(){const e=t;return t=t.next,i--,e.value},this.size=function(){return i}}i.r(e),i.d(e,{LinkedList:()=>o})},252:(t,e,i)=>{"use strict";i.r(e),i.d(e,{Stack:()=>r});var o=i(726);function r(){let t=new o.LinkedList;this.push=function(e){t.addFirst(e)},this.pop=function(){return t.poll()},this.peek=function(){return t.peek()},this.size=function(){return t.size()}}},129:(t,e,i)=>{"use strict";function*o(t){for(;;){for(let e=0;e<t-1;e++)yield!1;yield!0}}i.r(e),i.d(e,{waitNFrame:()=>o})}}]);