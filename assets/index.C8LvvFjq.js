var ee=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Z(p){return p&&p.__esModule&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p}var m={exports:{}},u={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var N;function J(){if(N)return u;N=1;var p=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),M=Symbol.for("react.fragment"),k=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),L=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),D=Symbol.for("react.memo"),C=Symbol.for("react.lazy"),w=Symbol.iterator;function z(e){return e===null||typeof e!="object"?null:(e=w&&e[w]||e["@@iterator"],typeof e=="function"?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,h={};function l(e,t,n){this.props=e,this.context=t,this.refs=h,this.updater=n||g}l.prototype.isReactComponent={},l.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},l.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function S(){}S.prototype=l.prototype;function d(e,t,n){this.props=e,this.context=t,this.refs=h,this.updater=n||g}var E=d.prototype=new S;E.constructor=d,A(E,l.prototype),E.isPureReactComponent=!0;var j=Array.isArray,f={H:null,A:null,T:null,S:null},O=Object.prototype.hasOwnProperty;function R(e,t,n,r,s,i){return n=i.ref,{$$typeof:p,type:e,key:t,ref:n!==void 0?n:null,props:i}}function G(e,t){return R(e.type,t,void 0,void 0,void 0,e.props)}function v(e){return typeof e=="object"&&e!==null&&e.$$typeof===p}function K(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var H=/\/+/g;function T(e,t){return typeof e=="object"&&e!==null&&e.key!=null?K(""+e.key):t.toString(36)}function P(){}function B(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(P,P):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function _(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case p:case b:o=!0;break;case C:return o=e._init,_(o(e._payload),t,n,r,s)}}if(o)return s=s(e),o=r===""?"."+T(e,0):r,j(s)?(n="",o!=null&&(n=o.replace(H,"$&/")+"/"),_(s,t,n,"",function(X){return X})):s!=null&&(v(s)&&(s=G(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(H,"$&/")+"/")+o)),t.push(s)),1;o=0;var a=r===""?".":r+":";if(j(e))for(var c=0;c<e.length;c++)r=e[c],i=a+T(r,c),o+=_(r,t,n,i,s);else if(c=z(e),typeof c=="function")for(e=c.call(e),c=0;!(r=e.next()).done;)r=r.value,i=a+T(r,c++),o+=_(r,t,n,i,s);else if(i==="object"){if(typeof e.then=="function")return _(B(e),t,n,r,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return o}function y(e,t,n){if(e==null)return e;var r=[],s=0;return _(e,r,"","",function(i){return t.call(n,i,s++)}),r}function W(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var $=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Q(){}return u.Children={map:y,forEach:function(e,t,n){y(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return y(e,function(){t++}),t},toArray:function(e){return y(e,function(t){return t})||[]},only:function(e){if(!v(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},u.Component=l,u.Fragment=M,u.Profiler=x,u.PureComponent=d,u.StrictMode=k,u.Suspense=q,u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=f,u.act=function(){throw Error("act(...) is not supported in production builds of React.")},u.cache=function(e){return function(){return e.apply(null,arguments)}},u.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var r=A({},e.props),s=e.key,i=void 0;if(t!=null)for(o in t.ref!==void 0&&(i=void 0),t.key!==void 0&&(s=""+t.key),t)!O.call(t,o)||o==="key"||o==="__self"||o==="__source"||o==="ref"&&t.ref===void 0||(r[o]=t[o]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var a=Array(o),c=0;c<o;c++)a[c]=arguments[c+2];r.children=a}return R(e.type,s,void 0,void 0,i,r)},u.createContext=function(e){return e={$$typeof:L,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:I,_context:e},e},u.createElement=function(e,t,n){var r,s={},i=null;if(t!=null)for(r in t.key!==void 0&&(i=""+t.key),t)O.call(t,r)&&r!=="key"&&r!=="__self"&&r!=="__source"&&(s[r]=t[r]);var o=arguments.length-2;if(o===1)s.children=n;else if(1<o){for(var a=Array(o),c=0;c<o;c++)a[c]=arguments[c+2];s.children=a}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)s[r]===void 0&&(s[r]=o[r]);return R(e,i,void 0,void 0,null,s)},u.createRef=function(){return{current:null}},u.forwardRef=function(e){return{$$typeof:U,render:e}},u.isValidElement=v,u.lazy=function(e){return{$$typeof:C,_payload:{_status:-1,_result:e},_init:W}},u.memo=function(e,t){return{$$typeof:D,type:e,compare:t===void 0?null:t}},u.startTransition=function(e){var t=f.T,n={};f.T=n;try{var r=e(),s=f.S;s!==null&&s(n,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&r.then(Q,$)}catch(i){$(i)}finally{f.T=t}},u.unstable_useCacheRefresh=function(){return f.H.useCacheRefresh()},u.use=function(e){return f.H.use(e)},u.useActionState=function(e,t,n){return f.H.useActionState(e,t,n)},u.useCallback=function(e,t){return f.H.useCallback(e,t)},u.useContext=function(e){return f.H.useContext(e)},u.useDebugValue=function(){},u.useDeferredValue=function(e,t){return f.H.useDeferredValue(e,t)},u.useEffect=function(e,t){return f.H.useEffect(e,t)},u.useId=function(){return f.H.useId()},u.useImperativeHandle=function(e,t,n){return f.H.useImperativeHandle(e,t,n)},u.useInsertionEffect=function(e,t){return f.H.useInsertionEffect(e,t)},u.useLayoutEffect=function(e,t){return f.H.useLayoutEffect(e,t)},u.useMemo=function(e,t){return f.H.useMemo(e,t)},u.useOptimistic=function(e,t){return f.H.useOptimistic(e,t)},u.useReducer=function(e,t,n){return f.H.useReducer(e,t,n)},u.useRef=function(e){return f.H.useRef(e)},u.useState=function(e){return f.H.useState(e)},u.useSyncExternalStore=function(e,t,n){return f.H.useSyncExternalStore(e,t,n)},u.useTransition=function(){return f.H.useTransition()},u.version="19.0.0",u}var Y;function V(){return Y||(Y=1,m.exports=J()),m.exports}var F=V();const te=Z(F);export{te as R,V as a,ee as c,F as r};