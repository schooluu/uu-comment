"use strict";const e=require("../../../common/vendor.js"),a="https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0",t={__name:"index",setup(t){const o=e.ref(!1),s=e.ref(!1),l=e.ref(""),n=e.ref(-1),i=e.ref({}),u=e.ref(1),c=e.ref(10),m=e.ref(!1),d=e.ref(!0),r=e.ref([]),v=async(a=!1)=>{if(!m.value&&(d.value||a))try{m.value=!0;const{result:t}=await e.Ys.callFunction({name:"wx_get_list",data:{page:a?1:u.value,pageSize:c.value}});if(0!==t.code)throw new Error(t.msg);a?(r.value=t.data.list,u.value=1):(r.value=[...r.value,...t.data.list],u.value++),d.value=t.data.hasMore}catch(t){e.index.showToast({title:t.message||"获取朋友圈失败",icon:"none"})}finally{m.value=!1,a&&e.index.stopPullDownRefresh()}};e.onShow((()=>{v(!0)})),e.onReachBottom((()=>{v()}));const f=async()=>{if(l.value.trim())try{const{result:a}=await e.Ys.callFunction({name:"wx_add_comment",data:{momentId:r.value[n.value]._id,content:l.value}});if(0!==a.code)throw new Error(a.msg);{const a=r.value[n.value];a.comments||(a.comments=[]),a.comments.push({username:"我",content:l.value,create_time:Date.now()}),l.value="",o.value=!1,s.value=!1,e.index.showToast({title:"评论成功",icon:"success"})}}catch(a){e.index.showToast({title:a.message||"评论失败",icon:"none"})}},h=async()=>{e.index.navigateTo({url:"/pages/wx/home/add"})},g=()=>{o.value=!1,s.value=!1,l.value="",n.value=-1},w=()=>{s.value=!s.value},p=()=>{e.index.showToast({title:"视频加载失败",icon:"none"})},k=["😊","😂","🤣","❤️","😍","🤔","😒","👍","👎","😳","🥺","😭","😘","🤗","🙄","😴","🤮","🤧","😷","🤒","🤕","😈","👻","👽","🤖","💩","😺","💪","👊","✌️","🤞","🙏","👏","🙌","👐","🤲"];return(t,u)=>e.e({a:a,b:a,c:e.f(r.value,((a,t,s)=>e.e({a:a.avatar,b:e.t(a.username),c:e.t(a.content),d:a.mediaType},a.mediaType?e.e({e:"video"===a.mediaType},"video"===a.mediaType?{f:a.mediaUrl,g:a.poster,h:e.o(p,t)}:"image"===a.mediaType?{j:e.f(a.mediaUrls,((e,a,t)=>({a:a,b:e}))),k:e.n(`columns-${a.mediaUrls.length}`)}:{},{i:"image"===a.mediaType}):{},{l:e.t(a.time),m:e.t(a.isLiked?"❤️":"🤍"),n:a.isLiked?1:"",o:i.value[t]?1:"",p:e.o((a=>(async a=>{try{const t=r.value[a];i.value[a]=!0;const{result:o}=await e.Ys.callFunction({name:"wx_add_toggle_like",data:{momentId:t._id}});if(0!==o.code)throw new Error(o.msg);if(t.isLiked=o.data.isLiked,t.isLiked)t.likes||(t.likes=[]),t.likes.push("我");else{const e=t.likes.indexOf("我");e>-1&&t.likes.splice(e,1)}setTimeout((()=>{i.value[a]=!1}),1e3)}catch(t){e.index.showToast({title:t.message||"操作失败",icon:"none"})}})(t)),t),q:e.o((e=>(e=>{n.value=e,o.value=!0})(t)),t),r:a.likes&&a.likes.length},a.likes&&a.likes.length?{s:e.t(a.likes.join("、"))}:{},{t:a.comments&&0!==a.comments.length},a.comments&&0!==a.comments.length?{v:e.f(a.comments,((a,t,o)=>({a:e.t(a.username),b:e.t(a.content),c:t})))}:{},{w:t}))),d:o.value},o.value?e.e({e:o.value,f:e.o(f),g:l.value,h:e.o((e=>l.value=e.detail.value)),i:e.o(w),j:l.value.trim()?1:"",k:e.o(f),l:s.value},s.value?{m:e.f(k,((a,t,o)=>({a:e.t(a),b:t,c:e.o((e=>(e=>{l.value+=e})(a)),t)})))}:{},{n:e.o((()=>{})),o:e.o(g)}):{},{p:e.o(h)})}},o=e._export_sfc(t,[["__scopeId","data-v-a65f0f71"]]);t.__runtimeHooks=1,qq.createPage(o);