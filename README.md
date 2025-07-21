# WeatherPro - Advanced Weather Application

A modern, feature-rich weather application with a beautiful UI and comprehensive weather information.

## 🌟 Features

### Core Weather Information
- **Current Weather**: Real-time weather data with temperature, description, and "feels like" temperature
- **Detailed Statistics**: Visibility, humidity, wind speed, and atmospheric pressure
- **Sunrise & Sunset**: Accurate sun times for the searched location
- **Weather Icons**: Dynamic weather icons that change based on conditions

### Extended Forecasts
- **5-Day Forecast**: Daily weather predictions with high/low temperatures
- **24-Hour Forecast**: Hourly weather data for detailed planning
- **Weather Descriptions**: Detailed weather condition descriptions

### User Experience
- **Geolocation Support**: Get weather for your current location with one click
- **Search History**: Quick access to recently searched locations
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations and error handling
- **Real-time Clock**: Live date and time display

### Modern UI/UX
- **Gradient Backgrounds**: Beautiful gradient color schemes
- **Smooth Animations**: Floating weather icons and smooth transitions
- **Glass Morphism**: Modern blur effects and translucent elements
- **Hover Effects**: Interactive elements with smooth hover animations
- **Typography**: Clean, modern Poppins font family

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Add weather icons** to the `/assets/` directory:
   - `clearr.png` - Clear sky icon
   - `cloudyy.png` - Cloudy weather icon
   - `rain.png` - Rain icon
   - `drizzle.png` - Drizzle icon
   - `snow.png` - Snow icon
   - `haze.png` - Mist/Haze/Fog icon
   - `default.png` - Default fallback icon

3. **Open `index.html`** in your web browser
4. **Start searching** for weather information!

## 🔧 Configuration

### API Key
The application uses the OpenWeatherMap API. The current API key is included, but you may want to get your own:

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Replace the `API_KEY` in `script.js`:

```javascript
this.API_KEY = "your-api-key-here";
```

## 📱 Usage

### Search Weather
- **Text Search**: Type any city name and press Enter or click the search button
- **Location Search**: Click the location button to get weather for your current location
- **Recent Searches**: Click on any recent search chip to quickly search again

### Theme Toggle
- Click the moon/sun icon in the header to switch between dark and light themes
- Your preference is automatically saved and restored

### Navigation
- **Current Weather**: Main weather display with all current conditions
- **5-Day Forecast**: Scroll through the daily forecast cards
- **Hourly Forecast**: Scroll horizontally through 24-hour predictions

## 🎨 Customization

### Colors
The app uses CSS custom properties for easy color customization. Edit the `:root` variables in `style.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  /* ... more variables */
}
```

### Weather Icons
Replace the weather icons in the `/assets/` directory with your preferred icon set. Ensure they're in PNG format and maintain the same filenames.

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (limited support)

## 📋 Features Roadmap

### Completed ✅
- [x] Current weather display
- [x] 5-day weather forecast
- [x] Hourly forecast (24 hours)
- [x] Geolocation support
- [x] Search history
- [x] Dark/light theme toggle
- [x] Responsive design
- [x] Weather icons
- [x] Smooth animations
- [x] Error handling

### Future Enhancements 🔮
- [ ] Weather maps integration
- [ ] Severe weather alerts
- [ ] Multiple location favorites
- [ ] Weather widgets
- [ ] Offline support
- [ ] Weather trends and charts
- [ ] Social sharing features

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, grid, and flexbox
- **Vanilla JavaScript**: ES6+ features with classes and async/await
- **OpenWeatherMap API**: Weather data source
- **Font Awesome**: Icons
- **Google Fonts**: Poppins font family

### Performance Features
- **Parallel API Calls**: Current weather and forecast data fetched simultaneously
- **Efficient DOM Updates**: Minimal DOM manipulation for smooth performance
- **Local Storage**: Theme preference and search history persistence
- **Error Boundaries**: Graceful error handling and user feedback

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**WeatherPro** - Making weather information beautiful and accessible! 🌤️
