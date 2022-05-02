import { groupEventsInColumns, toHHMM } from "./helpers";

describe("toHHMM test Suite", () => {
  it("Should return something", () => {
    expect(toHHMM()).toBeDefined();
  });

  it("Should return 00:00", () => {
    expect(toHHMM(0)).toBe("00:00");
  });

  it("Should return 23:20", () => {
    expect(toHHMM(1400)).toBe("23:20");
  });
});

describe("groupEventsInColumns Test Suite", () => {
  
  it("Should return undefined", () => {
    expect(groupEventsInColumns()).not.toBeDefined();
  });

  it("Should return 0 columns", () => {
    expect(groupEventsInColumns([])).toEqual([]);
  });

  it("Should return 1 column", () => {
    let events = [
      {
        id: 1,
        start: "09:00",
        duration: 15,
      },
    ];
    let expectedResult = [
      [
        {
          id: 1,
          start: "09:00",
          duration: 15,
          startTimeInMinutes: 540,
        },
      ],
    ];
    expect(groupEventsInColumns(events)).toEqual(expectedResult);
  });

  it("Should return 3 columns", () => {
    let events = [
      {
        id: 1,
        start: "09:00",
        duration: 180,
      },
      {
        id: 2,
        start: "10:25",
        duration: 90,
      },
      {
        id: 3,
        start: "11:15",
        duration: 15,
      },
    ];
    let expectedResult = [
      [
        {
          id: 1,
          start: "09:00",
          duration: 180,
          startTimeInMinutes: 540,
        },
      ],
      [
        {
          id: 2,
          start: "10:25",
          duration: 90,
          startTimeInMinutes: 625,
        },
      ],
      [
        {
          id: 3,
          start: "11:15",
          duration: 15,
          startTimeInMinutes: 675,
        },
      ],
    ];
    expect(groupEventsInColumns(events)).toEqual(expectedResult);
  });
});
