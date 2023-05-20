const resultWeather = document.querySelector('#resultWeather');
const formWeather = document.querySelector('#formWeather');
const result = document.querySelector('#result');


window.addEventListener('load', () => {
  formWeather.addEventListener('submit', validateForm);
})

//Alert of validation 
export function showAlert(message) {
  console.log(message)
  //Create alert
  const alertExists = document.querySelector('.bg-red-100');
  if (!alertExists) {
    const alert = document.createElement('div');
    alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alert.innerHTML = `
      <strong class="font-bold">Error!<strong>
      <span class"block">${message}</span>
      `;
    formWeather.appendChild(alert);
    // Delete message
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
}

//Here we will validate the information entered
export function validateForm(e) {
  e.preventDefault();
  console.log('Form validating...')
  // validation
  const city = document.querySelector('#city').value;
  const firstDay = document.querySelector('#leaving').value;
  const lastDay = document.querySelector('#returning').value;
  const search = document.querySelector('#description').value;
  //console.log(city);
  if (city === '' || firstDay === '' || lastDay === '' || search === '') {
    //Error
    showAlert('Fill out all the fields');
    return;
  }
  //Consult API
  searchImage();
  geoNamesAPI(city);
}

// GeonameAPI call //
export function geoNamesAPI(city) {
  const baseURLGeonames = 'http://api.geonames.org/searchJSON?q=';
  const appKeyGeonames = `joanna`;
  const compleUrlGeo = baseURLGeonames + city + '&maxRows=1&username=' + appKeyGeonames
  // console.log(compleUrlGeo);
  fetch(compleUrlGeo)
    .then(response => response.json())
    .then(data => {
      console.log(data, "geonames")
      ConsultApiWeather(data)
    })
}

// WeatherbitAPI call //
export function ConsultApiWeather(data) {
  const latitude = data.geonames[0].lat;
  const longitude = data.geonames[0].lng;
  const weatherKey = 'b55790535efc444b9adc2f8c067f4aa6';
  const weatherUrl = `https://api.weatherbit.io/v2.0/current?`;
  const compleUrlWe = weatherUrl + 'lat=' + latitude + '&lon=' + longitude + '&key=' + weatherKey
  // console.log(compleUrlWe);
  fetch(compleUrlWe)
    .then(response => response.json())
    .then(resultWeather => {
      console.log(resultWeather, "apiweather");
      showWeather(resultWeather);
    })
}

export function showWeather(data) {
  const weather = data.data
  // console.log(data, weather);
  while (resultWeather.firstChild) {
    resultWeather.removeChild(resultWeather.firstChild);
  }
  weather.forEach(pronostico => {
    const { ob_time, city_name, timezone, sunrise, sunset, temp, weather, rh } = pronostico;
    const Fahrenheit = temp + 32.00;
    resultWeather.innerHTML += `
    <div class=" p-2 mx-auto bg-gray-200 border-2 rounded-md">
   
    <p class="pl-4 text-lg align-baseline">Date: ${ob_time}</p>
    <p class="pl-4 text-lg align-baseline">City: ${city_name}</p>
    <p class="pl-4 text-lg align-baseline">Time Zone: ${timezone}</p>
    <p class="pl-4 text-lg align-baseline">${weather.description}</p>

    <div class="grid gap-4 grid-cols-2 py-4">
    
    <div class="bg-white rounded-lg">
    <p class="p-3 text-3xl">Sunrise</p>
    <p class="text-lg align-baseline"><i class="fas fa-sun text-4xl p-4"></i>${sunrise} a.m</p>
    </div>

    <div class="bg-white rounded-lg">
    <p class="p-3 text-3xl">Sunset</p>
    <p class="text-lg align-baseline"><i class="far fa-moon text-4xl p-4"></i>${sunset} p.m</p>
    </div>

    <div class="bg-white rounded-lg">
    <p class="p-3 text-3xl">Humidity</p>
    <p class="text-lg align-baseline"><i class="fas fa-tint text-4xl p-4"></i>${rh}&#37</p>
    </div>

    <div class="bg-white rounded-lg">
    <p class="p-3 text-3xl">Feels Like</p>
    <p class="text-lg align-baseline"><i class="fas fa-temperature-high text-4xl p-4"></i>${Fahrenheit} &#8457</p>
    </div>

    </div>
    <div/>
    `
  })
}

export async function searchImage() {
  const search = document.querySelector('#description').value;
  const key = '18634593-15578008f57a9c24ca1d7ca87';
  const PixaBayUrl = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=4`;
  console.log(PixaBayUrl);

  fetch(PixaBayUrl)
    .then(response => response.json())
    .then(result => {
      showImagenes(result.hits);
    })
}

export function showImagenes(pictures) {
  console.log(pictures)

  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
  //Iterate over array of images and build HTML
  pictures.forEach(imagen => {
    const { previewURL, likes, tags, largeImageURL } = imagen;
    result.innerHTML += `
     <div class="bg-gray-100 w-80 my-4 rounded">
     <div class="mx-8">
     <img class="w-full text-center pt-8" src="${previewURL}">
     <div class="p-4">
     
     <p class="imagenfont text-sm"> ${tags} <span> Views </span> </p>

     <a class="imagenfont block w-full bg-blue-700 hover:bg-blue-600 text-white uppercase fontbold text-center text-xs rounded mt-5 p-1"
     href="${largeImageURL}" target="_blank" rel=" noopener noreferrer">
     View Imagen
     </a>
     <div/>
     <div/>
     <div/>
    `;
  });

}






