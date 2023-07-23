"use strict";(self["webpackChunklac"]=self["webpackChunklac"]||[]).push([[194],{828:function(e,n,t){t.d(n,{Zs:function(){return l},kI:function(){return i},oU:function(){return s},vU:function(){return o}});var a=t(7542),r=t(8020);const o=async e=>{const n=await(0,a.I)().get("/agent/role/delete",{searchParams:{role:e}});if(!n)throw new r.u(o.name);return n},i=async(e={})=>{const n=await(0,a.I)().get("/agent/role/list",{searchParams:{...e,size:30}});if(!n)throw new r.u(i.name);return n},l=async e=>{const n=await(0,a.I)().post("/agent/role/add",e);if(!n)throw new r.u(l.name);return n},s=async(e,n)=>{const t=await(0,a.I)().post("/agent/role/edit",{old_role:e,new_role:n});if(!t)throw new r.u(s.name);return t}},2525:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var a=t(3396),r=(t(7658),t(4870)),o=t(7139),i=t(9286),l=t(3856),s=t(2483),c=t(828),d=t(6408),u=t(3917);const f={class:"flex align-items-center justify-content-between pt16 pb16"},m={class:"flex align-items-center",style:{"font-size":"14px"}},w={key:0,class:"flex align-items-center"};var p=(0,a.aZ)({__name:"LacRoles",setup(e){const n=(0,s.tv)(),t=(0,i.N)(),p=(0,r.iH)(!1),y=(0,r.qj)([{text:"Должность",field:"role",sort:"role"},{text:"",field:"",sort:"",noSort:!0}]),v=(0,r.qj)({field:"role",dir:d.O.ACS}),h=(0,r.iH)(null),k=(0,r.iH)([]),g=(0,r.Fl)((()=>k.value.map((e=>({role:e,field:"role"})))));async function R(e){await n.push({name:"adminRoleEdit",params:{role:e}})}async function b(e){const n=async()=>{try{t.close(),t.open(l.y.LOADER);await(0,c.vU)(e);await C()}catch(n){t.open(l.y.ERROR,{text:n.message})}};t.open(l.y.CONFIRM,{callback:n,text:"Удалить должность?"})}async function C(){t.open(l.y.LOADER);const e={};v.dir&&(e.dir=v.dir),v.field&&(e.order=v.field);const n=await(0,c.kI)(e);!n.error&&n.data.info?(k.value=n.data.info,t.close()):t.open(l.y.ERROR)}async function _(){await C(),p.value=!0,await(0,a.Y3)()}(0,a.YP)((()=>[v.dir,v.field]),(()=>{C()})),(0,a.bv)(_);const x=e=>{v.field=e.sortField,v.dir=e.sortOrder>0?d.O.ACS:d.O.DESC};return(e,n)=>{const t=(0,a.up)("Button"),i=(0,a.up)("RouterLink");return(0,a.wg)(),(0,a.iD)("div",{class:"lac-table-module wrapper",ref_key:"table",ref:h},[(0,a._)("div",f,[(0,a._)("div",m,[(0,a.Wm)(i,(0,a.dG)({to:{name:"adminRoleCreate"}},e.$props,{custom:""}),{default:(0,a.w5)((({href:n,navigate:r})=>[(0,a.Wm)(t,(0,a.dG)({onClick:r,size:"small",label:"Добавить"},e.$attrs,{href:n}),null,16,["onClick","href"])])),_:1},16)])]),p.value?((0,a.wg)(),(0,a.j4)(u.Z,{key:0,data:(0,r.SU)(g),style:{"min-height":"0px"},fields:y,"sort-field":"role","sort-order":1,resizeMode:"fit",id:"roles",onSort:x},{"column-body":(0,a.w5)((({data:e,field:n,render:r})=>[n?((0,a.wg)(),(0,a.iD)(a.HY,{key:1},[(0,a.Uk)((0,o.zw)(r(e,n)),1)],64)):((0,a.wg)(),(0,a.iD)("div",w,[(0,a.Wm)(t,{onClick:n=>R(e.role),size:"small",icon:"pi pi-pencil",rounded:"",outlined:"",class:"border-none w-min h-min p-2",severity:"info"},null,8,["onClick"]),(0,a.Wm)(t,{onClick:n=>b(e.role),size:"small",icon:"pi pi-trash",severity:"danger",rounded:"",outlined:"",class:"border-none w-min h-min p-2"},null,8,["onClick"])]))])),_:1},8,["data","fields"])):(0,a.kq)("",!0)],512)}}}),y=t(89);const v=(0,y.Z)(p,[["__scopeId","data-v-4bfc1eef"]]);var h=v;const k={class:"overflow-hidden flex flex-column"};var g=(0,a.aZ)({__name:"AdminRoles",setup(e){return(e,n)=>((0,a.wg)(),(0,a.iD)("div",k,[(0,a.Wm)(h,{class:"flex-grow-1"})]))}});const R=g;var b=R}}]);
//# sourceMappingURL=adminRoles.a223fd35.js.map