const button = document.getElementById("getUserMovie");
const outputContainer = document.getElementById("targetOutputContainer");

const onButtonClick = async () => {
    outputContainer.innerHTML=`
        <div class="animationContainer">
            <video autoplay loop muted playsinline>
                <source src="../img/Business Analysis.mp4" type="video/mp4">
            </video>
            <p class="animationPara">Fetching Details .....</p>
        </div>
    `
    const imdbContainer = document.createElement("div");
    imdbContainer.setAttribute("class", "imdbContainer")
    const userMovieName = document.getElementById("userMovieName").value;
    outputContainer.removeAttribute("class")
    const url = `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${userMovieName}.json`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '854a80c150msha2146afd0b9ce78p155754jsn0ad0b6aaaf16',
            'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);
    const data = await response.json()
    outputContainer.innerHTML=""
    const elementContainer = document.createDocumentFragment()
    for (items of data['d']) {
        const elementCard = document.createElement("div");
        elementCard.setAttribute("class", "imdbCard");
        elementCard.innerHTML = `
          <div class="cardImage">
            ${items['i'] ? `<img src=${items['i']['imageUrl']}>` : `<img src="../img/404 error with a landscape-pana.svg">`}
          </div>
            <div class="cardInfo">
                ${items['l'] ? `<p class="cardTitleName">${items['l']}</p>` : `<p class="cardTitleName">Not available</p>`}
                ${items['qid'] ? `<p class="cardTitleType">Type: ${items['qid']}</p>` : `<p class="cardTitleType">Not available</p>`}
            </div>
            <div class="userbutton">
                <button class="infoButton">Info</button>
            </div>
        `
        elementContainer.append(elementCard)
    }
    outputContainer.setAttribute("class", "outputContainer");
    imdbContainer.append(elementContainer);
    outputContainer.append(imdbContainer)
    const infoButtonList = document.querySelectorAll(".infoButton");
    for (infoButton of infoButtonList) {
        infoButton.addEventListener('click', getInfoMovie)
    }
}

const getInfoMovie = async (event) => {
    const elementCard = document.createElement("div");
    elementCard.innerHTML = event.target.parentElement.parentElement.innerHTML;
    const elementCardName = elementCard.querySelector(".cardTitleName").innerHTML;
    const movieInfoCard = document.createElement("div");
    movieInfoCard.innerHTML=``
    movieInfoCard.setAttribute("id", "movieInfoCard");
    const response = await fetch(`https://www.omdbapi.com/?t=${elementCardName}&apikey=1669c197&plot=full`)
    const data = await response.json()
    console.log(data)
    if (data['Error']) {
        movieInfoCard.innerHTML=`
            <span class="material-symbols-outlined" id="closeButton">close</span>
            <div class="movieInfoImg">
                <img src="../img/404 error with a landscape-pana.svg" style="width:40rem;border-radius:10px;">
            </div>
            <div class="movieInfoContainer">
                <p class="movieNotFound">movie info not found !!!</p>
            </div>
        `
    }
    else {
        movieInfoCard.innerHTML = `
        <span class="material-symbols-outlined" id="closeButton">close</span>
        <div class="movieInfoImg">
            <img src=${data['Poster']} style="border-radius:10px;">
        </div>
        <div class="movieInfoContainer">
            <ul id="movieInfoList">
            </ul>
        </div>
    `
        const movieInfoList = movieInfoCard.querySelector("#movieInfoList"); //get getElementById() does not work here
        const moveInfoListFragment = document.createDocumentFragment();
        for (let keys in data) {
            if (keys !== "Ratings" && keys !== "Poster") {
                const li = document.createElement("li")
                li.setAttribute("class", `movieInfo${keys}`)
                li.textContent = `${keys}: ${data[keys]}`
                moveInfoListFragment.append(li)
            }
        }
        movieInfoList.append(moveInfoListFragment)
        movieInfoCard.append(movieInfoList)
    }
    outputContainer.append(movieInfoCard)
    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", closeContainer);
}
closeContainer = () => {
    const movieInfoCard = document.getElementById("movieInfoCard");
    outputContainer.removeChild(movieInfoCard)
}
button.addEventListener("click", onButtonClick)