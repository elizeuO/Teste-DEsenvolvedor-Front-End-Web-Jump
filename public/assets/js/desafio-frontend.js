//Get API data
function getAPIURL(url) {
  let request = new XMLHttpRequest();

  request.open("GET", url, false);
  request.send();

  return request.responseText;
}

//Consume Mock-API category list data
function getMockAPICategoryList() {
  let data = getAPIURL("http://localhost:8888/api/V1/categories/list");

  return JSON.parse(data).items;
}

//Consume Mock-API products data
function getMockAPIProductList(ID) {
  let data = getAPIURL("http://localhost:8888/api/V1/categories/" + ID);

  return JSON.parse(data);
}

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
      "<h3>Cores</h3><ul>" + setColorListElements(productData) + "</ul>";
  }

  if (filterParams.includes("gender")) {
    content +=
      "<h3>Cores</h3><ul>" + setGenderListElements(productData) + "</ul>";
  }

  element.innerHTML = content;
}

//Return list items with color content for the filter
function setColorListElements(productData) {
  let productItems = productData.items;
  let result = "";
  let colors = [];

  productItems.forEach((productItem) => {
    let value = productItem.filter[0];

    if (!colors.includes(value.color)) {
      colors.push(value.color);
    }
  });

  console.log(colors);

  colors.forEach((color) => {
    result += '<li>' + color + '</li>';
  });

  return result;
}

//Start main functions
function init() {
  renderNavigationWithCategories();
  renderCategoryPageContent();
}

init();
