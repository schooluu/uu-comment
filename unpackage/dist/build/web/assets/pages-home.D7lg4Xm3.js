import{d as a,r as e,g as t,o as l,a as s,b as c,c as u,e as n,w as i,f as d,h as o,n as f,u as r,i as p,j as _,t as m,F as g,k as h,Y as v,s as b,l as k,m as y,p as j,q as w,v as C,x,y as F}from"./index-DrOnuFbu.js";import{_ as q}from"./uni-popup.DqZE0wte.js";import{r as E}from"./uni-app.es.DqH7TAxO.js";import{_ as P}from"./_plugin-vue_export-helper.BCo6x5W8.js";const A=P(a({__name:"home",setup(a){const P=e(null),A=e("default"),B=t().statusBarHeight,D=e(""),I=e(""),Q=e([{id:1,title:"人人点评模板",description:"匿名化点评平台，为用户提供真实可靠的评价信息",image:"/static/images/project1.png",tags:["Vue3","uniapp"]},{id:2,title:"舞蹈店预约模板",description:"AI驱动的舞蹈店预约模板，提供全方位的智能服务",image:"/static/images/project2.png",tags:["Vue3","uniapp"]}]),T=[{label:"默认紫",value:"default",gradient:"linear-gradient(135deg, #7C3AED, #4F46E5)"},{label:"清新蓝",value:"blue",gradient:"linear-gradient(135deg, #0EA5E9, #2563EB)"},{label:"自然绿",value:"green",gradient:"linear-gradient(135deg, #10B981, #059669)"},{label:"活力红",value:"red",gradient:"linear-gradient(135deg, #EF4444, #DC2626)"}],V=()=>{P.value.open()};l((()=>{const a=s("theme");a&&(A.value=a)}));const H=()=>{j({urls:[I.value]})};(async()=>{try{const{result:a}=await v.callFunction({name:"getHome",data:{}});0===a.code&&(Q.value=a.data.projects,D.value=a.data.wechatQr,I.value=a.data.wechatQunQr)}catch(a){b({title:a.message,icon:"none"})}})();const U=e(null),N=()=>{U.value.open()},Y=()=>{window.open("https://ext.dcloud.net.cn/plugin?id=21066")};return(a,e)=>{const t=w,l=C,s=x,v=F,b=E(c("uni-popup"),q);return u(),n(l,{class:h(["container",`theme-${A.value}`])},{default:i((()=>[d(l,{class:"nav-bar",style:f({paddingTop:r(B)+"px"})},{default:i((()=>[d(l,{class:"nav-content"},{default:i((()=>[d(t,{class:"logo"},{default:i((()=>[o("Portfolio")])),_:1}),d(l,{class:"nav-right"},{default:i((()=>[d(l,{class:"theme-btn",onClick:V},{default:i((()=>[d(t,{class:"icon"},{default:i((()=>[o("🎨")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["style"]),d(l,{class:"hero-section",style:f({paddingTop:r(B)+88+"px"})},{default:i((()=>[d(l,{class:"hero-content animate-slide-up"},{default:i((()=>[d(t,{class:"title"},{default:i((()=>[o("项目模板展示")])),_:1}),d(t,{class:"subtitle"},{default:i((()=>[o("探索独特的创意与技术结合")])),_:1}),d(l,{class:"stats"},{default:i((()=>[d(l,{class:"stat-item"},{default:i((()=>[d(t,{class:"count"},{default:i((()=>[o("10+")])),_:1}),d(t,{class:"label"},{default:i((()=>[o("模板")])),_:1})])),_:1}),d(l,{class:"stat-item"},{default:i((()=>[d(t,{class:"count"},{default:i((()=>[o("1000+")])),_:1}),d(t,{class:"label"},{default:i((()=>[o("用户")])),_:1})])),_:1}),d(l,{class:"stat-item"},{default:i((()=>[d(t,{class:"count"},{default:i((()=>[o("5.0")])),_:1}),d(t,{class:"label"},{default:i((()=>[o("评分")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["style"]),d(l,{class:"projects-section"},{default:i((()=>[d(l,{class:"section-header animate-fade-in"},{default:i((()=>[d(t,{class:"section-title"},{default:i((()=>[o("精选项目")])),_:1}),d(t,{class:"section-subtitle"},{default:i((()=>[o("探索我们的最新作品")])),_:1})])),_:1}),d(l,{class:"project-grid"},{default:i((()=>[(u(!0),p(g,null,_(Q.value,((a,e)=>(u(),n(l,{key:a.id,class:"project-card glass-effect animate-scale-up",style:f({animationDelay:.1*e+"s"}),onClick:e=>(a=>{/^https?:\/\//.test(a.path)?window.open(a.path):k({url:a.path})})(a)},{default:i((()=>[d(s,{class:"project-image",src:a.image,mode:"aspectFill"},null,8,["src"]),d(l,{class:"project-info"},{default:i((()=>[d(t,{class:"project-title"},{default:i((()=>[o(m(a.title),1)])),_:2},1024),d(t,{class:"project-desc"},{default:i((()=>[o(m(a.description),1)])),_:2},1024),d(l,{class:"project-tags"},{default:i((()=>[(u(!0),p(g,null,_(a.tags,(a=>(u(),n(t,{key:a,class:"tag"},{default:i((()=>[o(m(a),1)])),_:2},1024)))),128))])),_:2},1024)])),_:2},1024)])),_:2},1032,["style","onClick"])))),128))])),_:1})])),_:1}),d(l,{class:"projects-links-section animate-fade-in"},{default:i((()=>[d(l,{class:"section-header"},{default:i((()=>[d(t,{class:"section-title"},{default:i((()=>[o("项目地址")])),_:1}),d(t,{class:"section-subtitle"},{default:i((()=>[o("开源代码")])),_:1})])),_:1}),d(l,{class:"link-card glass-effect",onClick:Y},{default:i((()=>[d(l,{class:"link-icon"},{default:i((()=>[d(t,{class:"icon"},{default:i((()=>[o("📦")])),_:1})])),_:1}),d(l,{class:"link-info"},{default:i((()=>[d(t,{class:"link-title"},{default:i((()=>[o("UNIAPP")])),_:1}),d(t,{class:"link-desc"},{default:i((()=>[o("查看源代码")])),_:1})])),_:1}),d(t,{class:"arrow"},{default:i((()=>[o("→")])),_:1})])),_:1})])),_:1}),d(l,{class:"contact-section animate-fade-in"},{default:i((()=>[d(t,{class:"contact-title"},{default:i((()=>[o("需要定制开发？")])),_:1}),d(t,{class:"contact-subtitle"},{default:i((()=>[o("我们提供专业的技术支持和定制服务")])),_:1}),d(l,{class:"contact-buttons"},{default:i((()=>[d(v,{class:"contact-btn email-btn",onClick:N},{default:i((()=>[d(t,{class:"icon"},{default:i((()=>[o("👋")])),_:1}),d(t,null,{default:i((()=>[o("加我微信")])),_:1})])),_:1})])),_:1})])),_:1}),d(b,{ref_key:"themePopup",ref:P,type:"bottom"},{default:i((()=>[d(l,{class:"theme-popup"},{default:i((()=>[d(l,{class:"popup-header"},{default:i((()=>[d(t,{class:"title"},{default:i((()=>[o("选择主题")])),_:1})])),_:1}),d(l,{class:"popup-content"},{default:i((()=>[d(l,{class:"theme-list"},{default:i((()=>[(u(),p(g,null,_(T,(a=>d(l,{class:h(["theme-item",{active:A.value===a.value}]),key:a.value,onClick:e=>(a=>{A.value=a,y("theme",a),P.value.close()})(a.value)},{default:i((()=>[d(l,{class:"color-preview",style:f({background:a.gradient})},null,8,["style"]),d(t,{class:"theme-name"},{default:i((()=>[o(m(a.label),1)])),_:2},1024)])),_:2},1032,["class","onClick"]))),64))])),_:1})])),_:1})])),_:1})])),_:1},512),d(l,{class:"wechat-section animate-fade-in"},{default:i((()=>[d(t,{class:"section-title"},{default:i((()=>[o("加入微信群")])),_:1}),d(t,{class:"section-subtitle"},{default:i((()=>[o("与开发者和其他用户交流")])),_:1}),d(l,{class:"qrcode-container"},{default:i((()=>[d(s,{class:"qrcode",src:I.value,mode:"aspectFit",onClick:H},null,8,["src"]),d(t,{class:"tip"},{default:i((()=>[o("点击二维码放大查看")])),_:1})])),_:1}),d(l,{class:"group-info"},{default:i((()=>[d(t,{class:"info-item"},{default:i((()=>[d(t,{class:"icon"},{default:i((()=>[o("👥")])),_:1}),d(t,null,{default:i((()=>[o("当前群成员: 500+")])),_:1})])),_:1}),d(t,{class:"info-item"},{default:i((()=>[d(t,{class:"icon"},{default:i((()=>[o("🔥")])),_:1}),d(t,null,{default:i((()=>[o("日活跃: 200+")])),_:1})])),_:1})])),_:1})])),_:1}),d(b,{ref_key:"wechatPopup",ref:U,type:"center"},{default:i((()=>[d(l,{class:"qr-popup"},{default:i((()=>[d(s,{class:"qr-code",src:D.value,mode:"aspectFit"},null,8,["src"]),d(t,{class:"qr-tip"},{default:i((()=>[o("扫码加微信")])),_:1})])),_:1})])),_:1},512)])),_:1},8,["class"])}}}),[["__scopeId","data-v-f6ac5970"]]);export{A as default};