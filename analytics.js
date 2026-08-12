(function () {
  'use strict';

  if (window.IXAnalytics) return;

  var config = window.IX_ANALYTICS_CONFIG || {};
  var measurementId = String(config.measurementId || '').trim();
  var debugEvents = [];
  var observedSections = {};
  var progressMilestones = {};
  var initialized = false;

  function isConfigured() {
    return config.enabled !== false &&
      /^G-[A-Z0-9]+$/i.test(measurementId) &&
      measurementId.toUpperCase() !== 'G-XXXXXXXXXX';
  }

  function debugLog(message, payload) {
    if (!config.debug || !window.console) return;
    window.console.info('[ideaXplode Analytics] ' + message, payload || '');
  }

  function googleTag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  function sanitizeParameters(parameters) {
    var sanitized = {};

    Object.keys(parameters || {}).forEach(function (key) {
      var value = parameters[key];
      if (value === undefined || value === null || value === '') return;

      if (typeof value === 'string') {
        var limit = key === 'page_location' ? 1000 : (key === 'page_title' ? 300 : 100);
        sanitized[key] = value.slice(0, limit);
        return;
      }

      if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key] = value;
      }
    });

    return sanitized;
  }

  function track(eventName, parameters) {
    if (!/^[a-z][a-z0-9_]{0,39}$/.test(eventName)) {
      debugLog('Ignored invalid event name: ' + eventName);
      return;
    }

    var safeParameters = sanitizeParameters(parameters);
    if (config.debug) {
      debugEvents.push({ event: eventName, parameters: safeParameters });
      debugLog(eventName, safeParameters);
    }

    if (!isConfigured()) return;
    safeParameters.transport_type = 'beacon';
    if (config.debug) safeParameters.debug_mode = true;
    googleTag('event', eventName, safeParameters);
  }

  function trackPageView(overrides) {
    var body = document.body;
    var parameters = {
      page_title: document.title,
      page_location: window.location.href,
      content_type: body && body.getAttribute('data-analytics-content-type'),
      content_name: body && body.getAttribute('data-analytics-content-name')
    };

    Object.keys(overrides || {}).forEach(function (key) {
      parameters[key] = overrides[key];
    });

    track('page_view', parameters);
  }

  function setConsent(granted) {
    var consentValue = granted ? 'granted' : 'denied';
    if (isConfigured()) {
      googleTag('consent', 'update', { analytics_storage: consentValue });
    }
    debugLog('Analytics consent updated to ' + consentValue);
  }

  function observeSections(definitions) {
    if (!('IntersectionObserver' in window)) return;

    var targets = [];
    (definitions || []).forEach(function (definition) {
      var element = document.querySelector(definition.selector);
      if (!element) return;
      element.__ixAnalyticsSection = definition;
      targets.push(element);
    });

    if (!targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var definition = entry.target.__ixAnalyticsSection;
        if (!definition || observedSections[definition.name]) return;

        observedSections[definition.name] = true;
        track('section_view', {
          section_name: definition.name,
          section_position: definition.position
        });
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0
    });

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function initContentProgressTracking() {
    var body = document.body;
    if (!body) return;

    var contentType = body.getAttribute('data-analytics-content-type');
    var contentName = body.getAttribute('data-analytics-content-name');
    if (!contentType || !contentName) return;

    var milestones = [25, 50, 75, 90];
    var ticking = false;

    function measureProgress() {
      ticking = false;
      var root = document.documentElement;
      var scrollTop = window.pageYOffset || root.scrollTop || 0;
      var scrollableHeight = Math.max(
        root.scrollHeight,
        document.body.scrollHeight
      ) - window.innerHeight;
      if (scrollableHeight <= 0) return;

      var percentage = Math.min(100, Math.round((scrollTop / scrollableHeight) * 100));
      milestones.forEach(function (milestone) {
        var milestoneKey = contentName + ':' + milestone;
        if (percentage < milestone || progressMilestones[milestoneKey]) return;

        progressMilestones[milestoneKey] = true;
        track('content_progress', {
          content_type: contentType,
          content_name: contentName,
          percent_scrolled: milestone
        });
      });
    }

    function queueMeasurement() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measureProgress);
    }

    window.addEventListener('scroll', queueMeasurement, { passive: true });
    window.addEventListener('resize', queueMeasurement, { passive: true });
    queueMeasurement();
  }

  function initDeclarativeTracking() {
    document.addEventListener('click', function (event) {
      var element = event.target.closest('[data-analytics-event]');
      if (!element) return;

      var parameters = {};
      Array.prototype.forEach.call(element.attributes, function (attribute) {
        var prefix = 'data-analytics-param-';
        if (attribute.name.indexOf(prefix) !== 0) return;
        parameters[attribute.name.slice(prefix.length)] = attribute.value;
      });

      track(element.getAttribute('data-analytics-event'), parameters);
    });
  }

  function initialize() {
    if (initialized) return;
    initialized = true;

    if (isConfigured()) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || googleTag;
      googleTag('consent', 'default', {
        analytics_storage: config.defaultConsent === 'denied' ? 'denied' : 'granted'
      });
      googleTag('js', new Date());
      googleTag('config', measurementId, { send_page_view: false });

      var tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
      document.head.appendChild(tag);
    } else {
      debugLog('Analytics disabled until a real GA4 Measurement ID replaces G-XXXXXXXXXX.');
    }

    initDeclarativeTracking();
    trackPageView();
    initContentProgressTracking();
  }

  window.IXAnalytics = {
    track: track,
    trackPageView: trackPageView,
    observeSections: observeSections,
    setConsent: setConsent,
    isConfigured: isConfigured,
    getDebugEvents: function () { return debugEvents.slice(); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
