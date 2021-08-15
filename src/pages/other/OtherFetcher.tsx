import { useEffect } from "react";
import { GeolocationService } from "../../shared/services";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const OtherFetcher = (props: Props) => {

  useEffect(() => {
    const geolocationService = GeolocationService();

    fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));

    // geolocationService.getCurrentPosition()
    //   .then(position => {
    //     const requestUri = `https://www.metaweather.com/api/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`;
    //     return fetch(requestUri);
    //   })
    //   .then(res => {
    //     console.log(res);
    //     return res.text();
    //   })
    //   .then(console.log)
    //   .catch(console.log);
  }, []);

  return (
    <div>Fetcher !</div>
  );
}

export { OtherFetcher };