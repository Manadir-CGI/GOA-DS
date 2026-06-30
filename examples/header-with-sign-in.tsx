import * as React from "react";
import { GoabAppHeader } from "../src/components/navigation/GoabAppHeader";
import { GoabMicrositeHeader } from "../src/components/navigation/GoabMicrositeHeader";

/**
 * Header with sign in
 * App header with a sign-in interactive link
 */
export function HeaderWithSignInExample() {
  return (
    <div>
      <GoabMicrositeHeader type="live" />
      <GoabAppHeader url="https://example.com" heading="Service name" fullMenuBreakpoint={1500}>
        <a href="#" className="interactive">
          Sign in
        </a>
      </GoabAppHeader>
    </div>
  );
}

export default HeaderWithSignInExample;
