export const toHHMM = (durationInMinutes) => {
  if (durationInMinutes === undefined || Number.isNaN(durationInMinutes)) return "";
  var hours = Math.floor(durationInMinutes / 60).toFixed(0);
  var minutes = (durationInMinutes % 60).toFixed(0);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};

// get events from JSON, then get cols to render
export function groupEventsInColumns(datas) {
  if (datas === undefined || !Array.isArray(datas)) {
    return undefined;
  }

  if (datas.length === 0) {
    return [];
  }
  
  let events = datas
    .map((e) => {
      let digits = e.start.split(":").map(Number);
      e.startTimeInMinutes = digits[0] * 60 + digits[1];
      return e;
    })
    .sort((a, b) => {
      if (a.startTimeInMinutes === b.startTimeInMinutes) {
        return b.duration - a.duration;
      } else {
        return a.startTimeInMinutes - b.startTimeInMinutes;
      }
    });



  // cols are the columns that will be print on screen
  // each column (cols[i]) is a list of events that will be printed in this column
  let cols = [];
  cols[0] = []; // Initialisation of the first column
  cols[0][0] = events[0]; // The first event is added to the first column

  // totalDuration is the list of sum of durations + their initial time in minutes
  // totalDuration[i] is the sum of (event.duration + event.startTimeInMinutes) for all the events that are not in cols[i]
  let totalDuration = [events[0].duration + events[0].startTimeInMinutes];
  for (let i = 1; i < events.length; i++) {
    let calendarEvent = events[i];
    let j = 0;
    let overlap_found = true;
    for (j = 0; j < totalDuration.length; j++) {
      if (calendarEvent.startTimeInMinutes >= totalDuration[j]) {
        totalDuration[j] = calendarEvent.duration + calendarEvent.startTimeInMinutes;
        overlap_found = false;
        break;
      }
    }
    if (overlap_found) {
      // Il ya superposition avec toutes les colonnes j de 0 à totalDuration.length - 1
      totalDuration.push(calendarEvent.startTimeInMinutes + calendarEvent.duration);
      cols[j] = [];
    }
    cols[j].push(calendarEvent);
  }

  return cols;
}
