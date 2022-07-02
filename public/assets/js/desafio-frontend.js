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
function renderNavigationsWithCategories() {
  let categories = getMockAPICategoryList();

  let elements = document.querySelectorAll(".js-render-nav-categories");

  if (null === categories || null === elements) {
    return;
  }

  elements.forEach((element) => {
    let result = '<li><a href="/">Página inicial</a> </li>';

    categories.forEach((category) => {
      result +=
        '<li><a href="/categoria.html?id=' +
        category.id +
        '">' +
        category.name +
        "</a></li>";
    });

    result += '<li><a href="">Contato</a></li>';
    element.innerHTML = result;
  });
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

function renderCategoryPageContent() {
  const paramName = "id";
  let searchParams = new URLSearchParams(window.location.search);

  if (!isValidCategoryPage(searchParams, paramName)) {
    return;
  }

  const categoryID = searchParams.get("id");
  const allCategories = getMockAPICategoryList();
  
  //let productData = getMockAPIProductList(1);

  const categoryItem = allCategories[categoryID - 1];
  let categoryName = categoryItem.name;

  renderBreadcrumb(categoryName);
}

function renderBreadcrumb(categoryName){

    let element = document.querySelector('.js-render-breadcrumb');

    if(null === element){
      return;
    }

    element.innerHTML = '<a href="/">Página inicial</a> <span aria-hidden="true">></span> <span class="c-breadcrumb__current">'+categoryName+'</span>';
    
  }

  function renderFilterContent(){

  }

//Start main functions
function init() {
  renderNavigationsWithCategories();
  renderCategoryPageContent();
}

init();
