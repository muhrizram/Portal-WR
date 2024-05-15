export function calculateTimeDifference(startTime, endTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  if (!start || !end) {
    return 0;
  }

  const startHour = start.hours + start.minutes / 60;
  const endHour = end.hours + end.minutes / 60;

  const diff = endHour - startHour;
  const wholeHours = Math.floor(diff);

  const endParts = endTime.split(":");
  const endHours = parseInt(endParts[0]);
  const endMinutes = parseInt(endParts[1]);

  const threeQuarterHours = wholeHours + 0.75;
  const midHours = wholeHours + 0.5;

  if (endHours === 23) {
    if (endMinutes >= 30 && endMinutes < 45) {
      return midHours;
    } else if (endMinutes >= 45) {
      return threeQuarterHours;
    } else {
      return wholeHours;
    }
  }

  if (endHours < 23) {
    return Math.max(0, wholeHours);
  }
}

export function parseTime(time) {
  const timeRegex = /^(\d{1,2}):(\d{2}):(\d{2})$/;

  const match = time.match(timeRegex);

  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    return { hours, minutes };
  }

  return null;
}
