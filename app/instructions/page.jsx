"use client";

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Instruction() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-blue-900 to-gray-800 text-white min-h-screen">
      <Toaster position="bottom-center" reverseOrder={false} />
      <nav className="bg-transparent p-4 border-b border-gray-700">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Instruction</h1>
          <button onClick={() => router.push("/")} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow mt-4 md:mt-0">
            <span className="font-semibold">Faucet</span>
          </button>
        </div>
      </nav>
      <section className="flex items-start justify-center min-h-screen bg-cover bg-center bg-[url('/wp11484809-web3-wallpapers.jpg')]">
        <div className="text-center max-w-4xl mx-auto p-6 sm:p-8 bg-black bg-opacity-70 rounded-xl shadow-2xl mt-10">
          <h2 className="text-2xl font-bold mb-6">How to Use the Faucet</h2>
          <ol className="list-decimal list-inside text-left space-y-4">
            <li className="text-lg">
              <strong>Open your MetaMask wallet.</strong>
            </li>
            <li className="text-lg">
              <strong>Import the ABRO token:</strong>
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>In MetaMask, select "Assets".</li>
                <li>Click "Import Tokens".</li>
                <li>Enter the ABRO token contract address.</li>
                <li>Click "Add Custom Token" and confirm.</li>
              </ul>
            </li>
            <li className="text-lg">
              <strong>Return to this Faucet page.</strong>
            </li>
            <li className="text-lg">
              <strong>Click the "GET TOKENS" button to receive ABRO tokens.</strong>
            </li>
            <li className="text-lg">
              <strong>Check your balance in MetaMask.</strong>
            </li>
            <li className="text-lg">
              <strong>Copy the token address:</strong>
              <div className="mt-2 p-4 bg-gray-800 rounded-lg">
                <input type="text" value="0x61D2d1e3363723bc32630c3F5Fdf424eE699F51a" readOnly className="bg-gray-900 text-white border border-gray-600 rounded-lg p-2 w-full" id="tokenAddress" />
                <button
                  onClick={() => {
                    const tokenAddressInput = document.getElementById("tokenAddress");
                    tokenAddressInput.select();
                    document.execCommand("copy");
                    toast.success("Token address copied to clipboard!");
                  }}
                  className="mt-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Copy Address
                </button>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
