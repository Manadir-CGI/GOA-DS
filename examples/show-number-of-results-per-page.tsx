import * as React from "react";
import { useState } from "react";
import { GoabPagination } from "../src/components/data/GoabPagination";
import { GoabDropdown } from "../src/components/forms/GoabDropdown";

/**
 * Show number of results per page
 * Combine pagination with a per-page selector
 */
export function ShowNumberOfResultsPerPageExample() {
  const total = 42;
  const [pp, setPp] = useState("10");
  const [page, setPage] = useState(1);
  const per = parseInt(pp, 10);
  const count = Math.ceil(total / per);
  return (
    <div>
      <p className="lbl">Let users choose results per page</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            font: "var(--goa-typography-body-s)",
            color: "var(--goa-color-text-secondary)",
          }}
        >
          Results per page
          <div style={{ width: 90 }}>
            <GoabDropdown
              items={["10", "20", "50"]}
              value={pp}
              onChange={(v) => {
                setPp(v);
                setPage(1);
              }}
            />
          </div>
        </div>
        <GoabPagination pageNumber={page} pageCount={count} onChange={setPage} />
      </div>
      <p className="muted">
        Showing page {page} of {count} ({total} results)
      </p>
    </div>
  );
}

export default ShowNumberOfResultsPerPageExample;
