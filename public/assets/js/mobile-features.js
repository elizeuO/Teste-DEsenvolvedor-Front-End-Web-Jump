function toggleNavbar() {
  let nav = document.querySelector(".js-main-nav");

  if (null === nav) {
    return;
  }

  nav.classList.toggle("active");
}

function toggleHeaderSearchbar() {
    let searchBar = document.querySelector(".js-header-search");
  
    if (null === searchBar) {
      return;
    }
  
    searchBar.classList.toggle("active");
  }

  document.addEventListener("click", (ev) => {
    let button = ev.target.closest(".js-toggle-header-search");
    if (null === button) {
      return;
    }
  
    button.classList.toggle('active');
  
    toggleHeaderSearchbar();
  });

document.addEventListener("click", (ev) => {
  let button = ev.target.closest(".js-toggle-main-nav");
  if (null === button) {
    return;
  }

  button.classList.toggle('active');

  toggleNavbar();
});

function toogleSearchBar() {}
