import { Marker } from 'react-map-gl';

interface QaMarkerProps {
  longitude: number,
  latitude: number,
  onClick: () => void;
}

export const QaMarkerLocation: React.FC<QaMarkerProps> = ({
  latitude, longitude, onClick,
}) => (
  <Marker
    onClick={onClick}
    longitude={longitude}
    latitude={latitude}
    style={{ cursor: 'pointer' }}
  />
);
