(this["webpackJsonppart2-2"]=this["webpackJsonppart2-2"]||[]).push([[0],{44:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t.n(c),u=t(19),a=t.n(u),i=t(20),o=t(10),l=t(5),s=t(0),j=function(e){var n=e.value,t=e.onChange;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:"Filter Entries:"}),"by name: ",Object(s.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.nameVal,t=e.nameChanged,c=e.numVal,r=e.numChanged,u=e.onSubmit;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:"Add New Entry: "}),Object(s.jsxs)("form",{onSubmit:u,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:n,onChange:t})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:c,onChange:r})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})]})},b=function(e){var n=e.entries,t=e.handleDelete;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:"Numbers"}),Object(s.jsx)("ul",{children:n.map((function(e){return Object(s.jsxs)("li",{children:[e.name+": "+e.number,Object(s.jsx)("button",{onClick:function(){return t(e.id)},children:"delete"})]},e.name)}))})]})},h=t(4),f=t.n(h),O="api/persons",m={getAll:function(){return f.a.get(O).then((function(e){return e.data}))},create:function(e){return f.a.post(O,e).then((function(e){return e.data}))},update:function(e,n){return f.a.put("".concat(O,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return f.a.delete("".concat(O,"/").concat(e))}},v=function(){var e=Object(c.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],u=Object(c.useState)(""),a=Object(l.a)(u,2),h=a[0],f=a[1],O=Object(c.useState)(""),v=Object(l.a)(O,2),x=v[0],p=v[1],g=Object(c.useState)(""),C=Object(l.a)(g,2),w=C[0],S=C[1];Object(c.useEffect)((function(){m.getAll().then((function(e){return r(e)})).catch((function(e){return console.log(e)}))}),[]);var k=w.length>0?t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())})):t;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(j,{value:w,onChange:function(e){return S(e.target.value)}}),Object(s.jsx)(d,{nameVal:h,nameChanged:function(e){return f(e.target.value)},numVal:x,numChanged:function(e){return p(e.target.value)},onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===h}));if(n&&window.confirm("".concat(h," is already in the phonebook. Replace the old number with a new one?"))){var c=Object(o.a)(Object(o.a)({},n),{},{number:x});m.update(n.id,c).then((function(e){return r(t.map((function(n){return n.id===e.id?c:n})))})).catch((function(e){return console.log(e)}))}else m.create({name:h,number:x}).then((function(e){return r([].concat(Object(i.a)(t),[e]))})).catch((function(e){return console.log(e)}))}}),Object(s.jsx)(b,{entries:k,handleDelete:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Delete ".concat(n,"?"))&&m.remove(e).then(r(t.filter((function(n){return n.id!==e})))).catch((function(e){return console.log(e)}))}})]})};a.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(v,{})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.48d02a33.chunk.js.map