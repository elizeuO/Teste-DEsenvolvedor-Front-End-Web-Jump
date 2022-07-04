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
