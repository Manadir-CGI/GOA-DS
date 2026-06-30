import * as React from "react";
import { GoabGrid } from "../src/components/layout/GoabGrid";
import { GoabContainer } from "../src/components/core/GoabContainer";

/**
 * Card grid
 * A responsive grid of linked containers
 */
const cards = [
  {
    title: "Waitlist submission",
    body: "Enter and maintain information about the households waiting for affordable housing with your organization.",
  },
  {
    title: "Lodge assistance program",
    body: "Keep track of the individuals who are placed in lodges and may qualify for the Lodge Assistance Program subsidy.",
  },
  {
    title: "Education Support",
    body: "Explore educational resources, enroll in courses, and track your academic progress effortlessly.",
  },
  {
    title: "Social Assistance",
    body: "Learn about available support programs, apply for financial aid, and access community resources.",
  },
  {
    title: "Employment Opportunity",
    body: "Search for job openings, access career development tools, and receive employment-related updates.",
  },
  {
    title: "Housing Assistance",
    body: "Find affordable housing options, apply for housing subsidies, and report maintenance issues seamlessly.",
  },
];

export function CardGridExample() {
  return (
    <GoabGrid gap="xl" minChildWidth="320px">
      {cards.map((c, i) => (
        <GoabContainer key={i} accent="thin" mb="none">
          <a href="#" className="cardtitle" onClick={(e) => e.preventDefault()}>
            {c.title}
          </a>
          <div className="cardcontent">{c.body}</div>
        </GoabContainer>
      ))}
    </GoabGrid>
  );
}

export default CardGridExample;
