# Prompt for ChatGPT desktop Computer Use

Copy everything below into the ChatGPT desktop app while the Google Analytics tab is open.

---

You are operating my computer to configure Google Analytics 4 for the ideaXplode website. Use the
Google Analytics dashboard already open in Chrome and perform the configuration directly. Work
carefully, verify each saved item, and continue through all non-blocked steps without repeatedly
asking for confirmation.

## Goal and property

Configure the GA4 property connected to web Measurement ID `G-ZFGV1LD430` so that I can see exact
statistics for individual buttons and controls, aggregated visitor paths, contact funnels, and
anonymous user/device timelines.

Before changing anything:

1. Verify that the selected web data stream has Measurement ID `G-ZFGV1LD430` and website URL
   `https://www.ideaxplode.com`.
2. If the selected property does not contain that stream, stop and tell me which property and stream
   are open. Do not configure the wrong property.
3. Inventory existing custom definitions, key events, and Explorations. Reuse or rename correct
   existing items instead of creating duplicates.

## Naming and safety rules

- Use the plain display names specified below. Do not prefix anything with `IX`, `ix`,
  `ideaXplode`, or another namespace.
- Event parameter names must match the lower-case `snake_case` names exactly.
- If an existing custom definition has an `IX`-prefixed display name but the correct event parameter,
  edit only its display name to the plain name below.
- If an old definition uses the wrong parameter, create the correct definition. Do not delete the old
  one without asking me first.
- Do not delete or replace the property, data stream, collected events, reports, audiences, or links.
- Do not enable Google Signals, Ads personalization, User-provided data collection, or any advertising
  feature as part of this task.
- Do not create `ref_id`, email, phone, name, or person-level custom dimensions. Do not configure the
  shared-link `ref_id` as GA User-ID.
- Pause for me if login, 2FA, a billing agreement, a paid upgrade, a destructive action, or a new
  Google Cloud project is required.
- GA screens can change. If a menu label differs, use the equivalent current GA4 screen and report the
  difference at the end.

## 1. Verify the web stream

Open Admin and verify:

- Web stream URL: `https://www.ideaxplode.com`
- Measurement ID: `G-ZFGV1LD430`
- Enhanced measurement: enabled

Do not add another Google tag or create a second web stream.

## 2. Create or rename event-scoped custom dimensions

Open Admin → Data display → Custom definitions. Check quota information first. A standard property
has limited event-scoped custom-dimension slots, so do not make duplicates.

Create the following event-scoped custom dimensions. Use the left column as the display name and the
right column as the exact Event parameter. Descriptions may say what the parameter identifies.

### Core interaction dimensions

| Dimension name | Event parameter |
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

### Event-detail dimensions

| Dimension name | Event parameter |
| --- | --- |
| Content Type | `content_type` |
| Content Name | `content_name` |
| Section Name | `section_name` |
| Navigation Type | `navigation_type` |
| Navigation Location | `navigation_location` |
| Destination | `destination` |
| Content Context | `content_context` |
| Content Group | `content_group` |
| Content Level | `content_level` |
| Toggle Action | `toggle_action` |
| CTA Name | `cta_name` |
| CTA Location | `cta_location` |
| CTA Destination | `cta_destination` |
| Modal Name | `modal_name` |
| Trigger Name | `trigger_name` |
| Trigger Location | `trigger_location` |
| Contact Method | `contact_method` |
| Lead Source | `lead_source` |
| Message Customized | `message_customized` |
| From Method | `from_method` |
| To Method | `to_method` |
| Testimonial Name | `testimonial_name` |
| Navigation Direction | `navigation_direction` |
| Profile Type | `profile_type` |
| Profile Name | `profile_name` |
| Link Platform | `link_platform` |
| Link Location | `link_location` |
| Client Name | `client_name` |
| Close Method | `close_method` |
| Form Name | `form_name` |
| Menu Name | `menu_name` |

If quota is insufficient, prioritize the nine Core interaction dimensions, then CTA Name, CTA
Location, Contact Method, Lead Source, Testimonial Name, Toggle Action, Content Group, Content Level,
Close Method, and Navigation Direction. Report exactly which lower-priority definitions could not be
created. Do not delete existing definitions to free quota without my approval.

Do not create custom definitions for Event name, Page title, Page location, Page path, Session source,
Session medium, Session campaign, Event count, Total users, or Sessions because GA4 already provides
them.

## 3. Optional numeric custom metrics

If adequate custom-metric quota is available, create these event-scoped custom metrics with the
Standard measurement unit:

| Metric name | Event parameter |
| --- | --- |
| Section Position | `section_position` |
| Testimonial Position | `testimonial_position` |
| Percent Scrolled | `percent_scrolled` |

Do not create these as dimensions if custom metrics are supported on the current screen.

## 4. Configure the lead key event

In Admin → Data display → Events or Key events:

1. Find `generate_lead` and mark it as a key event.
2. Use the default counting method.
3. If `generate_lead` has not appeared yet, use the current GA4 mechanism to create/declare a key
   event named exactly `generate_lead` without creating a differently named event.
4. Do not mark every click, accordion expansion, or modal open as a key event.

## 5. Set Exploration data retention

Open Admin → Data collection and modification → Data retention, or the equivalent current location.
Set Event data retention to the maximum available duration for this standard property, normally
14 months. Keep “Reset user data on new activity” enabled unless it is already intentionally disabled.
Save the setting and report what was selected.

## 6. Create the Interaction Statistics exploration

Open Explore and create a blank Free-form exploration named **Interaction Statistics**.

Import these dimensions where available:

- Event name
- Interaction ID
- Interaction Label
- Interaction Category
- Interaction Context
- Interaction Location
- Interaction Action
- Interaction Level
- Origin Interaction ID
- Origin Interaction Label
- CTA Name
- CTA Location
- Contact Method
- Testimonial Name
- Session source / medium
- Device category

Import these metrics:

- Event count
- Total users
- Sessions

Create these tabs inside the exploration:

### Tab: All Interactions

- Technique: Free form
- Visualization: Table
- Rows, in order: Interaction Location, Interaction Context, Interaction Label, Interaction Action,
  Interaction ID
- Values: Event count, Total users, Sessions
- Sort by Event count descending
- Exclude `(not set)` Interaction ID if the filter is available

### Tab: CTA Performance

- Rows: Interaction Label, Interaction Location, Interaction ID
- Values: Event count, Total users, Sessions
- Filter: Interaction Category exactly matches `cta`
- Sort by Event count descending

Confirm that this tab will show the “How fast can you build?” CTA under Interaction ID
`hero_how_fast_can_you_build`. Its Event count is the exact number of tracked clicks, while Total
users is the number of distinct tracked users who clicked it.

### Tab: Content Expansions

- Rows: Interaction Context, Interaction Label, Interaction Level, Interaction ID
- Values: Event count, Total users, Sessions
- Filters:
  - Event name exactly matches `content_toggle`
  - Interaction Action exactly matches `expand`
- Sort by Event count descending

This table must make each repeated “What tools do you use?” control separately visible. In particular,
check that the design can display IDs such as:

- `technology_human_in_control_tools`
- `technology_secure_stable_scalable_tools`
- `offerings_web_apps_tools`
- `offerings_mobile_apps_tools`
- `offerings_ai_powered_apps_tools`
- `offerings_chat_bots_tools`
- `offerings_ai_agents_tools`
- `offerings_ai_models_tools`

### Tab: Testimonial Activity

- Rows: Interaction Label, Testimonial Name, Navigation Direction, Interaction ID
- Values: Event count, Total users, Sessions
- Filter: Event name exactly matches `testimonial_view`
- Sort by Event count descending

### Tab: Contact Actions

- Rows: Interaction Label, Interaction Action, Origin Interaction Label, Contact Method,
  Interaction ID
- Values: Event count, Total users, Sessions
- Include the relevant events `cta_click`, `modal_open`, `form_start`, `contact_method_switch`,
  `contact_link_click`, and `generate_lead`. If a single multi-value filter is awkward, use an
  Interaction Category filter for `cta`, `modal`, and `contact`, or leave this tab unfiltered and add
  Event name as its first row.

Do not add `IX` to the exploration or tab names.

## 7. Create contact funnels

Create a Funnel exploration named **Contact Funnel** with these ordered event steps:

1. `cta_click`
2. `modal_open`
3. `generate_lead`

Use an open funnel unless the interface strongly indicates a closed funnel is needed. Add Origin
Interaction Label as a breakdown if GA permits it. This shows which CTA originated completed WhatsApp
or email handoffs.

If practical, add a second tab named **Message Customization Funnel**:

1. `modal_open`
2. `form_start`
3. `generate_lead`

## 8. Create aggregate path analysis

Create a Path exploration named **Visitor Journey Paths**:

- Start with `page_view`.
- Use Event name as the node type.
- Use Event count as the initial metric.
- Add Session source / medium as a breakdown if the interface allows it.
- Keep the path exploration aggregate; do not claim it identifies a known human.

Custom parameters such as Interaction ID may be usable as filters or breakdowns but may not be
available as path-node types. Do not force or fabricate such a node type. The exact parameter-level
chronology will come from User Explorer event details and BigQuery.

## 9. Verify User Explorer availability

Open the User Explorer/User activity area and confirm that it can display a pseudonymous browser or
device timeline with event details. Do not create a `ref_id` user property or GA User-ID. Record the
current navigation path to User Explorer because Google sometimes moves this screen.

## 10. Prepare BigQuery export

In Admin → Product links → BigQuery links:

1. Check whether this GA4 property is already linked to a Google Cloud project.
2. If a valid existing project is linked, verify that Daily event export is enabled. Streaming export
   is optional and should remain disabled unless I explicitly request its additional cost/freshness.
3. Do not enable the separate user-data export for this task.
4. If no project is linked, navigate far enough to identify what project, permissions, location, or
   billing setup is required, then pause and ask me before creating a project, accepting billing, or
   finalizing a location choice.
5. Explain that GA4 BigQuery export does not backfill data collected before the link.

The repository contains a starter query named `docs/ga4-visitor-journey.sql` that will be configured
after the BigQuery dataset exists.

## 11. Validation

Custom definitions may require 24–48 hours after creation and new event collection before they become
reportable. Do not mistake an empty new report for a broken implementation.

If the updated website code is already deployed, use Realtime and DebugView to check representative
events and parameters, including:

- `navigation_click` with `interaction_id = hero_how_fast_can_you_build`
- `content_toggle` with different Interaction IDs for two repeated tools controls
- `testimonial_view`
- `cta_click`
- `modal_open`
- `generate_lead` only if a safe test handoff can be made without sending an unwanted real message

Do not send a real WhatsApp or email message merely to test the dashboard. If the new website code is
not deployed yet, skip live event validation and state that it is pending deployment.

## Completion report

When finished, provide a concise but complete report containing:

1. The verified property, stream name, website URL, and Measurement ID.
2. Every custom dimension/metric created, renamed, already present, or skipped.
3. Key-event status for `generate_lead`.
4. Each Exploration and tab created.
5. Data-retention status.
6. BigQuery link status and any exact blocker or decision needed from me.
7. Any step that could not be completed, with the current screen and reason.
8. Confirmation that no `ref_id`, PII dimension, User-ID, Ads personalization, or destructive change
   was introduced.

---
