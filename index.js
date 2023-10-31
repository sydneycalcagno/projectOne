document.addEventListener("DOMContentLoaded", function () { //content is loaded
    const roverSelect = document.getElementById("rovers");
    const searchBtn = document.getElementById("search-btn");
    const chooseTitle = document.getElementById("choose-title");
    const homeTitle = document.getElementById("home-title");
    const roverTitle = document.getElementById("rover-title");
    const photoContainer = document.getElementById("photo-container");
    const homeBtn = document.getElementById("home");
    const regen = document.getElementById("regenerate-rover");

    let c = roverSelect.options[roverSelect.selectedIndex].text;
    let roverName = c.toLowerCase();

    searchBtn.addEventListener('click', start);
    roverTitle.style.display = "none";
    photoContainer.style.display = "none";
    regen.style.display = "none";
    homeBtn.style.display = "none";

    function start(){
        c = roverSelect.options[roverSelect.selectedIndex].text;
        roverName = c.toLowerCase();
        roverTitle.innerHTML = "A Photo Taken by " + c;
        regen.innerText = "Another " + c + " Photo";
        searchBtn.style.display = "none";
        roverSelect.style.display = "none";
        chooseTitle.style.display = "none";
        homeTitle.style.display = "none";
        roverTitle.style.display = "block";
        photoContainer.style.display = "block";
        regen.style.display = "inline";
        homeBtn.style.display = "inline";


        const apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + roverName + "/photos?sol=1000&api_key=PttGw68Ydp1RFPxnmEsh9xuBRL4CZpigEHORKrjN";
        console.log(roverName);

        homeBtn.onclick = function(){
            location.reload();
        }

        regen.onclick = function(){
            searchBtn.style.display = "none";
            roverSelect.style.display = "none";
            chooseTitle.style.display = "none";
            homeTitle.style.display = "none";
            roverTitle.style.display = "block";
            photoContainer.style.display = "block";
            regen.style.display = "inline";
            homeBtn.style.display = "inline";

            fetch(apiUrl, {
            headers: {
                Accept: 'application/json', 
            },
            })
            .then(res => res.json())
            .then(data => {
                let photo = document.getElementById("photo-container");
                //if curiosity array 0-855 something else 0-5
                let num = Math.floor((Math.random() * 5) + 0);
                if(roverName == 'curiosity'){
                    num = Math.floor((Math.random() * 855) + 0);
                }
                
                console.log(num);
                let picUrl = data.photos[num].img_src;
                photo.innerHTML = "<img src='" + picUrl + "'>";
        
                console.log(data);
            })
            .catch(error => console.log("Uh Oh!"));

        }

        fetch(apiUrl, {
        headers: {
            Accept: 'application/json', 
        },
        })
        .then(res => res.json())
        .then(data => {
            let photo = document.getElementById("photo-container");
            //if curiosity array 0-855 something else 0-5
            let num = Math.floor((Math.random() * 5) + 0);
            if(roverName == 'curiosity'){
                num = Math.floor((Math.random() * 855) + 0);
            }
            
            console.log(num);
            let picUrl = data.photos[num].img_src;
            photo.innerHTML = "<img src='" + picUrl + "'>";
    
            console.log(data);
        })
        .catch(error => console.log("Uh Oh!"));
    }


});