import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import * as React from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabBadge } from "../src/components/core/GoabBadge";
import { GoabCheckbox } from "../src/components/forms/GoabCheckbox";
import { GoabInput } from "../src/components/forms/GoabInput";
import { Icon } from "../src/icons/Icon";

describe("GoabButton", () => {
  it("renders its label and fires onClick", () => {
    const onClick = vi.fn();
    render(<GoabButton onClick={onClick}>Continue</GoabButton>);
    const btn = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
    cleanup();
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <GoabButton onClick={onClick} disabled>
        Disabled
      </GoabButton>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
    cleanup();
  });
});

describe("GoabBadge", () => {
  it("renders its content", () => {
    render(<GoabBadge type="success" content="Approved" />);
    expect(screen.getByText("Approved")).toBeInTheDocument();
    cleanup();
  });
});

describe("GoabInput", () => {
  it("fires onChange with the typed value", () => {
    const onChange = vi.fn();
    render(<GoabInput name="email" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "a@b.ca" } });
    expect(onChange).toHaveBeenCalled();
    cleanup();
  });
});

describe("GoabCheckbox", () => {
  it("toggles and reports the new checked state", () => {
    const onChange = vi.fn();
    render(<GoabCheckbox name="agree" text="I agree" onChange={onChange} />);
    fireEvent.click(screen.getByText("I agree"));
    expect(onChange).toHaveBeenCalled();
    cleanup();
  });
});

describe("Icon", () => {
  it("renders an <svg> for a known icon name", () => {
    const { container } = render(<Icon name="GoaMenuVariantBasic" size={24} />);
    expect(container.querySelector("svg")).toBeTruthy();
    cleanup();
  });

  it("renders nothing for an unknown icon name", () => {
    const { container } = render(<Icon name="DefinitelyNotAnIcon" />);
    expect(container.querySelector("svg")).toBeNull();
    cleanup();
  });
});
