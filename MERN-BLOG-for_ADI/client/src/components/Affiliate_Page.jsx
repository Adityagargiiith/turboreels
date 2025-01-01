import React, { useState } from "react";

export default function AffiliatePage() {
  const [affiliateLink, setAffiliateLink] = useState("");
  const [referredLogins, setReferredLogins] = useState(0);
  const [earnings, setEarnings] = useState(0);

  // Mock functions for demonstration
  const generateAffiliateLink = () => {
    const link = `${window.location.origin}/signup?ref=${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    setAffiliateLink(link);
  };

  const fetchReferredData = () => {
    // Replace with API call to fetch referred logins and earnings
    setReferredLogins(10); // Mock data
    setEarnings(50); // Mock data
  };

  React.useEffect(() => {
    fetchReferredData();
  }, []);

  return (
    <div className="min-h-screen py-10 px-5">
      <div className="max-w-4xl bg-indigo-600 mx-auto p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
          Affiliate Program
        </h1>

        <div className="space-y-6">
          {/* Generate Affiliate Link */}
          <div className="bg-indigo-500 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-white mb-4">
              Generate Your Affiliate Link
            </h2>
            <button
              onClick={generateAffiliateLink}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Generate Link
            </button>
            {affiliateLink && (
              <div className="mt-4 p-3 bg-indigo-700 rounded-lg text-white">
                <span className="font-semibold">Your Link: </span>
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline break-all"
                >
                  {affiliateLink}
                </a>
              </div>
            )}
          </div>

          {/* Referred Logins */}
          <div className="bg-indigo-500 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-white mb-4">
              Referred Logins
            </h2>
            <div className="p-3 bg-indigo-700 rounded-lg text-white">
              Total Referred Logins:{" "}
              <span className="font-semibold">{referredLogins}</span>
            </div>
          </div>

          {/* Earnings */}
          <div className="bg-indigo-500 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Earnings</h2>
            <div className="p-3 bg-indigo-700 rounded-lg text-white">
              Total Earnings:{" "}
              <span className="font-semibold">${earnings.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
