document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_input').value;

    if (!cityName) {
        document.querySelector("#weather").style.display = 'none';
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = 'ff3c1c0771446b14a6d19657fa85cf54';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(url);
        const json = await results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
    
            document.querySelector("#weather").style.display = 'none'; 
            showAlert(`
                Não foi possível localizar...
                <br>
                <img src="img/404.svg" style="width: 50%; margin-top: 20px;"/>
            `);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        showAlert("Erro ao conectar com o serviço de clima.");
    }
});

function showInfo(json) {
    showAlert(''); 

    document.querySelector("#weather").style.display = 'block';

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(0)}<span>°C</span>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(0)}°C`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(0)}°C`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}