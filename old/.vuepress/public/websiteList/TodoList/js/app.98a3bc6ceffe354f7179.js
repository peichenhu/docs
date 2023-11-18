!function(e){function t(t){for(var r,o,c=t[0],i=t[1],d=t[2],a=0,s=[];a<c.length;a++)o=c[a],Object.prototype.hasOwnProperty.call(H,o)&&H[o]&&s.push(H[o][0]),H[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(A&&A(t);s.length;)s.shift()();return k.push.apply(k,d||[]),n()}function n(){for(var e,t=0;t<k.length;t++){for(var n=k[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==H[c]&&(r=!1)}r&&(k.splice(t--,1),e=I(I.s=n[0]))}return e}var r=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!j[e]||!g[e])return;for(var n in g[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(y[n]=t[n]);0==--b&&0===O&&L()}(e,t),r&&r(e,t)};var o,c=!0,i="98a3bc6ceffe354f7179",d=1e4,a={},s=[],l=[];function u(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:o!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:D,apply:x,status:function(e){if(!e)return f;p.push(e)},addStatusHandler:function(e){p.push(e)},removeStatusHandler:function(e){var t=p.indexOf(e);t>=0&&p.splice(t,1)},data:a[e]};return o=void 0,t}var p=[],f="idle";function h(e){f=e;for(var t=0;t<p.length;t++)p[t].call(null,e)}var v,y,m,b=0,O=0,w={},g={},j={};function E(e){return+e+""===e?+e:e}function D(e){if("idle"!==f)throw new Error("check() is only allowed in idle status");return c=e,h("check"),(t=d,t=t||1e4,new Promise(function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,o=I.p+""+i+".hot-update.json";r.open("GET",o,!0),r.timeout=t,r.send(null)}catch(e){return n(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+o+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+o+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(e){return void n(e)}e(t)}}})).then(function(e){if(!e)return h("idle"),null;g={},w={},j=e.c,m=e.h,h("prepare");var t=new Promise(function(e,t){v={resolve:e,reject:t}});for(var n in y={},H)_(n);return"prepare"===f&&0===O&&0===b&&L(),t});var t}function _(e){j[e]?(g[e]=!0,b++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=I.p+""+e+"."+i+".hot-update.js",document.head.appendChild(t)}(e)):w[e]=!0}function L(){h("ready");var e=v;if(v=null,e)if(c)Promise.resolve().then(function(){return x(c)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in y)Object.prototype.hasOwnProperty.call(y,n)&&t.push(E(n));e.resolve(t)}}function x(t){if("ready"!==f)throw new Error("apply() is only allowed in ready status");var n,r,o,c,d;function l(e){for(var t=[e],n={},r=t.map(function(e){return{chain:[e],id:e}});r.length>0;){var o=r.pop(),i=o.id,d=o.chain;if((c=P[i])&&!c.hot._selfAccepted){if(c.hot._selfDeclined)return{type:"self-declined",chain:d,moduleId:i};if(c.hot._main)return{type:"unaccepted",chain:d,moduleId:i};for(var a=0;a<c.parents.length;a++){var s=c.parents[a],l=P[s];if(l){if(l.hot._declinedDependencies[i])return{type:"declined",chain:d.concat([s]),moduleId:i,parentId:s};-1===t.indexOf(s)&&(l.hot._acceptedDependencies[i]?(n[s]||(n[s]=[]),u(n[s],[i])):(delete n[s],t.push(s),r.push({chain:d.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];-1===e.indexOf(r)&&e.push(r)}}t=t||{};var p={},v=[],b={},O=function(){console.warn("[HMR] unexpected require("+g.moduleId+") to disposed module")};for(var w in y)if(Object.prototype.hasOwnProperty.call(y,w)){var g;d=E(w);var D=!1,_=!1,L=!1,x="";switch((g=y[w]?l(d):{type:"disposed",moduleId:w}).chain&&(x="\nUpdate propagation: "+g.chain.join(" -> ")),g.type){case"self-declined":t.onDeclined&&t.onDeclined(g),t.ignoreDeclined||(D=new Error("Aborted because of self decline: "+g.moduleId+x));break;case"declined":t.onDeclined&&t.onDeclined(g),t.ignoreDeclined||(D=new Error("Aborted because of declined dependency: "+g.moduleId+" in "+g.parentId+x));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(g),t.ignoreUnaccepted||(D=new Error("Aborted because "+d+" is not accepted"+x));break;case"accepted":t.onAccepted&&t.onAccepted(g),_=!0;break;case"disposed":t.onDisposed&&t.onDisposed(g),L=!0;break;default:throw new Error("Unexception type "+g.type)}if(D)return h("abort"),Promise.reject(D);if(_)for(d in b[d]=y[d],u(v,g.outdatedModules),g.outdatedDependencies)Object.prototype.hasOwnProperty.call(g.outdatedDependencies,d)&&(p[d]||(p[d]=[]),u(p[d],g.outdatedDependencies[d]));L&&(u(v,[g.moduleId]),b[d]=O)}var k,M=[];for(r=0;r<v.length;r++)d=v[r],P[d]&&P[d].hot._selfAccepted&&b[d]!==O&&M.push({module:d,errorHandler:P[d].hot._selfAccepted});h("dispose"),Object.keys(j).forEach(function(e){!1===j[e]&&function(e){delete H[e]}(e)});for(var S,N,A=v.slice();A.length>0;)if(d=A.pop(),c=P[d]){var T={},U=c.hot._disposeHandlers;for(o=0;o<U.length;o++)(n=U[o])(T);for(a[d]=T,c.hot.active=!1,delete P[d],delete p[d],o=0;o<c.children.length;o++){var C=P[c.children[o]];C&&((k=C.parents.indexOf(d))>=0&&C.parents.splice(k,1))}}for(d in p)if(Object.prototype.hasOwnProperty.call(p,d)&&(c=P[d]))for(N=p[d],o=0;o<N.length;o++)S=N[o],(k=c.children.indexOf(S))>=0&&c.children.splice(k,1);for(d in h("apply"),i=m,b)Object.prototype.hasOwnProperty.call(b,d)&&(e[d]=b[d]);var q=null;for(d in p)if(Object.prototype.hasOwnProperty.call(p,d)&&(c=P[d])){N=p[d];var R=[];for(r=0;r<N.length;r++)if(S=N[r],n=c.hot._acceptedDependencies[S]){if(-1!==R.indexOf(n))continue;R.push(n)}for(r=0;r<R.length;r++){n=R[r];try{n(N)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:d,dependencyId:N[r],error:e}),t.ignoreErrored||q||(q=e)}}}for(r=0;r<M.length;r++){var J=M[r];d=J.module,s=[d];try{I(d)}catch(e){if("function"==typeof J.errorHandler)try{J.errorHandler(e)}catch(n){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:d,error:n,originalError:e}),t.ignoreErrored||q||(q=n),q||(q=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:d,error:e}),t.ignoreErrored||q||(q=e)}}return q?(h("fail"),Promise.reject(q)):(h("idle"),new Promise(function(e){e(v)}))}var P={},H={0:0},k=[];function I(t){if(P[t])return P[t].exports;var n=P[t]={i:t,l:!1,exports:{},hot:u(t),parents:(l=s,s=[],l),children:[]};return e[t].call(n.exports,n,n.exports,function(e){var t=P[e];if(!t)return I;var n=function(n){return t.hot.active?(P[n]?-1===P[n].parents.indexOf(e)&&P[n].parents.push(e):(s=[e],o=n),-1===t.children.indexOf(n)&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),s=[]),I(n)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return I[e]},set:function(t){I[e]=t}}};for(var c in I)Object.prototype.hasOwnProperty.call(I,c)&&"e"!==c&&"t"!==c&&Object.defineProperty(n,c,r(c));return n.e=function(e){return"ready"===f&&h("prepare"),O++,I.e(e).then(t,function(e){throw t(),e});function t(){O--,"prepare"===f&&(w[e]||_(e),0===O&&0===b&&L())}},n.t=function(e,t){return 1&t&&(e=n(e)),I.t(e,-2&t)},n}(t)),n.l=!0,n.exports}I.m=e,I.c=P,I.d=function(e,t,n){I.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},I.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},I.t=function(e,t){if(1&t&&(e=I(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(I.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)I.d(n,r,function(t){return e[t]}.bind(null,r));return n},I.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return I.d(t,"a",t),t},I.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},I.p="./",I.h=function(){return i};var M=window.webpackJsonp=window.webpackJsonp||[],S=M.push.bind(M);M.push=t,M=M.slice();for(var N=0;N<M.length;N++)t(M[N]);var A=S;k.push([213,1]),n()}({210:function(e,t,n){var r={"./zh-cn":62,"./zh-cn.js":62};function o(e){var t=c(e);return n(t)}function c(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=c,e.exports=o,o.id=210},211:function(e,t,n){},212:function(e,t,n){},213:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(44),c=n(45),i=n(66);const d=e=>localStorage.setItem("todoList",JSON.stringify(e)),a={todoList:(()=>{let e=localStorage.getItem("todoList"),t=[{datetime:+new Date,content:"Hello World! Day Day UP!",done:!1}];return e?JSON.parse(e):(d(t),t)})()},s="添加代办提醒",l="改变代办提醒状态",u="添加代删除代办提醒办提醒";var p=(e=a,t)=>{let n;switch(t.type){case s:const r={done:!1,datetime:+new Date,content:t.todoContent};return n=Object.assign({},{todoList:[r,...e.todoList.map(e=>Object.assign({},e))]}),d(n.todoList),n;case l:return e.todoList[t.index]?(n=Object.assign({},{todoList:e.todoList.map((e,n)=>Object.assign({},e,{done:t.index===n?!e.done:e.done}))}),d(n.todoList),n):e;case u:return e.todoList[t.index]?(n=Object.assign({},{todoList:[...e.todoList.slice(0,t.index),...e.todoList.slice(t.index+1,e.todoList.length)].map(e=>Object.assign({},e))}),d(n.todoList),n):e;default:return e}},f=(n(108),n(121),n(135),n(163),n(187),n(36));n(62);f.locale("zh-cn");n(211);var h=e=>{console.log("Redux Demo",e);const{todoList:t,TodoAdd:n,TodoStatusChange:o,TodoDelete:c}=e,i=Object(r.useRef)(null),d=()=>{const[e,t]=Object(r.useState)(+new Date);return Object(r.useEffect)(()=>{const e=setInterval(()=>t(+new Date),1e3);return()=>clearInterval(e)},[]),r.createElement("p",null,f(e).format("YYYY-MM-DD HH:mm:ss dddd a"))};function a(){let e=i.current;e&&n(e.value)}return Object(r.useMemo)(()=>r.createElement("div",{className:"todoList"},r.createElement("div",{className:"todoList-title"},r.createElement("h1",null,"TodoList"),r.createElement(d,null)),r.createElement("div",{className:"todoList-edit"},r.createElement("input",{type:"text",ref:i,onKeyUp:e=>13===e.keyCode&&a(),placeholder:"今日关注"}),r.createElement("div",{className:"add",onClick:a},"+")),r.createElement("div",{className:"todoList-list"},t.map((e,t)=>r.createElement("div",{className:e.done?"todoList-item done":"todoList-item",key:t},r.createElement("div",{className:"status",onClick:()=>o(t)},e.done?"完成":"未完成"," •"),r.createElement("div",{className:"content"},e.content),r.createElement("div",{className:"delete",onClick:()=>c(t)}," X"))))),[t])};n(212);const v=Object(c.b)(p),y=Object(i.b)(function(e){return{todoList:e.todoList}},function(e){return{TodoAdd:t=>e({type:s,todoContent:t}),TodoStatusChange:t=>e({type:l,index:t}),TodoDelete:t=>e({type:u,index:t},t)}})(h);o.render(r.createElement(i.a,{store:v},r.createElement(y,null)),document.getElementById("app"))}});
//# sourceMappingURL=app.98a3bc6ceffe354f7179.js.map