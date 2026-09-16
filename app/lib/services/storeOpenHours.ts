export const isStoreOpen = (openTime: string, closeTime: string) => {
  const now = new Date();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);

  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
};