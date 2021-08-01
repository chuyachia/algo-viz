(self.webpackChunkalgo_viz=self.webpackChunkalgo_viz||[]).push([[625,943,964,726,252],{943:(e,t,n)=>{"use strict";n.r(t),n.d(t,{BPlusTree:()=>o});var i=n(964),r=n(252);function s(e){this.isLeaf=e,this.next,this.entryHead=new l(void 0,void 0,e,this),this.entry=[],this.display=function(e,t,n,r,s,l){let o=this.getEntryStartX(t,n,this.entry.length,s),c=t;const y=(n-t)/(this.entry.length+1);let h;void 0!==this.entryHead.child&&(h=this.displayChild(e,this.entryHead.child,o,r,c,c+y,r+2*l,s,l),c+=y);for(const t of this.entry){if(void 0!==t.key&&(t.display(e,s,l,o,r),o+=s),void 0!==t.child){const n=c+y,d=r+2*l;if(t.child.isLeaf){let r=this.getEntryStartX(c,n,t.child.entry.length,s);e.push(),e.stroke(i.GREY.r,i.GREY.g,i.GREY.b),e.line(h,d+l/2,r,d+l/2),e.pop()}h=this.displayChild(e,t.child,o,r,c,n,d,s,l)}c+=y}return o},this.displayChild=function(e,t,n,i,r,s,l,o,c){return e.line(n,i+c/2,(r+s)/2,l),t.display(e,r,s,l,o,c)},this.replaceEntry=function(e){this.entry=e;for(const t of e)t.node=this},this.insertNewEntry=function(e,t){let n=new l(e,t,this.isLeaf,this),i=this.findIndexByKey(e,!1);return this.entry.splice(i,0,n),n},this.findIndexByKey=function(e,t){let n=0,i=this.entry.length;const r=t?t=>t<e:t=>t<=e;for(;n<i;){let e=n+Math.floor((i-n)/2);r(this.entry[e].key)?n=e+1:i=e}return n},this.findEntryByKey=function(e){let t=this.findIndexByKey(e,!0);return void 0!==this.entry[t]&&this.entry[t].key===e?this.entry[t]:t>0?this.entry[t-1]:this.entryHead},this.findNthEntry=function(e){return this.entry[e]},this.getEntryStartX=function(e,t,n,i){return(e+t)/2-n*i/2}}function l(e,t,n,r){this.key=e,this.value=t,this.isLeaf=n,this.node=r,this.next,this.child;let s=i.GREY.r,l=i.GREY.g,o=i.GREY.b;this.changeColor=function(e){s=e.r,l=e.g,o=e.b},this.display=function(e,t,n,i,r){if(void 0===this.key)return;e.push(),e.fill(s,l,o),e.rect(i,r,t,n),e.fill(0,0,0);const c=this.isLeaf&&void 0!==this.value?this.key+" : "+this.value:this.key;e.textAlign(e.LEFT,e.CENTER),e.text(c,i+2,r+n/2),e.pop()}}function o(e){this.root=new s(!1),this.order=e,this.get=function(e){let t=this.root;for(;void 0!==t;){let n=t.findEntryByKey(e);if(n.isLeaf)return n.key===e?n.value:null;t=n.child}return null},this.insert=function(t,n){const i=new r.Stack;let l=this.root;for(;void 0!==l;)if(l.isLeaf)l.insertNewEntry(t,n),l=void 0;else{let e=l.findEntryByKey(t);i.push(e),void 0===e.child&&(e.child=new s(!0)),l=e.child}for(;i.peek().child.entry.length>2*this.order;){let t=i.pop(),n=t.child,r=n.entry.slice(0,e),l=n.entry.slice(e);n.replaceEntry(r);let o=new s(n.isLeaf),c=l[0].key;if(n.isLeaf?(o.replaceEntry(l),n.next=o):(o.entryHead.child=l.shift().child,o.replaceEntry(l)),0===i.size()){let e=new s(!1);e.insertNewEntry(c,void 0),e.entryHead.child=n,e.entry[0].child=o,t.child=e;break}t.node.insertNewEntry(c,void 0).child=o}}}},625:(e,t,n)=>{"use strict";n.r(t);var i=n(943);test("key insert correctly within one level",(()=>{const e=new i.BPlusTree(2);e.insert(1),e.insert(2),e.insert(3),e.insert(4);let t=e.root.entryHead.child;expect(t.entry.length).toBe(4),expect(t.entry[0].key).toBe(1),expect(t.entry[1].key).toBe(2),expect(t.entry[2].key).toBe(3),expect(t.entry[3].key).toBe(4)})),test("key insert correctly within one level regardless of insertion order",(()=>{const e=new i.BPlusTree(2);e.insert(1),e.insert(4),e.insert(3),e.insert(2);let t=e.root.entryHead.child;expect(t.entry.length).toBe(4),expect(t.entry[0].key).toBe(1),expect(t.entry[1].key).toBe(2),expect(t.entry[2].key).toBe(3),expect(t.entry[3].key).toBe(4)})),test("key insert correctly across multiple levels",(()=>{const e=new i.BPlusTree(2);e.insert(1),e.insert(2),e.insert(3),e.insert(4),e.insert(5);let t=e.root.entryHead.child;expect(t.entry.length).toBe(1),expect(t.entry[0].key).toBe(3);let n=t.entryHead.child;expect(n.entry.length).toBe(2),expect(n.entry[0].key).toBe(1);let r=t.entry[0].child;expect(r.entry.length).toBe(3),expect(r.entry[0].key).toBe(3)})),test("key insert correctly across multiple levels with different order",(()=>{const e=new i.BPlusTree(1);e.insert(1),e.insert(2),e.insert(3),e.insert(4),e.insert(5);let t=e.root.entryHead.child;expect(t.entry.length).toBe(1),expect(t.entry[0].key).toBe(3);let n=t.entryHead.child;expect(n.entry.length).toBe(1),expect(n.entry[0].key).toBe(2);let r=t.entry[0].child;expect(r.entry.length).toBe(1),expect(r.entry[0].key).toBe(4);let s=n.entryHead.child;expect(s.entry.length).toBe(1),expect(s.entry[0].key).toBe(1);let l=n.entry[0].child;expect(l.entry.length).toBe(1),expect(l.entry[0].key).toBe(2);let o=r.entryHead.child;expect(o.entry.length).toBe(1),expect(o.entry[0].key).toBe(3);let c=r.entry[0].child;expect(c.entry.length).toBe(2),expect(c.entry[0].key).toBe(4),expect(c.entry[1].key).toBe(5)})),test("nodes are linked with pointer to next",(()=>{const e=new i.BPlusTree(1);e.insert(1),e.insert(2),e.insert(3),e.insert(4);let t=e.root.entryHead.child.entryHead.child;expect(t.isLeaf).toBe(!0),expect(t.entry.length).toBe(1),expect(t.entry[0].key).toBe(1),expect(t.next.entry.length).toBe(1),expect(t.next.entry[0].key).toBe(2),expect(t.next.next.entry.length).toBe(2),expect(t.next.next.entry[0].key).toBe(3),expect(t.next.next.entry[1].key).toBe(4)})),test("get value correctly within one level",(()=>{const e=new i.BPlusTree(2);e.insert(1,"a"),e.insert(2,"b"),e.insert(3,"c"),e.insert(4,"d"),expect(e.get(1)).toBe("a"),expect(e.get(2)).toBe("b"),expect(e.get(3)).toBe("c"),expect(e.get(4)).toBe("d")})),test("get value correctly across multiple levels",(()=>{const e=new i.BPlusTree(2);e.insert(1,"a"),e.insert(2,"b"),e.insert(3,"c"),e.insert(4,"d"),e.insert(5,"e"),expect(e.get(1)).toBe("a"),expect(e.get(2)).toBe("b"),expect(e.get(3)).toBe("c"),expect(e.get(4)).toBe("d"),expect(e.get(5)).toBe("e")})),test("get value correctly across multiple levels",(()=>{const e=new i.BPlusTree(1);e.insert(1,"a"),e.insert(4,"b"),e.insert(2,"c"),e.insert(5,"d"),e.insert(3,"e"),expect(e.get(1)).toBe("a"),expect(e.get(2)).toBe("c"),expect(e.get(3)).toBe("e"),expect(e.get(4)).toBe("b"),expect(e.get(5)).toBe("d")})),test("get first value when multiple key exists",(()=>{const e=new i.BPlusTree(1);e.insert(1,"a"),e.insert(2,"b"),e.insert(2,"c"),e.insert(3,"d"),expect(e.get(1)).toBe("a"),expect(e.get(2)).toBe("b"),expect(e.get(3)).toBe("d")}))},964:(e,t,n)=>{"use strict";n.r(t),n.d(t,{RED:()=>i,BLUE:()=>r,GREY:()=>s});const i={r:254,g:144,b:160},r={r:89,g:235,b:199},s={r:154,g:167,b:160}},726:(e,t,n)=>{"use strict";function i(){let e,t,n=0;this.addFirst=function(t){let i={value:t};i.next=e,e=i,n++},this.add=function(i){let r={value:i};null==e&&(e=r),null==t?t=r:(t.next=r,t=t.next),n++},this.peek=function(){return null!=e?e.value:void 0},this.poll=function(){const t=e;return e=e.next,n--,t.value},this.size=function(){return n}}n.r(t),n.d(t,{LinkedList:()=>i})},252:(e,t,n)=>{"use strict";n.r(t),n.d(t,{Stack:()=>r});var i=n(726);function r(){let e=new i.LinkedList;this.push=function(t){e.addFirst(t)},this.pop=function(){return e.poll()},this.peek=function(){return e.peek()},this.size=function(){return e.size()}}}}]);