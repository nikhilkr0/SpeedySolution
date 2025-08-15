const button=document.getElementById("getUserMovie");

const onButtonClick=async()=>{
    const userMovieName=document.getElementById("userMovieName").value;
    const outputContainer=document.getElementById("targetOutputContainer");
    outputContainer.removeAttribute("class")
    outputContainer.innerHTML=""
    const url = `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${userMovieName}.json`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '854a80c150msha2146afd0b9ce78p155754jsn0ad0b6aaaf16',
            'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
        }
    };
    const response=await fetch(url,options);
    const data=await response.json()
    const elementContainer=document.createDocumentFragment()
    for(items of data['d']){
        const elementCard=document.createElement("div");
        elementCard.setAttribute("class","imdbCard");
        elementCard.innerHTML=`
          <div class="cardImage">
            ${items['i']?`<img src=${items['i']['imageUrl']}>`:`<img src="../img/404 error with a landscape-pana.svg">`}
          </div>
            <div class="cardInfo">
                ${items['l']?`<p class="cardTitleName">${items['l']}</p>`:`<p class="cardTitleName">Not available</p>`}
                ${items['qid']?`<p class="cardTitleType">Type: ${items['qid']}</p>`:`<p class="cardTitleType">Not available</p>`}
            </div>
            <div class="userbutton">
                <button>Info</button>
            </div>
        `
        elementContainer.append(elementCard)
    }
    outputContainer.setAttribute("class","outputContainer")
    outputContainer.append(elementContainer)
}

button.addEventListener("click",onButtonClick)