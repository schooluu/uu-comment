import{r as s,o as e,e as a,w as t,am as l,a3 as u,m as o,c,f as d,h as i,v as n,i as r,j as f,F as _,z as m,l as g,I as p,S as v,k as h,C as b,x as k,an as x,s as y,V as C,q as T,t as I}from"./index-BIIEW6ik.js";import{_ as j}from"./_plugin-vue_export-helper.BCo6x5W8.js";const w=j({__name:"list",setup(j){const w=s(""),F=s("正在定位..."),q=["全部门店","距离最近","评分最高","新开门店"],H=s(0),L=s(!1),V=s(!1),$=s([{id:1,name:"喜茶北京三里屯店",image:"https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",distance:.8,address:"北京市朝阳区三里屯太古里北区N8-B1-3",features:["可预约","WIFI","礼品卡","室内停车"],status:"open",statusText:"营业中",businessHours:"10:00-22:00",latitude:39.934,longitude:116.455},{id:1,name:"喜茶北京三里屯店",image:"https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",distance:.8,address:"北京市朝阳区三里屯太古里北区N8-B1-3",features:["可预约","WIFI","礼品卡","室内停车"],status:"open",statusText:"营业中",businessHours:"10:00-22:00",latitude:39.934,longitude:116.455},{id:1,name:"喜茶北京三里屯店",image:"https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",distance:.8,address:"北京市朝阳区三里屯太古里北区N8-B1-3",features:["可预约","WIFI","礼品卡","室内停车"],status:"open",statusText:"营业中",businessHours:"10:00-22:00",latitude:39.934,longitude:116.455}]),B=()=>{l({type:"gcj02",success:s=>{u({url:`https://api.map.baidu.com/reverse_geocoding/v3/?ak=YOUR_KEY&location=${s.latitude},${s.longitude}`,success:s=>{F.value=s.data.result.address_component.street}})},fail:()=>{F.value="定位失败"}})},N=()=>{F.value="定位中...",B(),K()},W=()=>{if(!w.value.trim())return void U();const s=w.value.toLowerCase();$.value=$.value.filter((e=>e.name.toLowerCase().includes(s)||e.address.toLowerCase().includes(s)))},P=s=>{event.stopPropagation(),"closed"!==s.status?"busy"!==s.status?(s=>{k({url:`/pages/shop/store/goodsList?id=${s.id}`})})(s):C({title:"门店忙碌提醒",content:"当前门店较为繁忙，可能需要较长等待时间，是否继续下单？",confirmText:"继续下单",cancelText:"换个门店",success:s=>{s.confirm}}):y({title:"门店已打烊，请明天再来",icon:"none",duration:2e3})},R=async()=>{L.value=!0,setTimeout((()=>{L.value=!1}),1e3)},S=()=>{V.value||(V.value=!0,setTimeout((()=>{V.value=!1}),1e3))},U=()=>{V.value=!0,setTimeout((()=>{V.value=!1}),500)},Y=()=>{$.value.sort(((s,e)=>s.distance-e.distance))},z=()=>{$.value.sort(((s,e)=>e.rating-s.rating))},E=()=>{V.value=!0,setTimeout((()=>{$.value=[],V.value=!1}),500)},K=()=>{V.value=!0,setTimeout((()=>{$.value=[],V.value=!1}),500)};return e((()=>{B(),U()})),(s,e)=>{const l=g,u=p,y=o,C=v,j=T,B=I;return c(),a(y,{class:"store-container"},{default:t((()=>[d(y,{class:"search-bar glass-effect"},{default:t((()=>[d(y,{class:"search-input"},{default:t((()=>[d(l,{class:"search-icon"},{default:t((()=>[i("🔍")])),_:1}),d(u,{modelValue:w.value,"onUpdate:modelValue":e[0]||(e[0]=s=>w.value=s),placeholder:"搜索门店名称或地址",onInput:W},null,8,["modelValue"])])),_:1}),d(y,{class:"location",onClick:N},{default:t((()=>[d(l,{class:"location-icon"},{default:t((()=>[i("📍")])),_:1}),d(l,{class:"location-text"},{default:t((()=>[i(n(F.value),1)])),_:1})])),_:1})])),_:1}),d(C,{class:"filter-scroll glass-effect","scroll-x":"","show-scrollbar":!1,enhanced:""},{default:t((()=>[d(y,{class:"filter-list"},{default:t((()=>[(c(),r(_,null,f(q,((e,a)=>d(y,{class:h(["filter-item",{active:H.value===a}]),key:a,onClick:s=>(s=>{if(H.value!==s)switch(H.value=s,s){case 0:U();break;case 1:Y();break;case 2:z();break;case 3:E()}})(a)},{default:t((()=>[d(l,{class:"filter-icon"},{default:t((()=>[i(n(s.filterIcons[a]),1)])),_:2},1024),d(l,{class:"filter-text"},{default:t((()=>[i(n(e),1)])),_:2},1024)])),_:2},1032,["class","onClick"]))),64))])),_:1})])),_:1}),d(C,{class:"store-list","scroll-y":"",onScrolltolower:S,"refresher-enabled":"","refresher-triggered":L.value,onRefresherrefresh:R},{default:t((()=>[(c(!0),r(_,null,f($.value,(s=>(c(),a(y,{class:"store-card glass-effect",key:s.id,onClick:e=>(s=>{k({url:`/pages/shop/store/detail?id=${s.id}`})})(s)},{default:t((()=>[d(j,{src:s.image,mode:"aspectFill",class:"store-image"},null,8,["src"]),d(y,{class:"store-info"},{default:t((()=>[d(y,{class:"store-header"},{default:t((()=>[d(l,{class:"store-name"},{default:t((()=>[i(n(s.name),1)])),_:2},1024),d(y,{class:"distance-tag"},{default:t((()=>[d(l,{class:"distance"},{default:t((()=>[i(n(s.distance)+"km",1)])),_:2},1024)])),_:2},1024)])),_:2},1024),d(y,{class:"store-address"},{default:t((()=>[d(l,{class:"address-text"},{default:t((()=>[i(n(s.address),1)])),_:2},1024),d(l,{class:"navigation-btn",onClick:b((e=>(s=>{event.stopPropagation(),x({latitude:s.latitude,longitude:s.longitude,name:s.name,address:s.address,scale:18})})(s)),["stop"])},{default:t((()=>[i("导航")])),_:2},1032,["onClick"])])),_:2},1024),d(y,{class:"store-features"},{default:t((()=>[(c(!0),r(_,null,f(s.features,((s,e)=>(c(),a(l,{class:"feature-tag",key:e},{default:t((()=>[i(n(s),1)])),_:2},1024)))),128))])),_:2},1024),d(y,{class:"store-status"},{default:t((()=>[d(y,{class:"status-info"},{default:t((()=>[d(y,{class:h(["status-badge",s.status])},{default:t((()=>[d(l,{class:"status-icon"},{default:t((()=>[i(n("open"===s.status?"🟢":"busy"===s.status?"🟡":"⚪️"),1)])),_:2},1024),d(l,{class:"status-text"},{default:t((()=>[i(n(s.statusText),1)])),_:2},1024)])),_:2},1032,["class"]),d(y,{class:"hours-info"},{default:t((()=>[d(l,{class:"hours-icon"},{default:t((()=>[i("🕐")])),_:1}),d(l,{class:"business-hours"},{default:t((()=>[i(n(s.businessHours),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),d(B,{class:h(["order-btn",{disabled:"closed"===s.status}]),onClick:b((e=>P(s)),["stop"])},{default:t((()=>[d(l,{class:"btn-icon"},{default:t((()=>[i(n("closed"===s.status?"🌙":"🛍️"),1)])),_:2},1024),d(l,{class:"btn-text"},{default:t((()=>[i(n("closed"===s.status?"已打烊":"去下单"),1)])),_:2},1024)])),_:2},1032,["class","onClick"])])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])))),128)),V.value?(c(),a(y,{key:0,class:"loading-state"},{default:t((()=>[d(l,{class:"loading-text"},{default:t((()=>[i("加载中...")])),_:1})])),_:1})):m("",!0),0!==$.value.length||V.value?m("",!0):(c(),a(y,{key:1,class:"empty-state"},{default:t((()=>[d(l,{class:"empty-icon"},{default:t((()=>[i("🏪")])),_:1}),d(l,{class:"empty-text"},{default:t((()=>[i("暂无门店")])),_:1}),d(l,{class:"empty-desc"},{default:t((()=>[i("换个地址试试吧")])),_:1})])),_:1}))])),_:1},8,["refresher-triggered"])])),_:1})}}},[["__scopeId","data-v-629ea6a7"]]);export{w as default};