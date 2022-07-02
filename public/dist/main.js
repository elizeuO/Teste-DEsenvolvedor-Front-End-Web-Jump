/*! assessment-frontend 2022-07-02 */
function getAPIURL(e){let t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(),t.responseText}function getMockAPICategoryList(){var e=getAPIURL("http://localhost:8888/api/V1/categories/list");return JSON.parse(e).items}function getMockAPIProductList(e){e=getAPIURL("http://localhost:8888/api/V1/categories/"+e);return JSON.parse(e)}function renderNavigationWithCategories(){let r=getMockAPICategoryList(),e=document.querySelectorAll(".js-render-nav-categories");null!==r&&null!==e&&e.forEach(e=>{var t='<li><a href="/">Página inicial</a> </li>';t+=setCategoryListElements(r)+'<li><a href="">Contato</a></li>',e.innerHTML=t})}function setCategoryListElements(e){let t="";return e.forEach(e=>{t+='<li><a href="/categoria.html?id='+e.id+'">'+e.name+"</a></li>"}),t}function isValidCategoryPage(e,t){let r=window.location.pathname;return!("categoria"!==r.split("/").pop().replace(".html","")||!e.has(t))}function renderCategoryPageContent(){var e,t,r;let i=new URLSearchParams(window.location.search);isValidCategoryPage(i,"id")&&(r=i.get("id"),e=getMockAPICategoryList(),t=getMockAPIProductList(r),renderBreadcrumb((r=e[r-1]).name),renderFilterContent(t,e),renderProductContent(t,r))}function renderBreadcrumb(e){let t=document.querySelector(".js-render-breadcrumb");null!==t&&(t.innerHTML='<a href="/">Página inicial</a> <span aria-hidden="true">></span> <span class="c-breadcrumb__current">'+e+"</span>")}function renderProductContent(e,t){let r=document.querySelector(".js-render-product-content");var i;null!==r&&(t="<h1>"+t.name+'</h1><div class="c-sort-bar l-flex l-flex--center l-flex--wrap"><div class="c-sort-bar__display"><div class="c-sort-bar__display-button active"><i class="fa-solid fa-grip"></i></div><div class="c-sort-bar__display-button"><i class="fa-solid fa-list"></i></div></div><div class="c-sort-bar_data-option">Ordernar por<select><option value="Preço">Preço</option></select></div></div>',i='<div class="js-product-wrapper"><div class="l-flex l-flex--center l-flex--wrap l-flex--stretch l-flex--negative">',t+=i+=renderProducts(e)+"</div>",r.innerHTML=t)}function renderProducts(e){let t=e.items,r="";return console.log(t),t.forEach(e=>{r+='<article class="l__col-3"><div class= "c-product js-product"><div class= "c-product__img l-flex l-flex--center"><img src="/assets/img/'+e.image+'"></div><div class="c-product__info"><h2>'+e.name+'</h2><div class="c-product__price">R$ '+e.price+'</div><div class="c-product__button">Comprar</div></div></div></article>'}),r}function renderFilterContent(r,i){let n=document.querySelector(".js-render-product-filter");if(null!==n){let e=r.filters.map(e=>Object.keys(e)[0]),t="<h3>Categorias</h3><ul>";t+=setCategoryListElements(i)+"</ul>",e.includes("color")&&(t+="<h3>Cores</h3><ul>"+setColorListElements(r)+"</ul>"),e.includes("gender")&&(t+="<h3>Cores</h3><ul>"+setGenderListElements(r)+"</ul>"),n.innerHTML=t}}function setColorListElements(e){let t=e.items,r="",i=[];return t.forEach(e=>{e=e.filter[0];i.includes(e.color)||i.push(e.color)}),i.forEach(e=>{r+="<li>"+e+"</li>"}),r}function setGenderListElements(e){let t=e.items,r="",i=[];return t.forEach(e=>{e=e.filter[0];i.includes(e.gender)||i.push(e.gender)}),i.forEach(e=>{r+="<li>"+e+"</li>"}),r}function init(){renderNavigationWithCategories(),renderCategoryPageContent()}init();