import{a as P,b as T,c as F,d as A,e as D}from"./chunk-Q642C5C3.js";import"./chunk-3STGELMA.js";import{Ia as m,Ka as p,Pb as b,Xa as l,Za as c,_,ab as g,ba as x,c as u,cb as S,db as y,eb as d,f as C,fb as f,gb as o,ib as v,jb as h,tb as M}from"./chunk-XZEVKK2T.js";var w=(e,t)=>t.text;function G(e,t){if(e&1&&o(0,"app-chat-message",5),e&2){let a=h().$implicit;c("text",a.text)}}function $(e,t){if(e&1&&o(0,"app-my-message",5),e&2){let a=h().$implicit;c("text",a.text)}}function E(e,t){if(e&1&&l(0,G,1,1,"app-chat-message",5)(1,$,1,1),e&2){let a=t.$implicit;g(0,a.isGpt?0:1)}}function q(e,t){e&1&&o(0,"app-typing-loader")}var N=(()=>{let t=class t{constructor(){this.messages=m([]),this.isLoading=m(!1),this.openAiService=_(D),this.abortSignal=new AbortController}handleMessage(n){return u(this,null,function*(){this.abortSignal.abort(),this.abortSignal=new AbortController,this.messages.update(r=>[...r,{isGpt:!1,text:n},{isGpt:!0,text:"..."}]),this.isLoading.set(!0),console.log({prompt:n});let s=this.openAiService.prosConsStreamDiscuss(n,this.abortSignal.signal);this.isLoading.set(!1);try{for(var i=C(s),B,L,W;B=!(L=yield i.next()).done;B=!1){let r=L.value;this.handleStreamResponse(r)}}catch{W=[L]}finally{try{B&&(L=i.return)&&(yield L.call(i))}finally{if(W)throw W[0]}}})}handleStreamResponse(n){this.messages().pop();let s=this.messages();this.messages.set([...s,{isGpt:!0,text:n}])}};t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=x({type:t,selectors:[["app-pros-cons-stream-page"]],standalone:!0,features:[M],decls:8,vars:1,consts:[[1,"chat-container"],[1,"chat-messages"],[1,"grid","gap-y-2"],["text","\xBFQue deseas comparar? (Stream)"],["placeholder","Escribe aqui lo que deseas",3,"onMessage"],[3,"text"]],template:function(s,i){s&1&&(d(0,"div",0)(1,"div",1)(2,"div",2),o(3,"app-chat-message",3),S(4,E,2,1,null,null,w),l(6,q,1,0,"app-typing-loader"),f()(),d(7,"app-text-message-box",4),v("onMessage",function(L){return i.handleMessage(L)}),f()()),s&2&&(p(4),y(i.messages()),p(2),g(6,i.isLoading()?6:-1))},dependencies:[b,P,T,A,F],encapsulation:2,changeDetection:0});let e=t;return e})();export{N as default};
