const collectTrackingData = () => {
  const trackingEventData = {
    type: "click",
    path: window.location.pathname,
    hostname: window.location.hostname,
    search: window.location.search,
    time: Date.now(),
    elements: [],
  };

  document.querySelectorAll("button, input").forEach((el) => {
    const tagName = el.tagName.toLowerCase();
    const text = el.innerText.trim();

    if (text && tagName) {
      trackingEventData.elements.push({ tagName, text });
    }
  });

  return trackingEventData;
};

const sendTrackingData = (payload) => {
  fetch("/api/collect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

document.addEventListener("click", (event) => {
  const trackingEventData = collectTrackingData();
  sendTrackingData(trackingEventData);
});
