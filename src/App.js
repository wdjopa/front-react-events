import { useEffect, useRef, useState } from "react";
import "./App.css";
import CalendarEvent from "./components/CalendarEvent";
import { BORDER_WIDTH, MAX_SHOWED_TIME_IN_MINUTES, MIN_SHOWED_TIME_IN_MINUTES } from "./constants";
import { listOfEvents } from "./data/mock_data";
import { groupEventsInColumns } from "./utils/helpers";

function App() {
  const [columns, setColumns] = useState([]);
  const [columnWidth, setColumnWidth] = useState();
  const [heightPerMinute, setHeightPerMinute] = useState();
  const ref = useRef(null);

  useEffect(() => {
    setColumns(groupEventsInColumns(listOfEvents));
  }, []);

  useEffect(() => {
    resize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, ref]);

  const resize = () => {
    if (columns.length > 0 && ref.current) {
      // get the width of the container
      let totalWidth = ref.current.offsetWidth;
      // get the height of the container
      let totalHeight = ref.current.offsetHeight;
      // find highest duration time in minutes (from 9:00 AM to 9:00 PM)
      let maxDuration = MAX_SHOWED_TIME_IN_MINUTES - MIN_SHOWED_TIME_IN_MINUTES;

      setColumnWidth(totalWidth / columns.length);
      setHeightPerMinute(totalHeight / maxDuration);
    }
  };

  // This resize listener event is used to resize CalendarEvents when the window will be resized
  window.addEventListener("resize", () => {
    resize();
  });

  return (
    <div className="container" ref={ref} data-testid={"container"}>
      {columns.map((eventsInColumn, columnIndex) => {
        // Each column has events that don't overlap each other
        return eventsInColumn.map((event) => {
          // Now we render each event.
          let style = {
            left: columnWidth * columnIndex + "px",
            top: heightPerMinute * (event.startTimeInMinutes - MIN_SHOWED_TIME_IN_MINUTES) + "px",
            width: columnWidth - BORDER_WIDTH * 2 + "px",
            height: event.duration * heightPerMinute - BORDER_WIDTH * 2 + "px",
            border: BORDER_WIDTH + "px solid black",
          };
          return <CalendarEvent event={event} style={style} key={event.id} />;
        });
      })}
    </div>
  );
}

export default App;
