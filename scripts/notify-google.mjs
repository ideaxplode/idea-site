#!/usr/bin/env node

import { createSign } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_PROPERTY = "sc-domain:ideaxplode.com";
const DEFAULT_SITEMAP = "https://www.ideaxplode.com/sitemap.xml";
const SEARCH_CONSOLE_SCOPE = "https://www.googleapis.com/auth/webmasters";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const REQUEST_TIMEOUT_MS = 20_000;
const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function printHelp() {
  console.log(`Usage:
  node scripts/notify-google.mjs --url <live-canonical-url> [options]

Options:
  --property <property>  Search Console property (default: ${DEFAULT_PROPERTY})
  --sitemap <url>       Public sitemap URL (default: ${DEFAULT_SITEMAP})
  --dry-run             Validate the live URL and sitemap without contacting the API
  --help                Show this help

Authentication:
  Set GOOGLE_APPLICATION_CREDENTIALS to a service-account JSON file stored outside
  this repository, or set GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN to a short-lived OAuth
  access token. The service account must have access to the Search Console property.

Environment overrides:
  GOOGLE_SEARCH_CONSOLE_SITE_URL
  GOOGLE_SEARCH_CONSOLE_SITEMAP_URL`);
}

function parseArguments(argumentsList) {
  const options = {
    property: process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || DEFAULT_PROPERTY,
    sitemap: process.env.GOOGLE_SEARCH_CONSOLE_SITEMAP_URL || DEFAULT_SITEMAP,
    dryRun: false,
    url: "",
  };

  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];

    if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else if (argument === "--dry-run") {
      options.dryRun = true;
    } else if (["--url", "--property", "--sitemap"].includes(argument)) {
      const value = argumentsList[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`${argument} requires a value.`);
      }
      options[argument.slice(2)] = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  return options;
}

function normalizeUrl(value, label) {
  let parsedUrl;

  try {
    parsedUrl = new URL(value);
  } catch {
    throw new Error(`${label} must be an absolute URL: ${value}`);
  }

  if (parsedUrl.protocol !== "https:") {
    throw new Error(`${label} must use HTTPS: ${value}`);
  }

  parsedUrl.hash = "";
  return parsedUrl;
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function normalizeComparableUrl(value) {
  const parsedUrl = new URL(value);
  parsedUrl.hash = "";
  return parsedUrl.href;
}

async function fetchWithTimeout(url, options = {}) {
  try {
    return await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds: ${url}`);
    }
    throw new Error(`Could not reach ${url}: ${error.message}`);
  }
}

async function validateLivePublication(targetUrl, sitemapUrl) {
  if (targetUrl.hostname !== sitemapUrl.hostname) {
    throw new Error("The affected URL and sitemap must use the same hostname.");
  }

  const pageResponse = await fetchWithTimeout(targetUrl, {
    headers: { "user-agent": "ideaXplode Search Console notifier" },
    redirect: "follow",
  });

  if (!pageResponse.ok) {
    throw new Error(`The affected URL is not live (HTTP ${pageResponse.status}): ${targetUrl.href}`);
  }

  if (normalizeComparableUrl(pageResponse.url) !== normalizeComparableUrl(targetUrl.href)) {
    throw new Error(`The affected URL redirects to ${pageResponse.url}; pass the final canonical URL instead.`);
  }

  const contentType = pageResponse.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    throw new Error(`The affected URL did not return HTML: ${targetUrl.href}`);
  }

  const pageHtml = await pageResponse.text();
  const canonicalTag = [...pageHtml.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => /\brel=["']canonical["']/i.test(tag));
  const canonicalHref = canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1];
  if (!canonicalHref) {
    throw new Error(`The affected page has no canonical link: ${targetUrl.href}`);
  }

  if (normalizeComparableUrl(canonicalHref) !== normalizeComparableUrl(targetUrl.href)) {
    throw new Error(`The page canonical does not match the affected URL (${canonicalHref}).`);
  }

  const sitemapResponse = await fetchWithTimeout(sitemapUrl, {
    headers: { "user-agent": "ideaXplode Search Console notifier" },
    redirect: "follow",
  });

  if (!sitemapResponse.ok) {
    throw new Error(`The sitemap is not live (HTTP ${sitemapResponse.status}): ${sitemapUrl.href}`);
  }

  const sitemapXml = await sitemapResponse.text();
  const entries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/gi)]
    .map((match) => {
      const location = match[1].match(/<loc>([\s\S]*?)<\/loc>/i);
      const lastModified = match[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/i);
      if (!location || !lastModified) return null;
      return {
        location: decodeXml(location[1].trim()),
        lastModified: lastModified[1].trim(),
      };
    })
    .filter(Boolean);
  const targetEntry = entries.find(
    (entry) => normalizeComparableUrl(entry.location) === normalizeComparableUrl(targetUrl.href),
  );

  if (!targetEntry) {
    throw new Error(`The affected URL is missing from the live sitemap: ${targetUrl.href}`);
  }

  if (!/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(targetEntry.lastModified)) {
    throw new Error(`The affected URL has an invalid sitemap <lastmod>: ${targetEntry.lastModified}`);
  }

  return targetEntry;
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

async function createServiceAccountAccessToken(credentialsPath) {
  const resolvedCredentialsPath = path.resolve(credentialsPath);
  const relativeCredentialsPath = path.relative(PROJECT_ROOT, resolvedCredentialsPath);
  const credentialsAreInRepository =
    relativeCredentialsPath === "" ||
    (!relativeCredentialsPath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativeCredentialsPath));

  if (credentialsAreInRepository) {
    throw new Error("Store Google service-account credentials outside this repository.");
  }

  let credentials;
  try {
    credentials = JSON.parse(await readFile(resolvedCredentialsPath, "utf8"));
  } catch (error) {
    throw new Error(`Could not read service-account credentials: ${error.message}`);
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("The service-account JSON must contain client_email and private_key.");
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
    ...(credentials.private_key_id ? { kid: credentials.private_key_id } : {}),
  };
  const claimSet = {
    iss: credentials.client_email,
    scope: SEARCH_CONSOLE_SCOPE,
    aud: credentials.token_uri || GOOGLE_TOKEN_URL,
    iat: issuedAt,
    exp: issuedAt + 3600,
  };
  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claimSet))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const assertion = `${unsignedToken}.${signer.sign(credentials.private_key).toString("base64url")}`;
  const tokenUrl = credentials.token_uri || GOOGLE_TOKEN_URL;
  const tokenResponse = await fetchWithTimeout(tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const tokenPayload = await tokenResponse.json().catch(() => ({}));

  if (!tokenResponse.ok || !tokenPayload.access_token) {
    const reason = tokenPayload.error_description || tokenPayload.error || `HTTP ${tokenResponse.status}`;
    throw new Error(`Google OAuth authentication failed: ${reason}`);
  }

  return tokenPayload.access_token;
}

async function getAccessToken() {
  const suppliedAccessToken = process.env.GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN?.trim();
  if (suppliedAccessToken) return suppliedAccessToken;

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (!credentialsPath) {
    throw new Error(
      "Authentication is required. Set GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN.",
    );
  }

  return createServiceAccountAccessToken(credentialsPath);
}

async function submitSitemap(property, sitemapUrl, accessToken) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(sitemapUrl.href)}`;
  const response = await fetchWithTimeout(endpoint, {
    method: "PUT",
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const responseText = await response.text();
    let reason = responseText;
    try {
      const errorPayload = JSON.parse(responseText);
      reason = errorPayload.error?.message || responseText;
    } catch {
      // Keep Google's plain-text response when it is not JSON.
    }
    throw new Error(
      `Search Console rejected the sitemap (HTTP ${response.status}): ${reason}\n` +
        "Confirm the property identifier and the service account's Search Console permission.",
    );
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  if (!options.url) {
    throw new Error("--url is required. Use --help for usage.");
  }

  const targetUrl = normalizeUrl(options.url, "Affected URL");
  const sitemapUrl = normalizeUrl(options.sitemap, "Sitemap URL");
  const sitemapEntry = await validateLivePublication(targetUrl, sitemapUrl);

  console.log(`Validated live page: ${targetUrl.href}`);
  console.log(`Validated sitemap entry: <lastmod>${sitemapEntry.lastModified}</lastmod>`);

  if (options.dryRun) {
    console.log("Dry run complete; Search Console was not contacted.");
    return;
  }

  const accessToken = await getAccessToken();
  await submitSitemap(options.property, sitemapUrl, accessToken);

  console.log(`Google Search Console accepted the sitemap for ${options.property}.`);
  console.log("This notifies Google of the sitemap update; crawling and indexing are not guaranteed or immediate.");
}

main().catch((error) => {
  console.error(`Google notification failed: ${error.message}`);
  process.exitCode = 1;
});
