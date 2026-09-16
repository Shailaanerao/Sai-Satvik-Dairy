"use client";

export default function ReferralCard({
  referralCode,
  referrals,
  reward,
  onCopy,
}) {
  return (
    <div className="referral-card">
      <div className="referral-icon">
        ↗
      </div>

      <div className="referral-content">
        <span className="referral-label">
          Invite friends & earn rewards
        </span>

        <h3>
          Give ₹100, Get ₹100
        </h3>

        <p>
          Share your referral code with friends
          and earn rewards when they place their
          first order.
        </p>

        <div className="referral-code">
          <span>{referralCode}</span>

          <button
            type="button"
            onClick={onCopy}
          >
            Copy
          </button>
        </div>

        <div className="referral-stats">
          <div>
            <strong>{referrals}</strong>
            <span>Friends Referred</span>
          </div>

          <div>
            <strong>₹{reward}</strong>
            <span>Total Earned</span>
          </div>
        </div>
      </div>
    </div>
  );
}