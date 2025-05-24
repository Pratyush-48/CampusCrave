import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

const COUNTDOWN_DURATION = 15 * 60 * 1000;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function MyOrders() {
  const { orders } = useCart();
  const { darkMode } = useTheme();

  const [countdowns, setCountdowns] = useState({});
  const [orderStatuses, setOrderStatuses] = useState({});

  useEffect(() => {
    const now = Date.now();
    const newCountdowns = {};

    orders.forEach((order) => {
      if (
        order.status.toLowerCase() === "pending" &&
        !(order.id in countdowns) &&
        !(orderStatuses[order.id] === "Ready")
      ) {
        const orderTime = new Date(order.date).getTime();
        const elapsed = now - orderTime;
        const remaining = COUNTDOWN_DURATION - elapsed;
        newCountdowns[order.id] = remaining > 0 ? remaining : 0;
      }
    });

    if (Object.keys(newCountdowns).length > 0) {
      setCountdowns((prev) => ({ ...prev, ...newCountdowns }));
    }
  }, [orders, countdowns, orderStatuses]);

  useEffect(() => {
    if (Object.keys(countdowns).length === 0) return;

    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const updated = {};
        const statusesToUpdate = {};

        Object.entries(prev).forEach(([orderId, timeLeft]) => {
          if (timeLeft <= 1000) {
            statusesToUpdate[orderId] = "Ready";
          } else {
            updated[orderId] = timeLeft - 1000;
          }
        });

        if (Object.keys(statusesToUpdate).length > 0) {
          setOrderStatuses((prev) => ({ ...prev, ...statusesToUpdate }));
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdowns]);

  const getStatus = (order) => orderStatuses[order.id] || order.status;

  return (
    <div className={`orders-page ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <h2 className="section-title">Order History</h2>
        {orders.length === 0 ? (
          <div className="no-orders">No orders yet</div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const status = getStatus(order);
              const countdownMs = countdowns[order.id];

              return (
                <motion.div
                  key={order.id}
                  className="order-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top Right Status */}
                  <span
                    className={`order-status ${status.toLowerCase().replace(" ", "-")}`}
                  >
                    {status}
                    {status.toLowerCase() === "pending" &&
                      countdownMs !== undefined &&
                      countdownMs > 0 && (
                        <span className="countdown-timer">
                          {formatTime(countdownMs)}
                        </span>
                      )}
                  </span>

                  <div className="order-header">
                    <div>
                      <h4>Order #{order.id.slice(0, 8).toUpperCase()}</h4>
                      <p className="order-date">
                        {new Date(order.date).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="order-item">
                        <div className="item-details">
                          <span className="item-name">
                            {item.quantity} × {item.name}
                          </span>
                          <span className="item-price">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="item-thumbnail">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-total">
                    <span>Total:</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .orders-page.dark {
          background-color: #121212;
          color: #eee;
        }

        .orders-page.dark .order-card {
          background-color: #1e1e1e;
          border: 1px solid #333;
        }

        .orders-page.dark .order-status {
          background-color: #ffd966;
          color: #5c3c00;
        }

        .orders-page.dark .countdown-timer {
          background-color: #333;
          color: #ffb400;
          box-shadow: inset 0 0 3px #ffb400aa;
        }

        .orders-page.dark .item-name,
        .orders-page.dark .item-price,
        .orders-page.dark .order-date {
          color: #ddd;
        }

        .orders-page.dark .order-total {
          color: #fff;
        }

        .order-card {
          position: relative;
          padding: 16px;
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .order-status {
          position: absolute;
          top: 16px;
          right: 16px;
          background-color: #ffe08a;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .countdown-timer {
          display: inline-block;
          margin-left: 8px;
          font-weight: 500;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #ddd;
        }

        .item-details {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .item-name {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .item-price {
          color: #4CAF50;
        }

        .item-thumbnail {
          width: 100px;
          height: 100px;
          margin-left: 16px;
          flex-shrink: 0;
        }

        .item-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .order-total {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
}
