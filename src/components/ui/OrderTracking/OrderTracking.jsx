"use client";
import "./OrderTracking.css";

const TRACKING_STEPS = [
  {
    status: "pending",
    title: "Order Placed",
    description:
      "Your order has been received successfully.",
  },
  {
    status: "confirmed",
    title: "Order Confirmed",
    description:
      "Your order has been confirmed by Sai Satvik.",
  },
  {
    status: "processing",
    title: "Processing",
    description:
      "Your order is being prepared.",
  },
  {
    status: "out_for_delivery",
    title: "Out for Delivery",
    description:
      "Your order is on the way to you.",
  },
  {
    status: "delivered",
    title: "Delivered",
    description:
      "Your order has been delivered successfully.",
  },
];

const STATUS_ORDER = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  out_for_delivery: 3,
  delivered: 4,
  cancelled: -1,
};

function getStepState(
  stepStatus,
  currentStatus
) {
  if (currentStatus === "cancelled") {
    return "cancelled";
  }

  const currentIndex =
    STATUS_ORDER[currentStatus] ?? 0;

  const stepIndex =
    STATUS_ORDER[stepStatus] ?? 0;

  if (stepIndex < currentIndex) {
    return "completed";
  }

  if (stepIndex === currentIndex) {
    return "current";
  }

  return "upcoming";
}

export default function OrderTracking({
  status,
}) {
  if (!status) {
    return null;
  }

  if (status === "cancelled") {
    return (
      <section className="order-tracking">
        <div className="tracking-header">
          <div>
            <span className="tracking-eyebrow">
              Delivery Progress
            </span>

            <h2>Order Tracking</h2>
          </div>
        </div>

        <div className="tracking-cancelled">
          <div className="tracking-cancelled-icon">
            ×
          </div>

          <div>
            <strong>
              Order Cancelled
            </strong>

            <p>
              This order has been cancelled.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="order-tracking">
      <div className="tracking-header">
        <div>
          <span className="tracking-eyebrow">
            Delivery Progress
          </span>

          <h2>Order Tracking</h2>
        </div>
      </div>

      <div className="tracking-timeline">
        {TRACKING_STEPS.map(
          (step, index) => {
            const state =
              getStepState(
                step.status,
                status
              );

            return (
              <div
                key={step.status}
                className={`tracking-step tracking-step-${state}`}
              >
                <div className="tracking-step-marker">
                  {state === "completed"
                    ? "✓"
                    : state === "current"
                    ? "●"
                    : ""}
                </div>

                <div className="tracking-step-content">
                  <strong>
                    {step.title}
                  </strong>

                  <p>
                    {step.description}
                  </p>
                </div>

                {index <
                  TRACKING_STEPS.length -
                    1 && (
                  <div className="tracking-line" />
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}