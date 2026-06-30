import * as React from "react";
import { useState } from "react";
import { GoabNotificationBanner } from "../src/components/feedback/GoabNotificationBanner";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Communicate a future service outage
 * Tell users about an upcoming outage
 */
export function CommunicateAFutureServiceOutageExample() {
  const [show, setShow] = useState(true);
  return (
    <div style={{ margin: -28 }}>
      {show && (
        <GoabNotificationBanner type="important" actionText="Add to calendar" onAction={() => {}}>
          Scheduled maintenance: this service will be unavailable Sunday, June 29 from 2:00-4:00 am
          MT.
        </GoabNotificationBanner>
      )}
      <div style={{ padding: 28 }}>
        <p className="lbl">Communicate a future service outage</p>
        <GoabButton
          type="tertiary"
          size="compact"
          leadingIcon="refresh"
          disabled={show}
          onClick={() => setShow(true)}
        >
          {show ? "Banner shown above" : "Show banner again"}
        </GoabButton>
      </div>
    </div>
  );
}

export default CommunicateAFutureServiceOutageExample;
