import React from 'react';
import { Button } from '@mui/material';
import { Weather, cToFDegress, WeatherUnit } from '../utils';

export interface WeatherCardProps {
    cityId: number;
    weather: Weather;
    unit: WeatherUnit;
    onAddFavorite: (cityId: number) => void;
    onRemoveFavorite: (cityId: number) => void;
    isFavorite: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
    cityId,
    weather,
    unit = 'C',
    onAddFavorite,
    onRemoveFavorite,
    isFavorite,
}: WeatherCardProps) => {

    const onActionClick = () => {
        if (isFavorite) {
            onRemoveFavorite(cityId)
        } else {
            onAddFavorite(cityId)
        }
    };

    const actionText = isFavorite ? 'Remove from' : 'Add to';
    const temperature = unit === 'C' ? weather.temperature : cToFDegress(weather.temperature);
    return (
    <tr>
        <td>{cityId}</td>
        <td>{weather.city}</td>
        <td>{temperature}</td>
        <td>{weather.description}</td>
        <td>
            <Button disabled={cityId < 1} onClick={onActionClick} variant="outlined" color={isFavorite ? "error" : "success"}>
                {actionText} Favorites
            </Button>
        </td>
    </tr>
    );
}; 