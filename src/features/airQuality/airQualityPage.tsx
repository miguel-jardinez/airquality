import { useAirQuality } from '@quality/features/airQuality/hooks/useAirQuality';
import {
  Map,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ResourcesStatus } from '@quality/utils/Resources';
import { QaMarkerLocation } from '@quality/components';
import { useMapControl } from '@quality/features/airQuality/hooks/useMapControl';
import { QaDrawerLocation } from '@quality/components/qaDrawerLocation/qaDrawerLocation';

export const AirQualityPage = () => {
  const {
    coordinates,
    location,
  } = useMapControl();

  const {
    handleOpenLocation,
    isOpen,
    onClose,
    currentLocation,
  } = useAirQuality();

  if (
    location.status !== ResourcesStatus.SUCCESS
    || !coordinates
  ) return;

  const locations = location.data.data.results;

  return (
    <>
      <QaDrawerLocation
        currentLocation={currentLocation ?? undefined}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Map
        id="mainMap"
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          zoom: 10,
        }}
        maxZoom={20}
        minZoom={3}
        style={{ width: '100vw', height: '100vh', padding: 0 }}
      >
        {
            locations.map((location) => (
              <QaMarkerLocation
                onClick={() => handleOpenLocation(location.id)}
                key={location.id}
                longitude={location.coordinates.longitude}
                latitude={location.coordinates.latitude}
              />
            ))
          }
      </Map>
    </>
  );
};
