import{d as a,r as e,g as t,b as l,C as s,f as n,o as u,c,w as o,a as d,h as i,n as r,u as m,t as f,j as _,k as v,l as p,F as y,D as g,E as h,Y as w,s as C,G as b,y as k,i as x,I as S,A as V}from"./index-UJd7_IDo.js";import{r as F,_ as j}from"./uni-rate.h5kmn-hW.js";import{_ as D}from"./_plugin-vue_export-helper.BCo6x5W8.js";const I=D(a({__name:"detail",setup(a){const D=e(null),I=e([]),T=e(0),z=e(""),A=t().statusBarHeight,M=()=>{g()},$=()=>{uni.showShareMenu({withShareTicket:!0,menus:["shareAppMessage","shareTimeline"]})},N=async a=>{try{const{result:e}=await w.callFunction({name:"getCompanyComments",data:{companyId:a}});0===e.code&&(I.value=e.data)}catch(e){C({title:"获取评论失败",icon:"none"})}},U=async()=>{try{h({title:"发表中..."});const{result:a}=await w.callFunction({name:"addCompanyComment",data:{companyId:D.value._id,content:z.value,rating:T.value}});0===a.code&&(C({title:"评论成功"}),z.value="",T.value=0,await N(D.value._id)),b()}catch(a){C({title:"评论失败",icon:"none"})}},Y=a=>{const e=new Date(a);return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`};return l((()=>{const a=s(),e=a[a.length-1].options.id;e&&((async a=>{h({title:"加载中..."});try{const{result:e}=await w.callFunction({name:"getCompanyDetail",data:{id:a}});0===e.code&&(D.value=e.data)}catch(e){C({title:"获取详情失败",icon:"none"})}finally{b()}})(e),N(e))})),(a,e)=>{const t=k,l=x,s=F(n("uni-rate"),j),g=S,h=V;return u(),c(l,{class:"container"},{default:o((()=>[d(l,{class:"nav-bar",style:r({paddingTop:m(A)+"px"})},{default:o((()=>[d(l,{class:"nav-content"},{default:o((()=>[d(l,{class:"nav-left"},{default:o((()=>[d(l,{class:"back-btn",onClick:M},{default:o((()=>[d(t,{class:"icon"},{default:o((()=>[i("←")])),_:1})])),_:1}),d(t,{class:"nav-title"},{default:o((()=>[i("详情")])),_:1})])),_:1}),d(l,{class:"nav-right"},{default:o((()=>[d(l,{class:"share-btn",onClick:$},{default:o((()=>[d(t,{class:"icon"},{default:o((()=>[i("📤")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["style"]),d(l,{class:"main-content",style:r({paddingTop:m(A)+88+"rpx"})},{default:o((()=>[D.value?(u(),c(l,{key:0,class:"company-info"},{default:o((()=>[d(l,{class:"header"},{default:o((()=>[d(t,{class:"name"},{default:o((()=>[i(f(D.value.companyName),1)])),_:1}),d(l,{class:"stats-box"},{default:o((()=>[d(l,{class:"rating-box"},{default:o((()=>[d(s,{value:D.value.rating,size:"15"},null,8,["value"]),d(t,{class:"review-count"},{default:o((()=>[i(f(D.value.reviewCount||0)+"条点评",1)])),_:1})])),_:1}),d(t,{class:"view-count"},{default:o((()=>[d(t,{class:"icon"},{default:o((()=>[i("👁️")])),_:1}),i(" "+f(D.value.viewCount||0),1)])),_:1})])),_:1}),d(t,{class:"address"},{default:o((()=>[i(f(D.value.address),1)])),_:1})])),_:1})])),_:1})):_("",!0),D.value?(u(),c(l,{key:1,class:"company-info comments-section"},{default:o((()=>[d(l,{class:"section-title"},{default:o((()=>[d(t,{class:"title"},{default:o((()=>[i("评价")])),_:1})])),_:1}),d(l,{style:{color:"darkorange"}},{default:o((()=>[i(f(D.value.cons),1)])),_:1})])),_:1})):_("",!0),d(l,{class:"comments-section"},{default:o((()=>[d(l,{class:"section-title"},{default:o((()=>[d(t,{class:"title"},{default:o((()=>[i("看法")])),_:1}),d(t,{class:"count"},{default:o((()=>[i("("+f(I.value.length)+")",1)])),_:1})])),_:1}),d(l,{class:"comment-list"},{default:o((()=>[(u(!0),v(y,null,p(I.value,(a=>(u(),c(l,{key:a._id,class:"comment-item"},{default:o((()=>[d(l,{class:"comment-header"},{default:o((()=>[d(l,{class:"user-info"},{default:o((()=>[d(t,{class:"username"},{default:o((()=>[i(f(a.userName||"匿名用户"),1)])),_:2},1024),d(s,{value:a.rating,size:"15"},null,8,["value"])])),_:2},1024),d(t,{class:"time"},{default:o((()=>[i(f(Y(a.createdAt)),1)])),_:2},1024)])),_:2},1024),d(l,{class:"comment-content"},{default:o((()=>[d(t,{class:"text"},{default:o((()=>[i(f(a.content),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1}),d(l,{class:"comment-form"},{default:o((()=>[d(l,{class:"rating-input"},{default:o((()=>[d(s,{modelValue:T.value,"onUpdate:modelValue":e[0]||(e[0]=a=>T.value=a),size:"20"},null,8,["modelValue"])])),_:1}),d(g,{class:"input",modelValue:z.value,"onUpdate:modelValue":e[1]||(e[1]=a=>z.value=a),placeholder:"说说你的看法...",onConfirm:U},null,8,["modelValue"]),d(h,{class:"submit-btn",onClick:U},{default:o((()=>[d(t,{class:"icon"},{default:o((()=>[i("✏️")])),_:1}),d(t,null,{default:o((()=>[i("发表")])),_:1})])),_:1})])),_:1})])),_:1},8,["style"])])),_:1})}}}),[["__scopeId","data-v-b153cdca"]]);export{I as default};