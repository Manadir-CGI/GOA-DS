import * as React from "react";
import { GoabBlock } from "../src/components/layout/GoabBlock";
import { GoabBadge } from "../src/components/core/GoabBadge";

/**
 * Show multiple tags together
 * Group badges to show several statuses
 */
export function ShowMultipleTagsTogetherExample() {
  return (
    <div>
      <p className="lbl">Show multiple tags / badges together</p>
      <GoabBlock gap="2xs" wrap>
        <GoabBadge type="important" content="Action required" />
        <GoabBadge type="information" content="Income verified" />
        <GoabBadge type="midtone" content="Priority" />
        <GoabBadge type="dark" content="Edmonton region" />
      </GoabBlock>
    </div>
  );
}

export default ShowMultipleTagsTogetherExample;
