const API_KEY="c78cad0b268eb22e4471aaba820d08f9";
const button=document.getElementById("detailButton");
const outputContainer=document.getElementById("outputContainer")
const clickButton=async()=>{
    const userPlace=document.getElementById("userPlace").value;
    const userState=document.getElementById("userState").value;
    const userCountry=document.getElementById("userCountry").value;
    outputContainer.innerHTML=`
        <div class="animationContainer">
            <video autoplay loop muted playsinline>
                <source src="../img/Business Analysis.mp4" type="video/mp4">
            </video>
            <p class="animationPara">Fetching Details .....</p>
        </div>
    `
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userPlace},${userState},${userCountry}&appid=${API_KEY}&units=metric`)
        const data=await response.json()
        outputContainer.innerHTML=" "
        const sunriseTime=new Date(data['sys']["sunrise"])
        const sunsetTime=new Date(data['sys']["sunset"])
        const outputContainerFragment=document.createDocumentFragment()
        const element=document.createElement("table");
        const forecastContainer=document.createElement("div")
        const forecastDataContainer=document.createElement("div")
        forecastDataContainer.setAttribute("id","forecastDataContainer")
        element.setAttribute("border",'1')
        forecastContainer.setAttribute("class","forecastContainer")
        element.innerHTML=`
                    <tbody>
                        <tr>
                            <td>Country</td>
                            <td>${userCountry}</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>${userState}</td>
                        </tr>
                        <tr>
                            <td>Place</td>
                            <td>${userPlace}</td>
                        </tr>
                        <tr>
                            <td>longitude</td>
                            <td id="dataLon">${data["coord"].lon}</td>
                        </tr>
                        <tr>
                            <td>latitude</td>
                            <td id="dataLat">${data['coord'].lat}</td>
                        </tr>
                        <tr>
                            <td>sunrise</td>
                            <td>${sunriseTime.getHours()+":"+sunriseTime.getMinutes()+":"+sunriseTime.getMinutes()+" (Pacific Stanard Time)"}</td>
                        </tr>
                        <tr>
                            <td>sunset</td>
                            <td>${sunsetTime.getHours()+":"+sunsetTime.getMinutes()+":"+sunsetTime.getMinutes()+" (Pacific Stanard Time)"}</td>
                        </tr>
                        <tr>
                            <td>weather</td>
                            <td>${data['weather'][0]['main']}</td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td>${data['weather'][0]['description']}</td>
                        </tr>
                        <tr>
                            <td>temperature</td>
                            <td>${data['main']['temp']}&degC</td>
                        </tr>
                        <tr>
                            <td>feels like</td>
                            <td>${data['main']['feels_like']}&degC</td>
                        </tr>
                        <tr>
                            <td>pressure</td>
                            <td>${data['main']['pressure']} hpa</td>
                        </tr>
                        <tr>
                            <td>humidity</td>
                            <td>${data['main']['humidity']}</td>
                        </tr>
                        <tr>
                            <td>wind speed</td>
                            <td>${(data['wind']['speed']*18/5).toFixed(2)+" km/hr"}</td>
                        </tr>
                        <tr>
                            <td>wind deg</td>
                            <td>${data['wind']['deg']}&deg</td>
                        </tr>
                        <tr>
                            <td>clouds</td>
                            <td>${data['clouds']['all']}%</td>
                        </tr>
                    </tbody>
        `;
        forecastContainer.innerHTML=`
            <div class="sortByContainer">
                <p class="weatherForecast">Weather Forecast Info</p>
                <div class="sortOptionContainer" id="sortByOptionList">
                    <label for="">Sort by</label>
                </div>
            </div>
        `
        const forecastResponse=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data["coord"]['lat']}&lon=${data['coord']['lon']}&appid=${API_KEY}&units=metric`)
        const forecastData=await forecastResponse.json()
        let forecastDataList=forecastData['list']
        for(let items of forecastDataList){
            const forecastCard=document.createElement("div");
            forecastCard.setAttribute('class','forecastCard');
            forecastCard.innerHTML=`
                    <div class="forecastImg">
                            <img src="https://openweathermap.org/img/wn/${items['weather'][0]['icon']}@2x.png" alt="" srcset="">
                        </div>
                        <div class="forecastInfo">
                            <ul class="forecastWeatherDetails">
                                <li class="forcastTime">Time: ${items["dt_txt"]}</li>
                                <li class="foreCastWeather">Weather: ${items['weather'][0]['main']}</li>
                                <li class="foreCastdesc">Description: ${items['weather'][0]['description']}</li>
                                <li class="foreCastTemperature">Temperature: ${items['main']['temp']}</li>
                                <li class="foreCastHumidity">Humidity: ${items['main']['humidity']}</li>
                                <li class="foreCastWindSpeed">wind speed: ${items['wind']['speed']} km/hr</li>
                                <li class="foreCastClouds">Clouds: ${items['clouds']['all']}%</li>
                            </ul>
                        </div>
            `
            forecastDataContainer.appendChild(forecastCard)
        }
        forecastContainer.append(forecastDataContainer)
        outputContainerFragment.appendChild(element)
        outputContainerFragment.appendChild(forecastContainer)
        outputContainer.appendChild(outputContainerFragment)
        const sortByOptionList=document.getElementById("sortByOptionList");
        const select=document.createElement("select");
        select.setAttribute("id","dropdownWeatherOption")
        select.innerHTML=`
            <option value="time">By Time</option>
            <option value="date">By date</option>
        `
        sortByOptionList.append(select)
        select.addEventListener("change",sortMethod)
    }
    catch(error){
        console.log(error)
        outputContainer.innerHTML=`
        <div class="errorContainer">
            <div class="errorImg">
                <img src="../img/404 error with a landscape-pana.svg">
            </div>
            <div class="errorMessageContainer">
                <p class="errorMessage">Request Not Found</p>
            </div>
        </div>
        `
    }
  
}

const sortMethod=async(event)=>{
    const forecastDataContainer=document.getElementById("forecastDataContainer");
    const forecastDataContainerFragment=document.createDocumentFragment();
    forecastDataContainer.innerHTML=" "
    const lon=document.getElementById("dataLon").innerText;
    const lat=document.getElementById("dataLat").innerHTML;
    const forecastResponse=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    forecastDataContainer.innerHTML=""
    const forecastData=await forecastResponse.json()
    if(event.target.value==="date"){
        for(let items of forecastData['list']){
            if(items['dt_txt'].split(" ")[1]==="12:00:00"){
                const forecastCard=document.createElement("div");
                forecastCard.setAttribute('class','forecastCard');
                forecastCard.innerHTML=`
                    <div class="forecastImg">
                            <img src="https://openweathermap.org/img/wn/${items['weather'][0]['icon']}@2x.png" alt="" srcset="">
                        </div>
                        <div class="forecastInfo">
                            <ul class="forecastWeatherDetails">
                                <li class="forcastTime">Time: ${items["dt_txt"]}</li>
                                <li class="foreCastWeather">Weather: ${items['weather'][0]['main']}</li>
                                <li class="foreCastdesc">Description: ${items['weather'][0]['description']}</li>
                                <li class="foreCastTemperature">Temperature: ${items['main']['temp']}</li>
                                <li class="foreCastHumidity">Humidity: ${items['main']['humidity']}</li>
                                <li class="foreCastWindSpeed">wind speed: ${items['wind']['speed']} km/hr</li>
                                <li class="foreCastClouds">Clouds: ${items['clouds']['all']}%</li>
                            </ul>
                        </div>
                    `
                forecastDataContainerFragment.appendChild(forecastCard);
            }
            forecastDataContainer.appendChild(forecastDataContainerFragment);
        }
    }
    else if(event.target.value==="time"){
        for(let items of forecastData['list']){
            const forecastCard=document.createElement("div");
                forecastCard.setAttribute('class','forecastCard');
                forecastCard.innerHTML=`
                    <div class="forecastImg">
                            <img src="https://openweathermap.org/img/wn/${items['weather'][0]['icon']}@2x.png" alt="" srcset="">
                        </div>
                        <div class="forecastInfo">
                            <ul class="forecastWeatherDetails">
                                <li class="forcastTime">Time: ${items["dt_txt"]}</li>
                                <li class="foreCastWeather">Weather: ${items['weather'][0]['main']}</li>
                                <li class="foreCastdesc">Description: ${items['weather'][0]['description']}</li>
                                <li class="foreCastTemperature">Temperature: ${items['main']['temp']}</li>
                                <li class="foreCastHumidity">Humidity: ${items['main']['humidity']}</li>
                                <li class="foreCastWindSpeed">wind speed: ${items['wind']['speed']} km/hr</li>
                                <li class="foreCastClouds">Clouds: ${items['clouds']['all']}%</li>
                            </ul>
                        </div>
                    `
                forecastDataContainerFragment.append(forecastCard);
        }
        forecastDataContainer.append(forecastDataContainerFragment);
    }
}

button.addEventListener("click",clickButton);