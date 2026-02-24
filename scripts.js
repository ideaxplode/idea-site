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

  function smoothTo(id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  // Ensure footer section links stay white and are not affected by top-nav hover styles.
  document.querySelectorAll('#groupFooter .clickable-element .bubble-element.Text').forEach(function (labelNode) {
    var label = (labelNode.textContent || '').trim();
    if (label === 'About' || label === 'Technology' || label === 'Methodology' || label === 'Pricing') {
      labelNode.style.color = 'var(--color_primary_contrast_default)';
    }
  });

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
    var referenceColor = getReferenceTextColor(group);
    var collapsedMax = group.style.maxHeight || '36px';
    var directTexts = getDirectContentTexts(group, trigger);

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
      referenceColor: referenceColor,
      directTexts: directTexts
    };

    trigger.classList.add('ix-accordion-trigger');
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

    if (isOpen) {
      group.style.maxHeight = group.dataset.collapsedMax || '36px';
      group.dataset.expanded = 'false';
      if (meta.labelNode) {
        meta.labelNode.textContent = group.dataset.baseLabel || 'Tell me more';
      }
      meta.directTexts.forEach(function (t) {
        t.style.opacity = '0.2';
        if (meta.referenceColor) t.style.color = meta.referenceColor;
      });
    } else {
      group.style.maxHeight = 'none';
      group.dataset.expanded = 'true';
      if (meta.labelNode) {
        meta.labelNode.textContent = 'Hide';
      }
      meta.directTexts.forEach(function (t) {
        t.style.opacity = '1';
        if (meta.referenceColor) t.style.color = meta.referenceColor;
      });
    }

    refreshOpenAncestors(group);
  }

})();
