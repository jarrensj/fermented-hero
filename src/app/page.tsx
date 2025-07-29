"use client";

import { useAccount } from "wagmi";
import { ConnectedState } from "@/components/wallet/ConnectedState";
import { SignInButton } from "@/components/wallet/SignInButton";

export default function Home() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {address ? <ConnectedState /> : <SignInButton />}
    </div>
  );
}
