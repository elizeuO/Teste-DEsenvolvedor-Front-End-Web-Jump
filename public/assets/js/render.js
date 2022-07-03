//Render page link items and categories items
function renderNavigationWithCategories() {
  let categories = getMockAPICategoryList();

  let elements = document.querySelectorAll(".js-render-nav-categories");

  if (null === categories || null === elements) {
    return;
  }

  elements.forEach((element) => {
    let result = '<li><a href="/">Página inicial</a> </li>';

    result +=
      setCategoryListElements(categories) + '<li><a href="">Contato</a></li>';
    element.innerHTML = result;
  });
}

//Return list items with category links
function setCategoryListElements(categories) {
  let result = "";

  categories.forEach((category) => {
    result +=
      '<li><a href="/categoria.html?id=' +
      category.id +
      '">' +
      category.name +
      "</a></li>";
  });

  return result;
}

//Check if is page "Categoria" and validates
function isValidCategoryPage(searchParams, paramName) {
  const validPageName = "categoria";

  let path = window.location.pathname;
  let page = path.split("/").pop().replace(".html", "");

  if (validPageName !== page || !searchParams.has(paramName)) {
    return false;
  } else {
    return true;
  }
}

//Add content to category page
function renderCategoryPageContent() {
  const paramName = "id";
  let searchParams = new URLSearchParams(window.location.search);

  if (!isValidCategoryPage(searchParams, paramName)) {
    return;
  }

  const categoryID = searchParams.get("id");
  const allCategories = getMockAPICategoryList();
  const productData = getMockAPIProductList(categoryID);
  const categoryItem = allCategories[categoryID - 1];

  let categoryName = categoryItem.name;

  renderBreadcrumb(categoryName);
  renderFilterContent(productData, allCategories);
  renderProductContent(productData, categoryItem);
}

//Add content to breadcrumb
function renderBreadcrumb(categoryName) {
  let element = document.querySelector(".js-render-breadcrumb");

  if (null === element) {
    return;
  }

  element.innerHTML =
    '<a href="/">Página inicial</a> <span aria-hidden="true">></span> <span class="c-breadcrumb__current">' +
    categoryName +
    "</span>";
}

//Render product related content
function renderProductContent(productData, categoryItem) {
  let element = document.querySelector(".js-render-product-content");

  if (null === element) {
    return;
  }

  let content =
    "<h1>" +
    categoryItem.name +
    "</h1>" +
    '<div class="c-sort-bar l-flex l-flex--center l-flex--wrap">' +
    '<div class="c-sort-bar__display c__mobile-hide">' +
    '<div class="c-sort-bar__display-button active" title="Exibição por grade"><i class="fa-solid fa-grip"></i></div>' +
    '<div class="c-sort-bar__display-button"  title="Exibição por lista"><i class="fa-solid fa-list"></i></div></div>' +
    '<div class="c-sort-bar_data-option">Ordernar por' +
    '<select><option value="Preço">Preço</option></select>' +
    "</div></div>";

  let productListWrapper =
    '<div class="c-product-wrapper js-product-wrapper">' +
    '<div class="l-flex l-flex--center l-flex--wrap l-flex--stretch l-flex--negative">';

  productListWrapper += renderProducts(productData) + "</div>";

  content += productListWrapper + renderPagination();

  element.innerHTML = content;
}

//Render static pagination
function renderPagination(){
  let pagination = '<div class="c-pagination l-flex l-flex--center"><div class="c-pagination__prev-next" title="Ir para página anterior" role="button"><i class="fa-solid fa-chevron-left"></i></div>';

  for(let i = 1; i<=5; i++){
    pagination += '<div class="c-pagination__page">'+i+'</div>';
  }

  pagination += '<div class="c-pagination__prev-next"><i class="fa-solid fa-chevron-right" title="Ir para página posterior" role="button"></i></div></div>'

  return pagination;
}

//Render product items
function renderProducts(productData) {
  let products = productData.items;
  let content = "";

  products.forEach((product) => {
    content +=
      '<article class="l__col-3">' +
      '<div class= "c-product js-product">' +
      '<div class= "c-product__img l-flex l-flex--center"><img src="/assets/img/' +
      product.image +
      '"></div>' +
      '<div class="c-product__info"><h2>' +
      product.name +
      "</h2>" +
      handleProductPrices(product) +
      '<div class="c-product__button">Comprar</div>' +
      "</div></div></article>";
  });

  return content;
}

function handleProductPrices(product) {
  let content = '<div class="c-product__price l-flex l-flex--center">';

  let specialPrice = product.specialPrice;
  let price = product.price;

  if (null === price) {
    return;
  }

  price = price.toFixed(2).replace(".", ",");

  if (undefined !== specialPrice) {
    specialPrice = specialPrice.toFixed(2).replace(".", ",");
    content += '<div class="c-product__old-price">R$' +price+ '</div>'+
    '<div class="c-product__current-price">R$' +specialPrice+ '</div>'
  }else{
    content += '<div class="c-product__current-price">R$' +price+ '</div>'
  }
  content += "</div>";

  return content;
}

//Add content to category page filter
function renderFilterContent(productData, categories) {
  let element = document.querySelector(".js-render-product-filter");

  if (null === element) {
    return;
  }

  //Get filter parametters
  let filterParams = productData.filters.map((item) => {
    return Object.keys(item)[0];
  });

  let content = "<h3>Categorias</h3><ul>";
  content += setCategoryListElements(categories) + "</ul>";

  if (filterParams.includes("color")) {
    content +=
      "<h3>Cores</h3>" + setColorListElements(productData);
  }

  if (filterParams.includes("gender")) {
    content +=
      "<h3>Gêneros</h3><ul>" + setGenderListElements(productData) + "</ul>";
  }

  element.innerHTML = content;
}

//Return list items with color content for the filter
function setColorListElements(productData) {
  let productItems = productData.items;
  let content = '<ul class="l-flex l-flex--wrap">';
  let colors = [];

  productItems.forEach((productItem) => {
    let value = productItem.filter[0];

    if (!colors.includes(value.color)) {
      colors.push(value.color);
    }
  });

  colors.forEach((color) => {
    content += '<li class="l__col-4" color="'+color+'" title="Filtrar por cor '+color+'"></li>';
  });

  content += '</ul>';

  return content;
}

//Return list items with gender content for the filter
function setGenderListElements(productData) {
  let productItems = productData.items;
  let result = "";
  let genders = [];

  productItems.forEach((productItem) => {
    let value = productItem.filter[0];

    if (!genders.includes(value.gender)) {
      genders.push(value.gender);
    }
  });

  genders.forEach((gender) => {
    result += "<li>" + gender + "</li>";
  });

  return result;
}

//Start main functions
function init() {
  renderNavigationWithCategories();
  renderCategoryPageContent();
}

init();
