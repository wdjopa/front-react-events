/**
 * @jest-environment jsdom
 */

import CalendarEvent from "./CalendarEvent";
import { render, screen } from "@testing-library/react";
import { BORDER_WIDTH } from "../constants";

describe("CalendarEvent Tests Suite", () => {
  it("Should show an event calendar with time : 09:00 - 09:15", async () => {
    let style = {
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        border: BORDER_WIDTH + "px solid black",
      },
      event = {
        start: "09:00",
        duration: 15,
        startTimeInMinutes: 540,
      };
    render(<CalendarEvent event={event} style={style} />);

    expect(screen.getByTestId("event")).toHaveTextContent("09:00 - 09:15");
  });
});
