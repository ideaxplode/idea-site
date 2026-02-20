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

  // Fallback icon pack for standalone mode (replaces missing Bubble sprite references).
  var iconPaths = {
    'arrow_back_ios': ['M15 6l-6 6 6 6'],
    'arrow_forward_ios': ['M9 6l6 6-6 6'],
    'fa-arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
    'fa-arrow-circle-down': ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18', 'M8 11l4 4 4-4'],
    'fa-arrow-circle-up': ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18', 'M8 13l4-4 4 4'],
    'keyboard_arrow_down': ['M6 9l6 6 6-6'],
    'fa-location-arrow': ['M3 11l18-8-8 18-2-7-8-3z'],
    'fa-rotate-left': ['M8 8H4v4', 'M4 12a8 8 0 1 0 2.3-5.7'],
    'fa-thumbs-up': ['M7 11h3v8H7z', 'M10 19h6.5a2 2 0 0 0 2-1.6l.8-4A2 2 0 0 0 17.3 11H14V7.5A1.5 1.5 0 0 0 12.5 6L10 11z'],
    'fa-user': ['M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7', 'M5 20a7 7 0 0 1 14 0'],
    'fa-user-circle-o': ['M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19', 'M12 12a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4', 'M6.6 18.6a6.8 6.8 0 0 1 10.8 0'],
    'fa-whatsapp': ['M12 3a8.8 8.8 0 0 0-7.7 13l-.8 3.6 3.7-1a8.8 8.8 0 1 0 4.8-15.6', 'M9 8.5c-.3 0-.7.1-.9.5-.4.6-1 1.7-1 3 0 1.9 1.4 3.8 3.3 4.9 1.6 1 3.1 1.3 4.3.7.8-.4 1.3-1.2 1.4-1.9 0-.2-.1-.3-.2-.4l-1.8-.9c-.2-.1-.4 0-.5.1l-.7.9c-.1.1-.3.2-.4.1-.6-.2-2.1-1.3-2.6-2.5-.1-.2 0-.3.1-.4l.6-.7c.1-.1.2-.3.1-.5l-.8-1.8c-.1-.2-.3-.2-.5-.2z'],
    'fa-linkedin-square': ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8 10v7', 'M8 7.5h.01', 'M12 17v-4.2c0-1.3.8-2.3 2-2.3s2 1 2 2.3V17', 'M12 10v1.2'],
    'fa-balance-scale': ['M12 5v14', 'M6 7h12', 'M7 7l-3 5h6l-3-5z', 'M17 7l-3 5h6l-3-5z', 'M8 20h8'],
    'code': ['M8 8l-4 4 4 4', 'M16 8l4 4-4 4', 'M14 5l-4 14'],
    'code_off': ['M8 8l-4 4 4 4', 'M16 8l4 4-4 4', 'M14 5l-4 14', 'M4 4l16 16'],
    'rocket_launch': ['M6 14l4 4', 'M10 18l-4 2 2-4', 'M14 10l4 4', 'M13 11l6-6a3 3 0 0 0-4-4l-6 6', 'M9 15l-6 6'],
    'rocket-launch': ['M6 14l4 4', 'M10 18l-4 2 2-4', 'M14 10l4 4', 'M13 11l6-6a3 3 0 0 0-4-4l-6 6', 'M9 15l-6 6'],
    'lightbulb-filament': ['M9 18h6', 'M10 21h4', 'M12 3a6 6 0 0 0-3.7 10.7c.8.7 1.2 1.4 1.2 2.3h5c0-.9.4-1.6 1.2-2.3A6 6 0 0 0 12 3z', 'M10.5 14h3'],
    'sticky': ['M5 4h14v11l-5 5H5z', 'M14 20v-5h5'],
    'buildings': ['M4 20V8l4-2v14', 'M10 20V4l4-2v18', 'M16 20V10l4-2v12', 'M2 20h20'],
    'buildings-fill': ['M4 20V8l4-2v14', 'M10 20V4l4-2v18', 'M16 20V10l4-2v12', 'M2 20h20'],
    'globe2': ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18', 'M3 12h18', 'M12 3c2.8 2.5 2.8 15.5 0 18', 'M12 3c-2.8 2.5-2.8 15.5 0 18'],
    'apps': ['M5 5h5v5H5z', 'M14 5h5v5h-5z', 'M5 14h5v5H5z', 'M14 14h5v5h-5z'],
    'phone_iphone': ['M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2', 'M11 6h2', 'M12 18h.01'],
    'feedback': ['M4 5h16v11H9l-5 4z'],
    'cursor': ['M4 3l13 7-6 2-2 6-5-15z'],
    'robot': ['M9 8h6a3 3 0 0 1 3 3v5H6v-5a3 3 0 0 1 3-3', 'M10 5h4', 'M12 3v2', 'M9.5 12h.01', 'M14.5 12h.01', 'M8 16v2', 'M16 16v2'],
    'password': ['M4 10h16v10H4z', 'M12 10V7a3 3 0 0 1 6 0v3', 'M9 15h.01', 'M12 15h.01', 'M15 15h.01'],
    'money-wavy': ['M3 9c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2', 'M3 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2'],
    'signature': ['M3 16c2-2 4-5 6-5 1.8 0 .6 4.5 2.5 4.5 1.7 0 3.1-2.5 4.6-2.5 1.1 0 1.5 1.2 2.4 1.2 1 0 1.7-.7 2.5-1.4', 'M3 20h18'],
    'test-tube': ['M9 3h6', 'M10 3v7l-4.3 6.4A3 3 0 0 0 8.2 21h7.6a3 3 0 0 0 2.5-4.6L14 10V3', 'M9.5 14h5'],
    'fa-linkedin': ['M8 10v7'],
    'fa-at': ['M14 10a2 2 0 1 0 0 4c.6 0 1-.3 1.4-.7V10', 'M17.5 12a5.5 5.5 0 1 1-2-4.2']
  };

  function applyIconFallbacks() {
    var uses = document.querySelectorAll('svg[data-icon-set] use[href], svg[data-icon-set] use[xlink\\:href]');
    uses.forEach(function (useNode) {
      var href = useNode.getAttribute('href') || useNode.getAttribute('xlink:href') || '';
      var iconId = '';
      if (href.indexOf('#') !== -1) {
        iconId = href.split('#')[1] || '';
      } else {
        iconId = href;
      }
      if (!iconId) return;

      var svg = useNode.closest('svg');
      if (!svg) return;

      var parts = iconPaths[iconId] || ['M4 12h16', 'M12 4v16'];
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.innerHTML = parts
        .map(function (d) {
          return '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>';
        })
        .join('');
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

  applyIconFallbacks();
  applyFaClassFallbacks();
  wireNavLinkHoverStates();

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
