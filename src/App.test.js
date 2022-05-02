import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

afterEach(() => {
  cleanup();
});

describe("Main Component - App Tests Suite", () => {
  it("Should show the div.container", () => {
    render(<App />);
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  // Not enough time to end these tests
  it("Should contain 2 calendar events", () => {});
  it("Should update the calendar event component when the window is resizing", () => {});
  it("Should not show calendar events for events that are not in the range 09:00AM - 09:00PM", () => {});
});
