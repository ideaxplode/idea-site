(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var navigation = document.querySelector('[data-navigation]');
  var problemExplorer = document.querySelector('[data-problem-explorer]');

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

  if (problemExplorer) {
    var tabs = Array.prototype.slice.call(problemExplorer.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(problemExplorer.querySelectorAll('[role="tabpanel"]'));

    function selectProblem(selectedTab) {
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

      if (window.IXAnalytics) {
        window.IXAnalytics.trackInteraction('select_content', 'smb_problem_' + selectedTab.dataset.problem, {
          interaction_label: selectedTab.textContent.trim(),
          interaction_category: 'problem_finder',
          interaction_context: 'business_pain_point',
          interaction_location: 'problem_finder',
          interaction_action: 'select'
        });
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { selectProblem(tab); });
      tab.addEventListener('keydown', function (event) {
        var nextIndex;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === undefined) return;

        event.preventDefault();
        tabs[nextIndex].focus();
        selectProblem(tabs[nextIndex]);
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
      smb_hero_find_problem: { label: 'Show me what AI could do', category: 'cta', context: 'hero', location: 'hero', action: 'click' },
      smb_problem_admin: { label: 'Repeated administration', category: 'problem_finder', context: 'business_pain_point', location: 'problem_finder', action: 'select' },
      smb_problem_followup: { label: 'Missed follow-up', category: 'problem_finder', context: 'business_pain_point', location: 'problem_finder', action: 'select' },
      smb_problem_answers: { label: 'Slow customer answers', category: 'problem_finder', context: 'business_pain_point', location: 'problem_finder', action: 'select' },
      smb_problem_information: { label: 'Scattered information', category: 'problem_finder', context: 'business_pain_point', location: 'problem_finder', action: 'select' },
      smb_problem_decisions: { label: 'Late business information', category: 'problem_finder', context: 'business_pain_point', location: 'problem_finder', action: 'select' },
      smb_founder_linkedin: { label: "Rathan's LinkedIn profile", category: 'profile_link', context: 'founder', location: 'small_team', action: 'click' },
      smb_final_whatsapp: { label: 'Send one pain point', category: 'cta', context: 'whatsapp', location: 'final_cta', action: 'click' },
      smb_final_email: { label: 'Email one business problem', category: 'cta', context: 'email', location: 'final_cta', action: 'click' }
    });

    analytics.observeSections([
      { selector: '#starting-point', name: 'smb_problem_finder', label: 'Business problem finder', position: 2 },
      { selector: '#possibilities', name: 'smb_ai_possibilities', label: 'What AI can do', position: 3 },
      { selector: '#how-we-help', name: 'smb_how_we_help', label: 'How ideaXplode helps', position: 5 },
      { selector: '#conversation', name: 'smb_conversation', label: 'Send one pain point', position: 8 }
    ]);
  }
})();
