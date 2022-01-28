const sucessfullLookup = (position) =>{
    const{latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9bc8ad78fcdf48a08bdf73a8ed8c5a34`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(response.results[0].components.county+", "+response.results[0].components.country);
            let location = document.getElementById("locationTimezone");
            location.textContent = response.results[0].components.county+", "+response.results[0].components.country;
        })
};

navigator.geolocation.getCurrentPosition(sucessfullLookup, console.log)

const temperature = async (position) => {
    const {latitude, longitude} = position.coords;
    const api = '617e3eef5732240c255eca261301ba8e    ';
    fetch(await `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`, {
        "method": "GET",
    }).then(response => {
        const data =  response.json();
        console.log(data);
        return data;
    }).then(data=>{
        let temperatureDegree = document.getElementById("temperatureDegree");
        let pressure = document.getElementById("pressure");
        let humidity = document.getElementById("humidity");
        let windSpeed = document.getElementById("windSpeed");
        let summary = document.getElementById("summary");
        let apparentTemperature=document.getElementById("apparentTemperature");
        let minTemp = document.getElementById("minTemp");
        let maxTemp =  document.getElementById("maxTemp");

        summary.textContent = data.weather[0].main;

        let temp = data.main.temp;
        temperatureDegree.textContent = kelvinToCelsius(temp);

        minTemp.innerHTML = `<p id="minTemp"><i class="fas fa-long-arrow-alt-down"></i> Min: ` + kelvinToCelsius(data.main.temp_min) +`℃ </p>`;
        apparentTemperature.innerHTML = `<p id="apparentTemperature"><i class="fas fa-heart"></i> Feels like: ` + kelvinToCelsius(data.main.feels_like) + "℃";
        humidity.textContent = " Humidity: " + Math.floor(data.main.humidity) + " %";

        maxTemp.innerHTML = `<p id="maxTemp"><i class="fas fa-long-arrow-alt-up"></i> Max: `+ kelvinToCelsius(data.main.temp_max)+`℃</p> `;
        windSpeed.textContent = milesToKm(data.wind.speed) + " km/h";
        windSpeed.innerHTML = `<p id="windSpeed"><i class="fas fa-wind"></i> Wind speed: ` + windSpeed.textContent +`</p>`;
        pressure.textContent=" Pressure: " + data.main.pressure + " mb";

        celsiusFarenheit.addEventListener('click', ()=>{
            if(temperatureSpan.textContent === "F"){
               temperatureSpan.textContent="℃";
               temperatureDegree.textContent=Math.floor(kelvinToCelsius(temp));
               celsiusFarenheit.innerHTML = `<input type=radio> Change to Farenheit`;
            }else{
               temperatureSpan.textContent="F";
               temperatureDegree.textContent=kelvinToFarenheit(temp);
               celsiusFarenheit.innerHTML = `<input type=radio> Change to Celsius`;
             }
        })

         function kelvinToCelsius(x) {
            return Math.floor(x-273.15);
       }

       function kelvinToFarenheit(x){
           return Math.floor(x*9/5-459.67);
       }

         function milesToKm(x) {
            return Math.floor(x/0.62137);

         }

        let icon = document.getElementById('icon');
        let iconPic = data.weather[0].icon;
        icon.innerHTML = `<img src="icons/${iconPic}.png"/>`;
       

    })
        .catch(err => {
            console.error(err);
        });
    

}

navigator.geolocation.getCurrentPosition(temperature,console.log);

