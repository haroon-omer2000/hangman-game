(this["webpackJsonphangman-game"]=this["webpackJsonphangman-game"]||[]).push([[0],{13:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),s=n(7),o=n.n(s),i=n(6),a=n(2),u=(n(13),n(0)),j=function(e){var t=e.currentQuestion,n=e.words;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h1",{children:"Hangman"}),Object(u.jsx)("p",{children:"Find the hidden word - Enter a letter"}),Object(u.jsxs)("p",{children:["Question ",t+1,"/",n.length]})]})},l=function(e){var t=e.wrongLetters.length;return Object(u.jsxs)("svg",{height:"250",width:"200",className:"figure-container",children:[Object(u.jsx)("line",{x1:"60",y1:"20",x2:"140",y2:"20"}),Object(u.jsx)("line",{x1:"140",y1:"20",x2:"140",y2:"50"}),Object(u.jsx)("line",{x1:"60",y1:"20",x2:"60",y2:"230"}),Object(u.jsx)("line",{x1:"20",y1:"230",x2:"100",y2:"230"}),t>0&&Object(u.jsx)("circle",{cx:"140",cy:"70",r:"20"}),t>1&&Object(u.jsx)("line",{x1:"140",y1:"90",x2:"140",y2:"150"}),t>2&&Object(u.jsx)("line",{x1:"140",y1:"120",x2:"120",y2:"100"}),t>3&&Object(u.jsx)("line",{x1:"140",y1:"120",x2:"160",y2:"100"}),t>4&&Object(u.jsx)("line",{x1:"140",y1:"150",x2:"120",y2:"180"}),t>5&&Object(u.jsx)("line",{x1:"140",y1:"150",x2:"160",y2:"180"})]})},d=function(e){var t=e.wrongLetters;return Object(u.jsx)("div",{className:"wrong-letters-container",children:Object(u.jsxs)("div",{children:[t.length>0&&Object(u.jsx)("p",{className:"Wrong",children:"Wrong"}),t.map((function(e,t){return Object(u.jsx)("span",{children:e},t)})).reduce((function(e,t){return null===e?[t]:[e,", ",t]}),null)]})})},h=function(e){var t=e.selectedWord,n=e.correctLetters;return Object(u.jsx)("div",{className:"word",children:t.split("").map((function(e,t){return Object(u.jsx)("span",{className:"letter",children:n.includes(e)?e:""},t)}))})};function b(e){e(!0),setTimeout((function(){e(!1)}),2e3)}function O(e,t,n){var c="win";return n.split("").forEach((function(t){e.includes(t)||(c="")})),6===t.length&&(c="lose"),c}var f=!1,x=function(e){var t=e.correctLetters,n=e.wrongLetters,r=e.setPlayable,s=e.selectedWord,o=e.playAgain,i=e.currentQuestion,a=e.words,j=e.score,l=e.setScore,d="",h="",b=!0,x=!1;function g(){f||(f=!0,l((function(e){return e+1})))}return"win"===O(t,n,s)&&i<a.length-1?(d="Congratulations, you guessed it right!",b=!1,g()):"lose"===O(t,n,s)&&i<a.length-1?(d="Unfortunately, you could not guess it.",h="... the word was ".concat(s.toUpperCase()),b=!1):"lose"===O(t,n,s)&&i===a.length-1?(d="Unfortunately, you could not guess it.",h="... the word was ".concat(s.toUpperCase(),", You scored ").concat(j," out of ").concat(a.length),x=!0,b=!1):"win"===O(t,n,s)&&i===a.length-1&&(d="Congratulations, you guessed it right!",h="You scored ".concat(j," out of ").concat(a.length),x=!0,b=!1,g()),Object(c.useEffect)((function(){r(b),f=!b})),Object(u.jsx)("div",{className:"popup-container",style:""!==d?{display:"flex"}:{},children:Object(u.jsxs)("div",{className:"popup",children:[Object(u.jsx)("h2",{children:d}),Object(u.jsx)("h3",{children:h}),Object(u.jsx)("button",{onClick:function(){return o(x)},children:x?"Start Over":"Next Word"})]})})},g=function(e){var t=e.showNotification;return Object(u.jsx)("div",{className:"notification-container ".concat(t?"show":""),children:Object(u.jsx)("p",{children:"You have already entered this letter"})})},p=function(e){var t=e.score,n=e.words;return Object(u.jsx)("div",{children:Object(u.jsxs)("p",{children:["Score ",t,"/",n.length]})})},y=n(8),w=n.n(y),v=(n(15),"https://random-word-api.herokuapp.com/word?number=10&swear=0"),m="";var N=function(){var e=Object(c.useState)(""),t=Object(a.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(!0),o=Object(a.a)(s,2),O=o[0],f=o[1],y=Object(c.useState)([]),N=Object(a.a)(y,2),S=N[0],L=N[1],k=Object(c.useState)([]),E=Object(a.a)(k,2),C=E[0],W=E[1],A=Object(c.useState)(!1),Q=Object(a.a)(A,2),U=Q[0],P=Q[1],Y=Object(c.useState)(0),F=Object(a.a)(Y,2),J=F[0],K=F[1],R=Object(c.useState)(0),B=Object(a.a)(R,2),H=B[0],I=B[1],M=Object(c.useState)([]),T=Object(a.a)(M,2),q=T[0],z=T[1],D=Object(c.useState)("default"),G=Object(a.a)(D,2),V=G[0],X=G[1],Z=Object(c.useRef)();function $(e){var t=e.toLowerCase();m.includes(t)?C.includes(t)?b(P):W((function(e){return[].concat(Object(i.a)(e),[t])})):S.includes(t)?b(P):L((function(e){return[].concat(Object(i.a)(e),[t])}))}return Object(c.useEffect)((function(){fetch("/api").then((function(e){return e.json().then((function(e){console.log(e),r(e.tutorial)}))}))}),[]),Object(c.useEffect)((function(){fetch(v).then((function(e){return e.json()})).then((function(e){z(e)}))}),[]),Object(c.useEffect)((function(){0!==q.length&&(m=q[J])}),[q]),0!==q.length&&(m=q[J]),Object(c.useEffect)((function(){var e=function(e){var t=e.key,n=e.keyCode;O&&n>=65&&n<=90&&$(t)};return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[C,S,O]),Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("h1",{children:n}),Object(u.jsx)(j,{currentQuestion:J,words:q}),Object(u.jsx)(d,{wrongLetters:S}),Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(l,{wrongLetters:S}),0!==q.length&&Object(u.jsx)(h,{selectedWord:m,correctLetters:C}),!!U&&Object(u.jsx)(g,{showNotification:U}),0!==q.length&&Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(p,{score:H,words:q})}),Object(u.jsx)("div",{className:"Keyboard",children:Object(u.jsx)(w.a,{keyboardRef:function(e){return Z.current=e},layoutName:V,onKeyPress:function(e){var t=e.toUpperCase().charCodeAt();"{shift}"===e||"{lock}"===e?X("default"===V?"shift":"default"):O&&t>=65&&t<=90&&$(e)}})}),Object(u.jsx)(x,{correctLetters:C,wrongLetters:S,setPlayable:f,selectedWord:m,playAgain:function(e){if(f(!0),e)fetch(v).then((function(e){return e.json()})).then((function(e){z(e)})),K(0),I(0);else{var t=J+1;t<q.length?(m=q[t],K(t)):K(t)}W([]),L([])},currentQuestion:J,words:q,score:H,setScore:I})]})]})]})};o.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(N,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.3d44758a.chunk.js.map