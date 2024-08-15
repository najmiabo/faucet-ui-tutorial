"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/ethereum/faucet";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";

function Faucet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const router = useRouter();

  const handleGetTokens = async () => {
    if (!walletAddress) {
      toast.error("Please enter a wallet address");
      return;
    }

    try {
      // Menghubungkan dengan Ethereum provider
      if (!window.ethereum) {
        toast.error("Ethereum provider not found. Please install MetaMask.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Menghubungkan dengan smart contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Mengirimkan token
      const tx = await contract.requestTokens();
      setTransactionStatus("Transaction sent! Waiting for confirmation...");

      // Menunggu transaksi selesai
      await tx.wait();

      toast.success("Transaction confirmed!");

      setTransactionStatus(`Hash: ${tx.hash}`);
      setTxHash(tx.hash);
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transaction failed. Check console for details.");
    }
  };

  const copyTxHash = () => {
    if (txHash) {
      navigator.clipboard
        .writeText(txHash)
        .then(() => {
            toast.success("Copied to clipboard")
        })
        .catch((err) => {
            toast.error("Failed to copy text")
          console.error("Gagal menyalin teks: ", err);
        });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-gray-800 text-white min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <nav className="bg-transparent p-4 border-b border-gray-700">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Abrokadabro (ABRO)</h1>
          <button
            onClick={() => router.push("/instructions")}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow mt-4 md:mt-0"
          >
            <span className="font-semibold">Instruction</span>
          </button>
        </div>
      </nav>
      <section className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('/wp11484809-web3-wallpapers.jpg')]">
        <div className="text-center max-w-4xl mx-auto p-6 sm:p-8 bg-black bg-opacity-70 rounded-xl shadow-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Faucet</h1>
          <p className="text-base sm:text-lg mb-8">Fast and reliable token distribution.</p>
          {/* <div className="mb-6">
            <button className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">Check Status</button>
          </div> */}
          <div className="bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-800">
            <div className="flex flex-col sm:flex-row mb-6">
              <input
                className="flex-1 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 transition"
                type="text"
                placeholder="Enter your wallet address (0x...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <button className="mt-4 sm:mt-0 sm:ml-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow" onClick={handleGetTokens}>
                GET TOKENS
              </button>
            </div>
            <article className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <p className="font-semibold mb-3 text-lg">Transaction Data</p>
              <p className="text-gray-300 md:w-[540px]  sm:w-[324px] w-[200px] truncate">{transactionStatus ? transactionStatus : "--"}</p>
              {txHash ? (
                <button onClick={copyTxHash} className="w-full flex justify-center items-center space-x-1 text-neutral-500 text-sm">
                  <MdOutlineContentCopy />
                  <p>Copy</p>
                </button>
              ) : (
                ""
              )}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faucet;
