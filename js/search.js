const button=document.getElementById("getUserTitle");

const onClickButton=async()=>{
    const userSearchTitle=document.getElementById("userSearchTitle").value;
    const outputContainer=document.getElementById("targetOutputContainer");
    outputContainer.innerHTML="";
    const outputContainerFragment=document.createDocumentFragment();
    outputContainer.innerHTML="";
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
                    <p class="cardTitle">${items['excerpt']}</p>
                    <p class="cardDesc">Description: ${items['description']}</p>
                </div>
            `;
        outputContainerFragment.append(element)
        }
    outputContainer.append(outputContainerFragment)
}

button.addEventListener("click",onClickButton)