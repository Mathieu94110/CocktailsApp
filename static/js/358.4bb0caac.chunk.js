"use strict";(self.webpackChunkcocktailsmaster=self.webpackChunkcocktailsmaster||[]).push([[358],{358:function(e,n,r){r.r(n),r.d(n,{default:function(){return E}});var t=r(165),a=r(861),c=r(885),i=r(791),l="HomePage_grid__X3Xvw",s="HomePage_contentCard__k2Ro4",o="Search_searchBar__BNASN",u=r(184);var d=function(e){var n=e.setFilter,r=e.currentFilter;return(0,u.jsxs)("div",{className:"d-flex flex-row justify-content-center align-item-center my-30 ".concat(o),children:[(0,u.jsx)("i",{className:"fa-solid fa-magnifying-glass mr-15"}),(0,u.jsx)("input",{onInput:function(e){var r=e.currentTarget.value;n(r.trim().toLowerCase())},className:"flex-fill",type:"text",placeholder:r})]})},f=r(689),p="Recipe_recipe__a28YQ",h="Recipe_recipeTitle__A9eP6",m="Recipe_imageContainer__UUkBL";var v=function(e){var n=e.cocktails,r=(0,i.useState)(!1),t=(0,c.Z)(r,2),a=t[0],l=t[1],s=(0,f.s0)();return(0,u.jsxs)("div",{className:p,children:[(0,u.jsx)("i",{className:"fa-solid fa-xmark"}),(0,u.jsx)("div",{className:m,children:(0,u.jsx)("img",{src:n.strDrinkThumb,alt:n.strDrink,onClick:function(){return s("/recipe/".concat(n.strDrink))}})}),(0,u.jsxs)("div",{className:"".concat(h," d-flex flex-column justify-content-center align-items-center"),children:[(0,u.jsx)("h3",{className:"mb-10",children:n.strDrink}),(0,u.jsx)("i",{onClick:function(){l(!a)},className:"fa-solid fa-heart ".concat(a?"text-primary":"")})]})]})},x="Loading_spinner__p9lwA";var g=function(){return(0,u.jsx)("div",{className:"d-flex flex-row align-items-center justify-content-center flex-fill",children:(0,u.jsx)("i",{className:"fa-solid fa-spinner ".concat(x)})})},_=r(388),k=function(e){var n=e.includes("Alcoholic")&&!e.includes("Non_Alcoholic")||!e.includes("Alcoholic")&&e.includes("Non_Alcoholic"),r=e.includes("Ordinary_Drink")&&!e.includes("Cocktail")||!e.includes("Ordinary_Drink")&&e.includes("Cocktail"),t=e.includes("Cocktail_glass")&&!e.includes("Champagne_flute")||!e.includes("Cocktail_glass")&&e.includes("Champagne_flute");return{strAlcoholic:n&&e.includes("Alcoholic")?"Alcoholic":n&&e.includes("Non_Alcoholic")?"Non alcoholic":null,strCategory:r&&e.includes("Ordinary_Drink")?"Ordinary Drink":r&&e.includes("Cocktail")?"Cocktail":null,strGlass:t&&e.includes("Cocktail_glass")?"Cocktail glass":t&&e.includes("Champagne_flute")?"Champagne flute":null}},w=function(e,n){var r=Object.keys(n);return e.filter((function(e){return r.every((function(r){return!n[r].length||(Array.isArray(e[r])?e[r].some((function(e){return n[r].includes(e)})):n[r].includes(e[r]))}))}))},C=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n,r){var a,i,l,s;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.map((function(e){return e.value})),e.next=3,k(a);case 3:return i=e.sent,l=Object.fromEntries(Object.entries(i).filter((function(e){return null!==(0,c.Z)(e,2)[1]}))),e.next=7,w(r,l);case 7:return s=e.sent,e.abrupt("return",s);case 9:case"end":return e.stop()}}),e)})));return function(n,r){return e.apply(this,arguments)}}(),j={filterListByCategories:C},N=_.Z.create({baseURL:"https://www.thecocktaildb.com/api/json/v1/1/"}),b={searchCocktails:function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.get("search.php?s=".concat(n));case 3:return r=e.sent,e.abrupt("return",r.data.drinks);case 7:throw e.prev=7,e.t0=e.catch(0),new Error("Error fetch cocktails");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(n){return e.apply(this,arguments)}}(),searchByFilters:function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n,r){var a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.filterListByCategories(n,r);case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})));return function(n,r){return e.apply(this,arguments)}}()},y=r(413);var Z=function(e,n){if("CURRENT_COCKTAILS"===n.type)return(0,y.Z)((0,y.Z)({},e),{},{cocktails:n.payload});throw new Error("action inconnue")},A={pagination:"Paginate_pagination__ckmim",pageNumber:"Paginate_pageNumber__DrBn5",active:"Paginate_active__Z5x5O"},T=function(e){for(var n=e.postsPerPage,r=e.totalPosts,t=e.paginate,a=e.previousPage,c=e.nextPage,i=e.currentPageNumber,l=[],s=1;s<=Math.ceil(r/n);s++)l.push(s);return(0,u.jsx)("div",{className:A.paginationContainer,children:(0,u.jsxs)("ul",{className:A.pagination,children:[(0,u.jsx)("li",{onClick:a,className:A.pageNumber,children:"Prev"}),l.map((function(e,n){return(0,u.jsx)("li",{onClick:function(){return t(e)},className:"".concat(A.pageNumber," ")+(e===i?"".concat(A.active):""),children:e},n)})),(0,u.jsx)("li",{onClick:c,className:A.pageNumber,children:"Next"})]})})},P=r(982),D={dropdownContainer:"DropdownFilters_dropdownContainer__OAbhV",dropdownInput:"DropdownFilters_dropdownInput__9Atdi",dropdownMenu:"DropdownFilters_dropdownMenu__0XwHa",dropdownTags:"DropdownFilters_dropdownTags__obGAc",dropdownTagItem:"DropdownFilters_dropdownTagItem__y3eUP",dropdownTagClose:"DropdownFilters_dropdownTagClose__IEqEb",searchBox:"DropdownFilters_searchBox__wAADf"},S=function(){return(0,u.jsx)("svg",{height:"20",width:"20",viewBox:"0 0 20 20",children:(0,u.jsx)("path",{d:"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"})})},O=function(e){var n=e.placeHolder,r=e.options,t=e.isMulti,a=e.isSearchable,l=e.onChange,s=(0,i.useState)(!1),o=(0,c.Z)(s,2),d=o[0],f=o[1],p=(0,i.useState)(t?[]:null),h=(0,c.Z)(p,2),m=h[0],v=h[1],x=(0,i.useState)(""),g=(0,c.Z)(x,2),_=g[0],k=g[1],w=(0,i.useRef)(null),C=(0,i.useRef)(null);(0,i.useEffect)((function(){k(""),d&&w.current&&w.current.focus()}),[d]),(0,i.useEffect)((function(){var e=function(e){C.current&&!C.current.contains(e.target)&&f(!1)};return window.addEventListener("click",e),function(){window.removeEventListener("click",e)}}));var j=function(e){return null===m||void 0===m?void 0:m.filter((function(n){return n.value!==e.value}))},N=function(e){return t?m.filter((function(n){return n.value===e.value})).length>0:!!m&&m.value===e.value};return(0,u.jsxs)("div",{className:D.dropdownContainer,children:[(0,u.jsxs)("div",{ref:C,onClick:function(){f(!d)},className:D.dropdownInput,children:[(0,u.jsx)("div",{className:D.dropdownSelectedValue,children:m&&0!==m.length?t?(0,u.jsx)("div",{className:D.dropdownTags,children:m.map((function(e){return(0,u.jsxs)("div",{className:D.dropdownTagItem,children:[e.label,(0,u.jsx)("span",{onClick:function(n){return function(e,n){e.stopPropagation();var r=j(n);v(r),l(r)}(n,e)},className:D.dropdownTagClose,children:(0,u.jsx)("i",{className:"fa-solid fa-xmark ml-5 vertical-center-content"})})]},e.value)}))}):m.label:n}),(0,u.jsx)("div",{className:D.dropdownTools,children:(0,u.jsx)("div",{className:D.dropdownTool,children:(0,u.jsx)(S,{})})})]}),d&&(0,u.jsxs)("div",{className:D.dropdownMenu,children:[a&&(0,u.jsx)("div",{className:D.searchBox,children:(0,u.jsx)("input",{onChange:function(e){k(e.target.value)},value:_,ref:w})}),(_?r.filter((function(e){return e.label.toLowerCase().indexOf(_.toLowerCase())>=0})):r).map((function(e){return(0,u.jsxs)("div",{className:"my-10",children:[(0,u.jsx)("input",{onClick:function(){return function(e){var n;n=t?m.findIndex((function(n){return n.value===e.value}))>=0?j(e):[].concat((0,P.Z)(m),[e]):e,v(n),l(n)}(e)},type:"checkbox",checked:N(e)},e.value),(0,u.jsx)("label",{children:e.label})]})}))]})]})},R=[{value:"Alcoholic",label:"Alcoholic"},{value:"Non_Alcoholic",label:"Non Alcoholic"},{value:"Ordinary_Drink",label:"Ordinary Drink"},{value:"Cocktail",label:"Cocktail"},{value:"Cocktail_glass",label:"Cocktail glass"},{value:"Champagne_flute",label:"Champagne flute"}];var E=function(){var e=(0,i.useState)("margarita"),n=(0,c.Z)(e,2),r=n[0],o=n[1],f=(0,i.useState)([]),p=(0,c.Z)(f,2),h=p[0],m=p[1],x=(0,i.useState)(!0),_=(0,c.Z)(x,2),k=_[0],w=_[1],C=(0,i.useReducer)(Z,{cocktails:[]}),j=(0,c.Z)(C,2),N=j[0],y=j[1],A=(0,i.useState)(1),P=(0,c.Z)(A,2),D=P[0],S=P[1],E=(0,i.useState)(6),F=(0,c.Z)(E,1)[0],L=D*F,I=L-F,B=N.cocktails.slice(I,L);return(0,i.useEffect)((function(){b.searchCocktails(r).then(function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n){var a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r||h.length){e.next=5;break}y({type:"CURRENT_COCKTAILS",payload:n||[]}),e.next=14;break;case 5:if(!r||!h.length){e.next=12;break}return e.next=8,b.searchByFilters(h,n);case 8:(a=e.sent)&&y({type:"CURRENT_COCKTAILS",payload:a}),e.next=14;break;case 12:y({type:"CURRENT_COCKTAILS",payload:[]});case 14:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){console.error(e)})).finally((function(){w(!1)}))}),[r,h]),(0,u.jsxs)("div",{className:"flex-fill container d-flex flex-column p-20",children:[(0,u.jsx)("h1",{className:"my-30",children:"D\xe9couvrez des nouvelles recettes"}),(0,u.jsxs)("div",{className:"card flex-fill d-flex flex-column p-20 mb-20  ".concat(s),children:[(0,u.jsx)(O,{isSearchable:!0,isMulti:!0,placeHolder:"Select filters",options:R,onChange:function(e){return m(e||[])}}),(0,u.jsx)(d,{setFilter:o,currentFilter:r}),k&&!N.cocktails.length?(0,u.jsx)(g,{}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:l,children:B.map((function(e,n){return(0,u.jsx)(v,{cocktails:e},n)}))}),!!N.cocktails.length&&(0,u.jsx)(T,{postsPerPage:F,totalPosts:N.cocktails.length,paginate:function(e){S(e)},previousPage:function(){1!==D&&S(D-1)},nextPage:function(){D!==Math.ceil(N.cocktails.length/F)&&S(D+1)},currentPageNumber:D})]})]})]})}}}]);
//# sourceMappingURL=358.4bb0caac.chunk.js.map