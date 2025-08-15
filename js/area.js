const button=document.getElementById("userPincodeButton");
const distanceButton=document.getElementById("getDistance");
const cilckButton=async()=>{
	const userPincode=document.getElementById("userPincode").value;
	const listOfAreaContainer=document.getElementById("listOfAreaContainer");
	listOfAreaContainer.innerHTML=""
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '854a80c150msha2146afd0b9ce78p155754jsn0ad0b6aaaf16',
			'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
		}
	}
	const urlValidate = await fetch(`https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${userPincode}/validate`,options);
	const urlValidateData=await urlValidate.json()
	if(urlValidateData['valid']){
		const response=await fetch(`https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${userPincode}`,options)
	  	const data=await response.json()
		listOfAreaContainer.innerHTML=`
			<p class="listOfAreaPara">Area Name</p>
              
		`;
		const ulContainer=document.createElement("ul")
		ulContainer.setAttribute("class","listOfArea")
		for (areaDetails of data){
			console.log(areaDetails)
			let li=document.createElement("li")
			li.setAttribute("class","area")
			li.textContent=`Area: ${areaDetails["area"]}, lat: ${areaDetails['lat']}, lng: ${areaDetails['lng']}, district: ${areaDetails["district"]}, state: ${areaDetails["state"]}`
			ulContainer.appendChild(li)
		}
		listOfAreaContainer.appendChild(ulContainer)
	}
}

const clickDistanceButton=async()=>{
	const userOutputDistanceContainer=document.getElementById("userOutputDistanceContainer")
	userOutputDistanceContainer.innerHTML=``
	const userPincode1=document.getElementById("userPincode1").value;
	const userPincode2=document.getElementById("userPincode2").value;
	const url = 'https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/distance';
	const options = {
		method: 'POST',
		headers: {
			'x-rapidapi-key': '854a80c150msha2146afd0b9ce78p155754jsn0ad0b6aaaf16',
			'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({pincode1:userPincode1,pincode2:userPincode2})
	};
	const response=await fetch(url,options)
	const data=await response.json()
	console.log(data)
	userOutputDistanceContainer.innerHTML=`
	<p class="outputPara">Distance between ${userPincode1} and ${userPincode2} is ${(data['distance']/1000).toFixed(2)} km/hr</p>`
}

button.addEventListener("click",cilckButton);
distanceButton.addEventListener("click",clickDistanceButton)