import{r as a,e as s,w as t,v as l,c as e,f as i,h as n,i as c,j as d,k as o,t as u,F as _,q as f}from"./index-BG1tn67b.js";import{_ as r}from"./_plugin-vue_export-helper.BCo6x5W8.js";const m=r({__name:"coupon",setup(r){const m=["未使用","已使用","已过期"],p=a(0),v=a([{id:1,amount:100,condition:500,name:"新人专享券",validity:"2024.12.31",description:"仅限常规课程使用"},{id:2,amount:50,condition:300,name:"生日特惠券",validity:"2024.12.31",description:"全场通用"}]);return(a,r)=>{const y=f,k=l;return e(),s(k,{class:"container"},{default:t((()=>[i(k,{class:"header"},{default:t((()=>[i(y,{class:"title"},{default:t((()=>[n("我的券包")])),_:1})])),_:1}),i(k,{class:"tab-bar"},{default:t((()=>[(e(),c(_,null,d(m,((a,s)=>i(k,{class:o(["tab-item",{active:p.value===s}]),key:s,onClick:a=>(a=>{p.value=a})(s)},{default:t((()=>[i(y,null,{default:t((()=>[n(u(a),1)])),_:2},1024)])),_:2},1032,["class","onClick"]))),64))])),_:1}),i(k,{class:"coupon-list"},{default:t((()=>[(e(!0),c(_,null,d(v.value,(a=>(e(),s(k,{class:"coupon-item",key:a.id},{default:t((()=>[i(k,{class:"left"},{default:t((()=>[i(y,{class:"amount"},{default:t((()=>[n("¥"+u(a.amount),1)])),_:2},1024),i(y,{class:"condition"},{default:t((()=>[n("满"+u(a.condition)+"可用",1)])),_:2},1024)])),_:2},1024),i(k,{class:"right"},{default:t((()=>[i(y,{class:"name"},{default:t((()=>[n(u(a.name),1)])),_:2},1024),i(y,{class:"validity"},{default:t((()=>[n("有效期至："+u(a.validity),1)])),_:2},1024),i(y,{class:"desc"},{default:t((()=>[n(u(a.description),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})}}},[["__scopeId","data-v-56121130"]]);export{m as default};