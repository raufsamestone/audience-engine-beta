import React, { useState, useEffect } from "react";

const AudienceInsight = ({ audienceId }) => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchAudienceInsights = async () => {
      const res = await fetch(`/api/audience-insights/${audienceId}`);
      const data = await res.json();
      setInsights(data);
    };
    fetchAudienceInsights();
  }, [audienceId]);

  if (!insights) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Audience Insights</h3>
      <ul>
        <li>Total customers: {insights.totalCustomers}</li>
        <li>Average purchase value: ${insights.avgPurchaseValue}</li>
        <li>Average purchase frequency: {insights.avgPurchaseFrequency}</li>
        <li>Average customer lifespan: {insights.avgCustomerLifespan} days</li>
      </ul>
    </div>
  );
};

export default AudienceInsight;
