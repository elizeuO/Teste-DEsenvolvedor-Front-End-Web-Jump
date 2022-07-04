//Change product list layout type
function toogleProductLayoutType(layoutType) {
  let productWrapper = document.querySelector(".js-product-wrapper[layout]");

  if (null === productWrapper) {
    return;
  }

  productWrapper.setAttribute("layout", layoutType);
}

//Handle with layout buttons click
document.addEventListener("click", (ev) => {
  let button = ev.target.closest(".js-show-by-layout[layout]");

  if (null === button) {
    return;
  }

  switch (button.getAttribute("layout")) {
    case "grid":
      toogleProductLayoutType("grid");
      break;

    case "list":
      toogleProductLayoutType("list");
      break;

    default:
      break;
  }

  removeActiveStateLayoutButton();
  button.classList.add("active");
});

//Remove active state from layout buttons
function removeActiveStateLayoutButton() {
  let layoutButtons = document.querySelectorAll(
    ".js-show-by-layout.active[layout]"
  );

  if (null === layoutButtons) {
    return;
  }

  layoutButtons.forEach((layoutButton) => {
    layoutButton.classList.remove("active");
  });
}

//Filter products by color or gender
function filterProducts(filterData) {
  let type = filterData.getAttribute("type");
  let productData = getMockAPIProductList(getCategoryID()).items;

  let productWrapper = document.querySelector(".js-product-wrapper .l-flex");

  if (null === productWrapper) {
    return;
  }

  let value = filterData.getAttribute(type);

  let filteredData = productData.filter((item) => {

    if (item.filter.pop()[type] === value) {
      return item;
    }

  });

 productWrapper.innerHTML= renderProducts(filteredData);
}

document.addEventListener("click", (ev) => {
  let button = ev.target.closest(".js-filter-button");

  if (null === button) {
    return;
  }

  filterProducts(button);
});

function getCategoryID() {
  let searchParams = new URLSearchParams(window.location.search);
  const categoryID = searchParams.get("id");

  return categoryID;
}
