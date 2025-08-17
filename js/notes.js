const setButton=document.getElementById("setNotes");
const getButton=document.getElementById("getNotes");

const onSetNotes=()=>{
    const outputContainer=document.getElementById("targetOutputContainer");
    alert("Note Added")
    outputContainer.innerHTML=""
    const userNotesTitle=document.getElementById("userNotesTitle").value;
    const userNotesDesc=document.getElementById("userNotesDesc").value;
    console.log(typeof(userNotesDesc),userNotesDesc)
    localStorage.setItem(userNotesTitle,userNotesDesc)
}

const onGetNotes=()=>{
    const outputContainer=document.getElementById("targetOutputContainer");
    const outputContainerFragment=document.createDocumentFragment();
    for(let indexKey=0;indexKey<=localStorage.length;indexKey++){
        let key=localStorage.key(indexKey);
        if(key){
            const element=document.createElement("div");
            element.setAttribute("class","notesCard");
            element.innerHTML=`
                <div class="notesTitleContainer">
                    <p class="notesTitle">${key}</p>
                </div>
                <div class="notesDescContainer">
                    <p class="notesDesc">${localStorage.getItem(key)}</p>
                </div>
            `
            outputContainerFragment.append(element)
        }
    }
    outputContainer.append(outputContainerFragment)
}

setButton.addEventListener("click",onSetNotes);
getButton.addEventListener("click",onGetNotes)