const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const weatherMain = document.getElementById('weather-main');
const loadingDiv = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

// DOM Elements for weather data
const cityNameEl = document.getElementById('city-name');
const dateTimeEl = document.getElementById('date-time');
const tempEl = document.getElementById('temperature');
const weatherIconEl = document.getElementById('weather-icon');
const weatherDescEl = document.getElementById('weather-desc');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const pressureEl = document.getElementById('pressure');

// WMO Weather code mapping
const weatherCodes = {
    0: { desc: 'Clear sky', icon: 'fa-sun', class: 'sunny' },
    1: { desc: 'Mainly clear', icon: 'fa-sun', class: 'sunny' },
    2: { desc: 'Partly cloudy', icon: 'fa-cloud-sun', class: 'cloudy' },
    3: { desc: 'Overcast', icon: 'fa-cloud', class: 'cloudy' },
    45: { desc: 'Fog', icon: 'fa-smog', class: 'cloudy' },
    48: { desc: 'Depositing rime fog', icon: 'fa-smog', class: 'cloudy' },
    51: { desc: 'Light drizzle', icon: 'fa-cloud-rain', class: 'rainy' },
    53: { desc: 'Moderate drizzle', icon: 'fa-cloud-rain', class: 'rainy' },
    55: { desc: 'Dense drizzle', icon: 'fa-cloud-showers-heavy', class: 'rainy' },
    56: { desc: 'Light freezing drizzle', icon: 'fa-cloud-meatball', class: 'rainy' },
    57: { desc: 'Dense freezing drizzle', icon: 'fa-cloud-meatball', class: 'rainy' },
    61: { desc: 'Slight rain', icon: 'fa-cloud-rain', class: 'rainy' },
    63: { desc: 'Moderate rain', icon: 'fa-cloud-rain', class: 'rainy' },
    65: { desc: 'Heavy rain', icon: 'fa-cloud-showers-heavy', class: 'rainy' },
    66: { desc: 'Light freezing rain', icon: 'fa-cloud-meatball', class: 'rainy' },
    67: { desc: 'Heavy freezing rain', icon: 'fa-cloud-meatball', class: 'rainy' },
    71: { desc: 'Slight snow fall', icon: 'fa-snowflake', class: 'snowy' },
    73: { desc: 'Moderate snow fall', icon: 'fa-snowflake', class: 'snowy' },
    75: { desc: 'Heavy snow fall', icon: 'fa-snowflake', class: 'snowy' },
    77: { desc: 'Snow grains', icon: 'fa-snowflake', class: 'snowy' },
    80: { desc: 'Slight rain showers', icon: 'fa-cloud-sun-rain', class: 'rainy' },
    81: { desc: 'Moderate rain showers', icon: 'fa-cloud-showers-heavy', class: 'rainy' },
    82: { desc: 'Violent rain showers', icon: 'fa-cloud-showers-water', class: 'rainy' },
    85: { desc: 'Slight snow showers', icon: 'fa-snowflake', class: 'snowy' },
    86: { desc: 'Heavy snow showers', icon: 'fa-snowflake', class: 'snowy' },
    95: { desc: 'Thunderstorm', icon: 'fa-bolt', class: 'rainy' },
    96: { desc: 'Thunderstorm with slight hail', icon: 'fa-bolt', class: 'rainy' },
    99: { desc: 'Thunderstorm with heavy hail', icon: 'fa-bolt', class: 'rainy' }
};

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getCoordinates(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getCoordinates(city);
        }
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // Reverse geocoding to get city name
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
                    .then(res => res.json())
                    .then(data => {
                        const cityName = data.city || data.locality || "Your Location";
                        getWeather(lat, lon, cityName);
                    })
                    .catch(() => {
                        getWeather(lat, lon, "Your Location");
                    });
            },
            (error) => {
                showError("Unable to retrieve your location.");
            }
        );
    } else {
        showError("Geolocation is not supported by your browser.");
    }
});

async function getCoordinates(city) {
    showLoading();
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const locName = result.admin1 ? `${result.name}, ${result.admin1}` : `${result.name}, ${result.country}`;
            getWeather(result.latitude, result.longitude, locName);
        } else {
            showError("City not found. Please check the spelling and try again.");
        }
    } catch (error) {
        showError("Failed to fetch location data.");
    }
}

async function getWeather(lat, lon, cityName) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m&timezone=auto`);
        const data = await response.json();
        
        updateUI(data.current, cityName);
    } catch (error) {
        showError("Failed to fetch weather data.");
    }
}

function updateUI(currentData, cityName) {
    hideLoading();
    errorMessage.classList.add('hidden');
    weatherMain.classList.remove('hidden');

    cityNameEl.textContent = cityName;
    
    // Format date and time
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
    dateTimeEl.textContent = now.toLocaleDateString('en-US', options);

    tempEl.textContent = Math.round(currentData.temperature_2m);
    feelsLikeEl.textContent = `${Math.round(currentData.apparent_temperature)}°C`;
    humidityEl.textContent = `${currentData.relative_humidity_2m}%`;
    windSpeedEl.textContent = `${currentData.wind_speed_10m} km/h`;
    pressureEl.textContent = `${currentData.surface_pressure} hPa`;

    const weatherInfo = weatherCodes[currentData.weather_code] || { desc: 'Unknown', icon: 'fa-cloud', class: 'cloudy' };
    
    // Check if it's night for clear sky / partly cloudy
    if (currentData.is_day === 0) {
        if (weatherInfo.icon === 'fa-sun') weatherInfo.icon = 'fa-moon';
        if (weatherInfo.icon === 'fa-cloud-sun') weatherInfo.icon = 'fa-cloud-moon';
        document.body.className = 'cloudy'; // Use darker theme for night
    } else {
        document.body.className = weatherInfo.class;
    }

    weatherIconEl.className = `fas ${weatherInfo.icon}`;
    weatherDescEl.textContent = weatherInfo.desc;
}

function showLoading() {
    weatherMain.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingDiv.classList.remove('hidden');
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError(msg) {
    hideLoading();
    weatherMain.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorText.textContent = msg;
}

// Initial default city load (optional)
// getCoordinates('London');
