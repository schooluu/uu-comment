"use strict";const e=require("../../../common/vendor.js"),a={__name:"index",setup(a){const t=e.ref(0),s=()=>{e.index.navigateTo({url:"/pages/shop/points/index"})},i=[{icon:"🏪",text:"门店自取",desc:"下单免排队"},{icon:"🛵",text:"外卖",desc:"无需接触 送至到家"},{icon:"🎁",text:"喜茶百货",desc:"甄选好物 正品保障"},{icon:"🏢",text:"企业团餐",desc:"50份起送"}],n=[{icon:"🏠",text:"首页"},{icon:"📋",text:"点单"},{icon:"🛒",text:"购物车"},{icon:"🎁",text:"礼品"},{icon:"👤",text:"我的"}];return(a,o)=>({a:e.f(i,((a,t,s)=>({a:e.t(a.icon),b:e.t(a.text),c:e.t(a.desc),d:t,e:e.o((a=>(a=>{switch(a){case 0:case 1:e.index.navigateTo({url:"/pages/shop/store/list"});break;case 2:e.index.navigateTo({url:"/pages/shop/mall/index"});break;case 3:e.index.navigateTo({url:"/pages/shop/group/index"})}})(t)),t)}))),b:e.o(s),c:e.f(n,((a,s,i)=>({a:e.t(a.icon),b:e.t(a.text),c:s,d:t.value===s?1:"",e:e.o((a=>(a=>{switch(t.value=a,a){case 0:e.index.switchTab({url:"/pages/shop/home/index"});break;case 1:e.index.navigateTo({url:"/pages/shop/store/list"});break;case 2:e.index.navigateTo({url:"/pages/shop/cart/index"});break;case 3:e.index.navigateTo({url:"/pages/shop/gift/index"});break;case 4:e.index.navigateTo({url:"/pages/shop/user/index"})}})(s)),s)})))})}},t=e._export_sfc(a,[["__scopeId","data-v-5ff47a6e"]]);qq.createPage(t);