(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(a,o){function i(t){try{c(r.next(t))}catch(e){o(e)}}function u(t){try{c(r.throw(t))}catch(e){o(e)}}function c(t){t.done?a(t.value):new n(function(e){e(t.value)}).then(i,u)}c((r=r.apply(t,e||[])).next())})},a=this&&this.__generator||function(t,e){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=e.call(t,i)}catch(u){o=[6,u],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.sortObjs=function(t,e){var n=t.concat();return n.sort(function(t,n){var r=e(t),a=e(n);return r>a?1:r<a?-1:0}),n},e.asyncMap=function(t,e){return r(this,void 0,void 0,function(){var n,r,o;return a(this,function(a){switch(a.label){case 0:n=[],r=0,a.label=1;case 1:return r<t.length?[4,e(t[r],r,t)]:[3,4];case 2:o=a.sent(),n.push(o),a.label=3;case 3:return r++,[3,1];case 4:return[2,n]}})})},e.notEmpty=function(t){return null!==t&&void 0!==t}},20:function(t,e,n){"use strict";var r;Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Vimeo="vimeo",t.YouTube="youtube"}(r=e.VideoHost||(e.VideoHost={}));var a=function(){function t(t){this.data=t}return t.prototype.displayHost=function(){switch(this.data.host){case r.Vimeo:return"Vimeo";case r.YouTube:return"YouTube";default:return"???"}},t.prototype.displayDuration=function(){var t=this.data.duration;return Math.floor(t/60).toString()+":"+(t%60).toString().padStart(2,"0")},t.now=function(){return(new Date).toISOString().substring(0,10)},t.fromVimeo=function(e,n){return n?new t({key:e,host:r.Vimeo,url:n.link,name:n.name,description:n.description,imgUrl:n.pictures.sizes.concat().pop().link,duration:n.duration,published_at:n.release_time.substring(0,10),created_at:this.now()}):(console.log("no data for:",e),null)},t}();e.Video=a},21:function(t,e,n){"use strict";function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(34)),r(n(38)),r(n(19)),r(n(20))},26:function(t,e,n){t.exports=n(57)},34:function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=r(n(35));e.verifyPassword=function(t){return a.default(t)===Object({NODE_ENV:"production",PUBLIC_URL:"."}).ADMIN_PASSWORD}},38:function(t,e,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var a=n(19),o=n(20),i={sortCallback:function(t){return t.data.key},reverse:!1};var u=function(){function t(t){var e=t.videos.map(function(t){return new o.Video(t)});this.lookup=e.reduce(function(t,e){return t[e.data.key]=e,t},{}),this.blacklist=t.blacklist}return t.prototype.addVideo=function(t){var e=t.data.key;this.lookup[e]||this.blacklist.includes(e)||(this.lookup[e]=t)},t.prototype.getVideos=function(t){var e=this.lookup,n=function(t){var e=r({},i);return Object.keys(i).forEach(function(n){t&&void 0!==t[n]&&(e[n]=t[n])}),e}(t),o=Object.keys(e).map(function(t){return e[t]}),u=a.sortObjs(o,n.sortCallback);return n.reverse?u.reverse():u},t.prototype.contains=function(t){return!!this.lookup[t]},t.prototype.toJson=function(){var t={videos:this.getVideos().map(function(t){return t.data}),blacklist:this.blacklist};return JSON.stringify(t,null,2)},t.makeEmpty=function(){return new t({videos:[],blacklist:[]})},t}();e.Database=u},56:function(t,e,n){},57:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(12),i=n.n(o),u=n(3),c=n.n(u),s=n(4),l=n(5),f=n(6),p=n(8),h=n(7),d=n(9),v=n(1),b=n(21),m=n(14),g=n(2),y="\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: no-wrap;\n",k=n(11);function w(){var t=Object(v.a)(["\n  font-family: monospace;\n  font-weight: bold;\n  font-size: 1.5rem;\n\n  ","\n"]);return w=function(){return t},t}function O(){var t=Object(v.a)(["\n  font-style: italic;\n  text-align: left;\n\n  ","\n"]);return O=function(){return t},t}function j(){var t=Object(v.a)(["\n  width: 100%;\n  height: 3rem;\n\n  ","\n  flex-direction: row;\n  justify-content: space-between;\n"]);return j=function(){return t},t}function E(){var t=Object(v.a)(["\n  font-size: 1.5rem;\n  font-weight: bold;\n  flex: 1;\n\n  ","\n"]);return E=function(){return t},t}function x(){var t=Object(v.a)(["\n  height: 8rem;\n  width: 100%;\n  padding: 0px 1em;\n  border-radius: 0px 0px 0.5rem 0.5rem;\n  box-sizing: border-box;\n\n  ","\n\n  color: var(--foreground);\n  background-color: var(--background);\n"]);return x=function(){return t},t}function _(){var t=Object(v.a)(["\n  width: 100%;\n  flex: 1;\n\n  ","\n\n  & img {\n    height: 100%;\n    min-width: 100%;\n  }\n"]);return _=function(){return t},t}function S(){var t=Object(v.a)(["\n  border-radius: 0.5rem 0.5rem 0px 0px;\n  width: 400px;\n  height: 350px;\n  margin: 16px;\n  overflow: hidden;\n  text-decoration: none;\n\n  ","\n\n  --foreground: black;\n  --background: white;\n  &:hover {\n    --foreground: white;\n    --background: black;\n  }\n"]);return S=function(){return t},t}var C=g.a.a(S(),y),V=g.a.div(_(),y),P=g.a.div(x(),y),L=g.a.div(E(),y),D=g.a.div(j(),y),N=g.a.div(O(),y),U=g.a.div(w(),y),I=function(t){function e(){return Object(l.a)(this,e),Object(p.a)(this,Object(h.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(f.a)(e,[{key:"render",value:function(){var t=this.props.video;return a.a.createElement(C,{href:t.data.url},a.a.createElement(V,null,a.a.createElement("img",{src:t.data.imgUrl})),a.a.createElement(P,null,a.a.createElement(L,null,t.data.name),a.a.createElement(D,null,a.a.createElement(N,null,"Published on ",t.displayHost(),a.a.createElement("br",null),t.data.published_at),a.a.createElement(U,null,t.displayDuration()))))}}]),e}(a.a.Component);function R(){var t=Object(v.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-start;\n  flex-wrap: wrap;\n"]);return R=function(){return t},t}function M(){var t=Object(v.a)(["\n  & > * {\n    margin: 0px 0.5rem;\n  }\n"]);return M=function(){return t},t}var T=g.a.div(M()),A=g.a.div(R()),B=function(t){function e(){var t,n;Object(l.a)(this,e);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(p.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(a)))).state={sortOptionKey:"pubNew"},n.sortOptions={alpha:{sortCallback:function(t){return t.data.name},reverse:!1},lenShort:{sortCallback:function(t){return t.data.duration},reverse:!1},lenLong:{sortCallback:function(t){return t.data.duration},reverse:!0},pubNew:{sortCallback:function(t){return t.data.published_at},reverse:!0},pubOld:{sortCallback:function(t){return t.data.published_at},reverse:!1}},n}return Object(d.a)(e,t),Object(f.a)(e,[{key:"onChangeSort",value:function(t){this.setState({sortOptionKey:t.target.value})}},{key:"render",value:function(){var t=this,e=this.props.db,n=this.state.sortOptionKey,r=e&&e.getVideos(Object(k.a)({},this.sortOptions[n]||{}));return a.a.createElement("div",null,a.a.createElement(T,null,a.a.createElement("span",null,"Sort by:"),a.a.createElement("select",{onChange:function(e){return t.onChangeSort(e)}},a.a.createElement("option",{value:"pubNew"},"Published date, Newest"),a.a.createElement("option",{value:"pubOld"},"Published date, Oldest"),a.a.createElement("option",{value:"alpha"},"Alphabetic"),a.a.createElement("option",{value:"lenShort"},"Duration, Shortest"),a.a.createElement("option",{value:"lenLong"},"Duration, Longest"))),r?a.a.createElement(A,null,r.map(function(t){return a.a.createElement(I,{key:t.data.url,video:t})})):"loading...")}}]),e}(a.a.Component);function F(){var t=Object(v.a)(["\n  font-size: 1.5rem;\n"]);return F=function(){return t},t}var G=g.a.input(F()),H=function(t){function e(){var t,n;Object(l.a)(this,e);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(p.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(a)))).state={draft:""},n}return Object(d.a)(e,t),Object(f.a)(e,[{key:"onChange",value:function(t){this.setState({draft:t.target.value})}},{key:"onSubmit",value:function(t){t.preventDefault();var e=this.state.draft;e&&(this.setState({email:e}),this.requestLogin(e))}},{key:"requestLogin",value:function(){var t=Object(s.a)(c.a.mark(function t(e){var n,r,a;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=this.props.api,t.next=3,n.requestLogin(e);case 3:r=t.sent,a=r.token,this.setState({url:"/?token=".concat(a)});case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this,e=this.state,n=e.email,r=e.url;return n&&!r?a.a.createElement("div",null,"please wait, communicating with server..."):n?a.a.createElement("div",null,"our email service is down. click ",a.a.createElement("a",{href:r},"here")," to login"):a.a.createElement("div",null,a.a.createElement("form",{onSubmit:function(e){return t.onSubmit(e)}},a.a.createElement("label",null,"Enter your email to login / create an account",a.a.createElement("br",null),a.a.createElement(G,{type:"text",name:"email",onChange:function(e){return t.onChange(e)}})),a.a.createElement("input",{type:"submit",value:"submit"})))}}]),e}(a.a.Component),q="https://us-central1-shortstockpile.cloudfunctions.net/short-site-api",z="http://localhost:3001",J=function(){function t(e){Object(l.a)(this,t),this.base=void 0,this.cookies=void 0,this.base=Object({NODE_ENV:"production",PUBLIC_URL:"."}).REACT_APP_IS_DEV?z:q,this.cookies=e}return Object(f.a)(t,[{key:"fetch",value:function(t){function e(e,n,r){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){var t=Object(s.a)(c.a.mark(function t(e,n,r){var a;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(this.base+e,Object(k.a)({},n,{headers:{Accept:"application/json","Content-Type":"application/json","X-Token":this.cookies.get("token")},body:r?JSON.stringify(Object(k.a)({},r)):void 0}));case 2:if(!(a=t.sent).ok){t.next=9;break}return t.next=6,a.json();case 6:return t.abrupt("return",t.sent);case 9:throw"Error fetching";case 10:case"end":return t.stop()}},t,this)}));return function(e,n,r){return t.apply(this,arguments)}}())},{key:"get",value:function(){var t=Object(s.a)(c.a.mark(function t(e){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.fetch(e,{method:"GET"}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"post",value:function(){var t=Object(s.a)(c.a.mark(function t(e,n){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.fetch(e,{method:"POST"},n));case 1:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()},{key:"ping",value:function(){var t=Object(s.a)(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.get("/ping");case 2:e=t.sent,console.log(e);case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"whoami",value:function(){var t=Object(s.a)(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.get("/whoami"));case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"requestLogin",value:function(){var t=Object(s.a)(c.a.mark(function t(e){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.post("/requestLogin",{email:e}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}]),t}(),Y=n(24),K=n.n(Y);function W(){var t=Object(v.a)(["\n  padding: 2rem;\n  padding-top: 0rem;\n  h1 {\n    font-size: 3rem;\n    margin: 0px;\n  }\n"]);return W=function(){return t},t}function Z(){var t=Object(v.a)(["\n  cursor: pointer;\n  text-decoration: underline;\n"]);return Z=function(){return t},t}function X(){var t=Object(v.a)(["\n  font-style: italic;\n"]);return X=function(){return t},t}function Q(){var t=Object(v.a)(["\n  text-align: right;\n"]);return Q=function(){return t},t}function $(){var t=Object(v.a)(["\n  text-align: left;\n"]);return $=function(){return t},t}function tt(){var t=Object(v.a)(["\n  ","\n  flex-direction: row;\n  justify-content: space-between;\n\n  & > div {\n    margin: 1rem;\n    margin-bottom: 0rem;\n  }\n"]);return tt=function(){return t},t}function et(){var t=Object(v.a)(["\n  text-align: center;\n\n  color: #FFFFFF;\n  background-color: #333333;\n\n  min-height: 100vh;\n"]);return et=function(){return t},t}var nt={Login:"login",Gallery:"gallery"},rt=g.a.div(et()),at=g.a.div(tt(),y),ot=g.a.div($()),it=g.a.div(Q()),ut=g.a.div(X()),ct=g.a.div(Z()),st=g.a.div(W()),lt=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(p.a)(this,Object(h.a)(e).call(this,t))).state={view:nt.Gallery},n.api=void 0,n.api=new J(t.cookies),n}return Object(d.a)(e,t),Object(f.a)(e,[{key:"componentDidMount",value:function(){var t=this.props.cookies,e=function(){var t=K.a.parse(window.location.search).token;if(t&&"string"===typeof t)return history.replaceState({token:t},"","/"),decodeURIComponent(t)}();e&&t.set("token",e),!!t.get("token")&&this.fetchUserInfo(),this.fetchVideos()}},{key:"fetchUserInfo",value:function(){var t=Object(s.a)(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.api.whoami();case 2:e=t.sent,this.setState({user:{email:e.email}});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"fetchVideos",value:function(){var t=Object(s.a)(c.a.mark(function t(){var e,n,r;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(Object({NODE_ENV:"production",PUBLIC_URL:"."})),e=Object({NODE_ENV:"production",PUBLIC_URL:"."}).REACT_APP_IS_DEV?"http://localhost:8080/db.json":"https://storage.googleapis.com/shortstockpile.com/db.json",t.next=4,fetch(e);case 4:return n=t.sent,t.next=7,n.json();case 7:r=t.sent,this.setState({db:new b.Database(r)});case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"logout",value:function(){this.props.cookies.remove("token"),window.location.reload()}},{key:"testLogin",value:function(){window.location.href="\n      http://localhost:3000?token=VTJGc2RHVmtYMTlhWjNuQldxZk9PbEpOeGVaZDlra3BqalM4cUFmSE03RXhpMCtRZHRYbkhxWmh6OUxySk9HVw==\n    "}},{key:"changeView",value:function(t){this.setState({view:t})}},{key:"render",value:function(){var t=this,e=this.api,n=this.props.cookies,r=this.state,o=r.view,i=r.db,u=r.user;return a.a.createElement(rt,null,a.a.createElement(at,null,a.a.createElement(ot,null,Object({NODE_ENV:"production",PUBLIC_URL:"."}).REACT_APP_IS_DEV&&a.a.createElement(ct,{onClick:function(){return t.testLogin()}},"test login")),a.a.createElement(it,null,u?a.a.createElement("div",null,a.a.createElement(ut,null,u.email),a.a.createElement(ct,{onClick:function(){return t.logout()}},"log out")):a.a.createElement(ct,{onClick:function(){return t.changeView(nt.Login)}},"log in"))),a.a.createElement(st,null,a.a.createElement("h1",null,"short stockpile"),a.a.createElement("div",{onClick:function(){return t.api.ping()}}," work in progress by @mpaulweeks ")),o===nt.Gallery&&a.a.createElement(B,{cookies:n,db:i,api:e}),o===nt.Login&&a.a.createElement(H,{api:e}))}}]),e}(a.a.Component),ft=Object(m.b)(lt);n(56);i.a.render(a.a.createElement(m.a,null,a.a.createElement(ft,null)),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.2e1d56ad.chunk.js.map