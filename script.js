document.addEventListener('DOMContentLoaded', function () {
  const okButton = document.getElementById('okButton');
  const weatherButton = document.getElementById('weatherButton');
  const cancelButton = document.getElementById('cancelButton');
  const radioButtons = document.querySelectorAll('input[name="inputType"]');
  const cityInput = document.getElementById('cityInput');
  const idInput = document.getElementById('idInput');

  okButton.addEventListener('click', getWeather);
  weatherButton.addEventListener('click', getWeather);
  cancelButton.addEventListener('click', function () {
    clearInputFields();
    console.log("Cancel button clicked");
  });

  radioButtons.forEach(button => {
    button.addEventListener('change', function () {
      enableInput(this.value);
    });
  });
});

function enableInput(inputType) {
  const cityInput = document.getElementById('cityInput');
  const idInput = document.getElementById('idInput');
  cityInput.disabled = inputType !== 'city';
  idInput.disabled = inputType !== 'id';
}

function clearInputFields() {
  document.getElementById('cityInput').value = '';
  document.getElementById('idInput').value = '';
}

function getWeather() {
  const apiKey = '7213d230325e2b4263368cdbda58c005';
  const inputType = document.querySelector('input[name="inputType"]:checked').value;
  const input = (inputType === 'city') ? document.getElementById('cityInput').value : document.getElementById('idInput').value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayWeather('ContainerTemp', 'Temperature', `${data.main.temp} °C`);
      displayWeather('ContainerSpeed', 'Wind Speed', `${data.wind.speed} m/s`);
      displayWeather('ContainerHumi', 'Humidity', `${data.main.humidity} %`);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(containerId, label, value) {
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
