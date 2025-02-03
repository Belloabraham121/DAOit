import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider, ConnectButton, useActiveAccount, useWalletBalance } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { Sepolia, Goerli } from "@thirdweb-dev/chains";
import { FaChevronDown, FaChevronUp, FaCopy } from "react-icons/fa";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createThirdwebClient } from "thirdweb";
import { create } from "zustand";
import { sepolia } from "thirdweb/chains";

const container = document.getElementById("root");
const root = createRoot(container);

const clientId = "68e77509b173a1cf92aff87441d10f5c";
console.log("🔑 Client ID:", clientId);

const client = createThirdwebClient({ clientId });
console.log("🌐 Thirdweb Client Created");

const wallets = [
  inAppWallet({ recommended: true, }), // Email and phone login
  createWallet("io.metamask"),
];
console.log("👛 Available Wallets:", wallets.map(w => w.id));

// Global state store for wallet and user info
export const useGlobalStore = create((set) => ({
  walletAddress: null,
  userId: null,
  setWalletInfo: (address) => {
    console.log("💼 Setting Wallet Address:", address);
    const userId = address ? `user_${address.slice(2, 10)}` : null;
    console.log("🆔 Generated User ID:", userId);
    set({ walletAddress: address, userId });
  },
  clearWalletInfo: () => set({ walletAddress: null, userId: null })
}));

function WalletButton() {
  const [isMinimized, setIsMinimized] = useState(false);
  const account = useActiveAccount();
  console.log("👤 Active Account:", account?.address);

  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: Sepolia,
    address: account?.address,
  });
  console.log("💰 Wallet Balance:", isLoading ? "Loading..." : balance?.displayValue);

  const { setWalletInfo } = useGlobalStore();

  // Update global wallet info when account changes
  React.useEffect(() => {
    console.log("🔄 Account Changed - New Address:", account?.address);
    setWalletInfo(account?.address || null);
  }, [account?.address, setWalletInfo]);

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
    }
  };

  if (isMinimized) {
    return (
      <button 
        onClick={toggleMinimize}
        className="fixed bottom-4 left-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
        title="Expand wallet info"
      >
        <FaChevronUp className="text-gray-600" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4">
      <div className="bg-white rounded-lg shadow-lg p-4 relative">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={toggleMinimize}
            className="p-2 text-gray-600 hover:text-gray-800"
            title="Minimize wallet info"
          >
            <FaChevronDown />
          </button>
          {account && (
            <button
              onClick={copyAddress}
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Copy wallet address"
            >
              <FaCopy />
            </button>
          )}
        </div>
        <ConnectButton 
          client={client}
          wallets={wallets}
          theme="light"
          modalSize="wide"
          accountAbstraction={{chain:
            sepolia,
            sponsorGas: true,
          }}
        />
      </div>
    </div>
  );
}

console.log("🚀 Starting React App Render");
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThirdwebProvider 
        clientId={clientId}
        activeChain={Sepolia}
        supportedChains={[Sepolia]}
      >
        <App />
        <WalletButton />
      </ThirdwebProvider>
    </BrowserRouter>
  </StrictMode>
);
