# Google Analytics 4 integration

## Property and stream

The site sends analytics to GA4 Measurement ID `G-ZFGV1LD430` through `analytics-config.js`.
No API secret, service-account credential, or Google Tag Manager container is required. Never put a
Google Analytics Data API credential in these public files.

The expected GA4 configuration is:

- Account: `ideaXplode Technologies`
- Property: `ideaXplode Website`
- Time zone: India (GMT+05:30)
- Currency: Indian Rupee (INR)
- Web stream URL: `https://www.ideaxplode.com`
- Web stream name: `ideaXplode website`
- Enhanced measurement: enabled

For verification, temporarily set `debug: true`, deploy, exercise the interactions, confirm them in
DebugView, and then restore `debug: false`.

## Architecture

- `analytics-config.js` owns the Measurement ID, consent default, and query parameters that must be
  removed before GA initializes.
- `analytics.js` is the only file that talks to `gtag`. It loads GA, sanitizes parameters, registers
  interaction definitions, tracks page views, observes sections, and records scroll milestones.
- `analytics-interactions.js` is the central registry of landing-page controls and their permanent,
  human-readable identities.
- Feature code calls `IXAnalytics.trackInteraction(...)`; it never calls `gtag` directly.
- `blog/analytics.js` applies the same schema to blog navigation and article links.
- Every public page supplies `data-analytics-content-type` and `data-analytics-content-name` on its
  `<body>` and loads the shared analytics files.

New interactions should be registered once and then referenced by their stable `interaction_id`.
Renaming visible text should not change an existing ID unless the meaning of the control changes.

## Common interaction schema

Every meaningful UI interaction includes these parameters:

| Parameter | Purpose | Example |
| --- | --- | --- |
| `interaction_id` | Permanent, unique machine identifier | `technology_human_in_control_tools` |
| `interaction_label` | Clear visible or curated label | `What tools do you use?` |
| `interaction_category` | Broad behavior type | `content`, `cta`, `navigation`, `contact` |
| `interaction_context` | The subject affected by the action | `Human in Control` |
| `interaction_location` | Where the control appears | `technology` |
| `interaction_action` | What occurred | `click`, `expand`, `collapse`, `open`, `send` |
| `interaction_level` | Hierarchy where useful | `primary`, `nested` |

For example, `hero_how_fast_can_you_build` identifies the “How fast can you build?” CTA. Filtering
for this ID gives its exact Event count, Total users, and Sessions.

All 22 expandable controls have explicit IDs. This includes the repeated “What tools do you use?”
controls and the six formerly ambiguous Methodology “How?” controls. The complete registry is in
`analytics-interactions.js`.

## Event taxonomy

| Event | Meaning |
| --- | --- |
| `page_view` | Manual page view, including page content type and name |
| `section_view` | First view of a major landing-page section during a page load |
| `content_progress` | A 25%, 50%, 75%, or 90% page/article scroll milestone |
| `navigation_click` | Header, footer, responsive-menu, blog, section, or scroll-to-top navigation |
| `menu_toggle` | A responsive navigation menu opens or closes |
| `content_toggle` | A primary or nested information panel expands or collapses |
| `testimonial_view` | Previous/next testimonial navigation completes |
| `profile_link_click` | Founder or testimonial LinkedIn link is selected |
| `client_website_click` | A client logo link is selected |
| `cta_click` | A business CTA opens the contact journey |
| `modal_open` / `modal_close` | WhatsApp or email contact dialog changes state |
| `form_start` | The visitor first edits the WhatsApp or email message |
| `contact_method_switch` | The visitor switches between WhatsApp and email |
| `contact_link_click` | An alternative contact link is selected |
| `generate_lead` | A WhatsApp or email handoff is initiated |
| `share` | An article link is successfully copied |

Visitor-entered message bodies, email text, names, and contact details are deliberately excluded.
`generate_lead` should be the primary GA4 key event.

## GA4 custom definitions

Create event-scoped custom dimensions with these simple display names and exact event parameters:

| Display name | Event parameter |
| --- | --- |
| Interaction ID | `interaction_id` |
| Interaction Label | `interaction_label` |
| Interaction Category | `interaction_category` |
| Interaction Context | `interaction_context` |
| Interaction Location | `interaction_location` |
| Interaction Action | `interaction_action` |
| Interaction Level | `interaction_level` |
| Origin Interaction ID | `origin_interaction_id` |
| Origin Interaction Label | `origin_interaction_label` |

Also register the event-specific parameters needed for deeper reports: `content_type`,
`content_name`, `section_name`, `navigation_type`, `navigation_location`, `destination`,
`content_context`, `content_group`, `content_level`, `toggle_action`, `cta_name`, `cta_location`,
`cta_destination`, `modal_name`, `trigger_name`, `trigger_location`, `contact_method`, `lead_source`,
`message_customized`, `from_method`, `to_method`, `testimonial_name`, `navigation_direction`,
`profile_type`, `profile_name`, `link_platform`, `link_location`, `client_name`, `close_method`,
`form_name`, and `menu_name`.

Create event-scoped custom metrics for `section_position`, `testimonial_position`, and
`percent_scrolled` only if numeric charts require them. GA already provides Page title, Page location,
Page path, Event name, Event count, Total users, and Sessions.

## Recommended reports

Create an Exploration named **Interaction Statistics** with:

- Rows: Interaction Location, Interaction Context, Interaction Label, Interaction Action,
  Interaction ID
- Values: Event count, Total users, Sessions
- Optional filters: Event name or Interaction Category

Useful tabs are:

- **CTA Performance:** `interaction_category = cta`
- **Content Expansions:** `event_name = content_toggle` and `interaction_action = expand`
- **Testimonials:** `event_name = testimonial_view`
- **Contact Actions:** contact/modal events broken down by Interaction Label and CTA Name
- **Lead Funnel:** `cta_click` → `modal_open` → `form_start` → `generate_lead`

Path Exploration is useful for aggregate event paths. User Explorer provides a pseudonymous
browser/device timeline. Neither guarantees a known person's complete history across browsers,
devices, cookie deletion, consent refusal, or blocking software.

## BigQuery journey export

Enable the GA4 daily BigQuery export as soon as practical because it does not backfill earlier data.
`docs/ga4-visitor-journey.sql` is a starter query that orders anonymous journeys by pseudo-user,
session, timestamp, and GA batch-ordering fields. Replace its project and dataset placeholders after
the GA4 link creates the dataset. Keep raw user-level exports access-controlled.

## Acquisition links

Use UTMs for campaigns and channels, not individual people. Example:

```text
?utm_source=facebook&utm_medium=social&utm_campaign=product_engineering&utm_content=human_in_control
```

## Consent and person-specific privacy

`ref_id`, `user_id`, `email`, and `phone` query parameters are removed from the browser URL before GA
initializes. They are never retained or forwarded by this implementation. Do not register `ref_id`
as a GA custom dimension and never place a name, email address, phone number, or hashed contact value
in GA parameters or URLs.

A future known-person research journey requires a separate, first-party implementation with explicit
informed consent, an opaque random token, restricted access, and a retention/deletion policy. A future
authenticated application may use GA User-ID according to Google's policy; a shared referral link is
not an authenticated User-ID.

The current configuration uses `defaultConsent: 'granted'`. If prior opt-in is required for the
site's visitors, change it to `denied` and connect the consent banner/CMP to:

```js
window.IXAnalytics.setConsent(true);  // grant after opt-in
window.IXAnalytics.setConsent(false); // withdraw
```
