(function dartProgram(){function copyProperties(a,b){var t=Object.keys(a)
for(var s=0;s<t.length;s++){var r=t[s]
b[r]=a[r]}}function mixinPropertiesHard(a,b){var t=Object.keys(a)
for(var s=0;s<t.length;s++){var r=t[s]
if(!b.hasOwnProperty(r)){b[r]=a[r]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var t=function(){}
t.prototype={p:{}}
var s=new t()
if(!(Object.getPrototypeOf(s)&&Object.getPrototypeOf(s).p===t.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var r=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(r))return true}}catch(q){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var t=Object.create(b.prototype)
copyProperties(a.prototype,t)
a.prototype=t}}function inheritMany(a,b){for(var t=0;t<b.length;t++){inherit(b[t],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazyOld(a,b,c,d){var t=a
a[b]=t
a[c]=function(){a[c]=function(){A.ag(b)}
var s
var r=d
try{if(a[b]===t){s=a[b]=r
s=a[b]=d()}else{s=a[b]}}finally{if(s===r){a[b]=null}a[c]=function(){return this[b]}}return s}}function lazy(a,b,c,d){var t=a
a[b]=t
a[c]=function(){if(a[b]===t){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var t=a
a[b]=t
a[c]=function(){if(a[b]===t){var s=d()
if(a[b]!==t){A.pR(b)}a[b]=s}var r=a[b]
a[c]=function(){return r}
return r}}function makeConstList(a){a.immutable$list=Array
a.fixed$length=Array
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var t=0;t<a.length;++t){convertToFastObject(a[t])}}var y=0
function instanceTearOffGetter(a,b){var t=null
return a?function(c){if(t===null)t=A.qm(b)
return new t(c,this)}:function(){if(t===null)t=A.qm(b)
return new t(this,null)}}function staticTearOffGetter(a){var t=null
return function(){if(t===null)t=A.qm(a).prototype
return t}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var t=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var s=staticTearOffGetter(t)
a[b]=s}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var t=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var s=instanceTearOffGetter(c,t)
a[b]=s}function setOrUpdateInterceptorsByTag(a){var t=v.interceptorsByTag
if(!t){v.interceptorsByTag=a
return}copyProperties(a,t)}function setOrUpdateLeafTags(a){var t=v.leafTags
if(!t){v.leafTags=a
return}copyProperties(a,t)}function updateTypes(a){var t=v.types
var s=t.length
t.push.apply(t,a)
return s}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var t=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},s=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:t(0,0,null,["$0"],0),_instance_1u:t(0,1,null,["$1"],0),_instance_2u:t(0,2,null,["$2"],0),_instance_0i:t(1,0,null,["$0"],0),_instance_1i:t(1,1,null,["$1"],0),_instance_2i:t(1,2,null,["$2"],0),_static_0:s(0,null,["$0"],0),_static_1:s(1,null,["$1"],0),_static_2:s(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,lazyOld:lazyOld,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
uM(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ks(a){var t,s,r,q,p,o=a[v.dispatchPropertyName]
if(o==null)if($.Bv==null){A.XD()
o=a[v.dispatchPropertyName]}if(o!=null){t=o.p
if(!1===t)return o.i
if(!0===t)return a
s=Object.getPrototypeOf(a)
if(t===s)return o.i
if(o.e===s)throw A.Og(A.SY("Return interceptor for "+A.Ej(t(a,o))))}r=a.constructor
if(r==null)q=null
else{p=$.zm
if(p==null)p=$.zm=v.getIsolateTag("_$dart_js")
q=r[p]}if(q!=null)return q
q=A.w3(a)
if(q!=null)return q
if(typeof a=="function")return B.DG
t=Object.getPrototypeOf(a)
if(t==null)return B.ZQ
if(t===Object.prototype)return B.ZQ
if(typeof r=="function"){p=$.zm
if(p==null)p=$.zm=v.getIsolateTag("_$dart_js")
Object.defineProperty(r,p,{value:B.vB,enumerable:false,writable:true,configurable:true})
return B.vB}return B.vB},
Ep(a){a.fixed$length=Array
return a},
un(a){a.fixed$length=Array
a.immutable$list=Array
return a},
Ga(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
c1(a,b){var t,s
for(;b>0;b=t){t=b-1
s=a.charCodeAt(t)
if(s!==32&&s!==13&&!J.Ga(s))break}return b},
U6(a){if(typeof a=="string")return J.Dr.prototype
if(a==null)return a
if(Array.isArray(a))return J.jd.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c5.prototype
if(typeof a=="symbol")return J.Dw.prototype
if(typeof a=="bigint")return J.yP.prototype
return a}if(a instanceof A.a)return a
return J.ks(a)},
c(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bU.prototype
return J.kD.prototype}if(typeof a=="string")return J.Dr.prototype
if(a==null)return J.CD.prototype
if(typeof a=="boolean")return J.yE.prototype
if(Array.isArray(a))return J.jd.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c5.prototype
if(typeof a=="symbol")return J.Dw.prototype
if(typeof a=="bigint")return J.yP.prototype
return a}if(a instanceof A.a)return a
return J.ks(a)},
rY(a){if(typeof a=="string")return J.Dr.prototype
if(a==null)return a
if(!(a instanceof A.a))return J.kd.prototype
return a},
w1(a){if(a==null)return a
if(Array.isArray(a))return J.jd.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c5.prototype
if(typeof a=="symbol")return J.Dw.prototype
if(typeof a=="bigint")return J.yP.prototype
return a}if(a instanceof A.a)return a
return J.ks(a)},
Av(a,b){return J.w1(a).Z(a,b)},
CR(a){return J.c(a).gbx(a)},
GE(a){return J.rY(a).OF(a)},
Hm(a){return J.U6(a).gB(a)},
I(a){return J.w1(a).gkz(a)},
Jy(a,b){return J.c(a).e7(a,b)},
M1(a,b,c){return J.w1(a).E2(a,b,c)},
Nu(a){return J.c(a).giO(a)},
cf(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.c(a).DN(a,b)},
t(a){return J.c(a)["["](a)},
vB:function vB(){},
yE:function yE(){},
CD:function CD(){},
MF:function MF(){},
zh:function zh(){},
iC:function iC(){},
kd:function kd(){},
c5:function c5(){},
yP:function yP(){},
Dw:function Dw(){},
jd:function jd(a){this.$ti=a},
Po:function Po(a){this.$ti=a},
D:function D(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
qI:function qI(){},
bU:function bU(){},
kD:function kD(){},
Dr:function Dr(){}},A={FK:function FK(){},
yc(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
qL(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
y(a){var t,s
for(t=$.Qu.length,s=0;s<t;++s)if(a===$.Qu[s])return!0
return!1},
K1(a,b,c,d){if(u.Q.b(a))return new A.xy(a,b,c.C("@<0>").Kq(d).C("xy<1,2>"))
return new A.i1(a,b,c.C("@<0>").Kq(d).C("i1<1,2>"))},
n:function n(a){this.a=a},
zl:function zl(){},
bQ:function bQ(){},
aL:function aL(){},
a7:function a7(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
i1:function i1(a,b,c){this.a=a
this.b=b
this.$ti=c},
xy:function xy(a,b,c){this.a=a
this.b=b
this.$ti=c},
MH:function MH(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
A8:function A8(a,b,c){this.a=a
this.b=b
this.$ti=c},
SU:function SU(){},
wv:function wv(a){this.a=a},
p(a){var t=v.mangledGlobalNames[a]
if(t!=null)return t
return"minified:"+a},
wV(a,b){var t
if(b!=null){t=b.x
if(t!=null)return t}return u.p.b(a)},
Ej(a){var t
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
t=J.t(a)
return t},
eQ(a){var t,s=$.xu
if(s==null)s=$.xu=Symbol("identityHashCode")
t=a[s]
if(t==null){t=Math.random()*0x3fffffff|0
a[s]=t}return t},
Hp(a,b){var t,s,r,q,p,o=null,n=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(n==null)return o
t=n[3]
if(b<2||b>36)throw A.Og(A.TE(b,2,36,"radix",o))
if(b===10&&t!=null)return parseInt(a,10)
if(b<10||t==null){s=b<=10?47+b:86+b
r=n[1]
for(q=r.length,p=0;p<q;++p)if((r.charCodeAt(p)|32)>s)return o}return parseInt(a,b)},
l(a){return A.H(a)},
H(a){var t,s,r,q
if(a instanceof A.a)return A.m(A.d(a),null)
t=J.c(a)
if(t===B.Ok||t===B.Ub||u.o.b(a)){s=B.O4(a)
if(s!=="Object"&&s!=="")return s
r=a.constructor
if(typeof r=="function"){q=r.name
if(typeof q=="string"&&q!=="Object"&&q!=="")return q}}return A.m(A.d(a),null)},
ik(a){if(a==null||typeof a=="number"||A.rQ(a))return J.t(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.Tp)return a["["](0)
if(a instanceof A.S5)return a.k(!0)
return"Instance of '"+A.l(a)+"'"},
Lw(a){var t
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){t=a-65536
return String.fromCharCode((B.jn.A(t,10)|55296)>>>0,t&1023|56320)}}throw A.Og(A.TE(a,0,1114111,null,null))},
zo(a,b,c){var t,s,r={}
r.a=0
t=[]
s=[]
r.a=b.length
B.Nm.FV(t,b)
r.b=""
if(c!=null&&c.a!==0)c.aN(0,new A.Cj(r,s,t))
return J.Jy(a,new A.LI(B.Te,0,t,s,0))},
im(a,b,c){var t,s,r
if(Array.isArray(b))t=c==null||c.a===0
else t=!1
if(t){s=b.length
if(s===0){if(!!a.$0)return a.$0()}else if(s===1){if(!!a.$1)return a.$1(b[0])}else if(s===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(s===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(s===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(s===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
r=a[""+"$"+s]
if(r!=null)return r.apply(a,b)}return A.Tl(a,b,c)},
Tl(a,b,c){var t,s,r,q,p,o,n,m,l,k,j,i,h=Array.isArray(b)?b:A.Y1(b,u.z),g=h.length,f=a.$R
if(g<f)return A.zo(a,h,c)
t=a.$D
s=t==null
r=!s?t():null
q=J.c(a)
p=q.$C
if(typeof p=="string")p=q[p]
if(s){if(c!=null&&c.a!==0)return A.zo(a,h,c)
if(g===f)return p.apply(a,h)
return A.zo(a,h,c)}if(Array.isArray(r)){if(c!=null&&c.a!==0)return A.zo(a,h,c)
o=f+r.length
if(g>o)return A.zo(a,h,null)
if(g<o){n=r.slice(g-f)
if(h===b)h=A.Y1(h,u.z)
B.Nm.FV(h,n)}return p.apply(a,h)}else{if(g>f)return A.zo(a,h,c)
if(h===b)h=A.Y1(h,u.z)
m=Object.keys(r)
if(c==null)for(s=m.length,l=0;l<m.length;m.length===s||(0,A.G)(m),++l){k=r[m[l]]
if(B.Nv===k)return A.zo(a,h,c)
B.Nm.P(h,k)}else{for(s=m.length,j=0,l=0;l<m.length;m.length===s||(0,A.G)(m),++l){i=m[l]
if(c.x4(i)){++j
B.Nm.P(h,c.q(0,i))}else{k=r[i]
if(B.Nv===k)return A.zo(a,h,c)
B.Nm.P(h,k)}}if(j!==c.a)return A.zo(a,h,c)}return p.apply(a,h)}},
HY(a,b){var t,s="index"
if(!A.ok(b))return new A.AT(!0,b,s,null)
t=J.Hm(a)
if(b<0||b>=t)return A.xF(b,t,a,s)
return new A.bJ(null,null,!0,b,s,"Value not in range")},
Og(a){return A.j(new Error(),a)},
j(a,b){var t
if(b==null)b=new A.E()
a.dartException=b
t=A.J
if("defineProperty" in Object){Object.defineProperty(a,"message",{get:t})
a.name=""}else a.toString=t
return a},
J(){return J.t(this.dartException)},
vh(a){throw A.Og(a)},
A(a,b){throw A.j(b,a)},
G(a){throw A.Og(A.a4(a))},
CU(a){if(a==null)return J.Nu(a)
if(typeof a=="object")return A.eQ(a)
return J.Nu(a)},
dJ(a,b){var t,s,r,q=a.length
for(t=0;t<q;t=r){s=t+1
r=s+1
b.t(0,a[t],a[s])}return b},
i(a1){var t,s,r,q,p,o,n,m,l,k,j=a1.co,i=a1.iS,h=a1.iI,g=a1.nDA,f=a1.aI,e=a1.fs,d=a1.cs,c=e[0],b=d[0],a=j[c],a0=a1.fT
a0.toString
t=i?Object.create(new A.z().constructor.prototype):Object.create(new A.r(null,null).constructor.prototype)
t.$initialize=t.constructor
s=i?function static_tear_off(){this.$initialize()}:function tear_off(a2,a3){this.$initialize(a2,a3)}
t.constructor=s
s.prototype=t
t.$_name=c
t.$_target=a
r=!i
if(r)q=A.k(c,a,h,g)
else{t.$static_name=c
q=a}t.$S=A.q(a0,i,h)
t[b]=q
for(p=q,o=1;o<e.length;++o){n=e[o]
if(typeof n=="string"){m=j[n]
l=n
n=m}else l=""
k=d[o]
if(k!=null){if(r)n=A.k(l,n,h,g)
t[k]=n}if(o===f)p=n}t.$C=p
t.$R=a1.rC
t.$D=a1.dV
return s},
q(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.Og("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.Tn)}throw A.Og("Error in functionType of tearoff")},
vq(a,b,c,d){var t=A.yS
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,t)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,t)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,t)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,t)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,t)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,t)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,t)}},
k(a,b,c,d){if(c)return A.Hf(a,b,d)
return A.vq(b.length,d,a,b)},
Zq(a,b,c,d){var t=A.yS,s=A.AO
switch(b?-1:a){case 0:throw A.Og(new A.Eq("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,s,t)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,s,t)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,s,t)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,s,t)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,s,t)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,s,t)
default:return function(e,f,g){return function(){var r=[g(this)]
Array.prototype.push.apply(r,arguments)
return e.apply(f(this),r)}}(d,s,t)}},
Hf(a,b,c){var t,s
if($.Hb==null)$.Hb=A.L4("interceptor")
if($.i0==null)$.i0=A.L4("receiver")
t=b.length
s=A.Zq(t,c,a,b)
return s},
qm(a){return A.i(a)},
Tn(a,b){return A.cE(v.typeUniverse,A.d(a.a),b)},
yS(a){return a.a},
AO(a){return a.b},
L4(a){var t,s,r,q=new A.r("receiver","interceptor"),p=J.Ep(Object.getOwnPropertyNames(q))
for(t=p.length,s=0;s<t;++s){r=p[s]
if(q[r]===a)return r}throw A.Og(A.xY("Field name "+a+" not found."))},
ag(a){throw A.Og(new A.GK(a))},
L(a){return v.getIsolateTag(a)},
w3(a){var t,s,r,q,p,o=$.NF.$1(a),n=$.nw[o]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.vv[o]
if(t!=null)return t
s=v.interceptorsByTag[o]
if(s==null){r=$.TX.$2(a,o)
if(r!=null){n=$.nw[r]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.vv[r]
if(t!=null)return t
s=v.interceptorsByTag[r]
o=r}}if(s==null)return null
t=s.prototype
q=o[0]
if(q==="!"){n=A.Va(t)
$.nw[o]=n
Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}if(q==="~"){$.vv[o]=t
return t}if(q==="-"){p=A.Va(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}if(q==="+")return A.Lc(a,t)
if(q==="*")throw A.Og(A.SY(o))
if(v.leafTags[o]===true){p=A.Va(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}else return A.Lc(a,t)},
Lc(a,b){var t=Object.getPrototypeOf(a)
Object.defineProperty(t,v.dispatchPropertyName,{value:J.uM(b,t,null,null),enumerable:false,writable:true,configurable:true})
return b},
Va(a){return J.uM(a,!1,null,!!a.$iXj)},
VF(a,b,c){var t=b.prototype
if(v.leafTags[a]===true)return A.Va(t)
else return J.uM(t,c,null,null)},
XD(){if(!0===$.Bv)return
$.Bv=!0
A.Z1()},
Z1(){var t,s,r,q,p,o,n,m
$.nw=Object.create(null)
$.vv=Object.create(null)
A.kO()
t=v.interceptorsByTag
s=Object.getOwnPropertyNames(t)
if(typeof window!="undefined"){window
r=function(){}
for(q=0;q<s.length;++q){p=s[q]
o=$.x7.$1(p)
if(o!=null){n=A.VF(p,t[p],o)
if(n!=null){Object.defineProperty(o,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
r.prototype=o}}}}for(q=0;q<s.length;++q){p=s[q]
if(/^[A-Za-z_]/.test(p)){m=t[p]
t["!"+p]=m
t["~"+p]=m
t["-"+p]=m
t["+"+p]=m
t["*"+p]=m}}},
kO(){var t,s,r,q,p,o,n=B.Yq()
n=A.ud(B.KU,A.ud(B.fQ,A.ud(B.i7,A.ud(B.i7,A.ud(B.xi,A.ud(B.dk,A.ud(B.wb(B.O4),n)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){t=dartNativeDispatchHooksTransformer
if(typeof t=="function")t=[t]
if(Array.isArray(t))for(s=0;s<t.length;++s){r=t[s]
if(typeof r=="function")n=r(n)||n}}q=n.getTag
p=n.getUnknownTag
o=n.prototypeForTag
$.NF=new A.dC(q)
$.TX=new A.wN(p)
$.x7=new A.VX(o)},
ud(a,b){return a(b)||b},
Wk(a,b){var t=b.length,s=v.rttc[""+t+";"+a]
if(s==null)return null
if(t===0)return s
if(t===s.length)return s.apply(null,b)
return s(b)},
m2(a,b,c){var t=a.indexOf(b,c)
return t>=0},
S0:function S0(a,b){this.a=a
this.b=b},
PD:function PD(a,b){this.a=a
this.$ti=b},
ys:function ys(){},
LP:function LP(a,b,c){this.a=a
this.b=b
this.$ti=c},
Ku:function Ku(a,b){this.a=a
this.$ti=b},
vI:function vI(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
LI:function LI(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e},
Cj:function Cj(a,b,c){this.a=a
this.b=b
this.c=c},
Tp:function Tp(){},
E1:function E1(){},
lc:function lc(){},
z:function z(){},
r:function r(a,b){this.a=a
this.b=b},
GK:function GK(a){this.a=a},
Eq:function Eq(a){this.a=a},
kr:function kr(){},
N5:function N5(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
db:function db(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
i5:function i5(a,b){this.a=a
this.$ti=b},
N6:function N6(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
dC:function dC(a){this.a=a},
wN:function wN(a){this.a=a},
VX:function VX(a){this.a=a},
S5:function S5(){},
B7:function B7(){},
od(a,b,c){if(a>>>0!==a||a>=c)throw A.Og(A.HY(b,a))},
WZ:function WZ(){},
eH:function eH(){},
df:function df(){},
b0:function b0(){},
Dg:function Dg(){},
DV:function DV(){},
zU:function zU(){},
K8:function K8(){},
xj:function xj(){},
dE:function dE(){},
ZA:function ZA(){},
wf:function wf(){},
Pq:function Pq(){},
eE:function eE(){},
V6:function V6(){},
VR:function VR(){},
vX:function vX(){},
WB:function WB(){},
VS:function VS(){},
cz(a,b){var t=b.c
return t==null?b.c=A.Bc(a,b.x,!0):t},
xZ(a,b){var t=b.c
return t==null?b.c=A.Q2(a,"b8",[b.x]):t},
Q1(a){var t=a.w
if(t===6||t===7||t===8)return A.Q1(a.x)
return t===12||t===13},
mD(a){return a.as},
q7(a){return A.Ew(v.typeUniverse,a,!1)},
PL(a0,a1,a2,a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.w
switch(a){case 5:case 1:case 2:case 3:case 4:return a1
case 6:t=a1.x
s=A.PL(a0,t,a2,a3)
if(s===t)return a1
return A.SO(a0,s,!0)
case 7:t=a1.x
s=A.PL(a0,t,a2,a3)
if(s===t)return a1
return A.Bc(a0,s,!0)
case 8:t=a1.x
s=A.PL(a0,t,a2,a3)
if(s===t)return a1
return A.LN(a0,s,!0)
case 9:r=a1.y
q=A.bZ(a0,r,a2,a3)
if(q===r)return a1
return A.Q2(a0,a1.x,q)
case 10:p=a1.x
o=A.PL(a0,p,a2,a3)
n=a1.y
m=A.bZ(a0,n,a2,a3)
if(o===p&&m===n)return a1
return A.ap(a0,o,m)
case 11:l=a1.x
k=a1.y
j=A.bZ(a0,k,a2,a3)
if(j===k)return a1
return A.oP(a0,l,j)
case 12:i=a1.x
h=A.PL(a0,i,a2,a3)
g=a1.y
f=A.qT(a0,g,a2,a3)
if(h===i&&f===g)return a1
return A.Nf(a0,h,f)
case 13:e=a1.y
a3+=e.length
d=A.bZ(a0,e,a2,a3)
p=a1.x
o=A.PL(a0,p,a2,a3)
if(d===e&&o===p)return a1
return A.DS(a0,o,d,!0)
case 14:c=a1.x
if(c<a3)return a1
b=a2[c-a3]
if(b==null)return a1
return b
default:throw A.Og(A.hV("Attempted to substitute unexpected RTI kind "+a))}},
bZ(a,b,c,d){var t,s,r,q,p=b.length,o=A.vU(p)
for(t=!1,s=0;s<p;++s){r=b[s]
q=A.PL(a,r,c,d)
if(q!==r)t=!0
o[s]=q}return t?o:b},
vO(a,b,c,d){var t,s,r,q,p,o,n=b.length,m=A.vU(n)
for(t=!1,s=0;s<n;s+=3){r=b[s]
q=b[s+1]
p=b[s+2]
o=A.PL(a,p,c,d)
if(o!==p)t=!0
m.splice(s,3,r,q,o)}return t?m:b},
qT(a,b,c,d){var t,s=b.a,r=A.bZ(a,s,c,d),q=b.b,p=A.bZ(a,q,c,d),o=b.c,n=A.vO(a,o,c,d)
if(r===s&&p===q&&n===o)return b
t=new A.ET()
t.a=r
t.b=p
t.c=n
return t},
u(a,b){a[v.arrayRti]=b
return a},
JS(a){var t=a.$S
if(t!=null){if(typeof t=="number")return A.Bp(t)
return a.$S()}return null},
Ue(a,b){var t
if(A.Q1(b))if(a instanceof A.Tp){t=A.JS(a)
if(t!=null)return t}return A.d(a)},
d(a){if(a instanceof A.a)return A.Lh(a)
if(Array.isArray(a))return A.t6(a)
return A.VU(J.c(a))},
t6(a){var t=a[v.arrayRti],s=u.b
if(t==null)return s
if(t.constructor!==s.constructor)return s
return t},
Lh(a){var t=a.$ti
return t!=null?t:A.VU(a)},
VU(a){var t=a.constructor,s=t.$ccache
if(s!=null)return s
return A.r9(a,t)},
r9(a,b){var t=a instanceof A.Tp?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,s=A.ai(v.typeUniverse,t.name)
b.$ccache=s
return s},
Bp(a){var t,s=v.types,r=s[a]
if(typeof r=="string"){t=A.Ew(v.typeUniverse,r,!1)
s[a]=t
return t}return r},
RW(a){return A.Kx(A.Lh(a))},
tu(a){var t
if(a instanceof A.S5)return A.Mi(a.$r,a.n())
t=a instanceof A.Tp?A.JS(a):null
if(t!=null)return t
if(u.R.b(a))return J.CR(a).a
if(Array.isArray(a))return A.t6(a)
return A.d(a)},
Kx(a){var t=a.r
return t==null?a.r=A.D6(a):t},
D6(a){var t,s,r=a.as,q=r.replace(/\*/g,"")
if(q===r)return a.r=new A.lY(a)
t=A.Ew(v.typeUniverse,q,!0)
s=t.r
return s==null?t.r=A.D6(t):s},
Mi(a,b){var t,s,r=b,q=r.length
if(q===0)return u.d
t=A.cE(v.typeUniverse,A.tu(r[0]),"@<0>")
for(s=1;s<q;++s)t=A.v5(v.typeUniverse,t,A.tu(r[s]))
return A.cE(v.typeUniverse,t,a)},
xq(a){return A.Kx(A.Ew(v.typeUniverse,a,!1))},
JJ(a){var t,s,r,q,p,o,n=this
if(n===u.K)return A.RE(n,a,A.ke)
if(!A.Z4(n))if(!(n===u._))t=!1
else t=!0
else t=!0
if(t)return A.RE(n,a,A.Iw)
t=n.w
if(t===7)return A.RE(n,a,A.AQ)
if(t===1)return A.RE(n,a,A.JY)
s=t===6?n.x:n
r=s.w
if(r===8)return A.RE(n,a,A.fg)
if(s===u.S)q=A.ok
else if(s===u.i||s===u.H)q=A.KH
else if(s===u.N)q=A.MM
else q=s===u.y?A.rQ:null
if(q!=null)return A.RE(n,a,q)
if(r===9){p=s.x
if(s.y.every(A.BU)){n.f="$i"+p
if(p==="zM")return A.RE(n,a,A.yM)
return A.RE(n,a,A.t4)}}else if(r===11){o=A.Wk(s.x,s.y)
return A.RE(n,a,o==null?A.JY:o)}return A.RE(n,a,A.YO)},
RE(a,b,c){a.b=c
return a.b(b)},
Au(a){var t,s=this,r=A.Oz
if(!A.Z4(s))if(!(s===u._))t=!1
else t=!0
else t=!0
if(t)r=A.hn
else if(s===u.K)r=A.Ti
else{t=A.lR(s)
if(t)r=A.l4}s.a=r
return s.a(a)},
Qj(a){var t,s=a.w
if(!A.Z4(a))if(!(a===u._))if(!(a===u.A))if(s!==7)if(!(s===6&&A.Qj(a.x)))t=s===8&&A.Qj(a.x)||a===u.P||a===u.T
else t=!0
else t=!0
else t=!0
else t=!0
else t=!0
return t},
YO(a){var t=this
if(a==null)return A.Qj(t)
return A.t1(v.typeUniverse,A.Ue(a,t),t)},
AQ(a){if(a==null)return!0
return this.x.b(a)},
t4(a){var t,s=this
if(a==null)return A.Qj(s)
t=s.f
if(a instanceof A.a)return!!a[t]
return!!J.c(a)[t]},
yM(a){var t,s=this
if(a==null)return A.Qj(s)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
t=s.f
if(a instanceof A.a)return!!a[t]
return!!J.c(a)[t]},
Oz(a){var t=this
if(a==null){if(A.lR(t))return a}else if(t.b(a))return a
A.m4(a,t)},
l4(a){var t=this
if(a==null)return a
else if(t.b(a))return a
A.m4(a,t)},
m4(a,b){throw A.Og(A.Zc(A.WK(a,A.m(b,null))))},
WK(a,b){return A.K(a)+": type '"+A.m(A.tu(a),null)+"' is not a subtype of type '"+b+"'"},
Zc(a){return new A.iM("TypeError: "+a)},
Lz(a,b){return new A.iM("TypeError: "+A.WK(a,b))},
fg(a){var t=this,s=t.w===6?t.x:t
return s.x.b(a)||A.xZ(v.typeUniverse,s).b(a)},
ke(a){return a!=null},
Ti(a){if(a!=null)return a
throw A.Og(A.Lz(a,"Object"))},
Iw(a){return!0},
hn(a){return a},
JY(a){return!1},
rQ(a){return!0===a||!1===a},
p8(a){if(!0===a)return!0
if(!1===a)return!1
throw A.Og(A.Lz(a,"bool"))},
y8(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Og(A.Lz(a,"bool"))},
M4(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Og(A.Lz(a,"bool?"))},
rV(a){if(typeof a=="number")return a
throw A.Og(A.Lz(a,"double"))},
GH(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Og(A.Lz(a,"double"))},
Qk(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Og(A.Lz(a,"double?"))},
ok(a){return typeof a=="number"&&Math.floor(a)===a},
IZ(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.Og(A.Lz(a,"int"))},
uP(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Og(A.Lz(a,"int"))},
Uc(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Og(A.Lz(a,"int?"))},
KH(a){return typeof a=="number"},
z5(a){if(typeof a=="number")return a
throw A.Og(A.Lz(a,"num"))},
W1(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Og(A.Lz(a,"num"))},
cU(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Og(A.Lz(a,"num?"))},
MM(a){return typeof a=="string"},
Bt(a){if(typeof a=="string")return a
throw A.Og(A.Lz(a,"String"))},
hN(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Og(A.Lz(a,"String"))},
tE(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Og(A.Lz(a,"String?"))},
M(a,b){var t,s,r
for(t="",s="",r=0;r<a.length;++r,s=", ")t+=s+A.m(a[r],b)
return t},
h(a,b){var t,s,r,q,p,o,n=a.x,m=a.y
if(""===n)return"("+A.M(m,b)+")"
t=m.length
s=n.split(",")
r=s.length-t
for(q="(",p="",o=0;o<t;++o,p=", "){q+=p
if(r===0)q+="{"
q+=A.m(m[o],b)
if(r>=0)q+=" "+s[r];++r}return q+"})"},
bI(a2,a3,a4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", "
if(a4!=null){t=a4.length
if(a3==null){a3=A.u([],u.s)
s=null}else s=a3.length
r=a3.length
for(q=t;q>0;--q)a3.push("T"+(r+q))
for(p=u.X,o=u._,n="<",m="",q=0;q<t;++q,m=a1){n=B.xB.h(n+m,a3[a3.length-1-q])
l=a4[q]
k=l.w
if(!(k===2||k===3||k===4||k===5||l===p))if(!(l===o))j=!1
else j=!0
else j=!0
if(!j)n+=" extends "+A.m(l,a3)}n+=">"}else{n=""
s=null}p=a2.x
i=a2.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.m(p,a3)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.m(h[q],a3)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.m(f[q],a3)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.m(d[q+2],a3)+" "+d[q]}a+="}"}if(s!=null){a3.toString
a3.length=s}return n+"("+a+") => "+b},
m(a,b){var t,s,r,q,p,o,n=a.w
if(n===5)return"erased"
if(n===2)return"dynamic"
if(n===3)return"void"
if(n===1)return"Never"
if(n===4)return"any"
if(n===6)return A.m(a.x,b)
if(n===7){t=a.x
s=A.m(t,b)
r=t.w
return(r===12||r===13?"("+s+")":s)+"?"}if(n===8)return"FutureOr<"+A.m(a.x,b)+">"
if(n===9){q=A.o(a.x)
p=a.y
return p.length>0?q+("<"+A.M(p,b)+">"):q}if(n===11)return A.h(a,b)
if(n===12)return A.bI(a,b,null)
if(n===13)return A.bI(a.x,b,a.y)
if(n===14){o=a.x
return b[b.length-1-o]}return"?"},
o(a){var t=v.mangledGlobalNames[a]
if(t!=null)return t
return"minified:"+a},
Qo(a,b){var t=a.tR[b]
for(;typeof t=="string";)t=a.tR[t]
return t},
ai(a,b){var t,s,r,q,p,o=a.eT,n=o[b]
if(n==null)return A.Ew(a,b,!1)
else if(typeof n=="number"){t=n
s=A.mZ(a,5,"#")
r=A.vU(t)
for(q=0;q<t;++q)r[q]=s
p=A.Q2(a,b,r)
o[b]=p
return p}else return n},
xb(a,b){return A.Ix(a.tR,b)},
FF(a,b){return A.Ix(a.eT,b)},
Ew(a,b,c){var t,s=a.eC,r=s.get(b)
if(r!=null)return r
t=A.eT(A.ow(a,null,b,c))
s.set(b,t)
return t},
cE(a,b,c){var t,s,r=b.z
if(r==null)r=b.z=new Map()
t=r.get(c)
if(t!=null)return t
s=A.eT(A.ow(a,b,c,!0))
r.set(c,s)
return s},
v5(a,b,c){var t,s,r,q=b.Q
if(q==null)q=b.Q=new Map()
t=c.as
s=q.get(t)
if(s!=null)return s
r=A.ap(a,b,c.w===10?c.y:[c])
q.set(t,r)
return r},
BD(a,b){b.a=A.Au
b.b=A.JJ
return b},
mZ(a,b,c){var t,s,r=a.eC.get(c)
if(r!=null)return r
t=new A.Jc(null,null)
t.w=b
t.as=c
s=A.BD(a,t)
a.eC.set(c,s)
return s},
SO(a,b,c){var t,s=b.as+"*",r=a.eC.get(s)
if(r!=null)return r
t=A.Z7(a,b,s,c)
a.eC.set(s,t)
return t},
Z7(a,b,c,d){var t,s,r
if(d){t=b.w
if(!A.Z4(b))s=b===u.P||b===u.T||t===7||t===6
else s=!0
if(s)return b}r=new A.Jc(null,null)
r.w=6
r.x=b
r.as=c
return A.BD(a,r)},
Bc(a,b,c){var t,s=b.as+"?",r=a.eC.get(s)
if(r!=null)return r
t=A.ll(a,b,s,c)
a.eC.set(s,t)
return t},
ll(a,b,c,d){var t,s,r,q
if(d){t=b.w
if(!A.Z4(b))if(!(b===u.P||b===u.T))if(t!==7)s=t===8&&A.lR(b.x)
else s=!0
else s=!0
else s=!0
if(s)return b
else if(t===1||b===u.A)return u.P
else if(t===6){r=b.x
if(r.w===8&&A.lR(r.x))return r
else return A.cz(a,b)}}q=new A.Jc(null,null)
q.w=7
q.x=b
q.as=c
return A.BD(a,q)},
LN(a,b,c){var t,s=b.as+"/",r=a.eC.get(s)
if(r!=null)return r
t=A.eV(a,b,s,c)
a.eC.set(s,t)
return t},
eV(a,b,c,d){var t,s
if(d){t=b.w
if(A.Z4(b)||b===u.K||b===u._)return b
else if(t===1)return A.Q2(a,"b8",[b])
else if(b===u.P||b===u.T)return u.V}s=new A.Jc(null,null)
s.w=8
s.x=b
s.as=c
return A.BD(a,s)},
Hc(a,b){var t,s,r=""+b+"^",q=a.eC.get(r)
if(q!=null)return q
t=new A.Jc(null,null)
t.w=14
t.x=b
t.as=r
s=A.BD(a,t)
a.eC.set(r,s)
return s},
Ux(a){var t,s,r,q=a.length
for(t="",s="",r=0;r<q;++r,s=",")t+=s+a[r].as
return t},
S4(a){var t,s,r,q,p,o=a.length
for(t="",s="",r=0;r<o;r+=3,s=","){q=a[r]
p=a[r+1]?"!":":"
t+=s+q+p+a[r+2].as}return t},
Q2(a,b,c){var t,s,r,q=b
if(c.length>0)q+="<"+A.Ux(c)+">"
t=a.eC.get(q)
if(t!=null)return t
s=new A.Jc(null,null)
s.w=9
s.x=b
s.y=c
if(c.length>0)s.c=c[0]
s.as=q
r=A.BD(a,s)
a.eC.set(q,r)
return r},
ap(a,b,c){var t,s,r,q,p,o
if(b.w===10){t=b.x
s=b.y.concat(c)}else{s=c
t=b}r=t.as+(";<"+A.Ux(s)+">")
q=a.eC.get(r)
if(q!=null)return q
p=new A.Jc(null,null)
p.w=10
p.x=t
p.y=s
p.as=r
o=A.BD(a,p)
a.eC.set(r,o)
return o},
oP(a,b,c){var t,s,r="+"+(b+"("+A.Ux(c)+")"),q=a.eC.get(r)
if(q!=null)return q
t=new A.Jc(null,null)
t.w=11
t.x=b
t.y=c
t.as=r
s=A.BD(a,t)
a.eC.set(r,s)
return s},
Nf(a,b,c){var t,s,r,q,p,o=b.as,n=c.a,m=n.length,l=c.b,k=l.length,j=c.c,i=j.length,h="("+A.Ux(n)
if(k>0){t=m>0?",":""
h+=t+"["+A.Ux(l)+"]"}if(i>0){t=m>0?",":""
h+=t+"{"+A.S4(j)+"}"}s=o+(h+")")
r=a.eC.get(s)
if(r!=null)return r
q=new A.Jc(null,null)
q.w=12
q.x=b
q.y=c
q.as=s
p=A.BD(a,q)
a.eC.set(s,p)
return p},
DS(a,b,c,d){var t,s=b.as+("<"+A.Ux(c)+">"),r=a.eC.get(s)
if(r!=null)return r
t=A.hw(a,b,c,s,d)
a.eC.set(s,t)
return t},
hw(a,b,c,d,e){var t,s,r,q,p,o,n,m
if(e){t=c.length
s=A.vU(t)
for(r=0,q=0;q<t;++q){p=c[q]
if(p.w===1){s[q]=p;++r}}if(r>0){o=A.PL(a,b,s,0)
n=A.bZ(a,c,s,0)
return A.DS(a,o,n,c!==n)}}m=new A.Jc(null,null)
m.w=13
m.x=b
m.y=c
m.as=d
return A.BD(a,m)},
ow(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
eT(a){var t,s,r,q,p,o,n,m=a.r,l=a.s
for(t=m.length,s=0;s<t;){r=m.charCodeAt(s)
if(r>=48&&r<=57)s=A.Al(s+1,r,m,l)
else if((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124)s=A.R8(a,s,m,l,!1)
else if(r===46)s=A.R8(a,s,m,l,!0)
else{++s
switch(r){case 44:break
case 58:l.push(!1)
break
case 33:l.push(!0)
break
case 59:l.push(A.KQ(a.u,a.e,l.pop()))
break
case 94:l.push(A.Hc(a.u,l.pop()))
break
case 35:l.push(A.mZ(a.u,5,"#"))
break
case 64:l.push(A.mZ(a.u,2,"@"))
break
case 126:l.push(A.mZ(a.u,3,"~"))
break
case 60:l.push(a.p)
a.p=l.length
break
case 62:A.rD(a,l)
break
case 38:A.I3(a,l)
break
case 42:q=a.u
l.push(A.SO(q,A.KQ(q,a.e,l.pop()),a.n))
break
case 63:q=a.u
l.push(A.Bc(q,A.KQ(q,a.e,l.pop()),a.n))
break
case 47:q=a.u
l.push(A.LN(q,A.KQ(q,a.e,l.pop()),a.n))
break
case 40:l.push(-3)
l.push(a.p)
a.p=l.length
break
case 41:A.Mt(a,l)
break
case 91:l.push(a.p)
a.p=l.length
break
case 93:p=l.splice(a.p)
A.rT(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-1)
break
case 123:l.push(a.p)
a.p=l.length
break
case 125:p=l.splice(a.p)
A.Be(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-2)
break
case 43:o=m.indexOf("(",s)
l.push(m.substring(s,o))
l.push(-4)
l.push(a.p)
a.p=l.length
s=o+1
break
default:throw"Bad character "+r}}}n=l.pop()
return A.KQ(a.u,a.e,n)},
Al(a,b,c,d){var t,s,r=b-48
for(t=c.length;a<t;++a){s=c.charCodeAt(a)
if(!(s>=48&&s<=57))break
r=r*10+(s-48)}d.push(r)
return a},
R8(a,b,c,d,e){var t,s,r,q,p,o,n=b+1
for(t=c.length;n<t;++n){s=c.charCodeAt(n)
if(s===46){if(e)break
e=!0}else{if(!((((s|32)>>>0)-97&65535)<26||s===95||s===36||s===124))r=s>=48&&s<=57
else r=!0
if(!r)break}}q=c.substring(b,n)
if(e){t=a.u
p=a.e
if(p.w===10)p=p.x
o=A.Qo(t,p.x)[q]
if(o==null)A.vh('No "'+q+'" in "'+A.mD(p)+'"')
d.push(A.cE(t,p,o))}else d.push(q)
return n},
rD(a,b){var t,s=a.u,r=A.oU(a,b),q=b.pop()
if(typeof q=="string")b.push(A.Q2(s,q,r))
else{t=A.KQ(s,a.e,q)
switch(t.w){case 12:b.push(A.DS(s,t,r,a.n))
break
default:b.push(A.ap(s,t,r))
break}}},
Mt(a,b){var t,s,r,q,p,o=null,n=a.u,m=b.pop()
if(typeof m=="number")switch(m){case-1:t=b.pop()
s=o
break
case-2:s=b.pop()
t=o
break
default:b.push(m)
s=o
t=s
break}else{b.push(m)
s=o
t=s}r=A.oU(a,b)
m=b.pop()
switch(m){case-3:m=b.pop()
if(t==null)t=n.sEA
if(s==null)s=n.sEA
q=A.KQ(n,a.e,m)
p=new A.ET()
p.a=r
p.b=t
p.c=s
b.push(A.Nf(n,q,p))
return
case-4:b.push(A.oP(n,b.pop(),r))
return
default:throw A.Og(A.hV("Unexpected state under `()`: "+A.Ej(m)))}},
I3(a,b){var t=b.pop()
if(0===t){b.push(A.mZ(a.u,1,"0&"))
return}if(1===t){b.push(A.mZ(a.u,4,"1&"))
return}throw A.Og(A.hV("Unexpected extended operation "+A.Ej(t)))},
oU(a,b){var t=b.splice(a.p)
A.rT(a.u,a.e,t)
a.p=b.pop()
return t},
KQ(a,b,c){if(typeof c=="string")return A.Q2(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.TV(a,b,c)}else return c},
rT(a,b,c){var t,s=c.length
for(t=0;t<s;++t)c[t]=A.KQ(a,b,c[t])},
Be(a,b,c){var t,s=c.length
for(t=2;t<s;t+=3)c[t]=A.KQ(a,b,c[t])},
TV(a,b,c){var t,s,r=b.w
if(r===10){if(c===0)return b.x
t=b.y
s=t.length
if(c<=s)return t[c-1]
c-=s
b=b.x
r=b.w}else if(c===0)return b
if(r!==9)throw A.Og(A.hV("Indexed base must be an interface type"))
t=b.y
if(c<=t.length)return t[c-1]
throw A.Og(A.hV("Bad index "+c+" for "+b["["](0)))},
t1(a,b,c){var t,s=b.d
if(s==null)s=b.d=new Map()
t=s.get(c)
if(t==null){t=A.We(a,b,null,c,null,!1)?1:0
s.set(c,t)}if(0===t)return!1
if(1===t)return!0
return!0},
We(a,b,c,d,e,f){var t,s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(!A.Z4(d))if(!(d===u._))t=!1
else t=!0
else t=!0
if(t)return!0
s=b.w
if(s===4)return!0
if(A.Z4(b))return!1
if(b.w!==1)t=!1
else t=!0
if(t)return!0
r=s===14
if(r)if(A.We(a,c[b.x],c,d,e,!1))return!0
q=d.w
t=b===u.P||b===u.T
if(t){if(q===8)return A.We(a,b,c,d.x,e,!1)
return d===u.P||d===u.T||q===7||q===6}if(d===u.K){if(s===8)return A.We(a,b.x,c,d,e,!1)
if(s===6)return A.We(a,b.x,c,d,e,!1)
return s!==7}if(s===6)return A.We(a,b.x,c,d,e,!1)
if(q===6){t=A.cz(a,d)
return A.We(a,b,c,t,e,!1)}if(s===8){if(!A.We(a,b.x,c,d,e,!1))return!1
return A.We(a,A.xZ(a,b),c,d,e,!1)}if(s===7){t=A.We(a,u.P,c,d,e,!1)
return t&&A.We(a,b.x,c,d,e,!1)}if(q===8){if(A.We(a,b,c,d.x,e,!1))return!0
return A.We(a,b,c,A.xZ(a,d),e,!1)}if(q===7){t=A.We(a,b,c,u.P,e,!1)
return t||A.We(a,b,c,d.x,e,!1)}if(r)return!1
t=s!==12
if((!t||s===13)&&d===u.a)return!0
p=s===11
if(p&&d===u.L)return!0
if(q===13){if(b===u.g)return!0
if(s!==13)return!1
o=b.y
n=d.y
m=o.length
if(m!==n.length)return!1
c=c==null?o:o.concat(c)
e=e==null?n:n.concat(e)
for(l=0;l<m;++l){k=o[l]
j=n[l]
if(!A.We(a,k,c,j,e,!1)||!A.We(a,j,e,k,c,!1))return!1}return A.bO(a,b.x,c,d.x,e,!1)}if(q===12){if(b===u.g)return!0
if(t)return!1
return A.bO(a,b,c,d,e,!1)}if(s===9){if(q!==9)return!1
return A.pG(a,b,c,d,e,!1)}if(p&&q===11)return A.b6(a,b,c,d,e,!1)
return!1},
bO(a2,a3,a4,a5,a6,a7){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(!A.We(a2,a3.x,a4,a5.x,a6,!1))return!1
t=a3.y
s=a5.y
r=t.a
q=s.a
p=r.length
o=q.length
if(p>o)return!1
n=o-p
m=t.b
l=s.b
k=m.length
j=l.length
if(p+k<o+j)return!1
for(i=0;i<p;++i){h=r[i]
if(!A.We(a2,q[i],a6,h,a4,!1))return!1}for(i=0;i<n;++i){h=m[i]
if(!A.We(a2,q[p+i],a6,h,a4,!1))return!1}for(i=0;i<j;++i){h=m[n+i]
if(!A.We(a2,l[i],a6,h,a4,!1))return!1}g=t.c
f=s.c
e=g.length
d=f.length
for(c=0,b=0;b<d;b+=3){a=f[b]
for(;!0;){if(c>=e)return!1
a0=g[c]
c+=3
if(a<a0)return!1
a1=g[c-2]
if(a0<a){if(a1)return!1
continue}h=f[b+1]
if(a1&&!h)return!1
h=g[c-1]
if(!A.We(a2,f[b+2],a6,h,a4,!1))return!1
break}}for(;c<e;){if(g[c+1])return!1
c+=3}return!0},
pG(a,b,c,d,e,f){var t,s,r,q,p,o=b.x,n=d.x
for(;o!==n;){t=a.tR[o]
if(t==null)return!1
if(typeof t=="string"){o=t
continue}s=t[n]
if(s==null)return!1
r=s.length
q=r>0?new Array(r):v.typeUniverse.sEA
for(p=0;p<r;++p)q[p]=A.cE(a,b,s[p])
return A.SW(a,q,null,c,d.y,e,!1)}return A.SW(a,b.y,null,c,d.y,e,!1)},
SW(a,b,c,d,e,f,g){var t,s=b.length
for(t=0;t<s;++t)if(!A.We(a,b[t],d,e[t],f,!1))return!1
return!0},
b6(a,b,c,d,e,f){var t,s=b.y,r=d.y,q=s.length
if(q!==r.length)return!1
if(b.x!==d.x)return!1
for(t=0;t<q;++t)if(!A.We(a,s[t],c,r[t],e,!1))return!1
return!0},
lR(a){var t,s=a.w
if(!(a===u.P||a===u.T))if(!A.Z4(a))if(s!==7)if(!(s===6&&A.lR(a.x)))t=s===8&&A.lR(a.x)
else t=!0
else t=!0
else t=!0
else t=!0
return t},
BU(a){var t
if(!A.Z4(a))if(!(a===u._))t=!1
else t=!0
else t=!0
return t},
Z4(a){var t=a.w
return t===2||t===3||t===4||t===5||a===u.X},
Ix(a,b){var t,s,r=Object.keys(b),q=r.length
for(t=0;t<q;++t){s=r[t]
a[s]=b[s]}},
vU(a){return a>0?new Array(a):v.typeUniverse.sEA},
Jc:function Jc(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
ET:function ET(){this.c=this.b=this.a=null},
lY:function lY(a){this.a=a},
u9:function u9(){},
iM:function iM(a){this.a=a},
vL(a,b){var t=a[b]
return t===a?null:t},
cW(a,b,c){if(c==null)a[b]=a
else a[b]=c},
a0(){var t=Object.create(null)
A.cW(t,"<non-identifier-key>",t)
delete t["<non-identifier-key>"]
return t},
EF(a,b,c){return A.dJ(a,new A.N5(b.C("@<0>").Kq(c).C("N5<1,2>")))},
C(a,b){return new A.N5(a.C("@<0>").Kq(b).C("N5<1,2>"))},
nO(a){var t,s={}
if(A.y(a))return"{...}"
t=new A.B("")
try{$.Qu.push(a)
t.a+="{"
s.a=!0
a.aN(0,new A.GA(s,t))
t.a+="}"}finally{$.Qu.pop()}s=t.a
return s.charCodeAt(0)==0?s:s},
k6:function k6(){},
YF:function YF(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
Ni:function Ni(a,b){this.a=a
this.$ti=b},
t3:function t3(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
F:function F(){},
il:function il(){},
GA:function GA(a,b){this.a=a
this.b=b},
KP:function KP(){},
Pn:function Pn(){},
Gj:function Gj(){},
RU:function RU(){},
wI:function wI(){},
O8(a,b,c){var t,s
if(a<0||a>4294967295)A.vh(A.TE(a,0,4294967295,"length",null))
t=J.Ep(A.u(new Array(a),c.C("jd<0>")))
if(a!==0&&b!=null)for(s=0;s<t.length;++s)t[s]=b
return t},
PW(a,b,c){var t,s,r=A.u([],c.C("jd<0>"))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.G)(a),++s)r.push(a[s])
return J.Ep(r)},
Y1(a,b){var t=A.ev(a,b)
return t},
ev(a,b){var t,s
if(Array.isArray(a))return A.u(a.slice(0),b.C("jd<0>"))
t=A.u([],b.C("jd<0>"))
for(s=J.I(a);s.G();)t.push(s.gl())
return t},
vg(a,b,c){var t=J.I(b)
if(!t.G())return a
if(c.length===0){do a+=A.Ej(t.gl())
while(t.G())}else{a+=A.Ej(t.gl())
for(;t.G();)a=a+c+A.Ej(t.gl())}return a},
Wi(a,b){return new A.mp(a,b.gV(),b.gnd(),b.gVm())},
K(a){if(typeof a=="number"||A.rQ(a)||a==null)return J.t(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ik(a)},
hV(a){return new A.C6(a)},
xY(a){return new A.AT(!1,null,null,a)},
TE(a,b,c,d,e){return new A.bJ(b,c,!0,a,d,"Invalid value")},
jB(a,b,c){if(0>a||a>c)throw A.Og(A.TE(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.Og(A.TE(b,a,c,"end",null))
return b}return c},
xF(a,b,c,d){return new A.eY(b,!0,a,d,"Index out of range")},
u0(a){return new A.ub(a)},
SY(a){return new A.ds(a)},
a4(a){return new A.UV(a)},
Sd(a,b,c){var t,s
if(A.y(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}t=A.u([],u.s)
$.Qu.push(a)
try{A.Vr(a,t)}finally{$.Qu.pop()}s=A.vg(b,t,", ")+c
return s.charCodeAt(0)==0?s:s},
x(a,b,c){var t,s
if(A.y(a))return b+"..."+c
t=new A.B(b)
$.Qu.push(a)
try{s=t
s.a=A.vg(s.a,a,", ")}finally{$.Qu.pop()}t.a+=c
s=t.a
return s.charCodeAt(0)==0?s:s},
Vr(a,b){var t,s,r,q,p,o,n,m=a.gkz(a),l=0,k=0
while(!0){if(!(l<80||k<3))break
if(!m.G())return
t=A.Ej(m.gl())
b.push(t)
l+=t.length+2;++k}if(!m.G()){if(k<=5)return
s=b.pop()
r=b.pop()}else{q=m.gl();++k
if(!m.G()){if(k<=4){b.push(A.Ej(q))
return}s=A.Ej(q)
r=b.pop()
l+=s.length+2}else{p=m.gl();++k
for(;m.G();q=p,p=o){o=m.gl();++k
if(k>100){while(!0){if(!(l>75&&k>3))break
l-=b.pop().length+2;--k}b.push("...")
return}}r=A.Ej(q)
s=A.Ej(p)
l+=s.length+r.length+4}}if(k>b.length+2){l+=5
n="..."}else n=null
while(!0){if(!(l>80&&b.length>3))break
l-=b.pop().length+2
if(n==null){l+=5
n="..."}}if(n!=null)b.push(n)
b.push(r)
b.push(s)},
f5(a,b,c,d){var t
if(B.zt===c){t=B.jn.giO(a)
b=J.Nu(b)
return A.qL(A.yc(A.yc($.t8(),t),b))}if(B.zt===d){t=B.jn.giO(a)
b=J.Nu(b)
c=J.Nu(c)
return A.qL(A.yc(A.yc(A.yc($.t8(),t),b),c))}t=B.jn.giO(a)
b=J.Nu(b)
c=J.Nu(c)
d=J.Nu(d)
d=A.qL(A.yc(A.yc(A.yc(A.yc($.t8(),t),b),c),d))
return d},
CL:function CL(a,b){this.a=a
this.b=b},
Ge:function Ge(){},
C6:function C6(a){this.a=a},
E:function E(){},
AT:function AT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bJ:function bJ(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
eY:function eY(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
mp:function mp(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ub:function ub(a){this.a=a},
ds:function ds(a){this.a=a},
UV:function UV(a){this.a=a},
cX:function cX(){},
c8:function c8(){},
a:function a(){},
B:function B(a){this.a=a},
SS(a){var t,s=a.$dart_jsFunction
if(s!=null)return s
t=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.Oo,a)
t[$.w()]=a
a.$dart_jsFunction=t
return t},
Oo(a,b){return A.im(a,b,null)},
v(a){if(typeof a=="function")return a
else return A.SS(a)},
m6(a){return a==null||A.rQ(a)||typeof a=="number"||typeof a=="string"||u.U.b(a)||u.E.b(a)||u.e.b(a)||u.O.b(a)||u.D.b(a)||u.k.b(a)||u.v.b(a)||u.C.b(a)||u.q.b(a)||u.J.b(a)||u.Y.b(a)},
Pe(a){if(A.m6(a))return a
return new A.Pb(new A.YF(u.G)).$1(a)},
b(a,b,c){return a[b].apply(a,c)},
Pb:function Pb(a){this.a=a},
lM:function lM(){this.a=$},
YE:function YE(){},
E2(){var t,s,r,q=self,p=q.document.querySelectorAll("pre > code[data-dartpad]:only-child"),o=u.N,n=A.C(o,o)
A.b(q.window,"addEventListener",["message",u.g.a(A.v(new A.e(n)))])
for(q=u.m,t=0;t<p.length;++t){s=p.item(t)
r=A.f(s==null?q.a(s):s)
if(r!=null)n.t(0,r.b,r.a)}},
f(a){var t,s,r,q,p,o,n,m,l,k,j,i,h=null,g=a.parentElement
if(g==null)return h
t=A.u([],u.s)
if(!J.cf(a.getAttribute("data-embed"),"false"))t.push("embed=true")
if(J.cf(a.getAttribute("data-theme"),"light"))t.push("theme=light")
if(J.cf(a.getAttribute("data-run"),"true"))t.push("run=true")
s=t.length!==0?"https://dartpad.cn/?"+B.Nm.H(t,"&"):"https://dartpad.cn/"
t=self
r=t.document.createElement("div")
q=t.document.createElement("iframe")
q.setAttribute("src",s)
p=a.getAttribute("title")
if(p!=null){t=p.length!==0
o=p}else{o=h
t=!1}if(t)q.setAttribute("title",o)
q.classList.add("embedded-dartpad")
t=$.ra
$.ra=t+1
n="embedded-dartpad-"+t
q.id=n
q.name=n
m=a.getAttribute("data-width")
if(m!=null){t=m.length!==0
l=m}else{l=h
t=!1}if(t)q.style.width=l
k=a.getAttribute("data-height")
if(k!=null){t=k.length!==0
j=k}else{j=h
t=!1}if(t)q.style.height=j
i=$.Ww().W(J.GE(a.innerHTML))
A.b(r,"appendChild",[q])
A.b(g,"replaceWith",[r])
if(q.contentWindow==null)return h
return new A.S0(i,n)},
e:function e(a){this.a=a},
pR(a){A.A(new A.n("Field '"+a+"' has been assigned during initialization."),new Error())},
Q4(){A.A(new A.n("Field '' has not been initialized."),new Error())},
tI(a,b,c,d,e,f){var t
if(c==null)return a[b]()
else{t=a[b](c,d)
return t}}},B={}
var w=[A,J,B]
var $={}
A.FK.prototype={}
J.vB.prototype={
DN(a,b){return a===b},
giO(a){return A.eQ(a)},
"["(a){return"Instance of '"+A.l(a)+"'"},
e7(a,b){throw A.Og(A.Wi(a,b))},
gbx(a){return A.Kx(A.VU(this))}}
J.yE.prototype={
"["(a){return String(a)},
giO(a){return a?519018:218159},
gbx(a){return A.Kx(u.y)},
$iy5:1}
J.CD.prototype={
DN(a,b){return null==b},
"["(a){return"null"},
giO(a){return 0},
$iy5:1}
J.MF.prototype={$ivm:1}
J.zh.prototype={
giO(a){return 0},
"["(a){return String(a)}}
J.iC.prototype={}
J.kd.prototype={}
J.c5.prototype={
"["(a){var t=a[$.w()]
if(t==null)return this.u(a)
return"JavaScript function for "+J.t(t)}}
J.yP.prototype={
giO(a){return 0},
"["(a){return String(a)}}
J.Dw.prototype={
giO(a){return 0},
"["(a){return String(a)}}
J.jd.prototype={
P(a,b){if(!!a.fixed$length)A.vh(A.u0("add"))
a.push(b)},
FV(a,b){var t
if(!!a.fixed$length)A.vh(A.u0("addAll"))
if(Array.isArray(b)){this.Kh(a,b)
return}for(t=J.I(b);t.G();)a.push(t.gl())},
Kh(a,b){var t,s=b.length
if(s===0)return
if(a===b)throw A.Og(A.a4(a))
for(t=0;t<s;++t)a.push(b[t])},
E2(a,b,c){return new A.A8(a,b,A.t6(a).C("@<1>").Kq(c).C("A8<1,2>"))},
H(a,b){var t,s=A.O8(a.length,"",u.N)
for(t=0;t<a.length;++t)s[t]=A.Ej(a[t])
return s.join(b)},
Z(a,b){return a[b]},
"["(a){return A.x(a,"[","]")},
gkz(a){return new J.D(a,a.length,A.t6(a).C("D<1>"))},
giO(a){return A.eQ(a)},
gB(a){return a.length},
$ibQ:1,
$icX:1,
$izM:1}
J.Po.prototype={}
J.D.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
G(){var t,s=this,r=s.a,q=r.length
if(s.b!==q)throw A.Og(A.G(r))
t=s.c
if(t>=q){s.d=null
return!1}s.d=r[t]
s.c=t+1
return!0}}
J.qI.prototype={
"["(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
giO(a){var t,s,r,q,p=a|0
if(a===p)return p&536870911
t=Math.abs(a)
s=Math.log(t)/0.6931471805599453|0
r=Math.pow(2,s)
q=t<1?t/r:r/t
return((q*9007199254740992|0)+(q*3542243181176521|0))*599197+s*1259&536870911},
A(a,b){var t
if(a>0)t=this.p(a,b)
else{t=b>31?31:b
t=a>>t>>>0}return t},
p(a,b){return b>31?0:a>>>b},
gbx(a){return A.Kx(u.H)},
$iCP:1}
J.bU.prototype={
gbx(a){return A.Kx(u.S)},
$iy5:1,
$iKN:1}
J.kD.prototype={
gbx(a){return A.Kx(u.i)},
$iy5:1}
J.Dr.prototype={
h(a,b){return a+b},
R(a,b){var t=a.length,s=b.length
if(s>t)return!1
return b===a.substring(0,s)},
J(a,b,c){return a.substring(b,A.jB(b,c,a.length))},
yn(a,b){return this.J(a,b,null)},
OF(a){var t,s=a.trimEnd(),r=s.length
if(r===0)return s
t=r-1
if(s.charCodeAt(t)!==133)return s
return s.substring(0,J.c1(s,t))},
K(a,b,c){var t
if(c<0||c>a.length)throw A.Og(A.TE(c,0,a.length,null,null))
t=a.indexOf(b,c)
return t},
M(a,b){return this.K(a,b,0)},
"["(a){return a},
giO(a){var t,s,r
for(t=a.length,s=0,r=0;r<t;++r){s=s+a.charCodeAt(r)&536870911
s=s+((s&524287)<<10)&536870911
s^=s>>6}s=s+((s&67108863)<<3)&536870911
s^=s>>11
return s+((s&16383)<<15)&536870911},
gbx(a){return A.Kx(u.N)},
gB(a){return a.length},
$iy5:1,
$iqU:1}
A.n.prototype={
"["(a){return"LateInitializationError: "+this.a}}
A.zl.prototype={}
A.bQ.prototype={}
A.aL.prototype={
gkz(a){return new A.a7(this,this.gB(0),this.$ti.C("a7<aL.E>"))},
E2(a,b,c){return new A.A8(this,b,this.$ti.C("@<aL.E>").Kq(c).C("A8<1,2>"))}}
A.a7.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
G(){var t,s=this,r=s.a,q=J.U6(r),p=q.gB(r)
if(s.b!==p)throw A.Og(A.a4(r))
t=s.c
if(t>=p){s.d=null
return!1}s.d=q.Z(r,t);++s.c
return!0}}
A.i1.prototype={
gkz(a){var t=this.a,s=A.Lh(this)
return new A.MH(t.gkz(t),this.b,s.C("@<1>").Kq(s.y[1]).C("MH<1,2>"))},
gB(a){var t=this.a
return t.gB(t)}}
A.xy.prototype={$ibQ:1}
A.MH.prototype={
G(){var t=this,s=t.b
if(s.G()){t.a=t.c.$1(s.gl())
return!0}t.a=null
return!1},
gl(){var t=this.a
return t==null?this.$ti.y[1].a(t):t}}
A.A8.prototype={
gB(a){return J.Hm(this.a)},
Z(a,b){return this.b.$1(J.Av(this.a,b))}}
A.SU.prototype={}
A.wv.prototype={
giO(a){var t=this._hashCode
if(t!=null)return t
t=664597*B.xB.giO(this.a)&536870911
this._hashCode=t
return t},
"["(a){return'Symbol("'+this.a+'")'},
DN(a,b){if(b==null)return!1
return b instanceof A.wv&&this.a===b.a},
$iGD:1}
A.S0.prototype={$r:"+code,id(1,2)",$s:1}
A.PD.prototype={}
A.ys.prototype={
"["(a){return A.nO(this)},
$iT8:1}
A.LP.prototype={
gB(a){return this.b.length},
gMV(){var t=this.$keys
if(t==null){t=Object.keys(this.a)
this.$keys=t}return t},
x4(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
q(a,b){if(!this.x4(b))return null
return this.b[this.a[b]]},
aN(a,b){var t,s,r=this.gMV(),q=this.b
for(t=r.length,s=0;s<t;++s)b.$2(r[s],q[s])},
gI(){return new A.Ku(this.gMV(),this.$ti.C("Ku<1>"))}}
A.Ku.prototype={
gB(a){return this.a.length},
gkz(a){var t=this.a
return new A.vI(t,t.length,this.$ti.C("vI<1>"))}}
A.vI.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
G(){var t=this,s=t.c
if(s>=t.b){t.d=null
return!1}t.d=t.a[s]
t.c=s+1
return!0}}
A.LI.prototype={
gV(){var t=this.a
return t},
gnd(){var t,s,r,q,p=this
if(p.c===1)return B.xD
t=p.d
s=t.length-p.e.length-p.f
if(s===0)return B.xD
r=[]
for(q=0;q<s;++q)r.push(t[q])
return J.un(r)},
gVm(){var t,s,r,q,p,o,n=this
if(n.c!==0)return B.CM
t=n.e
s=t.length
r=n.d
q=r.length-s-n.f
if(s===0)return B.CM
p=new A.N5(u.B)
for(o=0;o<s;++o)p.t(0,new A.wv(t[o]),r[q+o])
return new A.PD(p,u.Z)}}
A.Cj.prototype={
$2(a,b){var t=this.a
t.b=t.b+"$"+a
this.b.push(a)
this.c.push(b);++t.a}}
A.Tp.prototype={
"["(a){var t=this.constructor,s=t==null?null:t.name
return"Closure '"+A.p(s==null?"unknown":s)+"'"},
gKu(){return this},
$C:"$1",
$R:1,
$D:null}
A.E1.prototype={$C:"$2",$R:2}
A.lc.prototype={}
A.z.prototype={
"["(a){var t=this.$static_name
if(t==null)return"Closure of unknown static method"
return"Closure '"+A.p(t)+"'"}}
A.r.prototype={
DN(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.r))return!1
return this.$_target===b.$_target&&this.a===b.a},
giO(a){return(A.CU(this.a)^A.eQ(this.$_target))>>>0},
"["(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.l(this.a)+"'")}}
A.GK.prototype={
"["(a){return"Reading static variable '"+this.a+"' during its initialization"}}
A.Eq.prototype={
"["(a){return"RuntimeError: "+this.a}}
A.kr.prototype={}
A.N5.prototype={
gB(a){return this.a},
gI(){return new A.i5(this,A.Lh(this).C("i5<1>"))},
x4(a){var t=this.b
if(t==null)return!1
return t[a]!=null},
q(a,b){var t,s,r,q,p=null
if(typeof b=="string"){t=this.b
if(t==null)return p
s=t[b]
r=s==null?p:s.b
return r}else if(typeof b=="number"&&(b&0x3fffffff)===b){q=this.c
if(q==null)return p
s=q[b]
r=s==null?p:s.b
return r}else return this.v(b)},
v(a){var t,s,r=this.d
if(r==null)return null
t=r[this.O(a)]
s=this.X(t,a)
if(s<0)return null
return t[s].b},
t(a,b,c){var t,s,r,q,p,o,n=this
if(typeof b=="string"){t=n.b
n.m(t==null?n.b=n.F():t,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){s=n.c
n.m(s==null?n.c=n.F():s,b,c)}else{r=n.d
if(r==null)r=n.d=n.F()
q=n.O(b)
p=r[q]
if(p==null)r[q]=[n.i(b,c)]
else{o=n.X(p,b)
if(o>=0)p[o].b=c
else p.push(n.i(b,c))}}},
j(a,b){var t=this.H4(this.b,b)
return t},
aN(a,b){var t=this,s=t.e,r=t.r
for(;s!=null;){b.$2(s.a,s.b)
if(r!==t.r)throw A.Og(A.a4(t))
s=s.c}},
m(a,b,c){var t=a[b]
if(t==null)a[b]=this.i(b,c)
else t.b=c},
H4(a,b){var t
if(a==null)return null
t=a[b]
if(t==null)return null
this.T(t)
delete a[b]
return t.b},
S(){this.r=this.r+1&1073741823},
i(a,b){var t,s=this,r=new A.db(a,b)
if(s.e==null)s.e=s.f=r
else{t=s.f
t.toString
r.d=t
s.f=t.c=r}++s.a
s.S()
return r},
T(a){var t=this,s=a.d,r=a.c
if(s==null)t.e=r
else s.c=r
if(r==null)t.f=s
else r.d=s;--t.a
t.S()},
O(a){return J.Nu(a)&1073741823},
X(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.cf(a[s].a,b))return s
return-1},
"["(a){return A.nO(this)},
F(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t}}
A.db.prototype={}
A.i5.prototype={
gB(a){return this.a.a},
gkz(a){var t=this.a,s=new A.N6(t,t.r)
s.c=t.e
return s}}
A.N6.prototype={
gl(){return this.d},
G(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.Og(A.a4(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.a
s.c=t.c
return!0}}}
A.dC.prototype={
$1(a){return this.a(a)}}
A.wN.prototype={
$2(a,b){return this.a(a,b)}}
A.VX.prototype={
$1(a){return this.a(a)}}
A.S5.prototype={
"["(a){return this.k(!1)},
k(a){var t,s,r,q,p,o=this.D(),n=this.n(),m=(a?""+"Record ":"")+"("
for(t=o.length,s="",r=0;r<t;++r,s=", "){m+=s
q=o[r]
if(typeof q=="string")m=m+q+": "
p=n[r]
m=a?m+A.ik(p):m+A.Ej(p)}m+=")"
return m.charCodeAt(0)==0?m:m},
D(){var t,s=this.$s
for(;$.Bi.length<=s;)$.Bi.push(null)
t=$.Bi[s]
if(t==null){t=this.N()
$.Bi[s]=t}return t},
N(){var t,s,r,q=this.$r,p=q.indexOf("("),o=q.substring(1,p),n=q.substring(p),m=n==="()"?0:n.replace(/[^,]/g,"").length+1,l=A.u(new Array(m),u.f)
for(t=0;t<m;++t)l[t]=t
if(o!==""){s=o.split(",")
t=s.length
for(r=m;t>0;){--r;--t
l[r]=s[t]}}return J.un(A.PW(l,!1,u.K))}}
A.B7.prototype={
n(){return[this.a,this.b]},
DN(a,b){if(b==null)return!1
return b instanceof A.B7&&this.$s===b.$s&&J.cf(this.a,b.a)&&J.cf(this.b,b.b)},
giO(a){return A.f5(this.$s,this.a,this.b,B.zt)}}
A.WZ.prototype={
gbx(a){return B.Vg},
$iy5:1,
$iI2:1}
A.eH.prototype={}
A.df.prototype={
gbx(a){return B.Kb},
$iy5:1,
$iWy:1}
A.b0.prototype={
gB(a){return a.length},
$iXj:1}
A.Dg.prototype={
q(a,b){A.od(b,a,a.length)
return a[b]},
$ibQ:1,
$icX:1,
$izM:1}
A.DV.prototype={$ibQ:1,$icX:1,$izM:1}
A.zU.prototype={
gbx(a){return B.lq},
$iy5:1,
$ioI:1}
A.K8.prototype={
gbx(a){return B.KW},
$iy5:1,
$imJ:1}
A.xj.prototype={
gbx(a){return B.OE},
q(a,b){A.od(b,a,a.length)
return a[b]},
$iy5:1,
$irF:1}
A.dE.prototype={
gbx(a){return B.rr},
q(a,b){A.od(b,a,a.length)
return a[b]},
$iy5:1,
$iX6:1}
A.ZA.prototype={
gbx(a){return B.dW},
q(a,b){A.od(b,a,a.length)
return a[b]},
$iy5:1,
$iZX:1}
A.wf.prototype={
gbx(a){return B.j1},
q(a,b){A.od(b,a,a.length)
return a[b]},
$iy5:1,
$iHS:1}
A.Pq.prototype={
gbx(a){return B.U6},
q(a,b){A.od(b,a,a.length)
return a[b]},
$iy5:1,
$iPz:1}
A.eE.prototype={
gbx(a){return B.pd},
gB(a){return a.length},
q(a,b){A.od(b,a,a.length)
return a[b]},
$iy5:1,
$izt:1}
A.V6.prototype={
gbx(a){return B.Pk},
gB(a){return a.length},
q(a,b){A.od(b,a,a.length)
return a[b]},
$iy5:1,
$in6:1}
A.VR.prototype={}
A.vX.prototype={}
A.WB.prototype={}
A.VS.prototype={}
A.Jc.prototype={
C(a){return A.cE(v.typeUniverse,this,a)},
Kq(a){return A.v5(v.typeUniverse,this,a)}}
A.ET.prototype={}
A.lY.prototype={
"["(a){return A.m(this.a,null)}}
A.u9.prototype={
"["(a){return this.a}}
A.iM.prototype={}
A.k6.prototype={
gB(a){return this.a},
gI(){return new A.Ni(this,this.$ti.C("Ni<1>"))},
x4(a){var t,s
if(typeof a=="string"&&a!=="__proto__"){t=this.b
return t==null?!1:t[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){s=this.c
return s==null?!1:s[a]!=null}else return this.KY(a)},
KY(a){var t=this.d
if(t==null)return!1
return this.DF(this.e1(t,a),a)>=0},
q(a,b){var t,s,r
if(typeof b=="string"&&b!=="__proto__"){t=this.b
s=t==null?null:A.vL(t,b)
return s}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
s=r==null?null:A.vL(r,b)
return s}else return this.c8(b)},
c8(a){var t,s,r=this.d
if(r==null)return null
t=this.e1(r,a)
s=this.DF(t,a)
return s<0?null:t[s+1]},
t(a,b,c){var t,s,r,q=this,p=q.d
if(p==null)p=q.d=A.a0()
t=A.CU(b)&1073741823
s=p[t]
if(s==null){A.cW(p,t,[b,c]);++q.a
q.e=null}else{r=q.DF(s,b)
if(r>=0)s[r+1]=c
else{s.push(b,c);++q.a
q.e=null}}},
aN(a,b){var t,s,r,q,p,o=this,n=o.Cf()
for(t=n.length,s=o.$ti.y[1],r=0;r<t;++r){q=n[r]
p=o.q(0,q)
b.$2(q,p==null?s.a(p):p)
if(n!==o.e)throw A.Og(A.a4(o))}},
Cf(){var t,s,r,q,p,o,n,m,l,k,j=this,i=j.e
if(i!=null)return i
i=A.O8(j.a,null,u.z)
t=j.b
if(t!=null){s=Object.getOwnPropertyNames(t)
r=s.length
for(q=0,p=0;p<r;++p){i[q]=s[p];++q}}else q=0
o=j.c
if(o!=null){s=Object.getOwnPropertyNames(o)
r=s.length
for(p=0;p<r;++p){i[q]=+s[p];++q}}n=j.d
if(n!=null){s=Object.getOwnPropertyNames(n)
r=s.length
for(p=0;p<r;++p){m=n[s[p]]
l=m.length
for(k=0;k<l;k+=2){i[q]=m[k];++q}}}return j.e=i},
e1(a,b){return a[A.CU(b)&1073741823]}}
A.YF.prototype={
DF(a,b){var t,s,r
if(a==null)return-1
t=a.length
for(s=0;s<t;s+=2){r=a[s]
if(r==null?b==null:r===b)return s}return-1}}
A.Ni.prototype={
gB(a){return this.a.a},
gkz(a){var t=this.a
return new A.t3(t,t.Cf(),this.$ti.C("t3<1>"))}}
A.t3.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
G(){var t=this,s=t.b,r=t.c,q=t.a
if(s!==q.e)throw A.Og(A.a4(q))
else if(r>=s.length){t.d=null
return!1}else{t.d=s[r]
t.c=r+1
return!0}}}
A.F.prototype={
gkz(a){return new A.a7(a,this.gB(a),A.d(a).C("a7<F.E>"))},
Z(a,b){return this.q(a,b)},
E2(a,b,c){return new A.A8(a,b,A.d(a).C("@<F.E>").Kq(c).C("A8<1,2>"))},
"["(a){return A.x(a,"[","]")}}
A.il.prototype={
aN(a,b){var t,s,r,q
for(t=this.gI(),t=t.gkz(t),s=A.Lh(this).y[1];t.G();){r=t.gl()
q=this.q(0,r)
b.$2(r,q==null?s.a(q):q)}},
gB(a){var t=this.gI()
return t.gB(t)},
"["(a){return A.nO(this)},
$iT8:1}
A.GA.prototype={
$2(a,b){var t,s=this.a
if(!s.a)this.b.a+=", "
s.a=!1
s=this.b
t=s.a+=A.Ej(a)
s.a=t+": "
s.a+=A.Ej(b)}}
A.KP.prototype={}
A.Pn.prototype={
q(a,b){return this.a.q(0,b)},
aN(a,b){this.a.aN(0,b)},
gB(a){return this.a.a},
gI(){var t=this.a
return new A.i5(t,t.$ti.C("i5<1>"))},
"["(a){return A.nO(this.a)},
$iT8:1}
A.Gj.prototype={}
A.RU.prototype={}
A.wI.prototype={}
A.CL.prototype={
$2(a,b){var t=this.b,s=this.a,r=t.a+=s.a
r+=a.a
t.a=r
t.a=r+": "
t.a+=A.K(b)
s.a=", "}}
A.Ge.prototype={}
A.C6.prototype={
"["(a){var t=this.a
if(t!=null)return"Assertion failed: "+A.K(t)
return"Assertion failed"}}
A.E.prototype={}
A.AT.prototype={
gL(){return"Invalid argument"+(!this.a?"(s)":"")},
gY(){return""},
"["(a){var t=this,s=t.c,r=s==null?"":" ("+s+")",q=t.d,p=q==null?"":": "+q,o=t.gL()+r+p
if(!t.a)return o
return o+t.gY()+": "+A.K(t.gE())},
gE(){return this.b}}
A.bJ.prototype={
gE(){return this.b},
gL(){return"RangeError"},
gY(){var t,s=this.e,r=this.f
if(s==null)t=r!=null?": Not less than or equal to "+A.Ej(r):""
else if(r==null)t=": Not greater than or equal to "+A.Ej(s)
else if(r>s)t=": Not in inclusive range "+A.Ej(s)+".."+A.Ej(r)
else t=r<s?": Valid value range is empty":": Only valid value is "+A.Ej(s)
return t}}
A.eY.prototype={
gE(){return this.b},
gL(){return"RangeError"},
gY(){if(this.b<0)return": index must not be negative"
var t=this.f
if(t===0)return": no indices are valid"
return": index should be less than "+t},
gB(a){return this.f}}
A.mp.prototype={
"["(a){var t,s,r,q,p,o,n,m,l=this,k={},j=new A.B("")
k.a=""
t=l.c
for(s=t.length,r=0,q="",p="";r<s;++r,p=", "){o=t[r]
j.a=q+p
q=j.a+=A.K(o)
k.a=", "}l.d.aN(0,new A.CL(k,j))
n=A.K(l.a)
m=j["["](0)
return"NoSuchMethodError: method not found: '"+l.b.a+"'\nReceiver: "+n+"\nArguments: ["+m+"]"}}
A.ub.prototype={
"["(a){return"Unsupported operation: "+this.a}}
A.ds.prototype={
"["(a){return"UnimplementedError: "+this.a}}
A.UV.prototype={
"["(a){var t=this.a
if(t==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.K(t)+"."}}
A.cX.prototype={
E2(a,b,c){return A.K1(this,b,A.Lh(this).C("cX.E"),c)},
gB(a){var t,s=this.gkz(this)
for(t=0;s.G();)++t
return t},
"["(a){return A.Sd(this,"(",")")}}
A.c8.prototype={
giO(a){return A.a.prototype.giO.call(this,0)},
"["(a){return"null"}}
A.a.prototype={$ia:1,
DN(a,b){return this===b},
giO(a){return A.eQ(this)},
"["(a){return"Instance of '"+A.l(this)+"'"},
e7(a,b){throw A.Og(A.Wi(this,b))},
gbx(a){return A.RW(this)},
toString(){return this["["](this)}}
A.B.prototype={
gB(a){return this.a.length},
"["(a){var t=this.a
return t.charCodeAt(0)==0?t:t}}
A.Pb.prototype={
$1(a){var t,s,r,q
if(A.m6(a))return a
t=this.a
if(t.x4(a))return t.q(0,a)
if(u.F.b(a)){s={}
t.t(0,a,s)
for(t=a.gI(),t=t.gkz(t);t.G();){r=t.gl()
s[r]=this.$1(a.q(0,r))}return s}else if(u.x.b(a)){q=[]
t.t(0,a,q)
B.Nm.FV(q,J.M1(a,this,u.z))
return q}else return a}}
A.lM.prototype={}
A.YE.prototype={
U(){this.a=Math.max(18,5)},
W(a){var t,s,r,q,p,o,n,m,l,k,j,i,h,g=a.length
if(!A.m2(a,"&",0))return a
t=new A.B("")
for(s=0;!0;){r=B.xB.K(a,"&",s)
if(r===-1){t.a+=B.xB.yn(a,s)
break}q=t.a+=B.xB.J(a,s,r)
p=this.a
p===$&&A.Q4()
o=B.xB.J(a,r,Math.min(g,r+p))
if(o.length>4&&o.charCodeAt(1)===35){n=B.xB.M(o,";")
if(n!==-1){m=o.charCodeAt(2)===120
l=B.xB.J(o,m?3:2,n)
k=A.Hp(l,m?16:10)
if(k==null)k=-1
if(k!==-1){t.a=q+A.Lw(k)
s=r+(n+1)
continue}}}i=0
while(!0){if(!(i<268)){s=r
j=!1
break}h=B.fO[i]
if(B.xB.R(o,h)){t.a+=B.FN[i]
s=r+h.length
j=!0
break}++i}if(!j){t.a+="&";++s}}g=t.a
return g.charCodeAt(0)==0?g:g}}
A.e.prototype={
$1(a){var t,s,r,q,p,o,n,m=null,l=a.data,k=u.m
if(k.b(l)){t=l.type
s=t
if(s!=null){r=t==null?A.Bt(t):t
q=l.sender
s=q
if(s!=null){p=q==null?A.Bt(q):q
s=r==="ready"}else{p=m
s=!1}}else{p=m
s=!1}}else{p=m
s=!1}if(s){s=this.a
o=s.q(0,p)
if(o!=null){n=self.document.getElementById(p)
if(n==null)n=k.a(n)
k=u.N
k=A.Pe(A.EF(["sourceCode",o,"type","sourceCode"],k,k))
A.tI(n.contentWindow,"postMessage",k,"*",m,m)
s.j(0,p)}}}};(function aliases(){var t=J.zh.prototype
t.u=t["["]})();(function inheritance(){var t=hunkHelpers.mixin,s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.a,null)
r(A.a,[A.FK,J.vB,J.D,A.Ge,A.zl,A.cX,A.a7,A.MH,A.SU,A.wv,A.S5,A.Pn,A.ys,A.vI,A.LI,A.Tp,A.kr,A.il,A.db,A.N6,A.Jc,A.ET,A.lY,A.t3,A.F,A.KP,A.wI,A.c8,A.B])
r(J.vB,[J.yE,J.CD,J.MF,J.yP,J.Dw,J.qI,J.Dr])
r(J.MF,[J.zh,J.jd,A.WZ,A.eH])
r(J.zh,[J.iC,J.kd,J.c5])
s(J.Po,J.jd)
r(J.qI,[J.bU,J.kD])
r(A.Ge,[A.n,A.GK,A.Eq,A.u9,A.C6,A.E,A.AT,A.mp,A.ub,A.ds,A.UV])
r(A.cX,[A.bQ,A.i1,A.Ku])
r(A.bQ,[A.aL,A.i5,A.Ni])
s(A.xy,A.i1)
s(A.A8,A.aL)
s(A.B7,A.S5)
s(A.S0,A.B7)
s(A.RU,A.Pn)
s(A.Gj,A.RU)
s(A.PD,A.Gj)
s(A.LP,A.ys)
r(A.Tp,[A.E1,A.lc,A.dC,A.VX,A.Pb,A.e])
r(A.E1,[A.Cj,A.wN,A.GA,A.CL])
r(A.lc,[A.z,A.r])
r(A.il,[A.N5,A.k6])
r(A.eH,[A.df,A.b0])
r(A.b0,[A.VR,A.WB])
s(A.vX,A.VR)
s(A.Dg,A.vX)
s(A.VS,A.WB)
s(A.DV,A.VS)
r(A.Dg,[A.zU,A.K8])
r(A.DV,[A.xj,A.dE,A.ZA,A.wf,A.Pq,A.eE,A.V6])
s(A.iM,A.u9)
s(A.YF,A.k6)
r(A.AT,[A.bJ,A.eY])
s(A.YE,A.wI)
s(A.lM,A.YE)
t(A.VR,A.F)
t(A.vX,A.SU)
t(A.WB,A.F)
t(A.VS,A.SU)
t(A.RU,A.KP)})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{KN:"int",CP:"double",lf:"num",qU:"String",a2:"bool",c8:"Null",zM:"List",a:"Object",T8:"Map"},mangledNames:{},types:[],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;code,id":(a,b)=>c=>c instanceof A.S0&&a.b(c.a)&&b.b(c.b)}}
A.xb(v.typeUniverse,JSON.parse('{"iC":"zh","kd":"zh","c5":"zh","yE":{"y5":[]},"CD":{"y5":[]},"MF":{"vm":[]},"zh":{"vm":[]},"jd":{"zM":["1"],"bQ":["1"],"vm":[],"cX":["1"]},"Po":{"jd":["1"],"zM":["1"],"bQ":["1"],"vm":[],"cX":["1"]},"qI":{"CP":[]},"bU":{"CP":[],"KN":[],"y5":[]},"kD":{"CP":[],"y5":[]},"Dr":{"qU":[],"y5":[]},"bQ":{"cX":["1"]},"aL":{"bQ":["1"],"cX":["1"]},"i1":{"cX":["2"],"cX.E":"2"},"xy":{"i1":["1","2"],"bQ":["2"],"cX":["2"],"cX.E":"2"},"A8":{"aL":["2"],"bQ":["2"],"cX":["2"],"cX.E":"2","aL.E":"2"},"wv":{"GD":[]},"PD":{"T8":["1","2"]},"ys":{"T8":["1","2"]},"LP":{"T8":["1","2"]},"Ku":{"cX":["1"],"cX.E":"1"},"N5":{"il":["1","2"],"T8":["1","2"]},"i5":{"bQ":["1"],"cX":["1"],"cX.E":"1"},"WZ":{"vm":[],"I2":[],"y5":[]},"eH":{"vm":[]},"df":{"Wy":[],"vm":[],"y5":[]},"b0":{"Xj":["1"],"vm":[]},"Dg":{"F":["CP"],"zM":["CP"],"Xj":["CP"],"bQ":["CP"],"vm":[],"cX":["CP"]},"DV":{"F":["KN"],"zM":["KN"],"Xj":["KN"],"bQ":["KN"],"vm":[],"cX":["KN"]},"zU":{"F":["CP"],"oI":[],"zM":["CP"],"Xj":["CP"],"bQ":["CP"],"vm":[],"cX":["CP"],"y5":[],"F.E":"CP"},"K8":{"F":["CP"],"mJ":[],"zM":["CP"],"Xj":["CP"],"bQ":["CP"],"vm":[],"cX":["CP"],"y5":[],"F.E":"CP"},"xj":{"F":["KN"],"rF":[],"zM":["KN"],"Xj":["KN"],"bQ":["KN"],"vm":[],"cX":["KN"],"y5":[],"F.E":"KN"},"dE":{"F":["KN"],"X6":[],"zM":["KN"],"Xj":["KN"],"bQ":["KN"],"vm":[],"cX":["KN"],"y5":[],"F.E":"KN"},"ZA":{"F":["KN"],"ZX":[],"zM":["KN"],"Xj":["KN"],"bQ":["KN"],"vm":[],"cX":["KN"],"y5":[],"F.E":"KN"},"wf":{"F":["KN"],"HS":[],"zM":["KN"],"Xj":["KN"],"bQ":["KN"],"vm":[],"cX":["KN"],"y5":[],"F.E":"KN"},"Pq":{"F":["KN"],"Pz":[],"zM":["KN"],"Xj":["KN"],"bQ":["KN"],"vm":[],"cX":["KN"],"y5":[],"F.E":"KN"},"eE":{"F":["KN"],"zt":[],"zM":["KN"],"Xj":["KN"],"bQ":["KN"],"vm":[],"cX":["KN"],"y5":[],"F.E":"KN"},"V6":{"F":["KN"],"n6":[],"zM":["KN"],"Xj":["KN"],"bQ":["KN"],"vm":[],"cX":["KN"],"y5":[],"F.E":"KN"},"k6":{"il":["1","2"],"T8":["1","2"]},"YF":{"k6":["1","2"],"il":["1","2"],"T8":["1","2"]},"Ni":{"bQ":["1"],"cX":["1"],"cX.E":"1"},"il":{"T8":["1","2"]},"Pn":{"T8":["1","2"]},"Gj":{"T8":["1","2"]},"zM":{"bQ":["1"],"cX":["1"]},"ZX":{"zM":["KN"],"bQ":["KN"],"cX":["KN"]},"n6":{"zM":["KN"],"bQ":["KN"],"cX":["KN"]},"zt":{"zM":["KN"],"bQ":["KN"],"cX":["KN"]},"rF":{"zM":["KN"],"bQ":["KN"],"cX":["KN"]},"HS":{"zM":["KN"],"bQ":["KN"],"cX":["KN"]},"X6":{"zM":["KN"],"bQ":["KN"],"cX":["KN"]},"Pz":{"zM":["KN"],"bQ":["KN"],"cX":["KN"]},"oI":{"zM":["CP"],"bQ":["CP"],"cX":["CP"]},"mJ":{"zM":["CP"],"bQ":["CP"],"cX":["CP"]}}'))
A.FF(v.typeUniverse,JSON.parse('{"bQ":1,"SU":1,"ys":2,"N6":1,"b0":1,"KP":2,"Pn":2,"Gj":2,"RU":2,"wI":2}'))
var u=(function rtii(){var t=A.q7
return{J:t("I2"),Y:t("Wy"),Z:t("PD<GD,@>"),Q:t("bQ<@>"),C:t("oI"),q:t("mJ"),a:t("EH"),O:t("rF"),k:t("X6"),U:t("ZX"),x:t("cX<a?>"),f:t("jd<a>"),s:t("jd<qU>"),b:t("jd<@>"),T:t("CD"),m:t("vm"),g:t("c5"),p:t("Xj<@>"),B:t("N5<GD,@>"),F:t("T8<a?,a?>"),P:t("c8"),K:t("a"),L:t("VY"),d:t("+()"),N:t("qU"),R:t("y5"),D:t("HS"),v:t("Pz"),e:t("zt"),E:t("n6"),o:t("kd"),G:t("YF<a?,a?>"),y:t("a2"),i:t("CP"),z:t("@"),S:t("KN"),A:t("0&*"),_:t("a*"),V:t("b8<c8>?"),X:t("a?"),H:t("lf")}})();(function constants(){var t=hunkHelpers.makeConstList
B.Ok=J.vB.prototype
B.Nm=J.jd.prototype
B.jn=J.bU.prototype
B.xB=J.Dr.prototype
B.DG=J.c5.prototype
B.Ub=J.MF.prototype
B.ZQ=J.iC.prototype
B.vB=J.kd.prototype
B.O4=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.Yq=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.wb=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.KU=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.dk=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.xi=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.fQ=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.i7=function(hooks) { return hooks; }

B.zt=new A.zl()
B.Nv=new A.kr()
B.FN=A.u(t(["`","\xa0","\xb4","|","\xb7","\xa8","\xb1","\xb7","_","\xae","\xb8","\n","\xa6","%","*","{","|",".","}","\xfd","\xa4","\xfa","\xf5","=","\xf9","@","\xf8","\xb1","\xf7","[","$","\xb7","]","\xd3","_","\xbc","\xbd","\xbe","\xbf","\xc0","\xc1","\xc3","\xf3","\xc8","\xc9","\xcc","\xcd","\xd1","\xd2","\xd5","\xd8","\xd9","\xda","\xdd","\xe0","\xe1","\xe3","\xe7","\xe8","\xe9","\xec","\xed","\xf1","\xf2","\xc7","\xea","\xb4","\xa4","\xf4","\xa6","\xf3","\xa3","\xf2","\xf9","\xf1",":","\xab","\xee","\xf8","\xed","\xfe","\xfd","\xf7","\xc8","\xec","\xaf","\xa1","\xb1","\xe9","\xdf","\xe8","\xb5","\xe7","\xb7","\xb8","\xfb","\xe6",",","\xbb","\xfa","\xbc","\xbd","?","\xbe","\xbf","\xc0","\xc1","\xc2","\xc3","\xc5","\xc5","\xc6","\xe5","\xde","\xc9","\xca","\xcc","\xe3","\xcd","\xce","\xe2","`","\xd1","\xd2","\xe1","\xd3","\xd4","f","\xd5","\xe0","\xd7","\xf5","\xd8","\xd9","\xda","\xdb","\xdd","\xc7","\xaf","\xb2","[",";","\xb3","\xc2","\\","+","\xc4","\xe5","\xf4","\xb4","\xc5","\xa7","\xc6","\xa9","\xb5","]","\xd7","\xff","\xb6","\xa2","\xca","\xcb","\xe4","\xfe","\xa0","\xfc","\xf6","\xfb","\xce","\xcf","}","\xe2","\xa9","\xb8","\xa1","'","\xb9","\xaa","\xba","\xef","\xd4","\xa3","\xbb","\xd6","\xab","\xeb",">","(",'"',"{","\xbd",")","\xee","\xea","\xdb","\xdc","\xdf","|","!","<","\xde",'"',"\xe6","=","\xd6",'"',"\xff","\xf6","\xd0","\xcf","&","\xcb","\xe4","&","\xc4","\xb9","\xba","*","\xb6","\xa0","#","\xb3","\xb2","\xad","\xfc","\xf7","\xeb","\xb0","\xaf","\xae","\xae","\xdc","\xac","\xaa","\xef","\xf0","\xa9","\xa9","\xa8","\xa2","\xa8","\xa8","\xa7","/",'"',"\xa5","\t","^","\xd0","\xb1","\xb0","\xae","\xae","\xad","\xac","\xa8","\xa5",">",">","<","<","&","&","\xf0",">",">","<","<"]),u.s)
B.xD=A.u(t([]),u.b)
B.fO=A.u(t(["&DiacriticalGrave;","&NonBreakingSpace;","&DiacriticalAcute;","&VerticalLine;","&centerdot;","&DoubleDot;","&PlusMinus;","&CenterDot;","&UnderBar;","&circledR;","&Cedilla;","&NewLine;","&brvbar;","&percnt;","&midast;","&lbrace;","&verbar;","&period;","&rbrace;","&yacute;","&curren;","&uacute;","&otilde;","&equals;","&ugrave;","&commat;","&oslash;","&plusmn;","&divide;","&lbrack;","&dollar;","&middot;","&rbrack;","&Oacute;","&lowbar;","&frac14;","&frac12;","&frac34;","&iquest;","&Agrave;","&Aacute;","&Atilde;","&oacute;","&Egrave;","&Eacute;","&Igrave;","&Iacute;","&Ntilde;","&Ograve;","&Otilde;","&Oslash;","&Ugrave;","&Uacute;","&Yacute;","&agrave;","&aacute;","&atilde;","&ccedil;","&egrave;","&eacute;","&igrave;","&iacute;","&ntilde;","&ograve;","&Ccedil;","&ecirc;","&acute;","&curren","&ocirc;","&brvbar","&oacute","&pound;","&ograve","&ugrave","&ntilde","&colon;","&laquo;","&icirc;","&oslash","&iacute","&thorn;","&yacute","&divide","&Egrave","&igrave","&strns;","&iexcl;","&plusmn","&eacute","&szlig;","&egrave","&micro;","&ccedil","&middot","&cedil;","&ucirc;","&aelig;","&comma;","&raquo;","&uacute","&frac14","&frac12","&quest;","&frac34","&iquest","&Agrave","&Aacute","&Acirc;","&Atilde","&Aring;","&angst;","&AElig;","&aring;","&THORN;","&Eacute","&Ecirc;","&Igrave","&atilde","&Iacute","&Icirc;","&acirc;","&grave;","&Ntilde","&Ograve","&aacute","&Oacute","&Ocirc;","&fjlig;","&Otilde","&agrave","&times;","&otilde","&Oslash","&Ugrave","&Uacute","&Ucirc;","&Yacute","&Ccedil","&macr;","&sup2;","&lsqb;","&semi;","&sup3;","&Acirc","&bsol;","&plus;","&Auml;","&aring","&ocirc","&acute","&Aring","&sect;","&AElig","&copy;","&micro","&rsqb;","&times","&yuml;","&para;","&cent;","&Ecirc","&Euml;","&auml;","&thorn","&nbsp;","&uuml;","&ouml;","&ucirc","&Icirc","&Iuml;","&rcub;","&acirc","&COPY;","&cedil","&iexcl","&apos;","&sup1;","&ordf;","&ordm;","&iuml;","&Ocirc","&pound","&raquo","&Ouml;","&laquo","&euml;","&nvgt;","&lpar;","&QUOT;","&lcub;","&half;","&rpar;","&icirc","&ecirc","&Ucirc","&Uuml;","&szlig","&vert;","&excl;","&nvlt;","&THORN","&quot;","&aelig","&bne;","&Ouml","&quot","&yuml","&ouml","&ETH;","&Iuml","&AMP;","&Euml","&auml","&amp;","&Auml","&sup1","&ordm","&ast;","&para","&nbsp","&num;","&sup3","&sup2","&shy;","&uuml","&div;","&euml","&deg;","&macr","&REG;","&reg;","&Uuml","&not;","&ordf","&iuml","&eth;","&COPY","&copy","&Dot;","&cent","&die;","&uml;","&sect","&sol;","&QUOT","&yen;","&Tab;","&Hat;","&ETH","&pm;","&deg","&REG","&reg","&shy","&not","&uml","&yen","&GT;","&gt;","&LT;","&lt;","&AMP","&amp","&eth","&GT","&gt","&LT","&lt"]),u.s)
B.p6={}
B.CM=new A.LP(B.p6,[],A.q7("LP<GD,@>"))
B.Te=new A.wv("call")
B.Vg=A.xq("I2")
B.Kb=A.xq("Wy")
B.lq=A.xq("oI")
B.KW=A.xq("mJ")
B.OE=A.xq("rF")
B.rr=A.xq("X6")
B.dW=A.xq("ZX")
B.Ly=A.xq("a")
B.j1=A.xq("HS")
B.U6=A.xq("Pz")
B.pd=A.xq("zt")
B.Pk=A.xq("n6")})();(function staticFields(){$.zm=null
$.Qu=A.u([],u.f)
$.xu=null
$.i0=null
$.Hb=null
$.NF=null
$.TX=null
$.x7=null
$.nw=null
$.vv=null
$.Bv=null
$.Bi=A.u([],A.q7("jd<zM<a>?>"))
$.ra=0})();(function lazyInitializers(){var t=hunkHelpers.lazyFinal
t($,"fa","w",()=>A.L("_$dart_dartClosure"))
t($,"X0","t8",()=>A.CU(B.Ly))
t($,"Zj","Ww",()=>{var s=new A.lM()
s.U()
return s})})();(function nativeSupport(){!function(){var t=function(a){var n={}
n[a]=1
return Object.keys(hunkHelpers.convertToFastObject(n))[0]}
v.getIsolateTag=function(a){return t("___dart_"+a+v.isolateTag)}
var s="___dart_isolate_tags_"
var r=Object[s]||(Object[s]=Object.create(null))
var q="_ZxYxX"
for(var p=0;;p++){var o=t(q+"_"+p+"_")
if(!(o in r)){r[o]=1
v.isolateTag=o
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.WZ,ArrayBufferView:A.eH,DataView:A.df,Float32Array:A.zU,Float64Array:A.K8,Int16Array:A.xj,Int32Array:A.dE,Int8Array:A.ZA,Uint16Array:A.wf,Uint32Array:A.Pq,Uint8ClampedArray:A.eE,CanvasPixelArray:A.eE,Uint8Array:A.V6})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.b0.$nativeSuperclassTag="ArrayBufferView"
A.VR.$nativeSuperclassTag="ArrayBufferView"
A.vX.$nativeSuperclassTag="ArrayBufferView"
A.Dg.$nativeSuperclassTag="ArrayBufferView"
A.WB.$nativeSuperclassTag="ArrayBufferView"
A.VS.$nativeSuperclassTag="ArrayBufferView"
A.DV.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$1$1=function(a){return this(a)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var t=document.scripts
function onLoad(b){for(var r=0;r<t.length;++r){t[r].removeEventListener("load",onLoad,false)}a(b.target)}for(var s=0;s<t.length;++s){t[s].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var t=A.E2
if(typeof dartMainRunner==="function"){dartMainRunner(t,[])}else{t([])}})})()