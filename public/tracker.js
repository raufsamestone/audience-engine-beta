!(function () {
  "use strict";
  document.addEventListener("click", (t) => {
    const e = (() => {
      const t = {
        type: "click",
        path: window.location.pathname,
        hostname: window.location.hostname,
        search: window.location.search,
        time: Date.now(),
        elements: [],
      };
      return (
        document.querySelectorAll("button, input").forEach((e) => {
          const n = e.tagName.toLowerCase(),
            o = e.innerText.trim();
          o && n && t.elements.push({ tagName: n, text: o });
        }),
        t
      );
    })();
    var n;
    (n = e),
      fetch("http://localhost:3001/api/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n),
      });
  });
})();
