"use strict";(self["webpackChunklac"]=self["webpackChunklac"]||[]).push([[928],{828:function(e,a,l){l.d(a,{Zs:function(){return u},kI:function(){return r},oU:function(){return i},vU:function(){return o}});var t=l(7542),n=l(8020);const o=async e=>{const a=await(0,t.I)().get("/agent/role/delete",{searchParams:{role:e}});if(!a)throw new n.u(o.name);return a},r=async(e={})=>{const a=await(0,t.I)().get("/agent/role/list",{searchParams:{...e,size:30}});if(!a)throw new n.u(r.name);return a},u=async e=>{const a=await(0,t.I)().post("/agent/role/add",e);if(!a)throw new n.u(u.name);return a},i=async(e,a)=>{const l=await(0,t.I)().post("/agent/role/edit",{old_role:e,new_role:a});if(!l)throw new n.u(i.name);return l}},8484:function(e,a,l){l.d(a,{D:function(){return o}});var t=l(5420);const n=e=>e.replace(/\D/g,""),o=()=>({required:t.BM.withMessage("Это поле обязательно",t.C1),minLength:t.BM.withMessage("Длина телефона должна быть не менее 10 символов",(e=>n(e).length>=10)),maxLength:t.BM.withMessage("Длина телефона должна быть не более 12 символов",(e=>n(e).length<=12))})},7495:function(e,a,l){l.d(a,{N:function(){return v}});l(7658);var t=l(4870),n=l(1020),o=l(1735),r=l(6945),u=l(8484),i=l(6342),s=l(4008),c=l(2483),d=l(6646),m=l(5845);const v=e=>{const a=(0,c.tv)(),l=(0,d.F)(),{setFieldRef:v,validateForm:p,resetValidations:f}=(0,o.Z)(),{dictionary:h}=(0,n.Jk)((0,m.o)()),b=e.map((e=>({value:e,text:e}))),U=(0,t.qj)({value:null,id:"role",label:"Должность",items:b,rules:(0,r.v)()}),g=(0,t.qj)([]),S=(0,t.qj)({name:{value:"",id:"name",label:"ФИО",rules:(0,r.v)()},phone:{value:"",id:"phone",label:"Телефон",rules:(0,u.D)()},dob:{value:"",id:"dob",label:"Дата рождения"},email:{value:"",id:"email",label:"E-mail",rules:(0,i.D)()},comment:{value:"",id:"comment",rules:(0,s.F)()}});function w(){const e={};Object.entries(S).forEach((([a,l])=>{l.value&&(e[a]=l.value)})),e.phone=[];for(const a of g)a.phone&&a.type.value&&e.phone.push(a);return e.role=U.value?U.value.value:"",e}function y(e){g.length>1&&g.splice(e,1)}function R(e){if(e)for(const a of e)g.push({phone:a.phone,type:a.type,extra:a.extra});else g.push({phone:"",type:{value:"work",text:h.value.phone.type["work"]},extra:""})}function k(e){a.back()}function A(e){U.value=b.find((a=>a.value===e.role))||null,R(e.phone),S.name.value=e.name,S.dob.value=e.dob||"",S.email.value=e.email||"",S.comment.value=e.comment||""}async function Z(e){await l.add(e)}async function _(e){await l.edit(e)}async function F(e){return await l.get(e)}return{employeeRole:U,agentPhone:g,fields:S,successCallback:k,prepareData:w,setFieldRef:v,validateForm:p,fillFromSelectedAgent:A,addAgent:Z,editAgent:_,getAgent:F,addAgentPhone:R,removeAgentPhone:y}}},4245:function(e,a,l){l.r(a),l.d(a,{default:function(){return _}});l(6229),l(7330),l(2062);var t=l(3396),n=l(2793),o=l(9242),r=l(4870),u=l(140),i=l(6144),s=l(9546),c=l(7174),d=l(3874),m=l(9286),v=l(3856),p=l(1411),f=l(7495);const h=["onSubmit"],b=(0,t._)("br",null,null,-1);var U=(0,t.aZ)({__name:"LacAgentCreateForm",props:{partnerId:{},employeeRoles:{}},setup(e){const a=e,{computedCols:l}=(0,p.b)(),{fields:n,employeeRole:U,agentPhone:g,setFieldRef:S,successCallback:w,validateForm:y,prepareData:R,addAgent:k,addAgentPhone:A,removeAgentPhone:Z}=(0,f.N)(a.employeeRoles);A();const _=(0,m.N)();async function F(){const e=await y();if(e)try{_.open(v.y.LOADER),await k({...R(),partner_id:a.partnerId}),_.open(v.y.SUCCESS,{callback:w})}catch(l){_.open(v.y.ERROR,{text:l.message})}}return(e,a)=>{const m=(0,t.up)("Button");return(0,t.wg)(),(0,t.iD)("form",{class:"lac-form-long-dropdown lac-create-agent-form",onSubmit:(0,o.iM)(F,["prevent"])},[(0,t.Wm)(u.Z,{title:"Общие параметры",class:"mb16 lac-fieldset-params",grid:(0,r.SU)(l)},{default:(0,t.w5)((()=>[(0,t.Wm)(i.Z,{variant:"horizontal",value:(0,r.SU)(n).name.value,"onUpdate:value":a[0]||(a[0]=e=>(0,r.SU)(n).name.value=e),id:(0,r.SU)(n).name.id,label:(0,r.SU)(n).name.label,rules:(0,r.SU)(n).name.rules,placeholder:"",ref:(0,r.SU)(S)},null,8,["value","id","label","rules"]),(0,t.Wm)(i.Z,{class:"lac-fieldset-params-dob",variant:"horizontal",value:(0,r.SU)(n).dob.value,"onUpdate:value":a[1]||(a[1]=e=>(0,r.SU)(n).dob.value=e),id:(0,r.SU)(n).dob.id,label:(0,r.SU)(n).dob.label,rules:(0,r.SU)(n).dob.rules,placeholder:"",ref:(0,r.SU)(S),type:"date"},null,8,["value","id","label","rules"]),(0,t.Wm)(c.Z,{variant:"horizontal",value:(0,r.SU)(U).value,"onUpdate:value":a[2]||(a[2]=e=>(0,r.SU)(U).value=e),items:(0,r.SU)(U).items,id:(0,r.SU)(U).id,label:(0,r.SU)(U).label,rules:(0,r.SU)(U).rules,placeholder:"",ref:(0,r.SU)(S)},null,8,["value","items","id","label","rules"])])),_:1},8,["grid"]),(0,t.Wm)(u.Z,{title:"Контакты",class:"mb16 lac-fieldset-contacts"},{default:(0,t.w5)((()=>[(0,t.Wm)(i.Z,{class:"lac-fieldset-contacts-email",variant:"horizontal",value:(0,r.SU)(n).email.value,"onUpdate:value":a[3]||(a[3]=e=>(0,r.SU)(n).email.value=e),id:(0,r.SU)(n).email.id,label:(0,r.SU)(n).email.label,rules:(0,r.SU)(n).email.rules,placeholder:"",ref:(0,r.SU)(S)},null,8,["value","id","label","rules"]),b,(0,t.Wm)(d.Z,{value:(0,r.SU)(g),onAdd:(0,r.SU)(A),onRemove:(0,r.SU)(Z)},null,8,["value","onAdd","onRemove"])])),_:1}),(0,t.Wm)(u.Z,{title:"Комментарий",class:"mb8"},{default:(0,t.w5)((()=>[(0,t.Wm)(s.Z,{"no-resize":"",rows:3,value:(0,r.SU)(n).comment.value,"onUpdate:value":a[4]||(a[4]=e=>(0,r.SU)(n).comment.value=e),id:(0,r.SU)(n).comment.id,rules:(0,r.SU)(n).comment.rules,placeholder:"",ref:(0,r.SU)(S)},null,8,["value","id","rules"])])),_:1}),(0,t.Wm)(m,{label:"Добавить",type:"submit"})],40,h)}}});const g=U;var S=g,w=l(2483),y=l(9152),R=l(1020),k=l(828),A=(0,t.aZ)({__name:"PartnerAgentCreatePage",setup(e){const a=(0,w.yj)(),l=(0,w.tv)(),o=(0,m.N)(),u=(0,y.N)(),{selectPartnerId:i}=(0,R.Jk)(u),s=(0,r.iH)(!1),c=(0,r.iH)(0),d=(0,r.iH)([]);return(0,t.wF)((async()=>{try{if(o.open(v.y.LOADER),c.value=i.value?i.value:Number(a.query.partner_id),!c.value)throw new Error("Go back");const e=await(0,k.kI)();if(e.error||!e.data?.info?.length){const e=()=>{location.href=new URL(location.href).toString()};return void o.open(v.y.ERROR,{text:"Ошибка. Отсутствуют должности агентов",callback:e})}d.value=e.data.info,s.value=!0,o.close()}catch(e){o.close(),await l.back()}})),(e,a)=>((0,t.wg)(),(0,t.j4)(n.Z,{title:"Добавление сотрудника"},{default:(0,t.w5)((()=>[s.value?((0,t.wg)(),(0,t.j4)(S,{key:0,partnerId:c.value,employeeRoles:d.value},null,8,["partnerId","employeeRoles"])):(0,t.kq)("",!0)])),_:1}))}});const Z=A;var _=Z}}]);
//# sourceMappingURL=partnerAgentCreate.a141ba80.js.map