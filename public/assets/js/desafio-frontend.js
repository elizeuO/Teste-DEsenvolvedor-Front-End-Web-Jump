//Get API data
function getAPIURL(url) {
  let request = new XMLHttpRequest();

  request.open("GET", url, false);
  request.send();

  return request.responseText;
}

//Consume Mock-API categorie list data
function getMockAPICategoryList() {
  let data = getAPIURL("http://localhost:8888/api/V1/categories/list");

  return JSON.parse(data).items;
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
        '<li><a href="?categoria=' +
        category.path +
        '">' +
        category.name +
        "</a></li>";
    });

    result += '<li><a href="">Contato</a></li>';
    element.innerHTML = result;
  });
}

//Start main functions
function init() {
  renderNavigationsWithCategories();
}

init();
