export interface Weather {
    id: number;
    city: string;
    temperature: number;
    description: string;
}

export type WeatherUnit = 'C' | 'F';

export function cToFDegress(temp: number): number {
    return (temp * (9/5)) + 32;
}

export const NO_WEATHER: Weather = {
    id: 0,
    city: 'No City Found',
    temperature: 0,
    description: '',
}

export const weatherData: Weather [] = [
    {
        id: 1,
        city: 'New York',
        temperature: 15,
        description: 'Cold',
    },
    {
        id: 2,
        city: 'Tokyo',
        temperature: 25,
        description: 'Rainy',
    },
    {
        id: 3,
        city: 'Raleigh',
        temperature: 45,
        description: 'Hot',
    },
    {
        id: 4,
        city: 'Los Angeles',
        temperature: 8,
        description: 'Cool',
    },
    {
        id: 5,
        city: 'London',
        temperature: 18,
        description: 'Foggy',
    },
    {
        id: 6,
        city: 'Moscow',
        temperature: 5,
        description: 'Snowy',
    },
];