(function () {
  'use strict';

  if (window.IXAnalytics) return;

  var config = window.IX_ANALYTICS_CONFIG || {};
  var measurementId = String(config.measurementId || '').trim();
  var debugEvents = [];
  var interactionRegistry = {};
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

  function registerInteractions(definitions) {
    Object.keys(definitions || {}).forEach(function (interactionId) {
      var definition = definitions[interactionId] || {};
      if (!/^[a-z][a-z0-9_]{0,99}$/.test(interactionId)) {
        debugLog('Ignored invalid interaction ID: ' + interactionId);
        return;
      }

      interactionRegistry[interactionId] = {
        label: definition.label,
        category: definition.category,
        context: definition.context,
        location: definition.location,
        level: definition.level,
        action: definition.action
      };
    });
  }

  function trackInteraction(eventName, interactionId, parameters) {
    var definition = interactionRegistry[interactionId] || {};
    var enrichedParameters = {
      interaction_id: interactionId,
      interaction_label: definition.label,
      interaction_category: definition.category,
      interaction_context: definition.context,
      interaction_location: definition.location,
      interaction_level: definition.level,
      interaction_action: definition.action
    };

    Object.keys(parameters || {}).forEach(function (key) {
      enrichedParameters[key] = parameters[key];
    });

    if (!definition.label && !enrichedParameters.interaction_label) {
      debugLog('Unregistered interaction ID: ' + interactionId);
    }

    track(eventName, enrichedParameters);
  }

  function stripSensitiveQueryParameters() {
    if (!window.URL || !window.history || !window.history.replaceState) return;

    var sensitiveParameters = config.sensitiveQueryParameters || ['ref_id'];
    var currentUrl;
    var changed = false;

    try {
      currentUrl = new URL(window.location.href);
      var sensitiveNames = sensitiveParameters.map(function (parameterName) {
        return String(parameterName).toLowerCase();
      });
      Array.from(currentUrl.searchParams.keys()).forEach(function (parameterName) {
        if (sensitiveNames.indexOf(parameterName.toLowerCase()) === -1) return;
        currentUrl.searchParams.delete(parameterName);
        changed = true;
      });

      if (changed) {
        window.history.replaceState(
          window.history.state,
          document.title,
          currentUrl.pathname + currentUrl.search + currentUrl.hash
        );
        debugLog('Removed sensitive query parameters before analytics initialized.');
      }
    } catch (_) {
      debugLog('Could not sanitize the page URL.');
    }
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
        trackInteraction('section_view', 'section_' + definition.name + '_view', {
          interaction_label: definition.label || definition.name.replace(/_/g, ' '),
          interaction_category: 'section',
          interaction_context: 'page_content',
          interaction_location: definition.name,
          interaction_action: 'view',
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
        trackInteraction('content_progress', 'content_progress_' + milestone, {
          interaction_label: milestone + '% content progress',
          interaction_category: 'engagement',
          interaction_context: contentName,
          interaction_location: contentType,
          interaction_action: 'reach',
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

      var interactionId = element.getAttribute('data-analytics-interaction-id');
      if (interactionId) {
        trackInteraction(element.getAttribute('data-analytics-event'), interactionId, parameters);
      } else {
        track(element.getAttribute('data-analytics-event'), parameters);
      }
    });
  }

  function initialize() {
    if (initialized) return;
    initialized = true;

    // Query parameters reserved for first-party or consented research must never leak into GA URLs.
    stripSensitiveQueryParameters();

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
    trackInteraction: trackInteraction,
    registerInteractions: registerInteractions,
    trackPageView: trackPageView,
    observeSections: observeSections,
    setConsent: setConsent,
    isConfigured: isConfigured,
    getDebugEvents: function () { return debugEvents.slice(); },
    getRegisteredInteractions: function () {
      return Object.keys(interactionRegistry).reduce(function (copy, interactionId) {
        copy[interactionId] = Object.assign({}, interactionRegistry[interactionId]);
        return copy;
      }, {});
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
