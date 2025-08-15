const button=document.getElementById("getUserIP")

const onCickButton=async()=>{
    const userSearchIP=document.getElementById("userSearchIP").value;
    const outputContainer=document.getElementById('targetOutputContainer');
    outputContainer.removeAttribute("class","outputContainer")
    outputContainer.innerHTML="";
    const response=await fetch(`http://ip-api.com/json/${userSearchIP}`);
    const data=await response.json()
    const element=document.createElement("div");
    element.setAttribute("div","userLocationCard");
    element.innerHTML=`
        <div class="userIPAddressContainer">
            <p class="userIPAddress">${data['query']}</p>
        </div>
        <div class="userIPInfo">
            <ul class="userIPInfoList">
                <li class="userIPInfoCountry">Country: ${data['country']}</li>
                <li class="userIPInfoCountryCode">CountryCode: ${data['countryCode']}</li>
                <li class="userIPInfoISP">ISP: ${data['isp']}</li>
                <li cass="userIPLat">Latitude: ${data['lat']}</li>
                <li class="userIPLon">Longitude: ${data['lon']}</li>
                <li class="userIPOrg">ORG: ${data['org']}</li>
                <li class="userIPRegionName">RegionName: ${data['regionName']}</li>
                <li class="userIPRegion">RegionCode: ${data['region']}</li>
                <li class="userIPTimezone">Timezone: ${data['timezone']}</li>
            </ul>
        </div>
    `
    outputContainer.setAttribute("class","outputContainer")
    outputContainer.append(element)
}

button.addEventListener("click",onCickButton)