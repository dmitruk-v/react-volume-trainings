
const GeolocationService = () => {
  if (navigator.geolocation === undefined) {
    throw new Error("Use of GeolocationService in environment, where navigator.geolocation is not available.");
  }

  return {
    getCurrentPosition(): Promise<GeolocationPosition> {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
  }
}

export { GeolocationService }