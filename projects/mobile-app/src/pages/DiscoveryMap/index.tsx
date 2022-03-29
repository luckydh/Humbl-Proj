import React, { useState, useEffect } from "react";
import { AccountType, useGetAccountsByGeomLazyQuery } from "generated/graphql";
import Leaflet, { LatLngTuple } from "leaflet";
import { useTranslation } from "react-i18next";
import Button from "components/Button/Button";
import Map from "components/Map/Map";
import GeolocationClass from "../../geolocation/getLocation";
import { useHistory } from "react-router-dom";
import { Loading } from "components/Loading";
import { sortByDistance, southPole, stringToLatLng, setSearchParams } from "../../geolocation/geomCalculations";

import "./styles.scss";
import "leaflet/dist/leaflet.css";
import { UserItem } from "components/UserItem/UserItem";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { captureException } from "ErrorLogger";

// more global'ish vars. (They don't change so lets keep them outside the component)
const url = window.location;
const initialZoom = 12;
const sanDiego: LatLngTuple = [32.715736, -117.161087];

// function to fetch location. Placed here so as to avoid re-rendering function
const fetchLocation = async () => {
  try {
    const geo = new GeolocationClass();
    const positionObj = await geo.getCurrentPosition();
    return positionObj;
  } catch (e) {
    // mostly we just want to swallow this error.
    captureException(e);
    return null;
  }
};

// Start of the component //
const DiscoveryMap: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(southPole);
  const [zoomLevel, setZoomLevel] = useState<number>(initialZoom);
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>("");
  const [hasMapChanged, setMapChanged] = useState(false);
  const [mapState, setMapState] = useState<Leaflet.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(southPole);
  const [getMerchants, { data: merchantData, error: getMerchantsError }] = useGetAccountsByGeomLazyQuery();

  // initialize with either my location or params
  useEffect(() => {
    let fetchingLocation = true;
    setLoadingLocation(true);
    if (fetchingLocation) {
      // grab params that are relevant
      const params = new URLSearchParams(url.search);
      const oldMapCenter: LatLngTuple = stringToLatLng(params.get("mapCenter") || undefined);

      // initialize a variable to a value we know
      let fetchedLocation = southPole;
      const locFetch = async () => {
        const locationObj = await fetchLocation();
        if (locationObj) {
          setLoadingLocation(false);
          fetchedLocation = [locationObj.coords.latitude, locationObj.coords.longitude];
          setCurrentLocation(fetchedLocation);
          // prefer params
          oldMapCenter && oldMapCenter[0] !== southPole[0] ? setMapCenter(oldMapCenter) : setMapCenter(fetchedLocation);
        } else {
          setLoadingLocation(false);
          setCurrentLocation(sanDiego);
          setMapCenter(sanDiego);
        }
      };
      locFetch();
      const oldZoomLevelString = params.get("zoomLevel");
      const oldZoomLevel = oldZoomLevelString ? parseInt(oldZoomLevelString, 10) : initialZoom;
      setZoomLevel(oldZoomLevel);
    }
    return () => {
      setLoadingLocation(false);
      fetchingLocation = false;
    };
  }, []);

  // on every map change we want to update params, set appropriate states
  // possibly we should consider doing only the params. State causes re-renders
  const onMapChange = (map: Leaflet.Map) => {
    setMapChanged(true);
    setMapState(map);
    const zoom = map.getZoom();
    setZoomLevel(zoom);
    setSearchParams({ mapState: map, url });
  };

  // run merchant Query everytime we update the map
  useEffect(() => {
    let runQuery = true;
    if (runQuery && hasMapChanged) {
      runQuery = false;
      const fetchMerchants = async () => {
        const mapBounds = mapState?.getBounds();
        const firstObj = mapBounds?.getNorthEast();
        const firstCoordinate: LatLngTuple = [firstObj?.lng || 0, firstObj?.lat || 0];
        const secondObj = mapBounds?.getSouthWest();
        const secondCoordinate: LatLngTuple = [secondObj?.lng || 0, secondObj?.lat || 0];
        if (firstCoordinate && secondCoordinate) {
          await getMerchants({
            variables: { geom: { firstCoordinate, secondCoordinate } },
          });
        }
      };
      fetchMerchants();
      setMapChanged(false);
    }
    return () => {
      runQuery = false;
    };
  }, [mapState, getMerchants, hasMapChanged]);

  let merchants: Array<AccountType> | [] = [];
  if (merchantData?.searchAccountsByGeom) {
    merchants = merchantData?.searchAccountsByGeom;
  }

  const handleWidenSearch = () => {
    if (zoomLevel > 0) {
      setZoomLevel(zoomLevel - 1);
    }
  };

  const handleMerchantClick = (id: string) => {
    trackEvent(EVENTS.SELECT_STORE, { accountId: id });
    // this will take us to merchant page.
    history.push(`/account/${id}`);
  };

  const renderWidenSearch = (): JSX.Element => (
    <div className=" text-white text-center text-2xl justify-center mt-12">
      <div>{t("discovery-page.no-results-found")}</div>
      <div className="flex mt-8 justify-center">
        <Button size="small" onClick={handleWidenSearch}>
          {t("discovery-page.widen-search-radius")}
        </Button>
      </div>
    </div>
  );

  // This should be its own component at this point. Pretty beefy. maybe it could be slimmed down?
  const renderMerchants = (merchantList: Array<AccountType>): JSX.Element[] | JSX.Element => {
    if (merchantList.length > 0 && !getMerchantsError) {
      return merchantList.map(({ displayName, image, userName, id }) => (
        <div className="my-4" key={`${id}-${displayName}`}>
          <UserItem
            name={displayName}
            src={image}
            userName={userName}
            onClick={() => handleMerchantClick(id)}
            size="small"
          />
        </div>
      ));
    }
    if (merchantList.length === 0 && !getMerchantsError) {
      return renderWidenSearch();
    }
    return renderWidenSearch();
  };

  const handleMarkerClick = (id: string) => {
    setSelectedMerchantId(id);
  };

  const removeFilter = () => {
    setSelectedMerchantId("");
  };

  // sort the merchants. Also filter to one when we click on map.
  let sortedMerchants = sortByDistance(merchants, mapCenter);
  if (selectedMerchantId) {
    const foundMerchant = sortedMerchants.find((merchant) => merchant?.id === selectedMerchantId);

    if (foundMerchant) {
      sortedMerchants = [foundMerchant];
    }
  }

  return (
    <>
      <div className=" flex flex-col bg-lines flex-1">
        <div className="flex items-center justify-center" />
        <div className="relative w-full h-full text-center border-blue-light border-solid border-b-4">
          {loadingLocation && (
            <div className="w-full h-full bg-blue-dark flex items-center justify-center">
              <Loading loading={loadingLocation} />
            </div>
          )}
          {mapCenter[0] !== southPole[0] && !loadingLocation && (
            <Map
              Center={mapCenter}
              onChange={onMapChange}
              onMarkerClick={handleMarkerClick}
              mapClick={removeFilter}
              data={merchants}
              zoom={zoomLevel}
              initialZoom={initialZoom}
              currentLocation={currentLocation}
            />
          )}
        </div>
      </div>
      <div className="px-4 overflow-y-auto flex-1">{renderMerchants(sortedMerchants)}</div>
    </>
  );
};

export default DiscoveryMap;
