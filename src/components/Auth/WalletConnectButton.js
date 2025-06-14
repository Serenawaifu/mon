import React, { useState } from "react";
import { FaWallet, FaCircleNotch, FaExclamationCircle } from "react-icons/fa";
import WalletConnectProviderV1 from "@walletconnect/web3-provider";
import EthereumProviderV2 from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";

const INFURA_ID = "29513fcbadc6c860553ef2b4d558c063"; // Replace with your own for production
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID"; // Set in .env

export default function WalletConnectButton({ onConnect }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [account, setAccount] = useState("");
  const [version, setVersion] = useState("v2"); // default to v2

  async function handleConnect() {
    setError("");
    setLoading(true);
    try {
      let provider, ethersProvider, signer, address;
      if (version === "v1") {
        provider = new WalletConnectProviderV1({
          rpc: {
            1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
          },
        });
        await provider.enable();
        ethersProvider = new ethers.BrowserProvider(provider);
        signer = await ethersProvider.getSigner();
        address = await signer.getAddress();
      } else {
        provider = await EthereumProviderV2.init({
          projectId: WALLETCONNECT_PROJECT_ID,
          chains: [1], // Ethereum mainnet
          showQrModal: true,
        });
        await provider.enable();
        ethersProvider = new ethers.BrowserProvider(provider);
        signer = await ethersProvider.getSigner();
        address = await signer.getAddress();
      }
      setAccount(address);
      if (onConnect) onConnect(address, provider);
    } catch (err) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  }

  async function handleDisconnect() {
    setAccount("");
    setError("");
    setLoading(false);
    // Optionally, disconnect provider if supported
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-2 flex gap-4 justify-center">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="wc-version"
            value="v1"
            checked={version === "v1"}
            onChange={() => setVersion("v1")}
          />
          WalletConnect v1
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="wc-version"
            value="v2"
            checked={version === "v2"}
            onChange={() => setVersion("v2")}
          />
          WalletConnect v2
        </label>
      </div>
      {account ? (
        <div className="flex flex-col items-center gap-2">
          <div className="text-green-600 font-mono text-sm">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </div>
          <button
            type="button"
            onClick={handleDisconnect}
            className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-900 font-semibold text-lg shadow-sm hover:bg-gray-200 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
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
          {loading
            ? `Connecting (${version})...`
            : `Connect with WalletConnect (${version})`}
        </button>
      )}
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
