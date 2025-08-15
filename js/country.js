const button=document.getElementById("getUserCountry");

const onClickButton=async()=>{
    const userCountry=document.getElementById("userCountryName").value;
    console.log(userCountry)
    const outputCountry=document.getElementById("targetOutputContainer");
    outputCountry.innerHTML=""
    const outputContainerFragment=document.createDocumentFragment();
    const response=await fetch(`https://restcountries.com/v3.1/name/${userCountry}`);
    const data=await response.json();
    for(items of data){
        console.log(items)
        const element=document.createElement("div");
        element.setAttribute("class","outputCard");
        element.innerHTML=`
                <div class="cardImg">
                    <img src=${items['flags']['png']}>
                </div>
                <div class="cardInfo">
                    <p class="cardTitle">${items['name']['official']}</p>
                    <p class="cardCommonTitle">Common name: ${items['name']['common']}</p>
                </div>
            `;
        outputContainerFragment.append(element)
    }
    outputCountry.append(outputContainerFragment)
}

button.addEventListener("click",onClickButton);