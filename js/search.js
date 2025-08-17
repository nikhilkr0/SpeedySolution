const button=document.getElementById("getUserTitle");
const outputContainer=document.getElementById("targetOutputContainer");

const onClickButton=async()=>{
    outputContainer.innerHTML=`
        <div class="animationContainer">
            <video autoplay loop muted playsinline>
                <source src="../img/Business Analysis.mp4" type="video/mp4">
            </video>
            <p class="animationPara">Fetching Details .....</p>
        </div>
    `
    const userSearchTitle=document.getElementById("userSearchTitle").value;
    outputContainer.innerHTML="";
    const outputContainerFragment=document.createDocumentFragment();
    outputContainer.innerHTML="<p class='viewDetailsPara'>Click on the Title to view details</p>";
    const response=await fetch(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${userSearchTitle}`)
    const data=await response.json()
    for(items of data['pages']){
        const element=document.createElement("div");
        element.setAttribute("class","outputCard");
        element.innerHTML=`
                <div class="cardImg">
                    ${items['thumbnail']?`<img src=https:${items['thumbnail']['url']}>`:`<img src="../img/404 error with a landscape-pana.svg">`}
                </div>
                <div class="cardInfo">
                    <a href="https://en.wikipedia.org/?curid=${items['id']}" class="cardTitle" target="_blank">${items['excerpt']}</a>
                    <p class="cardDesc">Description: ${items['description']}</p>
                </div>
            `;
        outputContainerFragment.append(element)
        }
    outputContainer.append(outputContainerFragment)
}

button.addEventListener("click",onClickButton)