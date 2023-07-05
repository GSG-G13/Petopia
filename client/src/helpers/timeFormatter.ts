const formatTime = (timestamp: string | Date) => {
  const now = new Date();
  let formatted = timestamp;
  formatted = new Date(timestamp);
  const createdAtDate = new Date(formatted);
  const difference = now.getTime() - createdAtDate.getTime();

  if (difference < 1000) {
    return 'just now';
  }
  if (difference < 60 * 1000) {
    const seconds = Math.floor(difference / 1000);
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }
  if (difference < 60 * 60 * 1000) {
    const minutes = Math.floor(difference / (60 * 1000));
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  if (difference < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(difference / (60 * 60 * 1000));
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  const days = Math.floor(difference / (24 * 60 * 60 * 1000));
  return `${days} day${days === 1 ? '' : 's'} ago`;
};
export default formatTime;
