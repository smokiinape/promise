

function fetchData(url) {
    return axios.get(url)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
      });
  }
  
  
  function fetchBackgroundImage() {
    const accessKey = 'VV5JBufFtfF02ObwnGqsP5wL7MynCNrrjXnjy-Aw4cI'; 
    const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
  
    return fetchData(url)
      .then(data => {
        const imageUrl = data.urls.regular;
        const creator = data.user.name;
  
        document.getElementById('background-image').src = imageUrl;
        document.getElementById('image-creator').textContent = `Photo by ${creator}`;
      })
      .catch(() => {
        // Display a default image if fetching fails
        document.getElementById('background-image').src = 'chas.png';
        document.getElementById('image-creator').textContent = '';
      });
  }
  
  
  // Fetches weather data using Geolocation API and OpenWeatherMap API
function fetchWeatherData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'Yd457e6ce9604c8ba86348193021c7a74'; // 
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}`;
  
        fetchData(url)
          .then(data => {
            const { temp, humidity } = data.current;
            const weatherData = `Temperature: ${temp}°C, Humidity: ${humidity}%`;
  
            document.getElementById('weather-data').textContent = weatherData;
          })
          .catch(() => {
            document.getElementById('weather-data').textContent = 'Unable to fetch weather data';
          });
      });
    } else {
      document.getElementById('weather-data').textContent = 'Geolocation is not supported by your browser';
    }
  }
  
  
  // Fetches current time and date
  function fetchTime() {
    const currentTime = new Date().toLocaleString();
    document.getElementById('current-time').textContent = currentTime;
  }
  
  // Fetches and updates all data
  function updateData() {
    fetchBackgroundImage();
    fetchWeatherData();
    fetchTime();
  }
  
  // Update data every second
  setInterval(updateData, 5 * 60 * 1000);
  
  // Initial data fetch
  updateData();
  