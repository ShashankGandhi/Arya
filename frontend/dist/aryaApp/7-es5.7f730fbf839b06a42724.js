function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"7vJP":function(e,t,n){"use strict";n.r(t),n.d(t,"HomeModule",(function(){return g}));var i,r,a,o,c=n("fXoL"),s=n("tk/3"),b=n("tyNb"),l=n("m783"),u=((i=function e(t,n,i){_classCallCheck(this,e),this.http=t,this.router=n,this.apiService=i}).\u0275fac=function(e){return new(e||i)(c.Xb(s.b),c.Xb(b.a),c.Xb(l.a))},i.\u0275prov=c.Jb({token:i,factory:i.\u0275fac}),i),f=n("3Pt+"),h=n("jhN1"),d=[{path:"",component:(r=function(){function e(t,n){_classCallCheck(this,e),this.sanitizer=t,this.router=n}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"transform",value:function(){return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image)}},{key:"handleInputChange",value:function(e){this.file=e.target.files[0];var t=new FileReader;this.file.type.match(/image-*/)?(t.onloadend=this._handleReaderLoaded.bind(this),t.readAsDataURL(this.file)):alert("invalid format")}},{key:"_handleReaderLoaded",value:function(e){this.base64Image=e.target.result}},{key:"submit",value:function(){this.showImage=!0}},{key:"logout",value:function(){localStorage.clear(),this.router.navigate(["/login"])}}]),e}(),r.\u0275fac=function(e){return new(e||r)(c.Nb(h.b),c.Nb(b.a))},r.\u0275cmp=c.Hb({type:r,selectors:[["app-home"]],decls:27,vars:2,consts:[[1,"flex","justify-between"],[3,"click"],[1,"align-center"],[1,"row"],[1,"col","md","4"],["height","200",3,"hidden","src"],[1,"col","md","6"],["type","file",3,"change"]],template:function(e,t){1&e&&(c.Tb(0,"h3"),c.rc(1,"Image Upload view"),c.Sb(),c.Tb(2,"div",0),c.Ob(3,"h3"),c.Tb(4,"div"),c.Tb(5,"button",1),c.bc("click",(function(){return t.logout()})),c.rc(6,"Logout"),c.Sb(),c.Sb(),c.Sb(),c.Ob(7,"br"),c.Ob(8,"br"),c.Ob(9,"br"),c.Rb(10,2),c.Tb(11,"div",3),c.Tb(12,"div",4),c.Tb(13,"h4"),c.rc(14,"Uploaded images are shown here"),c.Sb(),c.Ob(15,"img",5),c.Sb(),c.Ob(16,"br"),c.Ob(17,"br"),c.Ob(18,"br"),c.Tb(19,"div",6),c.Tb(20,"h4"),c.rc(21,"Hello User, please upload image and click on submit to preview"),c.Sb(),c.Ob(22,"br"),c.Ob(23,"br"),c.Tb(24,"input",7),c.bc("change",(function(e){return t.handleInputChange(e)})),c.Sb(),c.Tb(25,"button",1),c.bc("click",(function(){return t.submit()})),c.rc(26,"Submit"),c.Sb(),c.Sb(),c.Sb(),c.Qb()),2&e&&(c.Cb(15),c.hc("hidden",!t.showImage)("src",t.transform(),c.lc))},styles:[".flex[_ngcontent-%COMP%]{display:flex}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}body[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{text-align:center}"]}),r)}],p=((o=function e(){_classCallCheck(this,e)}).\u0275mod=c.Lb({type:o}),o.\u0275inj=c.Kb({factory:function(e){return new(e||o)},imports:[[b.b.forChild(d)],b.b]}),o),g=((a=function e(){_classCallCheck(this,e)}).\u0275mod=c.Lb({type:a}),a.\u0275inj=c.Kb({factory:function(e){return new(e||a)},providers:[u],imports:[[f.c,p]]}),a)}}]);