(function () {
  var RATHAN_LINKEDIN_URL = 'https://www.linkedin.com/in/rathan-xplode';
  window.__ixRathanLinkedInUrl = RATHAN_LINKEDIN_URL;
  var sectionMap = window.__ixSectionMap || {
    'About': 'groupAboutUs',
    'Technology': 'groupTechnology',
    'Methodology': 'groupMethodology',
    'Pricing': 'groupPricing',
    'Contact': 'groupContact',
    'How fast can you build?': 'groupFastDevelopment'
  };
  window.__ixSectionMap = sectionMap;

  function smoothTo(id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  window.__ixSmoothTo = smoothTo;

  function toOpaqueRgb(colorValue) {
    var rgba = colorValue.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)$/i);
    if (!rgba) return colorValue;
    return 'rgb(' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')';
  }

  function wireNavLinkHoverStates() {
    var navLabels = {
      'About': true,
      'Technology': true,
      'Methodology': true,
      'Pricing': true,
      'Contact': true
    };

    document.querySelectorAll('.clickable-element.bubble-element.Group').forEach(function (node) {
      if (node.closest('#groupFooter')) return;
      var labelNode = null;
      var iconNode = null;

      Array.prototype.forEach.call(node.children, function (child) {
        if (!labelNode && child.classList && child.classList.contains('Text')) labelNode = child;
        if (!iconNode && child.classList && child.classList.contains('Icon')) iconNode = child;
      });

      if (!labelNode || !iconNode) return;

      var label = (labelNode.textContent || '').trim();
      if (!navLabels[label]) return;

      var baseTextColor = window.getComputedStyle(labelNode).color;
      var hoverTextColor = toOpaqueRgb(baseTextColor);
      var baseIconOpacity = window.getComputedStyle(iconNode).opacity || '0';

      if (!labelNode.style.transition) {
        labelNode.style.transition = 'color 400ms';
      }

      function activate() {
        labelNode.style.color = hoverTextColor;
        iconNode.style.opacity = '1';
      }

      function deactivate() {
        labelNode.style.color = baseTextColor;
        iconNode.style.opacity = baseIconOpacity;
      }

      node.addEventListener('mouseenter', activate);
      node.addEventListener('mouseleave', deactivate);
      node.addEventListener('focusin', activate);
      node.addEventListener('focusout', deactivate);
    });
  }

  // Skip fallback auto-apply because Font Awesome is already loaded in this clone.
  // Applying fallback text here creates duplicate icons (e.g., in footer contact rows).
  wireNavLinkHoverStates();

  // Top-nav hover interaction: highlight text + show down-arrow icon.
  function initTopNavHoverState() {
    var hoverLabels = new Set(['About', 'Technology', 'Methodology', 'Pricing', 'Contact']);

    document.querySelectorAll('.clickable-element').forEach(function (node) {
      if (node.closest('#groupFooter')) return;
      var labelNode = node.querySelector('.bubble-element.Text');
      if (!labelNode) return;

      var label = (labelNode.textContent || '').trim();
      if (!hoverLabels.has(label)) return;

      var iconButton = node.querySelector('.bubble-element.Icon');
      if (!iconButton) return;

      function setActive(active) {
        labelNode.style.color = active
          ? 'rgba(var(--color_text_default_rgb), 1)'
          : 'rgba(var(--color_text_default_rgb), 0.7)';
        iconButton.style.opacity = active ? '1' : '0';
      }

      node.addEventListener('mouseenter', function () { setActive(true); });
      node.addEventListener('mouseleave', function () { setActive(false); });
      node.addEventListener('focusin', function () { setActive(true); });
      node.addEventListener('focusout', function () { setActive(false); });
    });
  }

  initTopNavHoverState();

  function initFounderLinkedInButton() {
    var founderLinkedInButton = document.querySelector('.baTaUaMz');
    if (!founderLinkedInButton) return;

    founderLinkedInButton.title = "Visit Rathan's LinkedIn profile";
    founderLinkedInButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(RATHAN_LINKEDIN_URL, '_blank', 'noopener');
    });
  }

  initFounderLinkedInButton();

  function initFooterLinksHoverState() {
    var footerHoverLabels = new Set(['About', 'Technology', 'Methodology', 'Pricing']);

    document.querySelectorAll('#groupFooter .clickable-element.bubble-element.Group').forEach(function (node) {
      var labelNode = node.querySelector('.bubble-element.Text');
      var iconButton = node.querySelector('.bubble-element.Icon');
      if (!labelNode || !iconButton) return;

      var label = (labelNode.textContent || '').trim();
      if (!footerHoverLabels.has(label)) return;

      function setActive(active) {
        labelNode.style.color = active
          ? 'var(--color_bTHUp_default)'
          : 'var(--color_primary_contrast_default)';
        iconButton.style.opacity = active ? '1' : '0';
      }

      node.addEventListener('mouseenter', function () { setActive(true); });
      node.addEventListener('mouseleave', function () { setActive(false); });
      node.addEventListener('focusin', function () { setActive(true); });
      node.addEventListener('focusout', function () { setActive(false); });
    });
  }

  initFooterLinksHoverState();

  function initTestimonialsCarousel() {
    var quoteNode = document.querySelector('.baTaUaPaP');
    var clientInfoNode = document.querySelector('.baTaUaPaV');
    var photoNode = document.querySelector('.baTaUaPb img');
    var storyWrapNode = document.querySelector('.baTaUaQaM');
    var linkedinBtn = document.querySelector('.baTaUaQaG');
    var prevBtn = document.querySelector('.baTaUaQaZ');
    var nextBtn = document.querySelector('.baTaUaQd');

    if (!quoteNode || !clientInfoNode || !photoNode || !storyWrapNode || !linkedinBtn || !prevBtn || !nextBtn) return;

    var testimonials = [
      {
        quote: "I have worked with numerous offshore software consultants but Rathan's team is at least 100 times better.",
        name: 'Philip Bradley',
        titleLines: ['CTO, Lencomms Inc.'],
        photo: './assets/images/ClientPhoto-1.jpg',
        linkedin: 'https://www.linkedin.com/in/bradleyphilip/'
      },
      {
        quote: 'The team is easy to work with and very responsive. We always knew what was happening with our project.',
        name: 'Silvaster',
        titleLines: ['CEO, OrgWare'],
        photo: './assets/images/ClientPhoto-4.jpg',
        linkedin: 'https://www.linkedin.com/in/silvaster'
      },
      {
        quote: 'The whole process was smooth. They really listened and built what we needed without overcomplicating it.',
        name: 'Parthiban',
        titleLines: ['Co-Founder & Head of Operations,', 'Verve VFX Studio'],
        photo: './assets/images/ClientPhoto-3.jpg',
        linkedin: 'https://www.linkedin.com/in/parthiban-r-858b357'
      },
      {
        quote: 'They took care of the technical side so we could focus on our business. That\'s what we wanted.',
        name: 'Chandran',
        titleLines: ['Director, India Operations, NTeli'],
        photo: './assets/images/ClientPhoto-5.jpg',
        linkedin: 'https://www.linkedin.com/in/chandrank'
      },
      {
        quote: 'ideaXplode built our MVP exactly as we imagined, and much faster than we thought possible.',
        name: 'Mathew',
        titleLines: ['MD, Concreon Technologies'],
        photo: './assets/images/ClientPhoto-2.jpg',
        linkedin: 'https://www.linkedin.com/in/mathew-joseph-798bb228/'
      },
      {
        quote: 'Even though it was just a small project, they treated it with full attention. We felt valued.',
        name: 'Britto Raj',
        titleLines: ['CEO, CS Housing'],
        photo: './assets/images/ClientPhoto-6.jpg',
        linkedin: 'https://www.linkedin.com/in/britto-raj'
      },
      {
        quote: 'We\'re a small team with no tech background. They handled everything and explained things in plain language.',
        name: 'Arulanandham',
        titleLines: ['Proprietor, Arull Cabs'],
        photo: './assets/images/ClientPhoto-7.jpg',
        linkedin: 'https://www.linkedin.com/in/arul-anantham'
      }
    ];

    var currentIndex = 0;
    var isAnimating = false;

    function renderCurrentStory() {
      var item = testimonials[currentIndex];
      quoteNode.innerHTML =
        '<font size="8"><font color="gray">&#10077;</font></font> ' +
        item.quote +
        ' <font size="8"><font color="gray">&#10078;</font></font>';

      clientInfoNode.innerHTML = '&mdash; <strong>' + item.name + '</strong><br>' + item.titleLines.join('<br>');
      photoNode.src = item.photo;
      photoNode.alt = item.name;
      linkedinBtn.title = 'Visit ' + item.name + '\'s LinkedIn profile';
      linkedinBtn.dataset.linkedinUrl = item.linkedin;
    }

    function moveStory(step) {
      if (isAnimating) return;
      isAnimating = true;

      var direction = step > 0 ? 1 : -1;
      var count = testimonials.length;
      var distance = 28;
      var durationMs = 320;

      storyWrapNode.style.transition = 'transform ' + durationMs + 'ms ease, opacity ' + durationMs + 'ms ease';
      storyWrapNode.style.willChange = 'transform, opacity';
      storyWrapNode.style.opacity = '1';
      storyWrapNode.style.transform = 'translateX(0px)';

      requestAnimationFrame(function () {
        storyWrapNode.style.opacity = '0';
        storyWrapNode.style.transform = 'translateX(' + (-direction * distance) + 'px)';
      });

      window.setTimeout(function () {
        currentIndex = (currentIndex + step + count) % count;
        renderCurrentStory();

        storyWrapNode.style.transition = 'none';
        storyWrapNode.style.opacity = '0';
        storyWrapNode.style.transform = 'translateX(' + (direction * distance) + 'px)';

        requestAnimationFrame(function () {
          storyWrapNode.style.transition = 'transform ' + durationMs + 'ms ease, opacity ' + durationMs + 'ms ease';
          storyWrapNode.style.opacity = '1';
          storyWrapNode.style.transform = 'translateX(0px)';
          window.setTimeout(function () {
            storyWrapNode.style.willChange = 'auto';
            isAnimating = false;
          }, durationMs);
        });
      }, durationMs);
    }

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      moveStory(-1);
    });

    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      moveStory(1);
    });

    linkedinBtn.addEventListener('click', function (e) {
      var url = linkedinBtn.dataset.linkedinUrl;
      if (!url) return;
      e.preventDefault();
      window.open(url, '_blank', 'noopener');
    });

    renderCurrentStory();
  }

  initTestimonialsCarousel();

  // Ensure footer section links stay white and are not affected by top-nav hover styles.
  document.querySelectorAll('#groupFooter .clickable-element .bubble-element.Text').forEach(function (labelNode) {
    var label = (labelNode.textContent || '').trim();
    if (label === 'About' || label === 'Technology' || label === 'Methodology' || label === 'Pricing') {
      labelNode.style.color = 'var(--color_primary_contrast_default)';
    }
  });

  // Footer quick-links: bind explicit section targets so clicks work reliably on all viewports/devices.
  function initFooterQuickLinksNavigation() {
    var footerTargets = [
      { selector: '#groupFooter .baTaUaHq', target: 'groupAboutUs' },
      { selector: '#groupFooter .baTaUaHw', target: 'groupTechnology' },
      { selector: '#groupFooter .baTaUaIaC', target: 'groupMethodology' },
      { selector: '#groupFooter .baTaUaIaI', target: 'groupPricing' }
    ];

    footerTargets.forEach(function (item) {
      var node = document.querySelector(item.selector);
      if (!node) return;

      function navigateFromFooterLink(e) {
        e.preventDefault();
        smoothTo(item.target);
      }

      node.addEventListener('click', navigateFromFooterLink);
      var iconBtn = node.querySelector('button');
      if (iconBtn) iconBtn.addEventListener('click', navigateFromFooterLink);
    });
  }

  initFooterQuickLinksNavigation();

  // Bubble workflows are absent in standalone mode, so wire nav/CTA clicks by visible label.
  document.querySelectorAll('.clickable-element').forEach(function (node) {
    var labelNode = node.querySelector('.label-item, .bubble-element.Text');
    if (!labelNode) return;
    var text = (labelNode.textContent || '').trim();
    var target = sectionMap[text];
    if (!target) return;

    node.addEventListener('click', function (e) {
      e.preventDefault();
      smoothTo(target);
    });
  });

  // Accordion-like expand/collapse for groups that were previously controlled by Bubble workflows.
  function getAccordionLabelNode(trigger) {
    return trigger.querySelector('.label-item, .bubble-element.Text');
  }

  function getAccordionIconNode(trigger) {
    return trigger.querySelector('.material-symbols-rounded');
  }

  function getReferenceTextColor(group) {
    var parent = group.parentElement;
    if (!parent) return '';
    var children = Array.prototype.slice.call(parent.children);
    var idx = children.indexOf(group);
    for (var i = idx - 1; i >= 0; i--) {
      var el = children[i];
      if (el.classList && el.classList.contains('Text')) {
        return window.getComputedStyle(el).color;
      }
    }
    return '';
  }

  function getDirectContentTexts(group, trigger) {
    return Array.prototype.filter.call(group.children, function (el) {
      if (el === trigger) return false;
      return el.classList && el.classList.contains('Text');
    });
  }

  function refreshOpenAncestors(group) {
    var current = group.parentElement;
    while (current) {
      if (current.classList && current.classList.contains('no-scrolling') && current.dataset.expanded === 'true') {
        current.style.maxHeight = 'none';
      }
      current = current.parentElement;
    }
  }

  document.querySelectorAll('.no-scrolling').forEach(function (group) {
    var trigger = group.querySelector(':scope > .clickable-element') || group.querySelector('.clickable-element');
    if (!trigger) return;

    var labelNode = getAccordionLabelNode(trigger);
    var iconNode = getAccordionIconNode(trigger);
    var referenceColor = getReferenceTextColor(group);
    var collapsedMax = group.style.maxHeight || '36px';
    var directTexts = getDirectContentTexts(group, trigger);
    var triggerBaseBg = window.getComputedStyle(trigger).backgroundColor || '';

    group.dataset.expanded = 'false';
    group.dataset.collapsedMax = collapsedMax;
    if (labelNode) {
      group.dataset.baseLabel = (labelNode.textContent || '').trim();
    }

    directTexts.forEach(function (t) {
      t.style.opacity = '0.2';
      if (referenceColor) t.style.color = referenceColor;
    });

    group.__ixAccordion = {
      trigger: trigger,
      labelNode: labelNode,
      iconNode: iconNode,
      referenceColor: referenceColor,
      directTexts: directTexts,
      triggerBaseBg: triggerBaseBg
    };

    trigger.classList.add('ix-accordion-trigger');
    if (iconNode) {
      iconNode.classList.add('ix-accordion-icon');
    }
    trigger.__ixAccordionGroup = group;

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleAccordionGroup(group);
    });
  });

  function toggleAccordionGroup(group) {
    if (!group || !group.__ixAccordion) return;

    var meta = group.__ixAccordion;
    var isOpen = group.dataset.expanded === 'true';
    if (group.dataset.animating === 'true') return;
    group.dataset.animating = 'true';

    function finishTransition(expanded) {
      if (expanded) {
        group.style.maxHeight = 'none';
      }
      group.dataset.animating = 'false';
    }

    if (isOpen) {
      var currentOpenHeight = group.scrollHeight;
      group.style.maxHeight = currentOpenHeight + 'px';
      void group.offsetHeight;
      group.style.maxHeight = group.dataset.collapsedMax || '36px';
      group.dataset.expanded = 'false';
      meta.trigger.classList.remove('is-open');
      meta.trigger.setAttribute('aria-expanded', 'false');
      meta.trigger.style.backgroundColor = meta.triggerBaseBg;
      if (meta.labelNode) {
        meta.labelNode.textContent = group.dataset.baseLabel || 'Tell me more';
      }
      meta.directTexts.forEach(function (t) {
        t.style.opacity = '0.2';
        if (meta.referenceColor) t.style.color = meta.referenceColor;
      });

      window.setTimeout(function () {
        finishTransition(false);
      }, 520);
    } else {
      var expandedHeight = group.scrollHeight;
      group.style.maxHeight = expandedHeight + 'px';
      group.dataset.expanded = 'true';
      meta.trigger.classList.add('is-open');
      meta.trigger.setAttribute('aria-expanded', 'true');
      meta.trigger.style.backgroundColor = 'rgba(255, 255, 255, 1)';
      if (meta.labelNode) {
        meta.labelNode.textContent = 'Hide';
      }
      meta.directTexts.forEach(function (t) {
        t.style.opacity = '1';
        if (meta.referenceColor) t.style.color = meta.referenceColor;
      });

      window.setTimeout(function () {
        finishTransition(true);
      }, 520);
    }

    refreshOpenAncestors(group);
  }

})();

(function () {
  var RATHAN_LINKEDIN_URL = window.__ixRathanLinkedInUrl || 'https://www.linkedin.com/in/rathan-xplode';
  var sectionMap = window.__ixSectionMap || {};
  var smoothTo = window.__ixSmoothTo || function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  function hideTinyCornerArtifactsOnMobileTablet() {
    if (window.innerWidth > 1024) return;

    var vw = window.innerWidth || document.documentElement.clientWidth || 0;
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    if (!vw || !vh) return;

    var SAFE_SELECTOR = '#scrollTopBtn, #ixResponsiveMenuToggle, #ixResponsiveMenu, #ixWhatsAppModal, #ixEmailModal';

    document.querySelectorAll('body *').forEach(function (node) {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(SAFE_SELECTOR) || node.closest(SAFE_SELECTOR)) return;
      if (node.dataset.ixKeepTiny === 'true') return;

      var style = window.getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
      if (style.position !== 'fixed') return;

      var rect = node.getBoundingClientRect();
      var isSmall = rect.width > 0 && rect.height > 0 && rect.width <= 42 && rect.height <= 42;
      var nearRightEdge = rect.right >= vw - 44;
      var nearBottomEdge = rect.bottom >= vh - 44;
      if (!isSmall || !nearRightEdge || !nearBottomEdge) return;

      node.style.setProperty('display', 'none', 'important');
      node.style.setProperty('visibility', 'hidden', 'important');
      node.style.setProperty('pointer-events', 'none', 'important');
      node.style.setProperty('border', '0', 'important');
      node.style.setProperty('outline', '0', 'important');
      node.style.setProperty('box-shadow', 'none', 'important');
      node.dataset.ixHiddenTinyCorner = 'true';
    });
  }

  function initTinyCornerArtifactGuard() {
    var rafId = 0;
    function run() {
      rafId = 0;
      hideTinyCornerArtifactsOnMobileTablet();
    }
    function queueRun() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(run);
    }

    queueRun();
    window.addEventListener('resize', queueRun, { passive: true });
    window.addEventListener('scroll', queueRun, { passive: true });
    document.addEventListener('click', queueRun, true);

    if (typeof MutationObserver === 'function') {
      var observer = new MutationObserver(function () {
        queueRun();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  function initScrollToTopButton() {
    var btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    function getActiveScrollY(event) {
      var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (event && event.target && typeof event.target.scrollTop === 'number') {
        y = Math.max(y, event.target.scrollTop);
      }
      return y;
    }

    function syncVisibility(event) {
      if (getActiveScrollY(event) > 180) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    btn.addEventListener('click', function (e) {
      e.preventDefault();

      function prefersReducedMotion() {
        return typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }

      var behavior = prefersReducedMotion() ? 'auto' : 'smooth';

      // Scroll the primary page root smoothly first.
      try {
        window.scrollTo({ top: 0, left: 0, behavior: behavior });
      } catch (_) {
        window.scrollTo(0, 0);
      }

      var root = document.scrollingElement || document.documentElement || document.body;
      if (root && typeof root.scrollTo === 'function') {
        try {
          root.scrollTo({ top: 0, behavior: behavior });
        } catch (_) {
          root.scrollTop = 0;
        }
      }

      // Also reset any nested active scrollers (if present) with same behavior.
      Array.prototype.slice.call(document.querySelectorAll('*')).forEach(function (node) {
        if (!node || typeof node.scrollTop !== 'number') return;
        if (node.scrollTop <= 0) return;
        if (node.scrollHeight <= node.clientHeight) return;
        if (typeof node.scrollTo === 'function') {
          try {
            node.scrollTo({ top: 0, behavior: behavior });
          } catch (_) {
            node.scrollTop = 0;
          }
        } else {
          node.scrollTop = 0;
        }
      });
    });

    window.addEventListener('scroll', syncVisibility, { passive: true });
    document.addEventListener('scroll', syncVisibility, true);
    window.addEventListener('resize', syncVisibility, { passive: true });
    syncVisibility();
  }

  function initFooterYearAutoUpdate() {
    var footerCredit = document.querySelector('.baTaUaFa div');
    if (!footerCredit) return;

    var currentYear = new Date().getFullYear();
    footerCredit.textContent = footerCredit.textContent.replace(/\d{4}\s*$/, String(currentYear));
  }

  function initResponsiveMenu() {
    var headerRow = document.querySelector('.baTaSaSl');
    if (!headerRow) return;

    var navWrap = headerRow.querySelector('.baTaSaSq') || headerRow;
    if (!navWrap) return;

    var menuItems = [
      { label: 'About', icon: 'fa-building-o' },
      { label: 'Technology', icon: 'fa-rocket' },
    { label: 'Methodology', icon: 'fa-cogs' },
      { label: 'Pricing', icon: 'fa-usd' },
      { label: 'Contact', icon: 'fa-map-marker' }
    ];

    var toggleBtn = document.getElementById('ixResponsiveMenuToggle');
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.id = 'ixResponsiveMenuToggle';
      toggleBtn.type = 'button';
      toggleBtn.className = 'ix-responsive-menu-toggle';
      toggleBtn.setAttribute('aria-label', 'Open menu');
      toggleBtn.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
      navWrap.appendChild(toggleBtn);
    }

    var menu = document.getElementById('ixResponsiveMenu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'ixResponsiveMenu';
      menu.className = 'ix-responsive-menu';
      menu.innerHTML =
        '<div class="ix-responsive-menu-card">' +
          '<div class="ix-responsive-menu-links"></div>' +
          '<button type="button" class="ix-responsive-menu-chat"><i class="fa fa-whatsapp" aria-hidden="true"></i><span>Chat with Rathan</span></button>' +
        '</div>';
      document.body.appendChild(menu);
    }

    var linksWrap = menu.querySelector('.ix-responsive-menu-links');
    if (linksWrap && !linksWrap.children.length) {
      menuItems.forEach(function (item) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ix-responsive-menu-link';
        btn.innerHTML =
          '<span class="ix-responsive-menu-link-icon" aria-hidden="true"><i class="fa ' + item.icon + '"></i></span>' +
          '<span class="ix-responsive-menu-link-label">' + item.label + '</span>';
        btn.addEventListener('click', function () {
          closeMenu();
          window.requestAnimationFrame(function () {
            smoothTo(sectionMap[item.label]);
          });
        });
        linksWrap.appendChild(btn);
      });
    }

    var chatBtn = menu.querySelector('.ix-responsive-menu-chat');

    function isMobileOrTablet() {
      return window.innerWidth <= 1024;
    }

    function openMenu() {
      if (!isMobileOrTablet()) return;
      menu.classList.add('is-open');
      document.body.classList.add('ix-menu-open');
      toggleBtn.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
      toggleBtn.setAttribute('aria-label', 'Close menu');
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      document.body.classList.remove('ix-menu-open');
      toggleBtn.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
      toggleBtn.setAttribute('aria-label', 'Open menu');
    }

    toggleBtn.addEventListener('click', function () {
      if (!isMobileOrTablet()) return;
      if (menu.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    menu.addEventListener('click', function (e) {
      if (e.target === menu) closeMenu();
    });

    if (chatBtn) {
      chatBtn.addEventListener('click', function () {
        var trigger = document.querySelector('.baTaSaTaB');
        if (trigger) trigger.click();
        closeMenu();
      });
    }

    window.addEventListener('resize', function () {
      if (!isMobileOrTablet()) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  function initClientBrandLogoLinks() {
    var brandUrlsByTitle = {
      concreon: 'https://concreon.com/',
      'verve vfx studio': 'https://www.vervevfxstudio.com/',
      'bibles for america': 'https://biblesforamerica.org/',
      nteli: 'https://nteligroup.com/',
      'jks infotech': 'https://www.jksinfotech.in/',
      orgware: 'https://orgware.in/',
      orgwave: 'https://orgware.in/'
    };

    document.querySelectorAll('#clientLogosContainer .baTaSdaV').forEach(function (logoNode) {
      var brandTitle = (logoNode.getAttribute('title') || '').trim().toLowerCase();
      var logoImg = logoNode.querySelector('img');
      var logoSrc = logoImg ? (logoImg.getAttribute('src') || '').toLowerCase() : '';
      var targetUrl = brandUrlsByTitle[brandTitle];

      // Fallback to image filename so logo click still works even if title differs.
      if (!targetUrl && logoSrc.indexOf('clientbrand4') !== -1) {
        targetUrl = 'https://orgware.in/';
      }
      if (!targetUrl) return;

      logoNode.setAttribute('role', 'link');
      if (!logoNode.hasAttribute('tabindex')) {
        logoNode.setAttribute('tabindex', '0');
      }

      function openBrandSite(event) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        window.open(targetUrl, '_blank', 'noopener');
      }

      logoNode.addEventListener('click', openBrandSite);
      logoNode.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          openBrandSite(event);
        }
      });
    });
  }

  function initMethodologyButtonMobileLabel() {
    var labelNode = document.querySelector('.baTaUaJaE .label-item');
    if (!labelNode) return;

    var isMobilePortrait = window.matchMedia('(max-width: 900px) and (orientation: portrait)');
    var isMobileLandscape = window.matchMedia('(max-width: 900px) and (orientation: landscape)');
    var mobileLabel = 'Learn about methodology';

    if (!labelNode.dataset.originalLabel) {
      labelNode.dataset.originalLabel = (labelNode.textContent || '').trim() || 'Learn more about methodology';
    }

    function applyLabelByViewport() {
      var useMobileLabel = isMobilePortrait.matches || isMobileLandscape.matches;
      labelNode.textContent = useMobileLabel ? mobileLabel : labelNode.dataset.originalLabel;
    }

    applyLabelByViewport();
    window.addEventListener('resize', applyLabelByViewport);
    window.addEventListener('orientationchange', applyLabelByViewport);
  }

  function buildWhatsAppModal() {
    if (document.getElementById('ixWhatsAppModal')) return;

    var modal = document.createElement('div');
    modal.id = 'ixWhatsAppModal';
    modal.className = 'ix-modal-overlay';
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML =
      '<div class="ix-modal" role="dialog" aria-modal="true" aria-labelledby="ixModalTitle">' +
        '<button type="button" class="ix-modal-close" aria-label="Close"><i class="fa fa-times"></i></button>' +
        '<div class="ix-modal-header">' +
          '<span class="ix-modal-icon" aria-hidden="true"><i class="fa fa-whatsapp"></i></span>' +
          '<h3 id="ixModalTitle">Chat with Rathan through WhatsApp</h3>' +
        '</div>' +
        '<div class="ix-modal-subhead">' +
          '<p class="ix-modal-copy">You can chat with Rathan, CEO of ideaXplode - he will personally respond to all your chats.</p>' +
          '<img class="ix-modal-avatar" src="./assets/images/Rathan&#39;s Profile Pic 3.png" alt="Rathan">' +
        '</div>' +
        '<textarea id="ixModalMessage" class="ix-modal-message" aria-label="WhatsApp message">Hi Rathan!</textarea>' +
        '<button type="button" class="ix-modal-cta">' +
          '<span class="ix-modal-cta-icon" aria-hidden="true"><i class="fa fa-paper-plane-o"></i></span>' +
          '<span>Send chat</span>' +
        '</button>' +
        '<button type="button" class="ix-modal-fallback">I don\'t use WhatsApp!</button>' +
      '</div>';

    document.body.appendChild(modal);
  }

  function buildEmailModal() {
    if (document.getElementById('ixEmailModal')) return;

    var modal = document.createElement('div');
    modal.id = 'ixEmailModal';
    modal.className = 'ix-modal-overlay';
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML =
      '<div class="ix-modal ix-modal-email" role="dialog" aria-modal="true" aria-labelledby="ixEmailModalTitle">' +
        '<button type="button" class="ix-modal-close" aria-label="Close"><i class="fa fa-times"></i></button>' +
        '<div class="ix-modal-header">' +
          '<span class="ix-modal-icon" aria-hidden="true"><i class="fa fa-envelope-o"></i></span>' +
          '<h3 id="ixEmailModalTitle">Email Rathan</h3>' +
        '</div>' +
        '<div class="ix-modal-subhead">' +
          '<div>' +
            '<p class="ix-modal-copy">You can email Rathan, CEO of ideaXplode &mdash; he will personally respond to all your emails.</p>' +
          '</div>' +
          '<img class="ix-modal-avatar" src="./assets/images/Rathan&#39;s Profile Pic 3.png" alt="Rathan">' +
        '</div>' +
        '<textarea id="ixEmailMessage" class="ix-modal-message" aria-label="Email message">Hi Rathan!</textarea>' +
        '<button type="button" class="ix-modal-cta">' +
          '<span class="ix-modal-cta-icon" aria-hidden="true"><i class="fa fa-envelope-o"></i></span>' +
          '<span>Send email</span>' +
        '</button>' +
        '<button type="button" class="ix-modal-fallback ix-modal-backlink">&larr; Switch back to WhatsApp</button>' +
        '<div class="ix-modal-footer">' +
          '<a class="ix-modal-footer-link" href="' + RATHAN_LINKEDIN_URL + '" target="_blank" rel="noopener">' +
            '<span class="ix-modal-footer-icon" aria-hidden="true"><i class="fa fa-linkedin-square"></i></span>' +
            '<span>Connect through LinkedIn <span aria-hidden="true">&#8599;</span></span>' +
          '</a>' +
          '<a class="ix-modal-footer-text ix-modal-footer-email" href="mailto:rathan@ideaxplode.com">Or, simply email to rathan@ideaxplode.com</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);
  }

  function initWhatsAppModal() {
    buildWhatsAppModal();
    buildEmailModal();

    var modal = document.getElementById('ixWhatsAppModal');
    var emailModal = document.getElementById('ixEmailModal');
    var messageNode = modal.querySelector('#ixModalMessage');
    var closeBtn = modal.querySelector('.ix-modal-close');
    var ctaBtn = modal.querySelector('.ix-modal-cta');
    var fallbackBtn = modal.querySelector('.ix-modal-fallback');
    var emailCloseBtn = emailModal.querySelector('.ix-modal-close');
    var emailCtaBtn = emailModal.querySelector('.ix-modal-cta');
    var emailMessageNode = emailModal.querySelector('#ixEmailMessage');
    var emailBackBtn = emailModal.querySelector('.ix-modal-backlink');
    var activeMessage = 'Hi Rathan!';
    var whatsappNumber = '9962150600';
    var emailAddress = 'rathan@ideaxplode.com';
    var emailSubject = 'From ideaXplode website';
    var MODAL_ENTER_MS = 340;
    var MODAL_CLOSE_MS = 300;
    var MODAL_SWITCH_OUT_MS = 180;

    var triggerMap = [
      { selector: '.baTaSaTaB', message: 'Hi Rathan!' },
      { selector: '.baTaSoaB', message: 'Hey Rathan, I\'d like to take up the one-week challenge!' },
      { selector: '.baTaUlv', message: 'Hi Rathan, let\'s discuss the best tech choices for my app/idea.' },
      { selector: '.baTaUaJaE', message: 'Hi Rathan, tell me about your methodology -- Agentic Agile.' },
      { selector: '.baTaUaKq', message: 'Hi Rathan, let\'s discuss pricing.' },
      { selector: '.baTaUwt', message: 'Hi Rathan, please share the credentials for a demo app.' },
      { selector: '.baTaUyaO', message: 'Hi Rathan, I\'d like to sign an NDA before discussing my idea.' },
      { selector: '.baTaUyr', message: 'Hi Rathan, I\'d like to join the ideaXplode team. Please find my resume below..' }
    ];

    function syncBodyModalState() {
      var hasOpenModal = document.querySelector(
        '.ix-modal-overlay.is-open, .ix-modal-overlay.is-closing, .ix-modal-overlay.is-switching-out'
      );
      document.body.classList.toggle('ix-modal-open', !!hasOpenModal);
    }

    function clearModalState(targetModal) {
      if (!targetModal) return;
      if (targetModal.__ixCloseTimer) {
        window.clearTimeout(targetModal.__ixCloseTimer);
        targetModal.__ixCloseTimer = null;
      }
      if (targetModal.__ixEnterTimer) {
        window.clearTimeout(targetModal.__ixEnterTimer);
        targetModal.__ixEnterTimer = null;
      }
    }

    function showModal(targetModal, useEnterMotion) {
      if (!targetModal) return;
      clearModalState(targetModal);
      targetModal.classList.remove('is-closing');
      targetModal.classList.remove('is-switching-out');
      if (useEnterMotion) {
        targetModal.classList.remove('is-switching-in');
        void targetModal.offsetWidth;
        targetModal.classList.add('is-switching-in');
        targetModal.__ixEnterTimer = window.setTimeout(function () {
          targetModal.classList.remove('is-switching-in');
          targetModal.__ixEnterTimer = null;
        }, MODAL_ENTER_MS);
      }
      targetModal.classList.add('is-open');
      targetModal.setAttribute('aria-hidden', 'false');
      syncBodyModalState();
    }

    function closeModal(targetModal, options) {
      if (!targetModal) return;
      options = options || {};
      clearModalState(targetModal);
      targetModal.classList.remove('is-switching-in');
      targetModal.classList.remove('is-open');
      targetModal.classList.add(options.keepBackdrop ? 'is-switching-out' : 'is-closing');
      syncBodyModalState();

      targetModal.__ixCloseTimer = window.setTimeout(function () {
        targetModal.classList.remove('is-open');
        targetModal.classList.remove('is-closing');
        targetModal.classList.remove('is-switching-in');
        targetModal.classList.remove('is-switching-out');
        targetModal.setAttribute('aria-hidden', 'true');
        targetModal.__ixCloseTimer = null;
        syncBodyModalState();
      }, options.duration || MODAL_CLOSE_MS);
    }

    function openModal(message) {
      activeMessage = message || 'Hi Rathan!';
      messageNode.textContent = activeMessage;
      messageNode.value = activeMessage;
      showModal(modal, true);
    }

    function openEmailModal(message) {
      activeMessage = message || activeMessage || 'Hi Rathan!';
      emailMessageNode.textContent = activeMessage;
      emailMessageNode.value = activeMessage;
      showModal(emailModal, true);
    }

    function switchModal(fromModal, toModal, prepareNext) {
      if (!fromModal || !toModal) return;
      if (typeof prepareNext === 'function') prepareNext();

      closeModal(fromModal, {
        keepBackdrop: true,
        duration: MODAL_SWITCH_OUT_MS
      });

      window.setTimeout(function () {
        showModal(toModal, true);
      }, MODAL_SWITCH_OUT_MS - 10);
    }

    triggerMap.forEach(function (item) {
      document.querySelectorAll(item.selector).forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          openModal(item.message);
        });
      });
    });

    closeBtn.addEventListener('click', function () {
      closeModal(modal);
    });

    emailCloseBtn.addEventListener('click', function () {
      closeModal(emailModal);
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal(modal);
    });

    emailModal.addEventListener('click', function (e) {
      if (e.target === emailModal) closeModal(emailModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal(modal);
      }
      if (e.key === 'Escape' && emailModal.classList.contains('is-open')) {
        closeModal(emailModal);
      }
    });

    ctaBtn.addEventListener('click', function () {
      var finalMessage = (messageNode.value || activeMessage || '').trim();
      if (!finalMessage) finalMessage = activeMessage;
      var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(finalMessage);
      window.open(url, '_blank', 'noopener');
      closeModal(modal);
    });

    fallbackBtn.addEventListener('click', function () {
      var finalMessage = (messageNode.value || activeMessage || '').trim();
      if (!finalMessage) finalMessage = activeMessage;
      switchModal(modal, emailModal, function () {
        activeMessage = finalMessage;
        emailMessageNode.textContent = finalMessage;
        emailMessageNode.value = finalMessage;
      });
    });

    emailCtaBtn.addEventListener('click', function () {
      var body = (emailMessageNode.value || activeMessage || '').trim();
      var finalBody = body || activeMessage || 'Hi Rathan!';
      var gmailUrl =
        'https://mail.google.com/mail/?view=cm&fs=1' +
        '&to=' + encodeURIComponent(emailAddress) +
        '&su=' + encodeURIComponent(emailSubject) +
        '&body=' + encodeURIComponent(finalBody);
      var popup = window.open(gmailUrl, '_blank');
      if (popup) {
        popup.opener = null;
      } else {
        var mailtoUrl =
          'mailto:' + encodeURIComponent(emailAddress) +
          '?subject=' + encodeURIComponent(emailSubject) +
          '&body=' + encodeURIComponent(finalBody);
        window.open(mailtoUrl, '_blank');
      }
      closeModal(emailModal);
    });

    emailBackBtn.addEventListener('click', function () {
      var finalMessage = (emailMessageNode.value || activeMessage || '').trim();
      if (!finalMessage) finalMessage = activeMessage;
      switchModal(emailModal, modal, function () {
        activeMessage = finalMessage;
        messageNode.textContent = finalMessage;
        messageNode.value = finalMessage;
      });
    });
  }

  initScrollToTopButton();
  initFooterYearAutoUpdate();
  initClientBrandLogoLinks();
  initMethodologyButtonMobileLabel();
  initResponsiveMenu();
  initWhatsAppModal();
  initTinyCornerArtifactGuard();
})();
