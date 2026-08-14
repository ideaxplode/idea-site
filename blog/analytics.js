(function () {
  'use strict';

  var analytics = window.IXAnalytics;
  if (!analytics || !analytics.trackInteraction) return;

  function identifier(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/^https?:\/\/[^/]+/i, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'unknown';
  }

  function linkLocation(link) {
    if (link.classList.contains('site-logo')) return 'header_logo';
    if (link.classList.contains('back-link')) return 'article_header';
    if (link.classList.contains('header-articles-link')) return 'blog_header';
    if (link.closest('.primary-nav, .article-nav')) return 'header_navigation';
    if (link.closest('.hero__actions')) return 'blog_hero';
    if (link.classList.contains('featured-story__media')) return 'featured_article_image';
    if (link.closest('.featured-story h3')) return 'featured_article_title';
    if (link.classList.contains('read-link')) return 'featured_article_button';
    if (link.classList.contains('insight-row__media')) return 'article_list_image';
    if (link.closest('.insight-row__content h3')) return 'article_list_title';
    if (link.classList.contains('insight-row__arrow')) return 'article_list_arrow';
    if (link.classList.contains('related-card__media')) return 'related_article_image';
    if (link.closest('.related-card h3')) return 'related_article_title';
    if (link.classList.contains('footer-related__card')) return 'footer_related_article';
    if (link.closest('.site-footer')) return 'footer_navigation';
    return 'page_content';
  }

  function linkLabel(link) {
    return (link.getAttribute('aria-label') || link.textContent || '')
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, 100) || 'Open link';
  }

  document.querySelectorAll('a[href]').forEach(function (link) {
    if (link.classList.contains('skip-link')) return;

    var href = link.getAttribute('href');
    if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) return;

    var location = linkLocation(link);
    var destination = identifier(href);
    var category = location.indexOf('article') !== -1 ? 'content' : 'navigation';
    if (location === 'blog_hero') category = 'cta';

    link.addEventListener('click', function () {
      analytics.trackInteraction(
        'navigation_click',
        'blog_' + location + '_' + destination,
        {
          interaction_label: linkLabel(link),
          interaction_category: category,
          interaction_context: document.body.getAttribute('data-analytics-content-name'),
          interaction_location: location,
          interaction_action: 'click',
          navigation_type: href.charAt(0) === '#' ? 'section' : 'internal_page',
          navigation_location: location,
          destination: destination
        }
      );
    });
  });
})();
