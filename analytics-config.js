(function () {
  // GA4 environment settings. No private credential belongs in this public file.
  window.IX_ANALYTICS_CONFIG = window.IX_ANALYTICS_CONFIG || {
    measurementId: 'G-ZFGV1LD430',
    enabled: true,
    debug: false,
    defaultConsent: 'granted',
    // Never send person-specific or contact identifiers in GA page URLs.
    sensitiveQueryParameters: ['ref_id', 'user_id', 'email', 'phone']
  };
})();
