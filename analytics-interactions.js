(function () {
  'use strict';

  var analytics = window.IXAnalytics;
  if (!analytics || !analytics.registerInteractions) return;

  var definitions = {};

  function define(id, label, category, context, location, level, action) {
    definitions[id] = {
      label: label,
      category: category,
      context: context,
      location: location,
      level: level,
      action: action
    };
  }

  var accordionByClass = {
    baTaStaB: ['technology_ai_native_engineering_details', 'Tell me more', 'AI-Native Engineering', 'technology', 'primary'],
    baTaTaTb: ['technology_ai_native_engineering_approaches', 'What are your approaches?', 'AI-Native Engineering', 'technology', 'nested'],
    baTaTaUaT: ['technology_product_thinking_details', 'Tell me more', 'Product Thinking', 'technology', 'primary'],
    baTaTaUd: ['technology_product_thinking_methods', 'What are your methods?', 'Product Thinking', 'technology', 'nested'],
    baTaTaVaP: ['technology_human_in_control_details', 'Tell me more', 'Human in Control', 'technology', 'primary'],
    baTaTaVaZ: ['technology_human_in_control_tools', 'What tools do you use?', 'Human in Control', 'technology', 'nested'],
    baTaTaWaL: ['technology_secure_stable_scalable_details', 'Tell me more', 'Secure, Stable & Scalable', 'technology', 'primary'],
    baTaTaWaV: ['technology_secure_stable_scalable_tools', 'What tools do you use?', 'Secure, Stable & Scalable', 'technology', 'nested'],
    baTaTaXaH: ['offerings_web_apps_tools', 'What tools do you use?', 'Web Apps', 'offerings', 'primary'],
    baTaTaYaD: ['offerings_mobile_apps_tools', 'What tools do you use?', 'Mobile Apps', 'offerings', 'primary'],
    baTaTaYf: ['offerings_ai_powered_apps_tools', 'What tools do you use?', 'AI-Powered Apps', 'offerings', 'primary'],
    baTaTaZaE: ['offerings_chat_bots_tools', 'What tools do you use?', 'Chat Bots', 'offerings', 'primary'],
    baTaUaBaY: ['offerings_ai_agents_tools', 'What tools do you use?', 'AI Agents', 'offerings', 'primary'],
    baTaUaCaN: ['offerings_ai_models_tools', 'What tools do you use?', 'AI Models', 'offerings', 'primary'],
    baTaTbaJ: ['methodology_build_fast_details', 'How?', 'We build fast', 'methodology', 'primary'],
    baTaTdaA: ['methodology_communicate_clearly_details', 'How?', 'We communicate clearly', 'methodology', 'primary'],
    baTaTde: ['methodology_responsive_details', 'How?', 'We are responsive', 'methodology', 'primary'],
    baTaTeaI: ['methodology_daily_updates_details', 'How?', 'We send daily updates', 'methodology', 'primary'],
    baTaTem: ['methodology_transparency_details', 'How?', 'We maintain transparency', 'methodology', 'primary'],
    baTaUvl: ['methodology_customer_success_details', 'How?', 'We care about your success', 'methodology', 'primary'],
    baTaUcd: ['about_product_engineering_definition', 'What is product engineering?', 'Product Engineering', 'about', 'primary'],
    baTaUdaJ: ['about_product_engineering_value', 'Why is it most valuable now?', 'Product Engineering', 'about', 'nested']
  };

  Object.keys(accordionByClass).forEach(function (className) {
    var item = accordionByClass[className];
    define(item[0], item[1], 'content', item[2], item[3], item[4]);
  });

  ['about', 'technology', 'methodology', 'pricing', 'contact'].forEach(function (destination) {
    var label = destination.charAt(0).toUpperCase() + destination.slice(1);
    define('navigation_header_' + destination, label, 'navigation', 'primary_navigation', 'header');
    define('navigation_responsive_menu_' + destination, label, 'navigation', 'primary_navigation', 'responsive_menu');
    if (destination !== 'contact') {
      define('navigation_footer_' + destination, label, 'navigation', 'footer_navigation', 'footer');
    }
  });

  define('hero_how_fast_can_you_build', 'How fast can you build?', 'cta', 'hero', 'page_content');
  define('navigation_scroll_to_top', 'Scroll to top', 'navigation', 'page', 'floating_button');
  define('responsive_primary_menu', 'Primary navigation menu', 'menu', 'primary_navigation', 'header');

  define('about_founder_linkedin', "Rathan's LinkedIn profile", 'profile_link', 'Rathan', 'about');
  define('testimonials_previous', 'Previous testimonial', 'testimonial', 'testimonials', 'testimonials');
  define('testimonials_next', 'Next testimonial', 'testimonial', 'testimonials', 'testimonials');
  define('testimonials_client_linkedin', 'Client LinkedIn profile', 'profile_link', 'testimonials', 'testimonials');

  ['concreon', 'verve_vfx_studio', 'bibles_for_america', 'nteli', 'jks_infotech', 'neurify'].forEach(function (clientName) {
    define(
      'clients_' + clientName + '_website',
      clientName.replace(/_/g, ' ') + ' website',
      'external_link',
      clientName.replace(/_/g, ' '),
      'client_logos'
    );
  });

  var ctaByTrigger = {
    'chat_with_rathan|header': ['cta_header_chat_with_rathan', 'Chat with Rathan'],
    'chat_with_rathan|responsive_menu': ['cta_responsive_menu_chat_with_rathan', 'Chat with Rathan'],
    'one_week_challenge|fast_development': ['cta_fast_development_take_up_challenge', 'Take up the challenge'],
    'discuss_tech_choices|technology': ['cta_technology_discuss_tech_choices', 'Discuss tech choices'],
    'learn_about_methodology|methodology': ['cta_methodology_learn_more', 'Learn more about methodology'],
    'discuss_pricing|pricing': ['cta_pricing_discuss_pricing', 'Discuss about pricing'],
    'get_app_credentials|footer_cta': ['cta_footer_get_app_credentials', 'Get app credentials'],
    'sign_nda|footer_cta': ['cta_footer_sign_nda', 'Sign NDA'],
    'apply_to_join|footer_cta': ['cta_footer_apply_to_join', 'Apply to join']
  };

  Object.keys(ctaByTrigger).forEach(function (triggerKey) {
    var parts = triggerKey.split('|');
    var item = ctaByTrigger[triggerKey];
    define(item[0], item[1], 'cta', parts[0], parts[1], null, 'click');
  });

  define('contact_whatsapp_modal_open', 'WhatsApp contact dialog', 'modal', 'whatsapp', 'contact_dialog', null, 'open');
  define('contact_email_modal_open', 'Email contact dialog', 'modal', 'email', 'contact_dialog', null, 'open');
  define('contact_whatsapp_modal_close', 'Close WhatsApp contact dialog', 'modal', 'whatsapp', 'contact_dialog', null, 'close');
  define('contact_email_modal_close', 'Close email contact dialog', 'modal', 'email', 'contact_dialog', null, 'close');
  define('contact_whatsapp_message_edit', 'Edit WhatsApp message', 'contact', 'whatsapp', 'contact_dialog', null, 'start');
  define('contact_email_message_edit', 'Edit email message', 'contact', 'email', 'contact_dialog', null, 'start');
  define('contact_whatsapp_send', 'Send WhatsApp message', 'contact', 'whatsapp', 'contact_dialog', null, 'send');
  define('contact_email_send', 'Send email', 'contact', 'email', 'contact_dialog', null, 'send');
  define('contact_switch_whatsapp_to_email', "I don't use WhatsApp", 'contact', 'whatsapp_to_email', 'contact_dialog', null, 'switch');
  define('contact_switch_email_to_whatsapp', 'Switch back to WhatsApp', 'contact', 'email_to_whatsapp', 'contact_dialog', null, 'switch');
  define('contact_email_linkedin', 'Connect through LinkedIn', 'contact', 'linkedin', 'email_contact');
  define('contact_direct_email', 'Email Rathan directly', 'contact', 'email', 'email_contact');

  analytics.registerInteractions(definitions);

  window.IX_ANALYTICS_INTERACTION_MAPS = {
    accordionByClass: accordionByClass,
    ctaByTrigger: ctaByTrigger
  };
})();
