(function(){"use strict";var t={7053:function(t,e,n){n(6992),n(8674),n(9601),n(7727);var r=n(144),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-main",[n("vtoast",{ref:"vtoast"}),n("router-view")],1)],1)},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-snackbar",{attrs:{timeout:3e3,top:"",right:""},model:{value:t.snackbar.open,callback:function(e){t.$set(t.snackbar,"open",e)},expression:"snackbar.open"}},[n("div",{staticClass:"d-flex justify-space-between"},[n("div",{staticClass:"mt-2"},[t._v(t._s(t.snackbar.text))]),n("v-btn",{staticClass:"ml-5",attrs:{color:"error"},on:{click:function(e){t.snackbar.open=!1}}},[t._v("X")])],1)])},u=[],c={name:"vtoast",data:function(){return{snackbar:{open:!1,text:""}}},methods:{show:function(t){this.snackbar.open=!0,this.snackbar.text=t.message}}},s=c,l=n(1001),f=n(3453),d=n.n(f),p=n(680),m=n(3202),v=(0,l.Z)(s,i,u,!1,null,null,null),h=v.exports;d()(v,{VBtn:p.Z,VSnackbar:m.Z});var b={name:"App",components:{vtoast:h},data:function(){return{}},mounted:function(){this.$root.vtoast=this.$refs.vtoast}},g=b,y=n(7524),k=n(7877),_=(0,l.Z)(g,o,a,!1,null,null,null),w=_.exports;d()(_,{VApp:y.Z,VMain:k.Z});n(1539),n(8783),n(3948);var C=n(8345),S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"marco_principal text-center"},[n("div",{staticClass:"marco_secundario",staticStyle:{display:"flex","justify-content":"center"}},[t._m(0),n("div",{staticClass:"div_btn"},[n("v-btn",{staticClass:"btn_inicio",staticStyle:{padding:"1.8rem !important","font-size":"1.5rem"},attrs:{to:"/inicio",rounded:"","x-large":"",elevation:"2"}},[t._v(" Iniciar Sesión ")]),n("v-btn",{staticClass:"btn_registro",staticStyle:{padding:"1.8rem !important","font-size":"1.5rem"},attrs:{to:"/registro",rounded:"","x-large":"",elevation:"2"}},[t._v(" Registrarse ")])],1)])])},x=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-center",staticStyle:{position:"relative",top:"18rem",left:"0.5rem",width:"80%"}},[r("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:n(1544),alt:""}})])}],Z={name:"Home"},E=Z,T=(0,l.Z)(E,S,x,!1,null,"b5c09b0a",null),O=T.exports;d()(T,{VBtn:p.Z});var j=n(629);r.Z.use(j.ZP);var A=new j.ZP.Store({state:{token:null},getters:{},mutations:{setToken:function(t,e){t.token=e}},actions:{leerToken:function(t){var e=t.commit;localStorage.getItem("token")?e("setToken",localStorage.getItem("token")):e("setToken",null)},cerrarSesion:function(t){var e=t.commit;e("setToken",null),localStorage.removeItem("token"),N.push({name:"login"})}},modules:{}});r.Z.use(C.Z);var P=[{path:"/",name:"home",component:O},{path:"/inicio",name:"inicio",component:function(){return n.e(443).then(n.bind(n,9611))}},{path:"/registro",name:"registro",component:function(){return n.e(443).then(n.bind(n,6726))}},{path:"/perfil",name:"perfil",component:function(){return n.e(443).then(n.bind(n,7320))},meta:{requireAuth:!0}},{path:"/planes_entrenador",name:"planes_entrenador",component:function(){return n.e(443).then(n.bind(n,3103))}},{path:"/navegacion_entrenador",name:"navegacion_entrenador",component:function(){return n.e(443).then(n.bind(n,6250))}},{path:"/rutinas_entrenador",name:"rutinas_entrenador",component:function(){return n.e(443).then(n.bind(n,8545))}},{path:"/admin",name:"Admin",component:function(){return n.e(443).then(n.bind(n,2865))}}],$=new C.Z({mode:"history",base:"/",routes:P});$.beforeEach((function(t,e,n){var r=t.matched.some((function(t){return t.meta.requireAuth}));A.dispatch("leerToken"),r&&null===A.state.token?n("/"):n()}));var N=$,B=n(9132);r.Z.use(B.Z);var I=new B.Z({});r.Z.config.productionTip=!1,new r.Z({router:N,store:A,vuetify:I,render:function(t){return t(w)}}).$mount("#app")},1544:function(t,e,n){t.exports=n.p+"img/text_logo.572e2042.png"}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(e,r,o,a){if(!r){var i=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],a=t[l][2];for(var u=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(t){return n.O[t](r[c])}))?r.splice(c--,1):(u=!1,a<i&&(i=a));if(u){t.splice(l--,1);var s=o();void 0!==s&&(e=s)}}return e}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[r,o,a]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,r){return n.f[r](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/about-legacy.6cafa7eb.js"}}(),function(){n.miniCssF=function(t){return"css/about.0201a0a2.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="app:";n.l=function(r,o,a,i){if(t[r])t[r].push(o);else{var u,c;if(void 0!==a)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var f=s[l];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==e+a){u=f;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",e+a),u.src=r),t[r]=[o];var d=function(e,n){u.onerror=u.onload=null,clearTimeout(p);var o=t[r];if(delete t[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(t){return t(n)})),e)return e(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var t=function(t,e,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=function(a){if(o.onerror=o.onload=null,"load"===a.type)n();else{var i=a&&("load"===a.type?"missing":a.type),u=a&&a.target&&a.target.href||e,c=new Error("Loading CSS chunk "+t+" failed.\n("+u+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=u,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=a,o.href=e,document.head.appendChild(o),o},e=function(t,e){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===t||a===e))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===t||a===e)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),u=n.p+i;if(e(i,u))return o();t(r,u,o,a)}))},o={143:0};n.f.miniCss=function(t,e){var n={443:1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=r(t).then((function(){o[t]=0}),(function(e){throw delete o[t],e})))}}(),function(){var t={143:0};n.f.j=function(e,r){var o=n.o(t,e)?t[e]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=t[e]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(e),u=new Error,c=function(r){if(n.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;u.message="Loading chunk "+e+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,o[1](u)}};n.l(i,c,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,a,i=r[0],u=r[1],c=r[2],s=0;if(i.some((function(e){return 0!==t[e]}))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(c)var l=c(n)}for(e&&e(r);s<i.length;s++)a=i[s],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(l)},r=self["webpackChunkapp"]=self["webpackChunkapp"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(7053)}));r=n.O(r)})();
//# sourceMappingURL=app-legacy.af46bbaf.js.map