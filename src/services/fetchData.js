const apiKey = "FLMQVEZ7MH8D2NFYTQNUB99V9";

export function fetchData(location) {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`,
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
