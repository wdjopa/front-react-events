import { toHHMM } from "../utils/helpers";

function CalendarEvent({ event, style }) {
  const textToShow = event.start + " - " + toHHMM(event.startTimeInMinutes + event.duration);
  return (
    <div className="calendar_event" style={style} title={textToShow} data-testid={"event"}>
      {textToShow}
    </div>
  );
}

export default CalendarEvent;
