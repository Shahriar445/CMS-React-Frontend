import React, { useEffect, useState } from "react";

const PaymentComponent = () => {
  const [declarations, setDeclarations] = useState([]);
  const [selectedDeclaration, setSelectedDeclaration] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false); // State for failed payment
  const [transactionId, setTransactionId] = useState(""); // State for transaction ID

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showError("User ID not found in local storage");
      return;
    }
    loadDeclarations(userId);
    handlePaymentRedirect();

    // Add event listener for popstate to handle browser back/forward navigation
    window.addEventListener("popstate", handlePaymentRedirect);

    return () => {
      window.removeEventListener("popstate", handlePaymentRedirect);
    };
  }, []);

  const loadDeclarations = async (userId) => {
    try {
      const response = await fetch(
        `https://localhost:7232/api/CMS/GetDeclarationsByUserIdImporter/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch declarations");
      }
      const data = await response.json();
      setDeclarations(data);
      setLoading(false);
    } catch (error) {
      showError("Error fetching declarations. Please try again later.");
      console.error("Error fetching declarations:", error);
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    if (!selectedDeclaration) {
      showError("No declaration selected");
      return;
    }

    try {
      const returnUrl = `${window.location.origin}${window.location.pathname}?paymentSuccess=true`;
      const failreturnUrl = `${window.location.origin}${window.location.pathname}?paymentFailed=true`;

      const payload = {
        declarationId: selectedDeclaration,
        returnUrl: returnUrl,
        failReturnUrl: failreturnUrl,
      };

      const response = await fetch(
        "https://localhost:7232/api/Payment/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to initiate payment: ${response.status} ${response.statusText}. ${errorText}`
        );
      }

      const data = await response.json();
      if (data.url) {
        setTransactionId(data.transactionId); // Store transaction ID
        window.location.href = data.url;
      } else {
        showError("Payment URL not received");
        console.error("Payment URL not received:", data);
      }
    } catch (error) {
      showError("Error initiating payment. Please try again later.");
      console.error("Error initiating payment:", error);
    }
  };

  const showError = (message) => {
    console.error(`Error: ${message}`);
    // You can implement a more user-friendly error display here
  };

  const handlePaymentRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("paymentSuccess");
    const failure = urlParams.get("paymentFailed"); // Check for failure query param

    if (success === "true") {
      setPaymentSuccess(true);
      setPaymentFailed(false); // Reset failed state

      // Optionally, clear URL parameters after processing
      // window.history.replaceState({}, document.title, window.location.pathname);
    } else if (failure === "true") {
      setPaymentSuccess(false); // Reset success state
      setPaymentFailed(true); // Set failed state
    } else {
      setPaymentSuccess(false);
      setPaymentFailed(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {paymentSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h4 className="font-bold">Payment Successful!</h4>
          <p>Your payment was processed successfully.</p>
        </div>
      )}
      {paymentFailed && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h4 className="font-bold">Payment Failed!</h4>
          <p>There was an issue processing your payment. Please try again.</p>
        </div>
      )}
      <div className="mb-4">
        <select
          id="declaration-select"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(event) => setSelectedDeclaration(event.target.value)}
          disabled={loading}
          value={selectedDeclaration}
        >
          <option value="">Select your declaration</option>
          {declarations.map((declaration) => (
            <option
              key={declaration.declarationId}
              value={declaration.declarationId}
            >
              Declaration {declaration.declarationId}
            </option>
          ))}
        </select>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        disabled={!selectedDeclaration}
        onClick={() => setShowConfirmDialog(true)}
      >
        Pay Now
      </button>
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Confirm Payment</h3>
            <p>Are you sure you want to proceed with the payment?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  setShowConfirmDialog(false);
                  initiatePayment();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {declarations.length > 0 ? (
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left">Declaration ID</th>
              <th className="text-left">Product Name</th>
              <th className="text-left">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {declarations.flatMap((declaration) =>
              declaration.products.map((product) => (
                <tr key={`${declaration.declarationId}-${product.productName}`}>
                  <td>{declaration.declarationId}</td>
                  <td>{product.productName}</td>
                  <td>
                    {product.totalPrice != null ? product.totalPrice : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p>No declarations available.</p>
      )}
    </div>
  );
};

export default PaymentComponent;
