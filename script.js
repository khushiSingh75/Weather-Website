class WeatherApp {
  constructor() {
    this.API_KEY = "2b39824df88c0cfc278c7aeb978f5bae";
    this.BASE_URL = "https://api.openweathermap.org/data/2.5";
    this.FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
    
    this.initializeElements();
    this.initializeEventListeners();
    this.initializeTheme();
    this.updateDateTime();
    this.loadSearchHistory();
    
    // Update time every minute
    setInterval(() => this.updateDateTime(), 60000);
  }

  initializeElements() {
    // Input elements
    this.searchInput = document.getElementById('searchInput');
    this.searchBtn = document.getElementById('searchBtn');
    this.themeToggle = document.getElementById('themeToggle');
    this.locationBtn = document.getElementById('locationBtn');
    
    // Display sections
    this.loading = document.getElementById('loading');
    this.locationNotFound = document.getElementById('locationNotFound');
    this.currentWeather = document.getElementById('currentWeather');
    this.forecastSection = document.getElementById('forecastSection');
    this.hourlySection = document.getElementById('hourlySection');
    this.recentSearches = document.getElementById('recentSearches');
    this.searchChips = document.getElementById('searchChips');
    
    // Weather data elements
    this.cityName = document.getElementById('cityName');
    this.country = document.getElementById('country');
    this.dateTime = document.getElementById('dateTime');
    this.weatherImg = document.getElementById('weatherImg');
    this.temperature = document.getElementById('temperature');
    this.description = document.getElementById('description');
    this.feelsLike = document.getElementById('feelsLike');
    this.visibility = document.getElementById('visibility');
    this.humidity = document.getElementById('humidity');
    this.windSpeed = document.getElementById('windSpeed');
    this.pressure = document.getElementById('pressure');
    this.sunrise = document.getElementById('sunrise');
    this.sunset = document.getElementById('sunset');
    this.forecastContainer = document.getElementById('forecastContainer');
    this.hourlyContainer = document.getElementById('hourlyContainer');
  }

  initializeEventListeners() {
    this.searchBtn.addEventListener('click', () => this.handleSearch());
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
    
    // Search input focus events
    this.searchInput.addEventListener('focus', () => this.showRecentSearches());
    this.searchInput.addEventListener('blur', () => {
      setTimeout(() => this.hideRecentSearches(), 200);
    });
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('weatherapp-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('weatherapp-theme', newTheme);
    this.updateThemeIcon(newTheme);
  }

  updateThemeIcon(theme) {
    const icon = this.themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  async handleSearch() {
    const city = this.searchInput.value.trim();
    if (!city) return;
    
    this.showLoading();
    await this.getWeatherData(city);
    this.addToSearchHistory(city);
  }

  async getCurrentLocation() {
    if (!navigator.geolocation) {
      this.showError('Geolocation is not supported by this browser');
      return;
    }

    this.showLoading();
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await this.getWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        this.hideLoading();
        let message = 'Unable to get your location';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out';
            break;
        }
        this.showError(message);
      }
    );
  }

  async getWeatherData(city) {
    try {
      const [currentWeather, forecast] = await Promise.all([
        this.fetchCurrentWeather(city),
        this.fetchForecast(city)
      ]);

      if (currentWeather.cod === '404') {
        this.showLocationNotFound();
        return;
      }

      this.displayWeatherData(currentWeather, forecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.showError('Failed to fetch weather data. Please try again.');
    }
  }

  async getWeatherByCoordinates(lat, lon) {
    try {
      const [currentWeather, forecast] = await Promise.all([
        this.fetchCurrentWeatherByCoords(lat, lon),
        this.fetchForecastByCoords(lat, lon)
      ]);

      this.displayWeatherData(currentWeather, forecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.showError('Failed to fetch weather data. Please try again.');
    }
  }

  async fetchCurrentWeather(city) {
    const response = await fetch(
      `${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=metric`
    );
    return response.json();
  }

  async fetchCurrentWeatherByCoords(lat, lon) {
    const response = await fetch(
      `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
    );
    return response.json();
  }

  async fetchForecast(city) {
    const response = await fetch(
      `${this.FORECAST_URL}?q=${city}&appid=${this.API_KEY}&units=metric`
    );
    return response.json();
  }

  async fetchForecastByCoords(lat, lon) {
    const response = await fetch(
      `${this.FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
    );
    return response.json();
  }

  displayWeatherData(currentWeather, forecastData) {
    this.hideAllSections();
    
    // Update current weather
    this.updateCurrentWeather(currentWeather);
    
    // Update forecasts
    this.updateForecast(forecastData);
    this.updateHourlyForecast(forecastData);
    
    // Show weather sections
    this.currentWeather.classList.add('show');
    this.forecastSection.style.display = 'block';
    this.hourlySection.style.display = 'block';
  }

  updateCurrentWeather(data) {
    // Location info
    this.cityName.textContent = data.name;
    this.country.textContent = data.sys.country;
    
    // Temperature and description
    this.temperature.textContent = `${Math.round(data.main.temp)}°`;
    this.description.textContent = data.weather[0].description;
    this.feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;
    
    // Weather stats
    this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    this.humidity.textContent = `${data.main.humidity}%`;
    this.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    this.pressure.textContent = `${data.main.pressure} hPa`;
    
    // Sun times
    this.sunrise.textContent = this.formatTime(data.sys.sunrise);
    this.sunset.textContent = this.formatTime(data.sys.sunset);
    
    // Weather icon
    this.updateWeatherIcon(data.weather[0].main);
    
    // Update search input
    this.searchInput.value = data.name;
  }

  updateForecast(forecastData) {
    const dailyForecasts = this.processDailyForecast(forecastData.list);
    this.forecastContainer.innerHTML = '';
    
    dailyForecasts.slice(0, 5).forEach(day => {
      const forecastItem = this.createForecastItem(day);
      this.forecastContainer.appendChild(forecastItem);
    });
  }

  updateHourlyForecast(forecastData) {
    this.hourlyContainer.innerHTML = '';
    
    forecastData.list.slice(0, 8).forEach(hour => {
      const hourlyItem = this.createHourlyItem(hour);
      this.hourlyContainer.appendChild(hourlyItem);
    });
  }

  processDailyForecast(forecastList) {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date: date,
          temps: [],
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind.speed
        };
      }
      
      dailyData[date].temps.push(item.main.temp);
    });
    
    return Object.values(dailyData).map(day => ({
      ...day,
      maxTemp: Math.max(...day.temps),
      minTemp: Math.min(...day.temps)
    }));
  }

  createForecastItem(dayData) {
    const item = document.createElement('div');
    item.className = 'forecast-item';
    
    const dayName = this.formatDayName(dayData.date);
    const iconSrc = this.getWeatherIconPath(dayData.weather.main);
    
    item.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <img src="${iconSrc}" alt="${dayData.weather.description}" class="forecast-icon">
      <div class="forecast-temps">
        <span class="forecast-high">${Math.round(dayData.maxTemp)}°</span>
        <span class="forecast-low">${Math.round(dayData.minTemp)}°</span>
      </div>
      <div class="forecast-desc">${dayData.weather.description}</div>
    `;
    
    return item;
  }

  createHourlyItem(hourData) {
    const item = document.createElement('div');
    item.className = 'hourly-item';
    
    const time = this.formatHourTime(hourData.dt);
    const iconSrc = this.getWeatherIconPath(hourData.weather[0].main);
    
    item.innerHTML = `
      <div class="hourly-time">${time}</div>
      <img src="${iconSrc}" alt="${hourData.weather[0].description}" class="hourly-icon">
      <div class="hourly-temp">${Math.round(hourData.main.temp)}°</div>
    `;
    
    return item;
  }

  updateWeatherIcon(condition) {
    const iconPath = this.getWeatherIconPath(condition);
    this.weatherImg.src = iconPath;
    this.weatherImg.alt = condition;
  }

  getWeatherIconPath(condition) {
    const iconMap = {
      'Clear': '/assets/clearr.png',
      'Clouds': '/assets/cloudyy.png',
      'Rain': '/assets/rain.png',
      'Drizzle': '/assets/drizzle.png',
      'Snow': '/assets/snow.png',
      'Mist': '/assets/haze.png',
      'Haze': '/assets/haze.png',
      'Smoke': '/assets/haze.png',
      'Fog': '/assets/haze.png'
    };
    
    return iconMap[condition] || '/assets/default.png';
  }

  // Search History Management
  addToSearchHistory(city) {
    let history = this.getSearchHistory();
    
    // Remove if already exists (to avoid duplicates)
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    history.unshift(city);
    
    // Keep only last 5 searches
    history = history.slice(0, 5);
    
    localStorage.setItem('weatherapp-search-history', JSON.stringify(history));
    this.updateSearchChips();
  }

  getSearchHistory() {
    const history = localStorage.getItem('weatherapp-search-history');
    return history ? JSON.parse(history) : [];
  }

  loadSearchHistory() {
    this.updateSearchChips();
  }

  updateSearchChips() {
    const history = this.getSearchHistory();
    this.searchChips.innerHTML = '';
    
    if (history.length === 0) {
      this.recentSearches.style.display = 'none';
      return;
    }
    
    history.forEach(city => {
      const chip = document.createElement('div');
      chip.className = 'search-chip';
      chip.textContent = city;
      chip.addEventListener('click', () => {
        this.searchInput.value = city;
        this.handleSearch();
        this.hideRecentSearches();
      });
      this.searchChips.appendChild(chip);
    });
  }

  showRecentSearches() {
    const history = this.getSearchHistory();
    if (history.length > 0) {
      this.recentSearches.classList.add('show');
    }
  }

  hideRecentSearches() {
    this.recentSearches.classList.remove('show');
  }

  // Utility functions
  updateDateTime() {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    this.dateTime.textContent = now.toLocaleDateString('en-US', options);
  }

  formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  formatDayName(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  }

  formatHourTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  }

  // UI State Management
  showLoading() {
    this.hideAllSections();
    this.loading.classList.add('show');
  }

  hideLoading() {
    this.loading.classList.remove('show');
  }

  showLocationNotFound() {
    this.hideAllSections();
    this.locationNotFound.classList.add('show');
  }

  showError(message) {
    this.hideAllSections();
    this.locationNotFound.classList.add('show');
    this.locationNotFound.querySelector('h1').textContent = 'Error';
    this.locationNotFound.querySelector('p').textContent = message;
  }

  hideAllSections() {
    this.loading.classList.remove('show');
    this.locationNotFound.classList.remove('show');
    this.currentWeather.classList.remove('show');
    this.forecastSection.style.display = 'none';
    this.hourlySection.style.display = 'none';
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WeatherApp();
});