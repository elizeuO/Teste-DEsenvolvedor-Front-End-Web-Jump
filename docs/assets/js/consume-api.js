//Get API data
function getAPIURL(url) {
    let request = new XMLHttpRequest();
  
    request.open("GET", url, false);
    request.send();
  
    return request.responseText;
  }
  
  //Consume Mock-API category list data
  function getMockAPICategoryList() {
    let data = getAPIURL("/Teste-Desenvolvedor-Front-End-Web-Jump/api/V1/categories/list");
  
    return JSON.parse(data).items;
  }
  
  //Consume Mock-API products data
  function getMockAPIProductList(ID) {
    let data = getAPIURL("/Teste-Desenvolvedor-Front-End-Web-Jump/api/V1/categories/" + ID);
  
    return JSON.parse(data);
  }