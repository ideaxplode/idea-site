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

(function () {
  var latestSection = document.querySelector('#latest');
  var latestLinks = document.querySelectorAll('a[href="#latest"]');
  var siteHeader = document.querySelector('.site-header');

  if (!latestSection || !latestLinks.length || !siteHeader) return;

  function getLatestScrollPosition() {
    var heading = latestSection.querySelector('.section-heading');
    var featuredStory = latestSection.querySelector('.featured-story');

    if (!heading || !featuredStory) return latestSection.offsetTop;

    var headerHeight = siteHeader.getBoundingClientRect().height;
    var headingTop = heading.getBoundingClientRect().top + window.scrollY;
    var storyBottom = featuredStory.getBoundingClientRect().bottom + window.scrollY;
    var contentHeight = storyBottom - headingTop;
    var availableHeight = window.innerHeight - headerHeight;
    var minimumGap = 16;
    var balancedGap = Math.max(minimumGap, (availableHeight - contentHeight) / 2);
    var targetPosition = headingTop - headerHeight - balancedGap;
    var maximumPosition = document.documentElement.scrollHeight - window.innerHeight;

    return Math.min(Math.max(0, targetPosition), maximumPosition);
  }

  function scrollToLatest(behavior) {
    window.scrollTo({
      top: getLatestScrollPosition(),
      behavior: behavior
    });
  }

  latestLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      event.preventDefault();

      if (window.location.hash !== '#latest') {
        window.history.pushState(null, '', '#latest');
      }

      scrollToLatest(prefersReducedMotion ? 'auto' : 'smooth');
    });
  });

  if (window.location.hash === '#latest') {
    window.addEventListener('load', function () {
      window.requestAnimationFrame(function () {
        scrollToLatest('auto');
      });
    });
  }
})();
