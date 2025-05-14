function showTime(){
    // Create date object for Ushuaia timezone (UTC-3)
    var date = new Date();
    var ushuaiaTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/Argentina/Ushuaia' }));
    
    var h = ushuaiaTime.getHours(); // 0 - 23
    var m = ushuaiaTime.getMinutes(); // 0 - 59
    var s = ushuaiaTime.getSeconds(); // 0 - 59
  
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
  
    var time = h + ":" + m + " ";
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
  
    setTimeout(showTime, 1000);
  }  

showTime();

const apiKey = 'API_KEY'; // You'll need to get an API key from OpenWeatherMap

async function getWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Río Grande,AR&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        
        if (response.ok) {
            displayWeather(data);
        } else {
            console.error('Error fetching weather data');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
//    document.getElementById('humidity').textContent = data.main.humidity;
//    document.getElementById('wind-speed').textContent = data.wind.speed;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

// Update weather every 30 minutes
getWeather();
setInterval(getWeather, 30 * 60 * 1000);
