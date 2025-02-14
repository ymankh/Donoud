export function formatDate(date: Date = new Date()): string {
    let hours = date.getHours();
    let amOrPm = "AM";
  
    if (hours === 0) {
      hours = 12;
    } else if (hours >= 12) {
      amOrPm = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    }
  
    const minutes = date.getMinutes().toString().padStart(2, "0"); 
    return `${hours}:${minutes} ${amOrPm}`;
  }
  