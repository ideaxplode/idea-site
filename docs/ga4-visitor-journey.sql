-- Replace PROJECT_ID and DATASET_ID after linking GA4 to BigQuery.
-- Adjust the suffix range for the dates you want to inspect (YYYYMMDD).
WITH journey_events AS (
  SELECT
    PARSE_DATE('%Y%m%d', event_date) AS event_date,
    TIMESTAMP_MICROS(event_timestamp) AS event_time,
    user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS ga_session_id,
    event_name,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'interaction_id') AS interaction_id,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'interaction_label') AS interaction_label,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'interaction_category') AS interaction_category,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'interaction_context') AS interaction_context,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'interaction_location') AS interaction_location,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'interaction_action') AS interaction_action,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'origin_interaction_id') AS origin_interaction_id,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'origin_interaction_label') AS origin_interaction_label,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') AS page_location,
    COALESCE(collected_traffic_source.manual_source, traffic_source.source) AS source,
    COALESCE(collected_traffic_source.manual_medium, traffic_source.medium) AS medium,
    COALESCE(collected_traffic_source.manual_campaign_name, traffic_source.name) AS campaign,
    batch_page_id,
    batch_ordering_id,
    batch_event_index
  FROM `PROJECT_ID.DATASET_ID.events_*`
  WHERE _TABLE_SUFFIX BETWEEN '20260101' AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
)
SELECT *
FROM journey_events
ORDER BY
  user_pseudo_id,
  ga_session_id,
  event_time,
  batch_page_id,
  batch_ordering_id,
  batch_event_index;
