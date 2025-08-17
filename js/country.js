const button = document.getElementById("getUserCountry");
const outputCountry = document.getElementById("targetOutputContainer");

const onClickButton = async () => {
    const userCountry = document.getElementById("userCountryName").value;
    const outputContainerFragment = document.createDocumentFragment();
    const response = await fetch(`https://restcountries.com/v3.1/name/${userCountry}`);
    const data = await response.json();
    outputCountry.innerHTML = "<p class='viewDetailsPara'>Click on the Country name to view details</p>"
    for (items of data) {
        const element = document.createElement("div");
        element.setAttribute("class", "outputCard");
        element.innerHTML = `
                <div class="cardImg">
                    <img src=${items['flags']['png']}>
                </div>
                <div class="cardInfo">
                    <p class="cardTitle">${items['name']['official']}</p>
                    <p class="cardCommonTitle">Common name: <span>${items['name']['common']}</span></p>
                </div>
            `;
        outputContainerFragment.append(element)
    }
    outputCountry.append(outputContainerFragment)
    const cardTitleButtonList = document.querySelectorAll(".cardTitle");
    for (let cardTitleButton of cardTitleButtonList) {
        cardTitleButton.addEventListener("click", cardTitleClick)
    }
    outputCountry.innerHTML = `
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
const cardTitleClick = async (event) => {
    const cardTitleName = event.target.textContent;
    const countryInfoCard = document.createElement("div");
    countryInfoCard.setAttribute("id", "countryInfoCard");
    const response = await fetch(`https://restcountries.com/v3.1/name/${cardTitleName}`);
    const data = await response.json();
    console.log(data[0])
    countryInfoCard.innerHTML = `
        <span class="material-symbols-outlined" id="closeButton">close</span>
        <div class="countryInfoImg" style="margin-top:15px">
            <img src=${data[0]['flags']['png']} style="border-radius:10px;width:20rem;">
        </div>
        <div class="CountryInfoContainer">
            <ul id="CountryInfoList">
            <pre>${JSON.stringify(data[0], null, 2)}</pre>
            </ul>
        </div>
    `
    outputCountry.append(countryInfoCard)
    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", closeContainer);
}
closeContainer = () => {
    const countryInfoCard = document.getElementById("countryInfoCard");
    outputCountry.removeChild(countryInfoCard)
}
button.addEventListener("click", onClickButton);