"use client";

export default function LoyaltyCard({
  points,
  nextLevel,
  progress,
}) {
  return (
    <div className="loyalty-card">
      <div className="loyalty-top">
        <div>
          <span>Available Reward Points</span>

          <h2>{points}</h2>
        </div>

        <div className="loyalty-icon">
          ★
        </div>
      </div>

      <div className="loyalty-progress">
        <div
          className="loyalty-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p>
        {nextLevel} points needed for your next
        reward level
      </p>
    </div>
  );
}