"use strict";(self["webpackChunklac"]=self["webpackChunklac"]||[]).push([[842],{5361:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});a(7658);var n=a(3396),l=a(9043),o=a(9152),u=a(1020),r=a(4870),s=a(9286),i=a(5845),c=a(258),p=a(7954);const v={class:"lac-map"};var d=(0,n.aZ)({__name:"MapPage",setup(e){const t=(0,p.I)(),a=(0,o.N)(),d=(0,c.S)(),{dictionary:g}=(0,u.Jk)((0,i.o)()),{selectUserId:f}=(0,u.Jk)(d),{points:h,isStoreChanged:m}=(0,u.Jk)(t),{selectPartnerId:_,partnerTableOpt:b}=(0,u.Jk)(a),k=((0,s.N)(),(0,r.iH)(null)),y=(0,r.iH)([]);function P(){const e={user_id:void 0,partner_id:void 0,partner_name:void 0};f.value&&(e.user_id=f.value),b.value.search&&(e.partner_name=b.value.search),_.value&&(e.partner_id=_.value),console.log("POINT SEARCH",e),t.getPoints(e),N()}function j(e){const t=[];for(let a in e){const n=e[a],l=n.location.split(", ");if(2!==l.length)continue;const o=g.value.point.subject,u=n.subject_to_sell.map((e=>o[e]?.desc)),r=n.subject_to_buy.map((e=>o[e]?.desc)),s=[{label:"Контрагент",text:n.partner_fullname||"",link:n.partner_id}];s.push({label:"Адрес",text:[n.region,n.district,n.locality].join(", ")}),u.length&&s.push({label:"Продает",text:u.join(", ")}),r.length&&s.push({label:"Закупает",text:r.join(", ")}),t.push({position:{lat:Number(l[0]),lng:Number(l[1])},title:n.name,type:n.partner_type,info:s})}return t}function N(){if(y.value=j(h.value),!y.value.length)return k.value?.panTo({lat:55.796127,lng:49.106414}),k.value?.setZoom(6);if(1===y.value.length){const[e]=y.value;return k.value?.panTo(e.position),void k.value?.setZoom(6)}const e=y.value.map((e=>e.position));k.value?.panToMultiple(e),t.storeNotChanged()}async function C(){P(),console.log("Init at MapPage")}return(0,n.YP)((()=>[_.value,f.value,b.value.search]),(()=>{P()})),(0,n.YP)((()=>m.value),(()=>{console.log("global point store changed!"),N()})),(0,n.bv)((async()=>{C()})),(e,t)=>((0,n.wg)(),(0,n.iD)("div",v,[(0,n.Wm)(l.Z,{markers:y.value,ref_key:"mapRef",ref:k},null,8,["markers"])]))}});const g=d;var f=g}}]);
//# sourceMappingURL=map.c1bcaab7.js.map