(this.webpackJsonpfriday_teamwork_project=this.webpackJsonpfriday_teamwork_project||[]).push([[0],{17:function(e,n,t){e.exports={input:"SuperInputText_input__2Ri_z",errorInput:"SuperInputText_errorInput__3By_1",error:"SuperInputText_error__3MskL"}},18:function(e,n,t){e.exports={checkbox:"SuperCheckbox_checkbox__vsNfW"}},22:function(e,n,t){e.exports={button:"SuperButton_button__3JMxg",glowing:"SuperButton_glowing__DUsdW",red:"SuperButton_red__28cmk"}},26:function(e,n,t){e.exports={superSpan:"SuperSpan_superSpan__VBb2o"}},27:function(e,n,t){e.exports={select:"SuperSelect_select__2u_EY"}},33:function(e,n,t){},40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t.n(c),r=t(15),s=t.n(r),o=(t(33),t(28)),i=t(11),j=t(19),l=t(25),u=t(4),b=Object(j.b)({login:function(e,n){return n.type,Object(u.a)({},e)},register:function(e,n){return n.type,Object(u.a)({},e)}}),p=Object(j.c)(b,Object(j.a)(l.a)),O=t(3),x=t(1),d=function(){return Object(x.jsx)("div",{children:"Hello, I'm a Login component"})},h=function(){return Object(x.jsx)(x.Fragment,{children:"Recovery Page"})},g=function(){return Object(x.jsx)(x.Fragment,{children:"New Password Page"})},m=t(14),f=t(10),_=t(17),v=t.n(_),C=function(e){e.type;var n=e.onChange,t=e.className,c=e.onKeyPress,a=e.onChangeText,r=e.onEnter,s=e.error,o=e.spanClassName,i=Object(f.a)(e,["type","onChange","className","onKeyPress","onChangeText","onEnter","error","spanClassName"]),j="".concat(v.a.error," ").concat(o||""),l="".concat(v.a.input," ").concat(s?v.a.errorInput:""," ").concat(t);return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("input",Object(u.a)({type:"text",onChange:function(e){n&&n(e),a&&a(e.currentTarget.value)},onKeyPress:function(e){c&&c(e),r&&"Enter"===e.key&&r()},className:l},i)),s&&Object(x.jsx)("span",{className:j,children:s})]})},N=t(22),k=t.n(N),y=function(e){var n=e.red,t=(e.className,Object(f.a)(e,["red","className"])),c="".concat(k.a.button," ").concat(n?k.a.red:"");return Object(x.jsx)("button",Object(u.a)({className:c},t))},S=t(18),F=t.n(S),w=function(e){e.type;var n=e.onChange,t=e.onChangeChecked,c=e.className,a=(e.spanClassName,e.children),r=Object(f.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]),s="".concat(F.a.checkbox," ").concat(c||"");return Object(x.jsxs)("label",{className:F.a.label,children:[Object(x.jsx)("input",Object(u.a)({type:"checkbox",onChange:function(e){n&&n(e),t&&t(e.currentTarget.checked)},className:s},r)),a&&Object(x.jsx)("span",{className:F.a.spanClassName,children:a})]})},P=t(26),I=t.n(P),T=function(e){e.autoFocus;var n=e.onBlur,t=e.onEnter,a=e.spanProps,r=Object(f.a)(e,["autoFocus","onBlur","onEnter","spanProps"]),s=Object(c.useState)(!1),o=Object(m.a)(s,2),i=o[0],j=o[1],l=a||{},b=l.children,p=l.onDoubleClick,O=l.className,d=Object(f.a)(l,["children","onDoubleClick","className"]),h="".concat(I.a.superSpan," ").concat(O);return Object(x.jsx)(x.Fragment,{children:i?Object(x.jsx)(C,Object(u.a)({autoFocus:!0,onBlur:function(e){j(!1),n&&n(e)},onEnter:function(){j(!1),t&&t()}},r)):Object(x.jsx)("span",Object(u.a)(Object(u.a)({onDoubleClick:function(e){j(!0),p&&p(e)},className:h},d),{},{children:b||r.value}))})},B=t(27),E=t.n(B),H=function(e){var n=e.options,t=e.onChange,c=e.onChangeOption,a=Object(f.a)(e,["options","onChange","onChangeOption"]),r=n?n.map((function(e,n){return Object(x.jsx)("option",{value:e,children:e},"".concat(e,"-").concat(n))})):[];return Object(x.jsx)("div",{className:E.a.select,children:Object(x.jsx)("select",Object(u.a)(Object(u.a)({onChange:function(e){t&&t(e),c&&c(e.currentTarget.value)}},a),{},{children:r}))})},D=["x","y","z"],L=function(){var e=Object(c.useState)(""),n=Object(m.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(D[1]),s=Object(m.a)(r,2),o=s[0],i=s[1];return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(C,{}),Object(x.jsx)(w,{}),Object(x.jsx)(y,{children:"Click here"}),Object(x.jsx)(T,{value:t,onChangeText:a,spanProps:{children:t?void 0:"enter text..."}}),Object(x.jsx)(H,{options:D,value:o,onChangeOption:i})]})},R=function(){return Object(x.jsx)(x.Fragment,{children:"Error"})},J=function(){return Object(x.jsx)(x.Fragment,{children:"Profile"})},K=function(){return Object(x.jsx)("div",{children:"Hello, I'm a Register component"})},M=function(){return Object(x.jsx)("div",{children:Object(x.jsxs)(O.c,{children:[Object(x.jsx)(O.a,{path:"/login",render:function(){return Object(x.jsx)(d,{})}}),Object(x.jsx)(O.a,{path:"/register",render:function(){return Object(x.jsx)(K,{})}}),Object(x.jsx)(O.a,{path:"/profile",render:function(){return Object(x.jsx)(J,{})}}),Object(x.jsx)(O.a,{path:"/recovery",render:function(){return Object(x.jsx)(h,{})}}),Object(x.jsx)(O.a,{path:"/new-password",render:function(){return Object(x.jsx)(g,{})}}),Object(x.jsx)(O.a,{path:"/test",render:function(){return Object(x.jsx)(L,{})}}),Object(x.jsx)(O.a,{render:function(){return Object(x.jsx)(R,{})}})]})})},z=t(5),U=t.n(z),W=function(){return Object(x.jsxs)("div",{children:["Hello, I'm a Header Component",Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[Object(x.jsx)(i.b,{className:U.a.link,activeClassName:U.a.active,to:"/login",children:"Login page"}),Object(x.jsx)(i.b,{className:U.a.link,activeClassName:U.a.active,to:"/register",children:"Register page"}),Object(x.jsx)(i.b,{className:U.a.link,activeClassName:U.a.active,to:"/profile",children:"Profile page"}),Object(x.jsx)(i.b,{className:U.a.link,activeClassName:U.a.active,to:"/recovery",children:"Recovery page"}),Object(x.jsx)(i.b,{className:U.a.link,activeClassName:U.a.active,to:"/new-password",children:"New Password page"}),Object(x.jsx)(i.b,{className:U.a.link,activeClassName:U.a.active,to:"/test",children:"Test page"}),Object(x.jsx)(i.b,{className:U.a.link,activeClassName:U.a.active,to:"/404",children:"Error page"})]})]})},A=function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(W,{}),Object(x.jsx)(M,{})]})},V=(t(40),function(){return Object(x.jsx)("div",{className:"App",children:Object(x.jsx)(i.a,{children:Object(x.jsx)(o.a,{store:p,children:Object(x.jsx)(A,{})})})})}),X=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,42)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,r=n.getLCP,s=n.getTTFB;t(e),c(e),a(e),r(e),s(e)}))};s.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(V,{})}),document.getElementById("root")),X()},5:function(e,n,t){e.exports={parent:"Header_parent__3uXIU",navLink:"Header_navLink__34F64",item:"Header_item__r8DJn",triangle:"Header_triangle__r8l-5",link:"Header_link__1nRIe",active:"Header_active__19wmR"}}},[[41,1,2]]]);
//# sourceMappingURL=main.0a17f0c1.chunk.js.map