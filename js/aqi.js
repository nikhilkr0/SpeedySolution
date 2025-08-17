const API_KEY="c78cad0b268eb22e4471aaba820d08f9";
const button=document.getElementById("detailButton");
const clickButton=async()=>{
    const outputContainer=document.getElementById("outputContainer");
    outputContainer.innerHTML="";
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
        const aqiResponse=await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${data['coord']['lat']}&lon=${data['coord']['lon']}&appid=${API_KEY}`)
        const aqiData=await aqiResponse.json()
        const componentObj=aqiData['list'][0]['components']
        const aqiLevel=["","Good: Air quality is ideal", "Fair: Acceptable air quality", "Moderate: May affect sensitive individuals", "Poor: Unhealthy for sensitive groups", "Very Poor: Unhealthy for everyone"]
        outputContainer.innerHTML=`
            <div class="aqiCard">
                    <p class="aqiPara">AQI CARD</p>
                    <div class="aqiInfo">
                        <p class="aqiNumber">AQI Number: ${aqiData['list'][0]['main']['aqi']}</p>
                        <p class="aqiNumber">AQI Quality: ${aqiLevel[aqiData['list'][0]['main']['aqi']]}</p>
                        <p class="aqiComponentPara">AQI Pollutant Component</p>
                        <ul id="aqiComponentList"></ul>
                    </div>
                </div>
        `
        const componentsContainer=document.getElementById("aqiComponentList");
        for(let components in componentObj){
            const element=document.createElement('li')
            element.setAttribute("class","aqiComponent")
            element.innerText=(`${components}: ${componentObj[components]}`)
            componentsContainer.appendChild(element)
        }
    }
    catch{
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
button.addEventListener('click',clickButton)