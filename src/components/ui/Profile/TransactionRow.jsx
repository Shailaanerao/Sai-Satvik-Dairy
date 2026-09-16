"use client";

export default function TransactionRow({
  title,
  date,
  amount,
  type,
}) {
  const isCredit = type === "credit";

  return (
    <div className="transaction-row">
      <div
        className={`transaction-icon ${
          isCredit ? "credit" : "debit"
        }`}
      >
        {isCredit ? "+" : "−"}
      </div>

      <div className="transaction-info">
        <strong>{title}</strong>
        <span>{date}</span>
      </div>

      <strong
        className={
          isCredit
            ? "transaction-credit"
            : "transaction-debit"
        }
      >
        {isCredit ? "+" : "-"} ₹{amount}
      </strong>
    </div>
  );
}