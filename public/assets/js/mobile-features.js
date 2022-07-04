//Show/hide nav bar
function toggleNavbar() {
  let nav = document.querySelector(".js-main-nav");

  if (null === nav) {
    return;
  }

  nav.classList.toggle("active");
}

//Show/hide search bar
function toggleHeaderSearchbar() {
  let searchBar = document.querySelector(".js-header-search");

  if (null === searchBar) {
    return;
  }

  searchBar.classList.toggle("active");
}

//Remove active state from header mobile elements
function removeActiveStateFromMobileElements() {
  const elements = [
    ".js-main-nav",
    ".js-header-search",
    ".js-toggle-header-search",
    ".js-toggle-main-nav",
  ];

  elements.forEach((element) => {
    let queryItem = document.querySelector(element + ".active");
    if (null !== queryItem) {
      queryItem.classList.remove("active");
    }
  });
}

//Close mobile header elements
document.addEventListener("click", (ev) => {
  let notHeader = ev.target.closest("header");
  if (null === notHeader) {
    removeActiveStateFromMobileElements();
  }
});

document.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape") {
    removeActiveStateFromMobileElements();
  }
});

//Handle search bar button click
document.addEventListener("click", (ev) => {
  let button = ev.target.closest(".js-toggle-header-search");
  if (null === button) {
    return;
  }

  removeActiveStateFromMobileElements();
  button.classList.toggle("active");
  toggleHeaderSearchbar();
});

//Handle nav bar button click
document.addEventListener("click", (ev) => {
  let button = ev.target.closest(".js-toggle-main-nav");
  if (null === button) {
    return;
  }

  removeActiveStateFromMobileElements();
  button.classList.toggle("active");
  toggleNavbar();
});
