import * as React from "react";
import { GoabHeroBanner } from "../src/components/navigation/GoabHeroBanner";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Hero banner with actions
 * A landing hero with a call to action
 */
export function HeroBannerWithActionsExample() {
  return (
    <div style={{ margin: -28 }}>
      <GoabHeroBanner
        heading="Apply for child care subsidy"
        backgroundColor="var(--goa-color-brand-dark)"
        minHeight="260px"
        actions={
          <React.Fragment>
            <GoabButton type="start">Start application</GoabButton>
            <GoabButton type="secondary" variant="inverse">
              Check eligibility
            </GoabButton>
          </React.Fragment>
        }
      >
        Help with the cost of licensed child care for eligible Alberta families.
      </GoabHeroBanner>
    </div>
  );
}

export default HeroBannerWithActionsExample;
