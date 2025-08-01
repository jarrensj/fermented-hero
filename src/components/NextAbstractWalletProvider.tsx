"use client";

import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { abstract } from "viem/chains";

export default function AbstractWalletWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AbstractWalletProvider chain={abstract}>
      {children}
    </AbstractWalletProvider>
  );
}
