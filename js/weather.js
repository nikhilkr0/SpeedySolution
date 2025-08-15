const API_KEY="c78cad0b268eb22e4471aaba820d08f9";
const button=document.getElementById("detailButton");
const clickButton=async()=>{
    const userPlace=document.getElementById("userPlace").value;
    const userState=document.getElementById("userState").value;
    const userCountry=document.getElementById("userCountry").value;
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userPlace},${userState},${userCountry}&appid=${API_KEY}&units=metric`)
    const data=await response.json()
    const forecastResponse=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data["coord"]['lat']}&lon=${data['coord']['lon']}&appid=${API_KEY}&units=metric`)
    const forecastData=await forecastResponse.json()
    let forecastDataList=forecastData['list']
    const sunriseTime=new Date(data['sys']["sunrise"])
    const sunsetTime=new Date(data['sys']["sunset"])
    const outputContainerFragment=document.createDocumentFragment()
    const outputContainer=document.getElementById("outputContainer")
    const element=document.createElement("table");
    const element2=document.createElement("div")
    element.setAttribute("border",'1')
    element2.setAttribute("class","forecastContainer")
    // outputContainer.textContent=""
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
                        <td>${data["coord"].lon}</td>
                    </tr>
                    <tr>
                        <td>latitude</td>
                        <td>${data['coord'].lat}</td>
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
    // element2.innerHTML=`<p class="weatherForecast">Weather Forecast Info</p>`
    for(let items of forecastDataList){
        const forecastCard=document.createElement("div");
        forecastCard.setAttribute('class','forecastCard');
        forecastCard.innerHTML=`
                  <div class="forecastImg">
                        <img src="https://openweathermap.org/img/wn/${items['weather'][0]['icon']}@2x.png" alt="" srcset="">
                    </div>
                    <div class="forecastInfo">
                        <p class="foreCastWeather">Weather: ${items['weather'][0]['main']}</p>
                        <p class="foreCastdesc">Description: ${items['weather'][0]['description']}</p>
                        <p class="foreCastTemperature">Temperature: ${items['main']['temp']}</p>
                        <p class="foreCastHumidity">Humidity: ${items['main']['humidity']}</p>
                        <p class="foreCastWindSpeed">wind speed: ${items['wind']['speed']} km/hr</p>
                        <p class="foreCastClouds">Clouds: ${items['clouds']['all']}%</p>
                    </div>
        `
        element2.appendChild(forecastCard)
    }
    outputContainerFragment.appendChild(element)
    outputContainerFragment.appendChild(element2)
    outputContainer.appendChild(outputContainerFragment)
}
button.addEventListener("click",clickButton);