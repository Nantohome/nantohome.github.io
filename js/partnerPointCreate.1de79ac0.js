"use strict";(self["webpackChunklac"]=self["webpackChunklac"]||[]).push([[96],{702:function(e,l,a){a.r(l),a.d(l,{default:function(){return E}});var t=a(3396),o=a(2793),n=a(4870),i=a(2483),u=a(9286),r=a(3856),s=a(9152),d=a(1020),c=(a(7658),a(9242)),v=a(6144),p=a(3653),m=a(5881),U=a(9546),b=a(2264),S=a(9043),_=a(1411),f=a(5585),y=a(4622),w=a(4956),h=a(7954);const g=["onSubmit"],k={class:"lac-point-form__main"},P={class:"lac-point-form__map"},Z={class:"lac-point-form__map-control"},W={class:"lac-point-form__fields"},j=(0,t._)("div",{class:"lac-point-form__footer mb22"},null,-1);var x=(0,t.aZ)({__name:"LacPointCreateForm",props:{partnerId:{},buttonLabel:{}},setup(e){const l=e,a=(0,i.yj)(),o=(0,n.qj)({value:"",items:[],geo:null}),{computedCols:x}=(0,_.b)(),{fields:C,setFieldRef:L,successCallback:I,validateForm:R,prepareData:E,init:D,isInit:q,createPoint:A}=(0,f.G)(),H=(0,s.N)(),N=(0,h.I)(),O=(0,n.iH)(null),F=(0,u.N)(),V=(0,n.iH)([]),{partners:T}=(0,d.Jk)(H);async function B(){const e=parseInt(a.query.partner_id),l=await H.get(e);return l?.type.value}async function G(){const e=await R();if(e)try{F.open(r.y.LOADER);const e=await A();if(e){const l=await(0,w.il)(e);!l.error&&l.data.info&&N.add(e,l.data.info)}F.open(r.y.SUCCESS,{callback:I})}catch(l){F.open(r.y.ERROR,{text:l.message})}}async function J({lat:e,lng:l,title:a="Title"}){let t=await B();return{position:{lat:e,lng:l},title:a,type:t}}function z(){C.location.value="",C.locality.value="",C.district.value="",C.region.value=""}function M(e){C.location.value=e.lat+", "+e.lng}function Y(e){let l=e.address_components.find((e=>e.types.some((e=>e===y.V.sublocality))))||e.address_components.find((e=>e.types.some((e=>e===y.V.administrative_area_level_2))));l&&(C.district.value=l.short_name)}function K(e){const l=e.address_components.find((e=>e.types.some((e=>e===y.V.administrative_area_level_1))));l&&(C.region.value=l.long_name)}function Q(e){const l=e.address_components.find((e=>e.types.some((e=>e===y.V.locality))));l&&(C.locality.value=l.short_name,C.name.value=l.short_name)}function X(){o.geo&&(z(),Q(o.geo),Y(o.geo),K(o.geo),M(o.geo),C.address.value=o.geo.formatted_address)}async function $(e){O.value&&(V.value.push(await J({lat:e.lat,lng:e.lng,title:e.formatted_address})),O.value.setCenter(e.lat,e.lng))}async function ee(){if(O.value){F.open(r.y.LOADER);const e=await O.value.findAddress(o.value);V.value.pop(),e&&(o.geo=e,await $(e)),F.close()}}async function le(e){if(O.value){F.open(r.y.LOADER);const l=await O.value.findByLatLng(e.lat,e.lng);V.value.pop(),l&&(o.geo=l,o.value=l.formatted_address,$(l)),F.close()}}const ae=(0,n.iH)(null);async function te(){ae.value&&(clearTimeout(ae.value),ae.value=null),ae.value=setTimeout((async()=>{o.items=await(O.value?.fetchPlaces(o.value))||[]}),500)}return(0,t.bv)((async()=>{await(0,t.Y3)(),await D()})),(e,a)=>{const i=(0,t.up)("Button");return(0,n.SU)(q)?((0,t.wg)(),(0,t.iD)("form",{key:0,class:"lac-form lac-point-form",onSubmit:(0,c.iM)(G,["prevent"])},[(0,t._)("div",k,[(0,t._)("div",P,[(0,t.Wm)(S.Z,{ref_key:"map",ref:O,markers:V.value,onClick:le},null,8,["markers"]),(0,t._)("div",Z,[(0,t.Wm)(m.Z,{class:"mr16",value:o.value,"onUpdate:value":a[0]||(a[0]=e=>o.value=e),items:o.items,id:"search",placeholder:"Найти",onChange:ee,onInput:te,style:{width:"400px","flex-shrink":"0"}},null,8,["value","items"]),(0,t.Wm)(i,{label:"Заполнить",onClick:X})])]),(0,t._)("div",W,[(0,t.Wm)(v.Z,{value:(0,n.SU)(C).address.value,"onUpdate:value":a[1]||(a[1]=e=>(0,n.SU)(C).address.value=e),id:(0,n.SU)(C).address.id,label:(0,n.SU)(C).address.label,rules:(0,n.SU)(C).address.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t._)("div",null,[(0,t.Wm)(v.Z,{value:(0,n.SU)(C).region.value,"onUpdate:value":a[2]||(a[2]=e=>(0,n.SU)(C).region.value=e),id:(0,n.SU)(C).region.id,label:(0,n.SU)(C).region.label,rules:(0,n.SU)(C).region.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(v.Z,{value:(0,n.SU)(C).district.value,"onUpdate:value":a[3]||(a[3]=e=>(0,n.SU)(C).district.value=e),id:(0,n.SU)(C).district.id,label:(0,n.SU)(C).district.label,rules:(0,n.SU)(C).district.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(v.Z,{value:(0,n.SU)(C).locality.value,"onUpdate:value":a[4]||(a[4]=e=>(0,n.SU)(C).locality.value=e),id:(0,n.SU)(C).locality.id,label:(0,n.SU)(C).locality.label,rules:(0,n.SU)(C).locality.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(v.Z,{value:(0,n.SU)(C).location.value,"onUpdate:value":a[5]||(a[5]=e=>(0,n.SU)(C).location.value=e),id:(0,n.SU)(C).location.id,label:(0,n.SU)(C).location.label,rules:(0,n.SU)(C).location.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(v.Z,{value:(0,n.SU)(C).name.value,"onUpdate:value":a[6]||(a[6]=e=>(0,n.SU)(C).name.value=e),id:(0,n.SU)(C).name.id,label:(0,n.SU)(C).name.label,rules:(0,n.SU)(C).name.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(v.Z,{value:(0,n.SU)(C).work_from.value,"onUpdate:value":a[7]||(a[7]=e=>(0,n.SU)(C).work_from.value=e),id:(0,n.SU)(C).work_from.id,label:(0,n.SU)(C).work_from.label,rules:(0,n.SU)(C).work_from.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top",type:"time"},null,8,["value","id","label","rules"]),(0,t.Wm)(v.Z,{value:(0,n.SU)(C).work_to.value,"onUpdate:value":a[8]||(a[8]=e=>(0,n.SU)(C).work_to.value=e),id:(0,n.SU)(C).work_to.id,label:(0,n.SU)(C).work_to.label,rules:(0,n.SU)(C).work_to.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top",type:"time"},null,8,["value","id","label","rules"]),(0,t.Wm)(p.Z,{value:(0,n.SU)(C).operation_duration.value,"onUpdate:value":a[9]||(a[9]=e=>(0,n.SU)(C).operation_duration.value=e),id:(0,n.SU)(C).operation_duration.id,label:(0,n.SU)(C).operation_duration.label,rules:(0,n.SU)(C).operation_duration.rules,suffix:"ч",ref:(0,n.SU)(L),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(b.Z,{children:(0,n.SU)(C).subject_to_buy.children,id:(0,n.SU)(C).subject_to_buy.id,text:(0,n.SU)(C).subject_to_buy.text,value:(0,n.SU)(C).subject_to_buy.value,flex:"",plain:"",white:""},null,8,["children","id","text","value"]),(0,t.Wm)(b.Z,{children:(0,n.SU)(C).subject_to_sell.children,id:(0,n.SU)(C).subject_to_sell.id,text:(0,n.SU)(C).subject_to_sell.text,value:(0,n.SU)(C).subject_to_sell.value,flex:"",plain:"",white:""},null,8,["children","id","text","value"]),(0,t.Wm)(U.Z,{label:"Комментарий","no-resize":"",rows:3,value:(0,n.SU)(C).comment.value,"onUpdate:value":a[10]||(a[10]=e=>(0,n.SU)(C).comment.value=e),id:(0,n.SU)(C).comment.id,rules:(0,n.SU)(C).comment.rules,placeholder:"",ref:(0,n.SU)(L),labelPosition:"top"},null,8,["value","id","rules"])])])]),j,(0,t.Wm)(i,{label:l.buttonLabel,type:"submit"},null,8,["label"])],40,g)):(0,t.kq)("",!0)}}});const C=x;var L=C,I=(0,t.aZ)({__name:"PartnerPointCreatePage",setup(e){const l=(0,i.yj)(),a=(0,i.tv)(),c=(0,u.N)(),v=(0,s.N)(),{selectPartnerId:p}=(0,d.Jk)(v),m=(0,n.iH)(!1),U=(0,n.iH)(0);return(0,t.wF)((async()=>{try{if(c.open(r.y.LOADER),U.value=p.value?p.value:Number(l.query.partner_id),!U.value)throw new Error("Go back");m.value=!0,c.close()}catch(e){c.close(),await a.back()}})),(e,l)=>((0,t.wg)(),(0,t.j4)(o.Z,{title:"Добавление пункта","max-width":1280},{default:(0,t.w5)((()=>[m.value?((0,t.wg)(),(0,t.j4)(L,{key:0,partnerId:U.value,buttonLabel:"Добавить"},null,8,["partnerId"])):(0,t.kq)("",!0)])),_:1}))}});const R=I;var E=R}}]);
//# sourceMappingURL=partnerPointCreate.1de79ac0.js.map