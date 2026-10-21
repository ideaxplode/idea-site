(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var navigation = document.querySelector('[data-navigation]');
  var opportunityMap = document.querySelector('[data-opportunity-map]');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 14);
  }

  function closeMenu() {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', function () {
      var willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      navigation.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('nav-open', willOpen);
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  if (opportunityMap) {
    var tabs = Array.prototype.slice.call(opportunityMap.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(opportunityMap.querySelectorAll('[role="tabpanel"]'));

    function selectTab(selectedTab, focusPanel) {
      var panelId = selectedTab.getAttribute('aria-controls');

      tabs.forEach(function (tab) {
        var isSelected = tab === selectedTab;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.id !== panelId;
      });

      selectedTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      if (focusPanel) document.getElementById(panelId).focus();

      if (window.IXAnalytics) {
        window.IXAnalytics.trackInteraction('select_content', 'ai_opportunity_' + selectedTab.dataset.opportunity, {
          interaction_label: selectedTab.textContent.trim(),
          interaction_category: 'opportunity_map',
          interaction_context: 'business_function',
          interaction_location: 'opportunity_map',
          interaction_action: 'select'
        });
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { selectTab(tab, false); });
      tab.addEventListener('keydown', function (event) {
        var nextIndex;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === undefined) return;

        event.preventDefault();
        tabs[nextIndex].focus();
        selectTab(tabs[nextIndex], false);
      });
    });
  }

  var revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reveal-enabled');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealElements.forEach(function (element) { revealObserver.observe(element); });
  } else {
    revealElements.forEach(function (element) { element.classList.add('is-visible'); });
  }

  var analytics = window.IXAnalytics;
  if (analytics && analytics.registerInteractions) {
    analytics.registerInteractions({
      ai_hero_find_starting_point: { label: 'Find your starting point', category: 'cta', context: 'hero', location: 'hero', action: 'click' },
      ai_hero_talk_to_rathan: { label: 'Talk to Rathan', category: 'cta', context: 'whatsapp', location: 'hero', action: 'click' },
      ai_opportunity_marketing: { label: 'Marketing', category: 'opportunity_map', context: 'business_function', location: 'opportunity_map', action: 'select' },
      ai_opportunity_sales: { label: 'Sales', category: 'opportunity_map', context: 'business_function', location: 'opportunity_map', action: 'select' },
      ai_opportunity_service: { label: 'Customer service', category: 'opportunity_map', context: 'business_function', location: 'opportunity_map', action: 'select' },
      ai_opportunity_operations: { label: 'Operations', category: 'opportunity_map', context: 'business_function', location: 'opportunity_map', action: 'select' },
      ai_opportunity_decisions: { label: 'Business decisions', category: 'opportunity_map', context: 'business_function', location: 'opportunity_map', action: 'select' },
      ai_founder_linkedin: { label: "Rathan's LinkedIn profile", category: 'profile_link', context: 'founder', location: 'founder', action: 'click' },
      ai_final_whatsapp: { label: 'Start a conversation', category: 'cta', context: 'whatsapp', location: 'final_cta', action: 'click' },
      ai_final_email: { label: 'Email Rathan', category: 'cta', context: 'email', location: 'final_cta', action: 'click' }
    });

    analytics.observeSections([
      { selector: '#opportunity-map', name: 'ai_opportunity_map', label: 'AI opportunity map', position: 2 },
      { selector: '#approach', name: 'ai_approach', label: 'AI transformation approach', position: 3 },
      { selector: '#engagements', name: 'ai_engagements', label: 'Ways to work', position: 4 },
      { selector: '#conversation', name: 'ai_conversation', label: 'Start a conversation', position: 6 }
    ]);
  }
})();
