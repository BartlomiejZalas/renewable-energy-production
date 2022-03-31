import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Box } from '@mui/material';
import { useState } from 'react';

interface Props {
    value: { lat: number, lng: number };
    onChange: (position: { lat: number, lng: number }) => void;
    height?: number;
}

const LocationPickerMarker: React.FC<{ position: { lat: number, lng: number }, onChange: (position: { lat: number, lng: number }) => void }> = ({
                                                                                                                                                    position,
                                                                                                                                                    onChange
                                                                                                                                                }) => {
    useMapEvents({
        click(e) {
            onChange(e.latlng);
        },
    })
    return <Marker position={position}/>
}

export const MapInput: React.FC<Props> = ({value, onChange, height = 300}) => {
    const [position, setPosition] = useState<{ lat: number, lng: number }>(value);

    const handleOnChange = (position: { lat: number, lng: number }) => {
        setPosition(position);
        onChange(position);
    }

    return (
        <Box sx={{width: '100%', height}}>
            <MapContainer center={position} zoom={7} scrollWheelZoom={false} style={{width: '100%', height: '100%'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPickerMarker position={position} onChange={handleOnChange}/>
            </MapContainer>
        </Box>
    )
}