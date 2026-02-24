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

  function smoothTo(id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

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
