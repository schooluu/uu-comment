import{r as a,c as e,e as s,w as t,i as c,F as l,j as i,k as n,f as o,h as d,t as r,z as u,R as p,q as g,v as m,N as f,D as _,l as h,x as k,S as v}from"./index-DrOnuFbu.js";import{_ as y}from"./_plugin-vue_export-helper.BCo6x5W8.js";const b=y({__name:"tab-bar",props:{current:{type:String,default:"/pages/school/home/index"}},setup(f){const _=f,h=a([{text:"首页",path:"/pages/school/home/index"},{text:"论坛",path:"/pages/school/forum/index"},{text:"订单",path:"/pages/school/order/index"},{text:"我的",path:"/pages/school/my/index"}]);return(a,k)=>{const v=g,y=m;return e(),s(y,{class:"tab-bar"},{default:t((()=>[(e(!0),c(l,null,i(h.value,((a,c)=>(e(),s(y,{key:c,class:n(["tab-item",{active:f.current===a.path}]),onClick:e=>{return s=a.path,void(_.current!==s&&p({url:s}));var s}},{default:t((()=>[o(v,{class:"text"},{default:t((()=>[d(r(a.text),1)])),_:2},1024),f.current===a.path?(e(),s(y,{key:0,class:"indicator"})):u("",!0)])),_:2},1032,["class","onClick"])))),128))])),_:1})}}},[["__scopeId","data-v-5f792ece"]]),x=y({__name:"index",setup(p){const y=a("成都理工大学(二仙桥校区)"),x=a([{id:1,name:"好吃的饭",icon:"/static/icons/rice.png"},{id:2,name:"火锅冒菜",icon:"/static/icons/hotpot.png"},{id:3,name:"米饭好吃",icon:"/static/icons/bento.png"},{id:4,name:"串串小吃",icon:"/static/icons/skewer.png"},{id:5,name:"热卤汤锅",icon:"/static/icons/soup.png"},{id:6,name:"奶茶饮品",icon:"/static/icons/drink.png"},{id:7,name:"蛋糕烘培",icon:"/static/icons/cake.png"},{id:8,name:"美食快餐",icon:"/static/icons/fastfood.png"},{id:9,name:"米粉面条",icon:"/static/icons/noodle.png"},{id:10,name:"蛋糕甜品",icon:"/static/icons/dessert.png"}]),C=f((()=>{const a=_();return`/${a[a.length-1].route}`})),F=a([{id:1,name:"水牛奶鸡蛋",image:"/static/products/1.jpg",currentPrice:"5.90",originalPrice:"7.00",tag:"新人价"},{id:2,name:"超值特惠汉堡",image:"/static/products/2.jpg",currentPrice:"6.50",originalPrice:"9.90",tag:"今日价"},{id:3,name:"墨西哥鸡肉卷",image:"/static/products/3.jpg",currentPrice:"9.90",originalPrice:"15.00",tag:"今日价"},{id:4,name:"超嗲草莓奶茶",image:"/static/products/4.jpg",currentPrice:"9.90",originalPrice:"12.00",tag:"人气"}]);a([{id:"home",name:"首页",icon:"🏠"},{id:"forum",name:"论坛",icon:"💬"},{id:"order",name:"订单",icon:"📋"},{id:"my",name:"我的",icon:"👤"}]),a("home");const P=()=>{h({url:"/pages/school/location/index"})},j=()=>{h({url:"/pages/school/search/index"})},w=()=>{h({url:"/pages/school/coupon/index"})},S=()=>{h({url:"/pages/school/specials/index"})},$=a([{id:1,name:"综合排序",active:!0},{id:2,name:"销量最高",active:!1},{id:3,name:"距离最近",active:!1},{id:4,name:"好评优先",active:!1}]),I=a([{id:1,name:"珍珍新鸡排店",image:"/static/shops/1.jpg",rating:4.8,monthlySales:1,distance:.8,deliveryFee:"¥0起送",deliveryTime:"30",tags:["24小时营业","欢迎各位同学帮忙介绍生意"]}]);return(a,p)=>{const f=g,_=m,R=k,T=v;return e(),s(_,{class:"home-page"},{default:t((()=>[o(_,{class:"header"},{default:t((()=>[o(_,{class:"location",onClick:P},{default:t((()=>[o(f,{class:"icon"},{default:t((()=>[d("📍")])),_:1}),o(f,{class:"location-name"},{default:t((()=>[d(r(y.value),1)])),_:1}),o(f,{class:"arrow"},{default:t((()=>[d(">")])),_:1})])),_:1}),o(_,{class:"search-box",onClick:j},{default:t((()=>[o(f,{class:"icon"},{default:t((()=>[d("🔍")])),_:1}),o(f,{class:"placeholder"},{default:t((()=>[d("搜索")])),_:1})])),_:1})])),_:1}),o(_,{class:"banner",onClick:w},{default:t((()=>[o(R,{class:"banner-image",src:"./static/images/banner/coupon.png",mode:"aspectFill"})])),_:1}),o(_,{class:"food-categories"},{default:t((()=>[(e(!0),c(l,null,i(x.value,(a=>(e(),s(_,{class:"category-item",key:a.id,onClick:e=>(a=>{h({url:`/pages/school/category/index?id=${a.id}`})})(a)},{default:t((()=>[o(R,{class:"category-icon",src:a.icon,mode:"aspectFit"},null,8,["src"]),o(f,{class:"category-name"},{default:t((()=>[d(r(a.name),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1}),o(_,{class:"daily-specials"},{default:t((()=>[o(_,{class:"section-header"},{default:t((()=>[o(f,{class:"title"},{default:t((()=>[d("天天特价")])),_:1}),o(f,{class:"subtitle"},{default:t((()=>[d("这里买更优惠")])),_:1}),o(f,{class:"more",onClick:S},{default:t((()=>[d("更多 >")])),_:1})])),_:1}),o(T,{class:"specials-list","scroll-x":"","show-scrollbar":!1,enhanced:""},{default:t((()=>[(e(!0),c(l,null,i(F.value,(a=>(e(),s(_,{class:"special-item",key:a.id,onClick:e=>(a=>{h({url:`/pages/school/product/index?id=${a.id}`})})(a)},{default:t((()=>[o(R,{class:"product-image",src:a.image,mode:"aspectFill"},null,8,["src"]),o(f,{class:"product-name"},{default:t((()=>[d(r(a.name),1)])),_:2},1024),o(_,{class:"price-info"},{default:t((()=>[o(f,{class:"current-price"},{default:t((()=>[d("¥"+r(a.currentPrice),1)])),_:2},1024),o(f,{class:"original-price"},{default:t((()=>[d("¥"+r(a.originalPrice),1)])),_:2},1024)])),_:2},1024),a.tag?(e(),s(f,{key:0,class:"tag"},{default:t((()=>[d(r(a.tag),1)])),_:2},1024)):u("",!0)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),o(_,{class:"ad-cards"},{default:t((()=>[o(_,{class:"card",onClick:p[0]||(p[0]=e=>a.handleCard("coupon"))},{default:t((()=>[o(_,{class:"card-content"},{default:t((()=>[o(_,{class:"card-title"},{default:t((()=>[d("送6张5元券")])),_:1}),o(_,{class:"card-subtitle"},{default:t((()=>[d("超级会员专享")])),_:1}),o(_,{class:"card-tag"},{default:t((()=>[d("9.9元得")])),_:1})])),_:1}),o(R,{class:"card-image",src:"./static/images/coupon.png",mode:"aspectFit"})])),_:1}),o(_,{class:"card",onClick:p[1]||(p[1]=e=>a.handleCard("runner"))},{default:t((()=>[o(_,{class:"card-content"},{default:t((()=>[o(_,{class:"card-title"},{default:t((()=>[d("万能帮帮")])),_:1}),o(_,{class:"card-subtitle"},{default:t((()=>[d("下单跑腿更方便")])),_:1}),o(_,{class:"card-btn"},{default:t((()=>[d("立即查看")])),_:1})])),_:1}),o(R,{class:"card-image",src:"./static/images/runner.png",mode:"aspectFit"})])),_:1})])),_:1}),o(_,{class:"recruit-banner",onClick:a.handleRecruit},{default:t((()=>[o(R,{class:"banner-bg",src:"./static/images/recruit-bg.png",mode:"aspectFill"}),o(_,{class:"banner-content"},{default:t((()=>[o(f,{class:"title"},{default:t((()=>[d("来，一起送餐赚钱")])),_:1}),o(f,{class:"subtitle"},{default:t((()=>[d("校园外卖 配送服务")])),_:1}),o(_,{class:"action-btn"},{default:t((()=>[d("立即报名")])),_:1})])),_:1})])),_:1},8,["onClick"]),o(_,{class:"nearby-shops"},{default:t((()=>[o(_,{class:"section-header"},{default:t((()=>[o(f,{class:"title"},{default:t((()=>[d("附近商家")])),_:1}),o(_,{class:"filter-tags"},{default:t((()=>[(e(!0),c(l,null,i($.value,(c=>(e(),s(f,{class:n(["tag",{active:c.active}]),key:c.id,onClick:e=>a.toggleFilter(c)},{default:t((()=>[d(r(c.name),1)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1}),o(_,{class:"shop-list"},{default:t((()=>[(e(!0),c(l,null,i(I.value,(n=>(e(),s(_,{class:"shop-item",key:n.id,onClick:e=>a.viewShop(n)},{default:t((()=>[o(R,{class:"shop-image",src:n.image,mode:"aspectFill"},null,8,["src"]),o(_,{class:"shop-info"},{default:t((()=>[o(_,{class:"shop-name"},{default:t((()=>[d(r(n.name),1)])),_:2},1024),o(_,{class:"shop-rating"},{default:t((()=>[o(f,{class:"rating"},{default:t((()=>[d(r(n.rating),1)])),_:2},1024),o(f,{class:"monthly-sales"},{default:t((()=>[d("月销 "+r(n.monthlySales),1)])),_:2},1024),o(f,{class:"distance"},{default:t((()=>[d(r(n.distance)+"km",1)])),_:2},1024)])),_:2},1024),o(_,{class:"delivery-info"},{default:t((()=>[o(f,{class:"delivery-fee"},{default:t((()=>[d(r(n.deliveryFee)+"起送",1)])),_:2},1024),o(f,{class:"delivery-time"},{default:t((()=>[d(r(n.deliveryTime)+"分钟",1)])),_:2},1024)])),_:2},1024),o(_,{class:"shop-tags"},{default:t((()=>[(e(!0),c(l,null,i(n.tags,(a=>(e(),s(f,{class:"tag",key:a},{default:t((()=>[d(r(a),1)])),_:2},1024)))),128))])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),o(b,{current:C.value},null,8,["current"])])),_:1})}}},[["__scopeId","data-v-4b940e17"]]);export{x as default};