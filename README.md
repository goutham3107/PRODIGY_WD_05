# PRODIGY_WD_05
# 🌦️ Weather App

A responsive and interactive **Weather Application** built using **HTML5, CSS3, and JavaScript** that fetches real-time weather information from a weather API.

Users can search for a location and view current weather conditions, temperature, humidity, wind speed, and other relevant weather information through a clean and user-friendly interface.

## 🚀 Features

* 🌤️ Real-time weather information
* 🔍 Search weather by city/location
* 📍 Location-based weather support
* 🌡️ Current temperature
* 🌡️ Feels-like temperature
* ☁️ Current weather condition
* 💧 Humidity
* 💨 Wind speed
* 👁️ Visibility
* 🔄 Dynamic weather updates
* ❌ Invalid location/error handling
* ⏳ Loading state
* 📱 Responsive design
* 🎨 Clean and modern interface
* ⚡ Fast API-based data fetching

## 🛠️ Technologies Used

* **HTML5** – Structure and layout
* **CSS3** – Styling and responsive design
* **JavaScript** – Application logic and interactivity
* **Fetch API** – Fetching weather data
* **Weather API** – Real-time weather information
* **DOM Manipulation** – Dynamic content updates

## 📂 Project Structure

```text
Weather-App/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    ├── images/
    └── icons/
```

## 🔄 Application Workflow

```text
Start Application
       ↓
Enter City / Location
       ↓
Send API Request
       ↓
Receive Weather Data
       ↓
Process API Response
       ↓
Display Weather Information
       ↓
Update UI Dynamically
```

If an invalid location is entered:

```text
User Input
    ↓
API Request
    ↓
Invalid Location
    ↓
Display Error Message
```

## ⚙️ How It Works

1. The user enters a city or location.
2. JavaScript captures the user's input.
3. The application sends a request to the weather API.
4. The API returns current weather information.
5. JavaScript processes the JSON response.
6. The relevant information is displayed dynamically.
7. If the location is invalid or the request fails, an error message is shown.

## 🌡️ Weather Information Displayed

Depending on the API response, the application can display:

* 📍 Location
* 🌡️ Temperature
* 🌡️ Feels-like temperature
* ☁️ Weather condition
* 💧 Humidity
* 💨 Wind speed
* 👁️ Visibility
* 🌅 Additional weather information

## 💡 Concepts Demonstrated

This project demonstrates practical knowledge of:

* JavaScript DOM manipulation
* Event handling
* Functions
* Variables and objects
* Conditional statements
* Asynchronous JavaScript
* Promises
* `async/await`
* Fetch API
* JSON data handling
* API integration
* Error handling
* Responsive web design

## ▶️ How to Run

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd Weather-App
```

Open `index.html` in your browser.

If the project uses an API key, add your API key to the appropriate JavaScript configuration before running the application.

## 🔐 API Configuration

If your weather API requires an API key, configure it in the JavaScript file:

```javascript
const API_KEY = "YOUR_API_KEY";
```

> ⚠️ Do not upload your real API key to a public GitHub repository. Use environment variables or another secure configuration method for production applications.

## 📱 Responsive Design

The application is designed to work across different screen sizes, including:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

## 🚀 Future Enhancements

* 🌍 Automatic current-location detection
* 📅 5-day weather forecast
* ⏰ Hourly weather forecast
* 🌙 Dark/Light mode
* 🌡️ Celsius/Fahrenheit toggle
* 🌧️ Weather-based background animations
* ⭐ Favorite locations
* 📊 Weather charts
* 🌅 Sunrise and sunset information
* 🗺️ Interactive weather map

## 🎯 Project Objective

The objective of this project is to build a practical frontend application that demonstrates **API integration, asynchronous JavaScript, DOM manipulation, user interaction, and responsive web development**.

## 👨‍💻 Author

**P. Goutham Karthik**

Aspiring Software Engineer | CSE Student

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

