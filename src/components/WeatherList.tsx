import React, { useState, useCallback } from 'react';
import { Grid, Button, Input, Typography } from '@mui/material';
import { WeatherCard } from './WeatherCard';
import { weatherData, Weather, WeatherUnit, NO_WEATHER } from '../utils';

export const WeatherList: React.FC = () => {
    const [unit, setUnit] = useState<WeatherUnit>('C');
    const [searchValue, setSearchValue] = useState('');
    const [weather, setWeather] = useState<Weather>(weatherData[5]);
    const [favorites, setFavorites] = useState<Map<number, Weather>>(new Map<number, Weather>());

    const handleClearSearch = () => {
        setSearchValue('');
    };
    
    const handleRemoveFavorite = useCallback((cityId: number) => {
        // Quick and dirty way to invalidate the state
        const favs = new Map(favorites);

        if (favs.has(cityId)) {
            favs.delete(cityId);
        }

        setFavorites(favs);
    }, [favorites]);
    
    const handleAddFavorite = useCallback((cityId: number) => {
        const favs = new Map(favorites);
        const weatherIdx = weatherData.findIndex((val) => { 
            return val.id === cityId;
        });
        if (!favs.has(cityId) && weatherIdx >= 0) {
            favs.set(cityId, weatherData[weatherIdx]);
        } else {
            console.warn(`${cityId} already in favorites`);
        }

        setFavorites(favs);
    }, [favorites]);
    
    const handleChangeUnit = () => {
        if (unit === 'C') {
            setUnit('F')
        } else {
            setUnit('C')
        }
    };
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldValue = `${event.currentTarget.value}`;
        setSearchValue(fieldValue);
        
        const weatherIdx = weatherData.findIndex((val) => { 
            return val.city.toLocaleLowerCase().includes(fieldValue.toLocaleLowerCase())
        });

        if (weatherIdx >= 0) {
            setWeather(weatherData[weatherIdx]);    
        } else {
            setWeather(NO_WEATHER);
        }
    };

    const favs = useCallback(() => {
        const favArr: JSX.Element[] = [];

        favorites.forEach(f => {
            const card = (
                <WeatherCard 
                    key={`city${f.id}`}
                    unit={unit}
                    cityId={f.id} 
                    weather={f} 
                    isFavorite={true}
                    onAddFavorite={handleAddFavorite}
                    onRemoveFavorite={handleRemoveFavorite}
                />
            );
            favArr.push(card);
        });

        return favArr;
    }, [favorites, handleAddFavorite, handleRemoveFavorite, unit]);

    return (
        <Grid>
            <Grid container justifyContent="center" alignContent="center">
                <Grid item container justifyContent="center" spacing={1}>
                    <Grid item>
                        <Input type="text" value={searchValue} placeholder='Search City' onChange={handleSearchChange} />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success"  onClick={handleClearSearch}>Clear Search</Button>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center">
                    <Grid item>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>City</th>
                                <th>Temperatire</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <WeatherCard 
                                    unit={unit}
                                    cityId={weather.id} 
                                    weather={weather} 
                                    isFavorite={favorites.has(weather.id)}
                                    onAddFavorite={handleAddFavorite}
                                    onRemoveFavorite={handleRemoveFavorite}
                                />
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Button variant="contained" color="success"  onClick={handleChangeUnit}>Change to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <hr color='green' style={{ 'width': '80%' }} />
                </Grid>
                <Grid item container justifyContent="center">
                    <Grid item xs={8}>
                        <Typography variant="h4">Favorites</Typography>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>City</th>
                                <th>Temperatire</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    favs()
                                }
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
)};