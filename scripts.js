(function () {
  var sectionMap = {
    'About': 'groupAboutUs',
    'Technology': 'groupTechnology',
    'Methodology': 'groupMethodology',
    'Pricing': 'groupPricing',
    'Contact': 'groupContact',
    'How fast can you build?': 'groupFastDevelopment',
    'Learn more about methodology': 'groupMethodology',
    'Discuss tech choices': 'groupTechnology',
    'Discuss about pricing': 'groupPricing'
  };

  function readUseHref(useNode) {
    return useNode.getAttribute('href')
      || useNode.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
      || (useNode.href && useNode.href.baseVal)
      || '';
  }

  function hasSiblingUseIcon(useNode, iconId) {
    var group = useNode.closest('.bubble-r-container, .bubble-element.Group');
    if (!group) return false;
    return Array.prototype.some.call(group.querySelectorAll('use'), function (n) {
      var h = readUseHref(n);
      return h === '#' + iconId || h.split('#')[1] === iconId;
    });
  }

  function resolveFaIconClass(iconId) {
    var map = {
      'fa-arrow-circle-down': 'fa-arrow-circle-down',
      'fa-arrow-circle-up': 'fa-arrow-circle-up',
      'fa-arrow-right': 'fa-arrow-right',
      'fa-location-arrow': 'fa-location-arrow',
      'fa-rotate-left': 'fa-rotate-left',
      'fa-thumbs-up': 'fa-thumbs-up',
      'fa-user': 'fa-user',
      'fa-user-circle-o': 'fa-user-circle-o',
      'fa-whatsapp': 'fa-whatsapp',
      'fa-linkedin-square': 'fa-linkedin-square',
      'fa-balance-scale': 'fa-balance-scale',
      'fa-at': 'fa-at',
      'arrow_back_ios': 'fa-angle-left',
      'arrow_forward_ios': 'fa-angle-right',
      'keyboard_arrow_down': 'fa-angle-down',
      'rocket_launch': 'fa-rocket',
      'rocket-launch': 'fa-rocket',
      'code': 'fa-code',
      'code_off': 'fa-code',
      'lightbulb-filament': 'fa-lightbulb-o',
      'sticky': 'fa-sticky-note-o',
      'buildings': 'fa-building',
      'buildings-fill': 'fa-building',
      'globe2': 'fa-globe',
      'apps': 'fa-th',
      'phone_iphone': 'fa-mobile',
      'feedback': 'fa-commenting-o',
      'cursor': 'fa-mouse-pointer',
      'robot': 'fa-android',
      'password': 'fa-lock',
      'money-wavy': 'fa-money',
      'signature': 'fa-pencil',
      'test-tube': 'fa-flask'
    };
    return map[iconId] || 'fa-circle-o';
  }

  function resolveIconColor(iconId, useNode) {
    var map = {
      'fa-arrow-circle-down': '#616161',
      'fa-whatsapp': '#ffffff',
      'rocket_launch': '#DD369A',
      'fa-balance-scale': '#E21E1E',
      'money-wavy': '#0c9c35',
      'fa-thumbs-up': '#ffffff',
      'code_off': '#616161',
      'code': '#616161',
      'arrow_back_ios': '#616161',
      'arrow_forward_ios': '#616161',
      'robot': '#616161',
      'buildings-fill': '#616161',
      'globe2': '#616161',
      'phone_iphone': '#616161',
      'apps': '#616161',
      'cursor': '#616161',
      'lightbulb-filament': '#616161',
      'sticky': '#616161',
      'buildings': '#616161',
      'test-tube': '#616161',
      'rocket-launch': '#616161',
      'feedback': '#616161',
      'fa-rotate-left': '#616161',
      'fa-location-arrow': '#ffffff',
      'fa-linkedin-square': '#0a66c2',
      'signature': '#ffffff',
      'fa-user-circle-o': '#ffffff',
      'fa-user': '#814ba5'
    };

    var color = map[iconId] || '#616161';
    var svg = useNode.closest('svg');
    var host = svg ? (svg.closest('.icon-item, .bubble-element.Icon, button, a') || svg.parentElement || svg) : null;

    // Testimonial carousel arrows use lighter gray.
    if ((iconId === 'arrow_back_ios' || iconId === 'arrow_forward_ios') && host && host.tagName === 'BUTTON') {
      var style = host.getAttribute('style') || '';
      if (style.indexOf('border-radius: 100px') !== -1) {
        color = '#8c8c8c';
      }
    }

    // Footer LinkedIn icon is muted gray.
    if (iconId === 'fa-linkedin-square' && svg && svg.closest('#groupFooter')) {
      color = '#999999';
    }

    // Cards with both user + robot icons: robot should be pink.
    if (iconId === 'robot' && hasSiblingUseIcon(useNode, 'fa-user')) {
      color = '#c53d8f';
    }

    return color;
  }

  function convertSvgUseIconsToFontAwesome() {
    document.querySelectorAll('svg[data-icon-set] use').forEach(function (useNode) {
      var href = readUseHref(useNode);
      var iconId = href.indexOf('#') !== -1 ? href.split('#')[1] : href;
      if (!iconId) return;

      var svg = useNode.closest('svg');
      if (!svg) return;
      if (svg.dataset.ixConverted === 'true') return;

      var color = resolveIconColor(iconId, useNode);
      var faClass = resolveFaIconClass(iconId);

      var iconEl = document.createElement('i');
      iconEl.className = 'fa ' + faClass + ' ix-fa-icon';
      iconEl.setAttribute('aria-hidden', 'true');
      iconEl.setAttribute('data-ix-icon-id', iconId);
      iconEl.style.color = color;
      iconEl.style.width = '100%';
      iconEl.style.height = '100%';
      iconEl.style.display = 'inline-flex';
      iconEl.style.alignItems = 'center';
      iconEl.style.justifyContent = 'center';
      iconEl.style.lineHeight = '1';
      iconEl.style.fontSize = '100%';

      // Set size from the original svg box if available.
      var w = svg.clientWidth || 0;
      var h = svg.clientHeight || 0;
      var px = Math.max(w, h);
      if (px > 0) {
        iconEl.style.fontSize = px + 'px';
      } else {
        iconEl.style.fontSize = '20px';
      }

      svg.dataset.ixConverted = 'true';
      svg.replaceWith(iconEl);
    });
  }

  function applyFaClassFallbacks() {
    var faTextMap = {
      'fa-map-marker': '📍',
      'fa-envelope': '✉',
      'fa-at': '@',
      'fa-phone': '☎'
    };

    document.querySelectorAll('.fa').forEach(function (node) {
      var cls = '';
      Object.keys(faTextMap).forEach(function (key) {
        if (node.classList.contains(key)) cls = key;
      });
      if (!cls) return;
      node.textContent = faTextMap[cls] + ' ';
      node.style.display = 'inline-block';
      node.style.fontStyle = 'normal';
      node.style.fontWeight = '600';
      node.style.marginRight = '4px';
    });
  }

  function smoothTo(id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Convert inline svg icon placeholders to Font Awesome icons.
  convertSvgUseIconsToFontAwesome();
  window.addEventListener('load', convertSvgUseIconsToFontAwesome);
  setTimeout(convertSvgUseIconsToFontAwesome, 250);
  applyFaClassFallbacks();

  // Top-nav hover interaction: highlight text + show down-arrow icon.
  function initTopNavHoverState() {
    var hoverLabels = new Set(['About', 'Technology', 'Methodology', 'Pricing', 'Contact']);

    document.querySelectorAll('.clickable-element').forEach(function (node) {
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
  document.querySelectorAll('.no-scrolling').forEach(function (group) {
    var trigger = group.querySelector('.clickable-element');
    if (!trigger) return;

    group.dataset.expanded = 'false';

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = group.dataset.expanded === 'true';

      if (isOpen) {
        group.style.maxHeight = '36px';
        group.dataset.expanded = 'false';
        group.querySelectorAll('.bubble-element.Text').forEach(function (t, idx) {
          if (idx > 0) t.style.opacity = '0.2';
        });
      } else {
        group.style.maxHeight = group.scrollHeight + 'px';
        group.dataset.expanded = 'true';
        group.querySelectorAll('.bubble-element.Text').forEach(function (t, idx) {
          if (idx > 0) t.style.opacity = '1';
        });
      }
    });
  });
})();
