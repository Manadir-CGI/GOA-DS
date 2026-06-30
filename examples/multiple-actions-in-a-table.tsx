import * as React from "react";
import { useState } from "react";
import { GoabBadge } from "../src/components/core/GoabBadge";
import { GoabBlock } from "../src/components/layout/GoabBlock";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabButtonGroup } from "../src/components/core/GoabButtonGroup";
import { GoabDropdown } from "../src/components/forms/GoabDropdown";
import { GoabPagination } from "../src/components/data/GoabPagination";
import { GoabTable } from "../src/components/data/GoabTable";
import { GoabSpacer } from "../src/components/layout/GoabSpacer";

const ALL = [
  { badgeType: "success", status: "Approved", text: "Ralph Edwards" },
  { badgeType: "emergency", status: "Denied", text: "Devon Lane" },
  { badgeType: "success", status: "Approved", text: "Marvin McKinney" },
  { badgeType: "midtone", status: "In progress", text: "Albert Flores" },
  { badgeType: "midtone", status: "In progress", text: "Ronald Richards" },
  { badgeType: "success", status: "Approved", text: "Diane Russell" },
  { badgeType: "success", status: "Approved", text: "Raoul Emmerich" },
  { badgeType: "emergency", status: "Denied", text: "Delilah Farrell" },
  { badgeType: "success", status: "Approved", text: "Brock Sipes" },
  { badgeType: "midtone", status: "In progress", text: "Aylin Hansen" },
  { badgeType: "midtone", status: "In progress", text: "Eldora Waters" },
  { badgeType: "emergency", status: "Denied", text: "Guillermo Kohler" },
  { badgeType: "emergency", status: "Denied", text: "Ryley Medhurst" },
  { badgeType: "emergency", status: "Denied", text: "Craig Russel" },
  { badgeType: "success", status: "Approved", text: "Scot Hayes" },
  { badgeType: "success", status: "Approved", text: "Albert Flores" },
  { badgeType: "success", status: "Approved", text: "Amiya Langosh" },
  { badgeType: "midtone", status: "In progress", text: "Demetrius Cormier" },
].map((u, i) => ({ ...u, name: String(i + 1), number: 1234567890 }));

/**
 * Multiple actions in a table
 * Row action buttons with paging and page-size control
 */
export function MultipleActionsInATableExample() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const pageCount = Math.ceil(ALL.length / perPage);
  const offset = (page - 1) * perPage;
  const pageUsers = ALL.slice(offset, offset + perPage);
  const onPerPage = (v: string) => {
    setPerPage(parseInt(v));
    setPage(1);
  };
  return (
    <div>
      <GoabTable width="100%" mb="xl">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>File number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pageUsers.map((user) => (
            <tr key={user.name}>
              <td>
                <GoabBadge type={user.badgeType as any} content={user.status} />
              </td>
              <td>{user.text}</td>
              <td className="goa-table-number-column">{user.number}</td>
              <td>
                <GoabButtonGroup alignment="center">
                  <GoabButton type="tertiary">Edit</GoabButton>
                  <GoabButton type="tertiary">Test</GoabButton>
                  <GoabButton type="tertiary">View</GoabButton>
                </GoabButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </GoabTable>
      <GoabBlock alignment="center">
        <GoabBlock mb="m" alignment="center" gap="s">
          Show
          <GoabDropdown
            value={String(perPage)}
            width="9ch"
            onChange={onPerPage}
            items={["5", "10", "15"]}
          />
          <span style={{ width: "75px" }}>of {ALL.length}</span>
        </GoabBlock>
        <GoabSpacer hSpacing="fill" />
        <GoabPagination pageNumber={page} pageCount={pageCount} onChange={setPage} />
      </GoabBlock>
    </div>
  );
}

export default MultipleActionsInATableExample;
