"use strict";(self["webpackChunklac"]=self["webpackChunklac"]||[]).push([[888],{7619:function(e,l,a){a.r(l),a.d(l,{default:function(){return D}});var t=a(3396),o=a(4870),i=a(2793),n=a(2483),u=a(9286),s=a(3856),r=(a(7658),a(9242)),d=a(6144),c=a(3653),v=a(5881),p=a(9546),m=a(2264),U=a(9043),S=a(1411),_=a(5585),f=a(4622),b=a(9152),y=a(7954),w=a(1020),g=a(4956);const h=["onSubmit"],k={class:"lac-point-form__main"},P={class:"lac-point-form__map"},Z={class:"lac-point-form__map-control"},W={class:"lac-point-form__fields"},x=(0,t._)("div",{class:"lac-point-form__footer mb22"},null,-1);var j=(0,t.aZ)({__name:"LacPointEditForm",props:{pointId:{}},setup(e){const l=e,a=(0,o.qj)({value:"",items:[],geo:null}),i=(0,u.N)(),{computedCols:n}=(0,S.b)(),{fields:j,setFieldRef:C,successCallback:E,validateForm:R,prepareData:L,init:D,initEdit:A,isInit:N,getPoint:O,editPoint:H}=(0,_.G)(),I=(0,b.N)(),F=(0,y.I)(),{partners:V}=(0,w.Jk)(I),q=(0,o.iH)(null),T=(0,o.iH)(null),B=(0,o.iH)([]);async function Y(){const e=await R();if(e&&q.value)try{i.open(s.y.LOADER);const e=await H(q.value);if(!e){const e=await(0,g.il)(q.value.point_id);!e.error&&e.data.info&&F.edit(e.data.info)}i.open(s.y.SUCCESS,{callback:E})}catch(l){i.open(s.y.ERROR,{text:l.message})}}async function z(){const e=q.value?.partner_id||void 0,l=await I.get(e);return l?.type.value}async function G({lat:e,lng:l,title:a="Title"}){let t=await z();return{position:{lat:e,lng:l},title:a,type:t}}function J(){j.location.value="",j.locality.value="",j.district.value="",j.region.value=""}function M(e){j.location.value=e.lat+", "+e.lng}function K(e){let l=e.address_components.find((e=>e.types.some((e=>e===f.V.sublocality))))||e.address_components.find((e=>e.types.some((e=>e===f.V.administrative_area_level_2))));l&&(j.district.value=l.short_name)}function Q(e){const l=e.address_components.find((e=>e.types.some((e=>e===f.V.administrative_area_level_1))));l&&(j.region.value=l.long_name)}function X(e){const l=e.address_components.find((e=>e.types.some((e=>e===f.V.locality))));l&&(j.locality.value=l.short_name,j.name.value=l.short_name)}function $(){a.geo&&(J(),X(a.geo),K(a.geo),Q(a.geo),M(a.geo),j.address.value=a.geo.formatted_address)}async function ee(e){T.value&&(B.value.push(await G({lat:e.lat,lng:e.lng,title:e.formatted_address})),T.value.setCenter(e.lat,e.lng))}async function le(){if(T.value){i.open(s.y.LOADER);const e=await T.value.findAddress(a.value);B.value.pop(),e&&(a.geo=e,await ee(e)),i.close()}}async function ae(e){if(T.value){i.open(s.y.LOADER);const l=await T.value.findByLatLng(e.lat,e.lng);B.value.pop(),l&&(a.geo=l,a.value=l.formatted_address,ee(l)),i.close()}}const te=(0,o.iH)(null);async function oe(){te.value&&(clearTimeout(te.value),te.value=null),te.value=setTimeout((async()=>{a.items=await(T.value?.fetchPlaces(a.value))||[]}),500)}return(0,t.bv)((async()=>{if(i.open(s.y.LOADER),q.value=await O(Number(l.pointId)),await(0,t.Y3)(),q.value){await A(q.value);const e=q.value.location.split(", ");if(e.length>1){const l=(0,t.YP)((()=>T.value?.ready),(async()=>{await ae({lat:Number(e[0]),lng:Number(e[1])}),l()}))}}else i.close(),await router.back();i.close()})),(e,l)=>{const i=(0,t.up)("Button");return(0,o.SU)(N)?((0,t.wg)(),(0,t.iD)("form",{key:0,class:"lac-form lac-point-form",onSubmit:(0,r.iM)(Y,["prevent"])},[(0,t._)("div",k,[(0,t._)("div",P,[(0,t.Wm)(U.Z,{ref_key:"map",ref:T,markers:B.value,onClick:ae},null,8,["markers"]),(0,t._)("div",Z,[(0,t.Wm)(v.Z,{class:"mr16",value:a.value,"onUpdate:value":l[0]||(l[0]=e=>a.value=e),items:a.items,id:"search",placeholder:"Найти",onChange:le,onInput:oe,style:{width:"400px","flex-shrink":"0"}},null,8,["value","items"]),(0,t.Wm)(i,{label:"Заполнить",onClick:$})])]),(0,t._)("div",W,[(0,t.Wm)(d.Z,{value:(0,o.SU)(j).address.value,"onUpdate:value":l[1]||(l[1]=e=>(0,o.SU)(j).address.value=e),id:(0,o.SU)(j).address.id,label:(0,o.SU)(j).address.label,rules:(0,o.SU)(j).address.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t._)("div",null,[(0,t.Wm)(d.Z,{value:(0,o.SU)(j).region.value,"onUpdate:value":l[2]||(l[2]=e=>(0,o.SU)(j).region.value=e),id:(0,o.SU)(j).region.id,label:(0,o.SU)(j).region.label,rules:(0,o.SU)(j).region.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(d.Z,{value:(0,o.SU)(j).district.value,"onUpdate:value":l[3]||(l[3]=e=>(0,o.SU)(j).district.value=e),id:(0,o.SU)(j).district.id,label:(0,o.SU)(j).district.label,rules:(0,o.SU)(j).district.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(d.Z,{value:(0,o.SU)(j).locality.value,"onUpdate:value":l[4]||(l[4]=e=>(0,o.SU)(j).locality.value=e),id:(0,o.SU)(j).locality.id,label:(0,o.SU)(j).locality.label,rules:(0,o.SU)(j).locality.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(d.Z,{value:(0,o.SU)(j).location.value,"onUpdate:value":l[5]||(l[5]=e=>(0,o.SU)(j).location.value=e),id:(0,o.SU)(j).location.id,label:(0,o.SU)(j).location.label,rules:(0,o.SU)(j).location.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(d.Z,{value:(0,o.SU)(j).name.value,"onUpdate:value":l[6]||(l[6]=e=>(0,o.SU)(j).name.value=e),id:(0,o.SU)(j).name.id,label:(0,o.SU)(j).name.label,rules:(0,o.SU)(j).name.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(d.Z,{value:(0,o.SU)(j).work_from.value,"onUpdate:value":l[7]||(l[7]=e=>(0,o.SU)(j).work_from.value=e),id:(0,o.SU)(j).work_from.id,label:(0,o.SU)(j).work_from.label,rules:(0,o.SU)(j).work_from.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top",type:"time"},null,8,["value","id","label","rules"]),(0,t.Wm)(d.Z,{value:(0,o.SU)(j).work_to.value,"onUpdate:value":l[8]||(l[8]=e=>(0,o.SU)(j).work_to.value=e),id:(0,o.SU)(j).work_to.id,label:(0,o.SU)(j).work_to.label,rules:(0,o.SU)(j).work_to.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top",type:"time"},null,8,["value","id","label","rules"]),(0,t.Wm)(c.Z,{value:(0,o.SU)(j).operation_duration.value,"onUpdate:value":l[9]||(l[9]=e=>(0,o.SU)(j).operation_duration.value=e),id:(0,o.SU)(j).operation_duration.id,label:(0,o.SU)(j).operation_duration.label,rules:(0,o.SU)(j).operation_duration.rules,suffix:"ч",ref:(0,o.SU)(C),labelPosition:"top"},null,8,["value","id","label","rules"]),(0,t.Wm)(m.Z,{children:(0,o.SU)(j).subject_to_buy.children,id:(0,o.SU)(j).subject_to_buy.id,text:(0,o.SU)(j).subject_to_buy.text,value:(0,o.SU)(j).subject_to_buy.value,flex:"",plain:"",white:""},null,8,["children","id","text","value"]),(0,t.Wm)(m.Z,{children:(0,o.SU)(j).subject_to_sell.children,id:(0,o.SU)(j).subject_to_sell.id,text:(0,o.SU)(j).subject_to_sell.text,value:(0,o.SU)(j).subject_to_sell.value,flex:"",plain:"",white:""},null,8,["children","id","text","value"]),(0,t.Wm)(p.Z,{label:"Комментарий","no-resize":"",rows:3,value:(0,o.SU)(j).comment.value,"onUpdate:value":l[10]||(l[10]=e=>(0,o.SU)(j).comment.value=e),id:(0,o.SU)(j).comment.id,rules:(0,o.SU)(j).comment.rules,placeholder:"",ref:(0,o.SU)(C),labelPosition:"top"},null,8,["value","id","rules"])])])]),x,(0,t.Wm)(i,{label:"Сохранить",type:"submit"})],40,h)):(0,t.kq)("",!0)}}});const C=j;var E=C,R=(0,t.aZ)({__name:"PartnerPointEditPage",setup(e){const l=(0,n.yj)(),a=(0,n.tv)(),r=(0,u.N)(),d=(0,o.iH)(!1);return(0,t.wF)((async()=>{try{r.open(s.y.LOADER),d.value=!0,r.close()}catch(e){r.close(),await a.back()}})),(e,a)=>((0,t.wg)(),(0,t.j4)(i.Z,{title:"Редактирование пункта","max-width":1280},{default:(0,t.w5)((()=>[d.value?((0,t.wg)(),(0,t.j4)(E,{key:0,"point-id":(0,o.SU)(l).params.id},null,8,["point-id"])):(0,t.kq)("",!0)])),_:1}))}});const L=R;var D=L}}]);
//# sourceMappingURL=partnerPointEdit.ba3eeb32.js.map