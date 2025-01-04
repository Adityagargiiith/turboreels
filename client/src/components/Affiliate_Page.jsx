import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";

export default function AffiliatePage() {
  const [affiliateLink, setAffiliateLink] = useState("");
  const [referredLogins, setReferredLogins] = useState(0);
  const [linkVisits, setLinkVisits] = useState(0);  // New state for tracking visits
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const { currentUser, token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setError("");
        const res = await fetch(`/api/user/${currentUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          throw new Error(data.message || "Failed to fetch user information");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (currentUser && token) {
      fetchUserInfo();
    }
  }, [currentUser, token]);

  // Generate Affiliate Link with tracking parameter
  const generateAffiliateLink = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/affiliate/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        // Add referral ID to the link
        const trackingLink = `${data.affiliateLink}?ref=${data.referralId}`;
        setAffiliateLink(trackingLink);
      } else {
        throw new Error(data.message || "Failed to generate affiliate link");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Referred Data including visit counts
  useEffect(() => {
    const fetchReferredData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/affiliate/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setReferredLogins(data.referredLogins);
          setLinkVisits(data.linkVisits);  // Set the visit count
          setEarnings(data.earnings);
        } else {
          throw new Error(data.message || "Failed to fetch referred data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && token) {
      fetchReferredData();
    }
  }, [currentUser, token]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-indigo-600 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 rounded-lg">
          Affiliate Program
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <>
            {/* User Information */}
            <div className="flex items-center mb-6">
              <img
                src={user.profilePicture || "/default-avatar.png"}
                alt={user.username || "anonymous"}
                className="w-12 h-12 rounded-full bg-gray-200 mr-4"
              />
              <div>
                <p className="font-bold text-white">@{user.username || "anonymous"}</p>
                <p className="text-gray-300">{user.email}</p>
              </div>
            </div>

            {/* Generate Affiliate Link */}
            <div className="mb-6 bg-indigo-500 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-white mb-2">
                Generate Your Affiliate Link
              </h2>
              <Button
                onClick={generateAffiliateLink}
                gradientDuoTone="purpleToBlue"
                size="sm"
              >
                Generate Link
              </Button>
              {affiliateLink && (
                <div className="mt-4 p-3 bg-indigo-700 text-white rounded-lg">
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

            {/* Link Visits - New Section */}
            <div className="mb-6 bg-indigo-500 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-white mb-2">
                Link Visits
              </h2>
              <div className="p-3 bg-indigo-700 text-white rounded-lg">
                Total Link Visits:{" "}
                <span className="font-bold">{linkVisits}</span>
              </div>
            </div>

            {/* Referred Logins */}
            <div className="mb-6 bg-indigo-500 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-white mb-2">
                Referred Logins
              </h2>
              <div className="p-3 bg-indigo-700 text-white rounded-lg">
                Total Referred Logins:{" "}
                <span className="font-bold">{referredLogins}</span>
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-indigo-500 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-white mb-2">Earnings</h2>
              <div className="p-3 bg-indigo-700 text-white rounded-lg">
                Total Earnings:{" "}
                <span className="font-bold">${earnings.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}