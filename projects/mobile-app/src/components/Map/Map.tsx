import Leaflet, { LatLngTuple } from "leaflet";
import React, { FC, useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { AccountType } from "generated/graphql";
import { setSearchParams, stringToLatLng } from "geolocation/geomCalculations";
import TargetIcon from "../../assets/svgs/TargetIcon";
import { ReactComponent as CustomMarker } from "../../assets/svgs/customMarker.svg";
import "leaflet/dist/leaflet.css";
import "./styles.scss";

export interface MapProps {
  Center: LatLngTuple;
  data: Array<AccountType> | [];
  onChange: Function;
  currentLocation: LatLngTuple;
  onSubmit?: (value: number) => void;
  zoom?: number;
  initialZoom?: number;
  onMarkerClick?: (id: string) => void;
  mapClick?: Function;
}

type RenderMapMarkersType = {
  data: Array<AccountType>;
  onClick?: (id: string) => void;
};

interface MyComponentProps {
  onMoveMap: Function;
  onMapClick?: Function;
  zoom: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ onMoveMap, zoom, onMapClick }) => {
  const staticMap = useMap();

  useEffect(() => {
    let adjustZoom = true;
    if (adjustZoom && zoom) {
      staticMap.setZoom(zoom);
      adjustZoom = false;
    }
    return () => {
      adjustZoom = false;
    };
  }, [zoom, staticMap]);

  const mapEvent = useMapEvents({
    click() {
      if (onMapClick) {
        onMapClick();
      }
    },
    dragend: () => {
      onMoveMap(mapEvent);
    },
    zoomend: () => {
      onMoveMap(mapEvent);
    },
  });
  return null;
};

interface ReCenterButtonProps {
  map: Leaflet.Map;
  currentLocation: LatLngTuple;
  zoom: number;
}

const ReCenterButton: React.FC<ReCenterButtonProps> = ({ map, currentLocation, zoom }) => {
  const recenterPress = () => {
    const url = window.location;
    setSearchParams({ mapState: map, url });
    map.setView(currentLocation, zoom);
  };

  return (
    <button
      className={
        "bg-blue-dark active:bg-blue-light active:shadow-button-active flex justify-center items-center h-8 w-8 rounded-full"
      }
      id="recenter-button"
      onClick={recenterPress}>
      <TargetIcon />
    </button>
  );
};

const renderSelfMarker = (location: LatLngTuple) => {
  const customIcon = Leaflet.divIcon({
    html: ReactDOMServer.renderToString(<CustomMarker />),
    className: "border-none",
    iconSize: [34, 51],
    iconAnchor: [17, 51],
  });

  return <Marker position={location} icon={customIcon} />;
};

const renderMapMarkers = ({ data, onClick }: RenderMapMarkersType) => {
  const handleClick = (id: string) => {
    if (onClick) {
      onClick(id);
    }
  };

  return data.map((point) => {
    const customMarker = `<div class="map-icon bg-blue-dark w-8 h-8">
                            <img class="map-image rounded-full w-7 absolute m-0.5" alt="" src="${point.image}"/>
                          </div>`;
    const customIcon = Leaflet.divIcon({
      html: customMarker,
      className: "border-none",
      iconSize: [32, 35],
      iconAnchor: [16, 35],
    });
    const location = stringToLatLng(point.merchantProfileDetails?.geom);
    return (
      <Marker
        position={location}
        icon={customIcon}
        key={point.id}
        eventHandlers={{
          click: () => {
            handleClick(point.id);
          },
        }}>
        <Popup>{point.displayName}</Popup>
      </Marker>
    );
  });
};

export const Map: FC<MapProps> = ({
  Center,
  data,
  onChange,
  initialZoom,
  zoom,
  onMarkerClick,
  mapClick,
  currentLocation,
}) => {
  const [mapState, setMapState] = useState<Leaflet.Map | null>(null);
  const onWhenReady = (map: Leaflet.Map) => {
    map.invalidateSize();
    setMapState(map);
    onChange(map);
  };

  return (
    <>
      {mapState ? <ReCenterButton map={mapState} currentLocation={currentLocation} zoom={initialZoom || 15} /> : null}

      <MapContainer
        center={Center}
        zoom={initialZoom || 15}
        maxZoom={20}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        whenCreated={onWhenReady}
        touchZoom={"center"}
        zoomControl={false}>
        <MyComponent onMoveMap={onChange} zoom={zoom || 0} onMapClick={mapClick} />
        {renderMapMarkers({ data, onClick: onMarkerClick })}
        {renderSelfMarker(currentLocation)}
        <TileLayer
          maxZoom={20}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

export default Map;

Map.displayName = "Map";
