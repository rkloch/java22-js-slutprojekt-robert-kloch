const defaultURL = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=163c83ceb5bc012cde6ffec0f48e88ec";
let URL;
document.querySelector('button').addEventListener("click", applyUserFormInput);

function applyUserFormInput(event){
    event.preventDefault();
    URL = defaultURL;
    //Empty photo container when user makes a search request
    document.getElementById("photoSection").innerHTML = "";
    //constructing URL for FlickrAPI
    if(document.getElementById("search").value != ""){
        URL += "&text="+encodeURIComponent(document.getElementById('search').value);
        URL += "&sort=" + document.getElementById("sort").value;
        URL += "&per_page=" + document.getElementById("amount").value;
        fetchFlickrJson();
    }else{
        document.getElementById("photoSection").innerHTML = "<h3>You need to input a search query</h3>";
    }
}

function fetchFlickrJson(){
    fetch(URL).then
        (response => response.json())
        .then(addImgToPhotoSection)
        .catch(
            error => {
                console.log(error);
                document.getElementById("photoSection").innerHTML= "<h3>Something went wrong, try later or email us at something@us.se</h3>"}
        );
}

function addImgToPhotoSection(flickrJson){
    if(flickrJson.photos.photo.length === 0){
        document.getElementById("photoSection").innerHTML= "<h3>No results, please change search parameters</h3>";
    }else{
    flickrJson.photos.photo.forEach(photoInfo => {
        const aElement = document.createElement('a');
        const imgElement = document.createElement('img');
        imgElement.src = `https://live.staticflickr.com/${photoInfo.server}/${photoInfo.id}_${photoInfo.secret}_${userSizeChoiceToURL()}.jpg`;
        aElement.href = imgElement.src;
        aElement.target = "_blank";
        aElement.appendChild(imgElement);
        document.getElementById("photoSection").appendChild(aElement);
    })}
}
//Function that adds correct suffix for size option in URL
function userSizeChoiceToURL(){
    let sizeChoice = document.querySelector('input[type=radio]:checked').value;
    if (sizeChoice === "small") return "w";
    if (sizeChoice==="medium") return "c";
    return "b";
}