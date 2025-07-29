import React from "react";
import { useWriteContract } from "wagmi";
import { useWaitForTransactionReceipt, useAccount } from "wagmi";
import { hero_abi } from "../../../public/hero_abi";

// HERO token contract address on Abstract chain
const HERO_TOKEN_ADDRESS = "0x33ee11ce309854a45b65368c078616abcb5c6e3d";
// Spender contract address
// TODO: update this when deployed to abstract
const HERO_SPENDER_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder - update with actual Spender contract address

export function ApprovalButton() {
  const { address } = useAccount();
  const {
    writeContract,
    data: transactionHash,
    isPending,
  } = useWriteContract();

  const { data: transactionReceipt } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const hasTransaction = !!transactionReceipt;

  const onApproveMaxSpending = () => {
    if (!address) return;

    // Approve maximum amount (2^256 - 1)
    const maxAmount = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

    writeContract({
      abi: hero_abi,
      address: HERO_TOKEN_ADDRESS,
      functionName: "approve",
      args: [HERO_SPENDER_ADDRESS, maxAmount],
    });
  };

  return (
    <div className="flex flex-col w-full border-solid">
      <button
        className={`rounded-full border border-solid transition-colors flex items-center justify-center text-white gap-2 text-sm h-10 px-5 font-[family-name:var(--font-roobert)] w-full
          ${
            isPending || hasTransaction
              ? "bg-gray-500 cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 hover:cursor-pointer border-transparent"
          }`}
        onClick={onApproveMaxSpending}
        disabled={!address || isPending || hasTransaction}
      >
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="w-full text-center">Approve Max HERO</span>
      </button>

      {transactionHash && (
        <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg text-center w-full">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm sm:text-base font-medium font-[family-name:var(--font-roobert)]">
              {transactionReceipt ? (
                <>
                  Approval Success
                  <span className="ml-1 text-green-500">✅</span>
                </>
              ) : (
                <>
                  Approval Pending
                  <span className="ml-1 text-yellow-500">⏳</span>
                </>
              )}
            </p>

            <a
              href={`https://abscan.org/tx/${transactionReceipt?.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 underline"
            >
              View on Explorer
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 