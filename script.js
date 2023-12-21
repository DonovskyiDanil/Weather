// script.js

function enableInput(inputType) {
  const cityInput = document.getElementById('cityInput');
  const idInput = document.getElementById('idInput');

  if (inputType === 'city') {
    cityInput.disabled = false;
    idInput.disabled = true;
  } else if (inputType === 'id') {
    cityInput.disabled = true;
    idInput.disabled = false;
  }
}

function okButton() {
  // Add the functionality for the OK button here
  console.log("OK button clicked");
  // You can add specific functionality for the OK button
}

function getWeather() {
  const apiKey = '7213d230325e2b4263368cdbda58c005'; // Replace with your OpenWeatherMap API key
  const inputType = document.querySelector('input[name="inputType"]:checked').value;
  let input;

  if (inputType === 'city') {
    input = document.getElementById('cityInput').value;
  } else {
    input = document.getElementById('idInput').value;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('temperature').innerText = `${data.main.temp} °C`;
      document.getElementById('windSpeed').innerText = `${data.wind.speed} m/s`;
      document.getElementById('humidity').innerText = `${data.main.humidity} %`;
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function cancelButton() {
  // Add the functionality for the Cancel button here
  console.log("Cancel button clicked");
  // You can add specific functionality for the Cancel button
}

function createWeatherFrame(containerId, label, value) {
  const weatherContainer = document.createElement('div');
  weatherContainer.classList.add('weatherContainer');

  const content = `
    <div>
      <h3>${label}</h3>
      <p>${value}</p>
    </div>
  `;

  weatherContainer.innerHTML = content;
  document.getElementById(containerId).innerHTML = '';
  document.getElementById(containerId).appendChild(weatherContainer);
}
