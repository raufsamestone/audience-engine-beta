!(function () {
  "use strict";
  const t = "https://h6e152-3000.preview.csb.app/api/collect";
  async function e(t) {
    const e = new TextEncoder().encode(t),
      n = await crypto.subtle.digest("SHA-256", e);
    return Array.from(new Uint8Array(n))
      .map((t) => t.toString(16).padStart(2, "0"))
      .join("");
  }
  const n = window.location.pathname,
    o = window.navigator.language,
    i = (function () {
      const t = {},
        e = new URL(window.location.href);
      for (let [n, o] of e.searchParams) n.startsWith("utm_") && (t[n] = o);
      return t;
    })(),
    a = `${window.screen.width} X ${window.screen.height}`,
    c = document.referrer;
  async function r(n, r, s) {
    const d = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      u = (function () {
        const t = navigator.userAgent;
        let e = "unknown",
          n = "unknown";
        return (
          /firefox/i.test(t)
            ? ((e = "firefox"), (n = t.match(/firefox\/(\d+)/i)[1]))
            : /chrome/i.test(t)
            ? ((e = "chrome"), (n = t.match(/chrome\/(\d+)/i)[1]))
            : /safari/i.test(t)
            ? ((e = "safari"), (n = t.match(/version\/(\d+)/i)[1]))
            : /trident/i.test(t) && ((e = "ie"), (n = t.match(/rv:(\d+)/i)[1])),
          `${e} ${n}`
        );
      })(),
      w = await (function () {
        const t = {
          platform: window.navigator.platform,
          language: window.navigator.language,
        };
        return e(JSON.stringify(t));
      })(),
      f = {
        eventType: n,
        eventData: r || {},
        isConversion: s || !1,
        deviceType: d,
        browser: u,
        language: o,
        screen: a,
        utmParams: i,
        referrer: c,
        sessionID: await e(w),
        timestamp: new Date().toISOString(),
      };
    fetch(t, {
      method: "POST",
      body: JSON.stringify(f),
      headers: { "Content-Type": "application/json" },
    });
  }
  function s(t) {
    r("page_view", { pageName: t });
  }
  if (!window.ae) {
    const t = (t) => r(t);
    (t.productView = function (t) {
      r("product_view", { productId: t });
    }),
      (t.purchaseEvent = function (t, e) {
        r("purchase", { orderId: t, totalValue: e }, !0);
      }),
      (t.pageViewEvent = s),
      (t.customEvent = function (t, e, n = !1) {
        r("custom", { eventData: t, eventValue: e }, n);
      }),
      (window.ae = t);
  }
  document.addEventListener("readystatechange", function t() {
    "complete" === document.readyState &&
      (s(n),
      (function () {
        const t = 5;
        let e = 5,
          n = 0;
        document.addEventListener("click", (o) => {
          const i = Date.now();
          i - n < 1e3
            ? (e++, e >= t && (r("rage_click", { numClicks: e }), (e = 0)))
            : (e = 0),
            (n = i);
        });
      })(),
      (function () {
        const t = 5;
        document.addEventListener("click", (e) => {
          const n = e.target,
            o = n.getBoundingClientRect(),
            i = e.clientX - o.left,
            a = e.clientY - o.top;
          (i < -t || a < -t || i > o.width + t || a > o.height + t) &&
            r("dead_click", { tag: n.tagName, x: e.clientX, y: e.clientY });
        });
      })(),
      document.removeEventListener("readystatechange", t));
  });
})();
