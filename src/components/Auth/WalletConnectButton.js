// src/components/Auth/WalletConnectButton.js

import React, { useState } from "react";
import { FaWallet, FaCircleNotch, FaExclamationCircle } from "react-icons/fa"; // Import react-icons
import PropTypes from "prop-types";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";

export default function WalletConnectButton({ onConnect }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConnect() {
    setError("");
    setLoading(true);
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura ID or other RPC
        },
      });
      await provider.enable();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      if (onConnect) onConnect(address, provider);
    } catch (err) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <button
        type="button"
        onClick={handleConnect}
        disabled={loading}
        aria-label="Connect with WalletConnect"
        className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-900 font-semibold text-lg shadow-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
      >
        {loading ? (
          <FaCircleNotch className="animate-spin w-5 h-5" />
        ) : (
          <FaWallet className="w-5 h-5" />
        )}
        {loading ? "Connecting..." : "Connect with WalletConnect"}
      </button>
      {error && (
        <div
          role="alert"
          className="mt-2 flex items-center gap-2 text-red-600 text-sm font-medium"
        >
          <FaExclamationCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}

WalletConnectButton.propTypes = {
  onConnect: PropTypes.func,
};
