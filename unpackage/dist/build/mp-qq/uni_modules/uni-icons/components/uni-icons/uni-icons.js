"use strict";const t=require("./uniicons_file_vue.js"),e=require("../../../../common/vendor.js"),i={name:"UniIcons",emits:["click"],props:{type:{type:String,default:""},color:{type:String,default:"#333333"},size:{type:[Number,String],default:16},customPrefix:{type:String,default:""},fontFamily:{type:String,default:""}},data:()=>({icons:t.fontData}),computed:{unicode(){let t=this.icons.find((t=>t.font_class===this.type));return t?t.unicode:""},iconSize(){return"number"==typeof(t=this.size)||/^[0-9]*$/g.test(t)?t+"px":t;var t},styleObj(){return""!==this.fontFamily?`color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`:`color: ${this.color}; font-size: ${this.iconSize};`}},methods:{_onClick(){this.$emit("click")}}};const n=e._export_sfc(i,[["render",function(t,i,n,o,s,r){return{a:e.s(r.styleObj),b:e.n("uniui-"+n.type),c:e.n(n.customPrefix),d:e.n(n.customPrefix?n.type:""),e:e.o(((...t)=>r._onClick&&r._onClick(...t)))}}]]);qq.createComponent(n);