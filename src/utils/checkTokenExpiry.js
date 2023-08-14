const checkTokenExpiry = () => {
  const token = window.sessionStorage.getItem("token");
  const expiresIn = Number(window.sessionStorage.getItem("expiresIn"));
  const storedTimestamp = Number(window.sessionStorage.getItem("timestamp"));

  if (!token || !expiresIn || !storedTimestamp) {
    return false;
  }

  const currentTime = Date.now();
  const expirationTime = storedTimestamp + expiresIn * 60 * 1000; // Converting expiresIn to milliseconds

  return currentTime < expirationTime;
};

export default checkTokenExpiry;
