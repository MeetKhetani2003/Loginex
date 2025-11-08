// app/order/success/page.js
"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

export default function SuccessPage() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch("/api/orders/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.success ? "success" : "error");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <Loader2
              size={48}
              className="animate-spin text-blue-600 mx-auto mb-4"
            />
            <p className="text-xl">Processing your payment...</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-gray-600 mt-2">
              Your VPS is being set up. Check your email for the invoice.
            </p>
            <a
              href="/"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold"
            >
              Go to Home
            </a>
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle size={64} className="text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-700">Payment Failed</h1>
            <p className="text-gray-600 mt-2">
              Something went wrong. Contact support if charged.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
