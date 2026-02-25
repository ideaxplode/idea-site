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
      referenceColor: referenceColor,
      directTexts: directTexts,
      triggerBaseBg: triggerBaseBg
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
