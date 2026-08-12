# Google Analytics 4 integration

## Activate analytics

The site is fully instrumented, but collection is intentionally disabled while the placeholder
Measurement ID remains in `analytics-config.js`.

1. In Google Analytics, create or select an account named `ideaXplode Technologies`.
2. Create a GA4 property with:
   - Property name: `ideaXplode Website`
   - Reporting time zone: `India (GMT+05:30)`
   - Currency: `Indian Rupee (INR)`
3. Create a **Web** data stream with:
   - Website URL: `https://www.ideaxplode.com`
   - Stream name: `ideaXplode website`
   - Enhanced measurement: enabled
4. Copy the stream's **Measurement ID**. It starts with `G-`.
5. Replace `G-XXXXXXXXXX` in `analytics-config.js` with that Measurement ID.
6. Temporarily set `debug: true`, deploy, and exercise the tracked interactions.
7. Confirm the events and parameters in **Reports > Realtime** and **Admin > Data display > DebugView**.
8. Set `debug: false` after verification.

No API secret, service-account credential, or Google Tag Manager container is required for this
client-side integration. Never add a Google Analytics Data API credential to these public files.

## Event taxonomy

All event and parameter names use lower-case `snake_case`. Values are stable categorical labels;
message bodies, email text, and other visitor-provided content are deliberately excluded.

| Event | When it fires | Important parameters |
| --- | --- | --- |
| `page_view` | Every page load; sent manually to prevent duplicate views and support future client-side routing | `content_type`, `content_name`, plus GA's page title and location |
| `section_view` | The first time a major landing-page section reaches the reading area | `section_name`, `section_position` |
| `content_progress` | At 25%, 50%, 75%, and 90% scroll depth on a page or article | `content_type`, `content_name`, `percent_scrolled` |
| `navigation_click` | Header, responsive-menu, footer, article-home, section, and scroll-to-top navigation | `navigation_type`, `navigation_location`, `destination` |
| `menu_toggle` | Responsive navigation opens or closes | `menu_name`, `toggle_action`, `close_method` |
| `content_toggle` | A primary or nested information panel expands or collapses | `content_name`, `content_context`, `content_group`, `content_level`, `toggle_action` |
| `testimonial_view` | A visitor navigates to another testimonial | `testimonial_name`, `testimonial_position`, `navigation_direction` |
| `profile_link_click` | Founder or testimonial LinkedIn link is selected | `profile_type`, `profile_name`, `link_platform`, `link_location` |
| `client_website_click` | A linked client logo is selected | `client_name`, `link_location` |
| `cta_click` | A tracked business CTA opens the WhatsApp dialog | `cta_name`, `cta_location`, `cta_destination` |
| `modal_open` | The WhatsApp or email dialog opens, including switches between them | `modal_name`, `trigger_name`, `trigger_location` |
| `modal_close` | A dialog closes via its button, backdrop, or Escape key | `modal_name`, `close_method` |
| `form_start` | A visitor first edits the WhatsApp or email message field | `form_name`, `contact_method` |
| `contact_method_switch` | A visitor switches between WhatsApp and email | `from_method`, `to_method`, `cta_name` |
| `contact_link_click` | The LinkedIn alternative in the contact dialog is selected | `contact_method`, `link_location` |
| `generate_lead` | A WhatsApp message or email handoff is initiated | `lead_source`, `contact_method`, `cta_name`, `cta_location`, `message_customized` |

`generate_lead` is GA4's recommended lead event and should be the primary business key event.

## GA4 reporting configuration

### Key event

In **Admin > Data display > Events**, mark `generate_lead` as a key event. Use the default counting
method unless the business later needs one lead per session rather than every initiated contact.

### Custom dimensions

GA receives custom parameters immediately, but parameters must be registered as event-scoped custom
dimensions before they are convenient to use in standard reports and Explorations. In
**Admin > Data display > Custom definitions**, create event-scoped dimensions whose Event parameter
exactly matches each name below.

Recommended core dimensions:

- `content_type`
- `content_name`
- `section_name`
- `navigation_type`
- `navigation_location`
- `destination`
- `content_context`
- `content_group`
- `content_level`
- `toggle_action`
- `cta_name`
- `cta_location`
- `modal_name`
- `trigger_name`
- `trigger_location`
- `contact_method`
- `lead_source`
- `message_customized`
- `from_method`
- `to_method`
- `testimonial_name`
- `navigation_direction`
- `profile_type`
- `link_platform`
- `link_location`
- `client_name`
- `close_method`

Optional dimensions, useful for deeper UI analysis:

- `cta_destination`
- `profile_name`
- `form_name`
- `menu_name`

Create event-scoped custom metrics for these numeric parameters if charts need numeric aggregation:

- `section_position`
- `testimonial_position`
- `percent_scrolled`

Do not create custom definitions for page title, page location, page path, or other dimensions GA4
already provides.

## Suggested Explorations

- **Lead funnel:** `section_view` → `cta_click` → `modal_open` → `form_start` → `generate_lead`, broken down by `cta_name` and `contact_method`.
- **Content engagement:** `section_view` and `content_progress`, broken down by `content_name`.
- **Expandable content:** `content_toggle`, filtered to `toggle_action = expand`, broken down by `content_group`, `content_context`, and `content_name`.
- **Social proof:** `testimonial_view` followed by `profile_link_click`, broken down by `testimonial_name`.

## Architecture and future pages

- `analytics-config.js` contains environment configuration and the only value needed to activate GA4.
- `analytics.js` owns Google tag loading, parameter sanitization, consent updates, page views, declarative link tracking, section observation, and content-progress tracking.
- Feature code calls `window.IXAnalytics.track(...)`; it never calls `gtag` directly.
- New static pages should include both analytics scripts and add `data-analytics-content-type` and
  `data-analytics-content-name` to `<body>`.
- Declarative links can use `data-analytics-event` and `data-analytics-param-*` attributes, as the blog page does.
- A future client-side router must call `IXAnalytics.trackPageView()` after each completed route change.

## Consent and privacy

The current configuration uses `defaultConsent: 'granted'`, which matches a site that has determined
Analytics consent is not required for a visitor. If the site serves regions or visitors for whom
prior analytics consent is required, change it to `defaultConsent: 'denied'` and connect the consent
banner/CMP choice to:

```js
window.IXAnalytics.setConsent(true); // grant after opt-in
window.IXAnalytics.setConsent(false); // withdraw
```

The appropriate consent policy depends on the site's jurisdictions and legal/privacy policy; GA4
configuration alone does not replace that assessment.
