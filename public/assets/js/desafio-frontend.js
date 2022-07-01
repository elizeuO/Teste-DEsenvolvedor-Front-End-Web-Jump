function getAPIURL(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function renderNavigationsWithCategories(categories) {
  let elements = document.querySelectorAll(".js-render-nav-categories");

  if (null === elements) {
    return;
  }

  elements.forEach((element)=>{
    let result = '<li><a href="/">Página inicial</a> </li>';

    categories.forEach((category) => {
      result +=
        '<li><a href="/categoria/' +
        category.path +
        '">' +
        category.name +
        "</a></li>";
      console.log(result);
    });
  
    result += '<li><a href="">Contato</a></li>';
  
    element.innerHTML = result;
  });
}

function init() {
  let data = getAPIURL("http://localhost:8888/api/V1/categories/list");
  let categories = JSON.parse(data).items;
  renderNavigationsWithCategories(categories);
}

init();
