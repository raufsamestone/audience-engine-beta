const endpoint = "https://h6e152-3000.preview.csb.app/api/collect";

function getDeviceType() {
  return /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";
}

function getCurrentPagePath() {
  return window.location.pathname;
}

function getLanguage() {
  return window.navigator.language;
}

// Generate a random session token for each user session
function generateSessionToken() {
  const token = [];
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    token.push(
      possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
    );
  }
  return token.join("");
}
async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Generate a device fingerprint based on browser and device properties
function generateDeviceFingerprint() {
  const fingerprint = {
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    platform: window.navigator.platform,
    language: window.navigator.language,
  };
  const fingerprintString = JSON.stringify(fingerprint);
  const hash = sha256(fingerprintString);
  return hash;
}

// Generate a session ID based on IP, session token, and device fingerprint
function generateSessionId() {
  const sessionToken = generateSessionToken();
  const deviceFingerprint = generateDeviceFingerprint();
  const sessionId = sha256(sessionToken + deviceFingerprint);
  return sessionId;
}

const session_id = generateSessionId();

function getBrowser() {
  const userAgent = navigator.userAgent;
  let browser = "unknown";
  let version = "unknown";

  if (/firefox/i.test(userAgent)) {
    browser = "firefox";
    version = userAgent.match(/firefox\/(\d+)/i)[1];
  } else if (/chrome/i.test(userAgent)) {
    browser = "chrome";
    version = userAgent.match(/chrome\/(\d+)/i)[1];
  } else if (/safari/i.test(userAgent)) {
    browser = "safari";
    version = userAgent.match(/version\/(\d+)/i)[1];
  } else if (/trident/i.test(userAgent)) {
    browser = "ie";
    version = userAgent.match(/rv:(\d+)/i)[1];
  }

  return `${browser} ${version}`;
}

// Get the screen width and height
function getScreenSize() {
  const width = window.screen.width;
  const height = window.screen.height;
  return `${width} X ${height}`;
}

// Get the document referrer
function getReferrer() {
  return document.referrer;
}

// Track rage clicks
function trackRageClicks() {
  const MAX_CLICKS = 5;
  let clickCount = 5;
  let lastClickTime = 0;

  document.addEventListener("click", (event) => {
    const now = Date.now();
    if (now - lastClickTime < 1000) {
      clickCount++;
      if (clickCount >= MAX_CLICKS) {
        sendEvent("rage_click", { numClicks: clickCount });
        clickCount = 0;
      }
    } else {
      clickCount = 0;
    }
    lastClickTime = now;
  });
}

// Track dead clicks
function trackDeadClicks() {
  const MAX_DISTANCE = 5;

  document.addEventListener("click", (event) => {
    const elem = event.target;
    const rect = elem.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (
      x < -MAX_DISTANCE ||
      y < -MAX_DISTANCE ||
      x > rect.width + MAX_DISTANCE ||
      y > rect.height + MAX_DISTANCE
    ) {
      sendEvent("dead_click", {
        tag: elem.tagName,
        x: event.clientX,
        y: event.clientY,
      });
    }
  });
}

// Get UTM parameters
function getUTMParams() {
  const params = {};
  const url = new URL(window.location.href);

  for (let [key, value] of url.searchParams) {
    if (key.startsWith("utm_")) {
      params[key] = value;
    }
  }

  return params;
}

const pagePath = getCurrentPagePath();
const language = getLanguage();
const utmParams = getUTMParams();
const screen = getScreenSize();
const referrer = getReferrer();

function sendEvent(audience_id, eventType, eventData, isConversion) {
  const deviceType = getDeviceType();
  const browser = getBrowser();

  const script = document.querySelector("script[data-audience-id]");

  if (!script) return;
  const attr = script.getAttribute.bind(script);
  const audience_id_from_script = attr("data-audience-id");

  const event = {
    audience_id: audience_id ? audience_id_from_script : "null",
    eventType,
    eventData: eventData ? eventData : {}, // Check if eventData is provided
    isConversion: isConversion ? isConversion : false, // Default isConversion to false
    deviceType,
    browser,
    language,
    screen,
    utmParams,
    referrer,
    session_id,
    timestamp: new Date().toISOString(),
  };

  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(event),
    headers: { "Content-Type": "application/json" },
  });
}

function sendPageViewEvent(audience_id, pageName) {
  sendEvent(audience_id, "page_view", { pageName });
}

function sendPurchaseEvent(orderId, totalValue) {
  sendEvent("purchase", { orderId, totalValue }, true); // Set isConversion to true for purchase event
}

function sendProductViewEvent(productId) {
  sendEvent("product_view", { productId });
}

function sendCustomEvent(
  audience_id,
  eventData,
  eventValue,
  isConversion = false
) {
  // Use default parameter for isConversion
  sendEvent(audience_id, "custom", { eventData, eventValue }, isConversion);
}

if (!window.ae) {
  const ae = (eventValue) => sendEvent(eventValue);
  ae.productView = sendProductViewEvent;
  ae.purchaseEvent = sendPurchaseEvent;
  ae.pageViewEvent = sendPageViewEvent;
  ae.customEvent = sendCustomEvent;
  window.ae = ae;
}

function sendPageViewIfReady() {
  if (document.readyState === "complete") {
    sendPageViewEvent(pagePath);
    trackRageClicks();
    trackDeadClicks();
    document.removeEventListener("readystatechange", sendPageViewIfReady);
  }
}

document.addEventListener("readystatechange", sendPageViewIfReady);
