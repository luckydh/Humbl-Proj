import Leaflet, { LatLngTuple } from "leaflet";
import { AccountType } from "generated/graphql";

const southPole: LatLngTuple = [-90.0, 0.0];

const stringToLatLng = (s: string | undefined): LatLngTuple => {
  if (s) {
    const latLngString = s.split(",");
    return [parseFloat(latLngString[0]), parseFloat(latLngString[1])];
  }
  // if we don't have a string return the south pole coords as a default?
  return southPole;
};

const calculateDistance = (first: LatLngTuple, second: LatLngTuple): number => {
  const latLine = first[0] - second[0];
  const lngLine = first[1] - second[1];
  return Math.sqrt(Math.pow(latLine, 2) + Math.pow(lngLine, 2));
};

// use this to sort based on distance
const sortByDistance = (merchants: AccountType[], currentLocation: LatLngTuple): AccountType[] => merchants.slice().sort((m1: AccountType, m2: AccountType) => {
    const loc1 = stringToLatLng(m1.merchantProfileDetails?.geom);
    const loc2 = stringToLatLng(m2.merchantProfileDetails?.geom);

    if (loc1[0] !== southPole[0] && loc2[0] !== southPole[0]) {
      if (calculateDistance(loc1, currentLocation) < calculateDistance(loc2, currentLocation)) return 1;
      if (calculateDistance(loc1, currentLocation) > calculateDistance(loc2, currentLocation)) return -1;
      return 0;
    }
    // if we don't have a tuple then don't change its position
    return 0;
  });

const setSearchParams = ({ mapState, url }: { mapState: Leaflet.Map; url: Location }) => {
  const mapBounds = mapState?.getBounds();
  const zoomLevel = mapState?.getZoom();
  const mapCenterObj = mapState?.getCenter();
  const mapCenter = [mapCenterObj?.lat, mapCenterObj?.lng];
  const firstObj = mapBounds?.getNorthEast();
  const firstCoordinate = [firstObj?.lng, firstObj?.lat];
  const secondObj = mapBounds?.getSouthWest();
  const secondCoordinate = [secondObj?.lng, secondObj?.lat];
  const params = new URLSearchParams(url.search);
  params.set("mapCenter", `${mapCenter}`);
  params.set("firstCoordinate", `${firstCoordinate}`);
  params.set("secondCoordinate", `${secondCoordinate}`);
  params.set("zoomLevel", `${zoomLevel}`);
  const newUrl = `${url.origin}${url.pathname}?${params}`;
  const pageTitle = document.title ?? "";
  window.history.replaceState({}, pageTitle, newUrl.toString());
};

export { stringToLatLng, calculateDistance, sortByDistance, setSearchParams, southPole };
