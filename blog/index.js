(function () {
  var menuButton = document.querySelector('.menu-button');
  var navigation = document.querySelector('.primary-nav');

  if (!menuButton || !navigation) return;

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  menuButton.addEventListener('click', function () {
    var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 780) closeMenu();
  });
})();
