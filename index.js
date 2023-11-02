document.addEventListener("DOMContentLoaded", function () { //content is loaded
    const roverSelect = document.getElementById("rovers");
    const searchBtn = document.getElementById("search-btn");
    const chooseTitle = document.getElementById("choose-title");
    const homeTitle = document.getElementById("home-title");
    const roverTitle = document.getElementById("rover-title");
    const photoContainer = document.getElementById("photo-container");
    const homeBtn = document.getElementById("home");
    const regen = document.getElementById("regenerate-rover");
    let datePic = document.getElementById("date-taken");
    let picUrl;
    let dateApi;
    let num;

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

            fetch(apiUrl, {
            headers: {
                Accept: 'application/json', 
            },
            })
            .then(res => res.json())
            .then(data => {
                
                //if curiosity array 0-855 something else 0-5
                num = Math.floor((Math.random() * 5) + 0);
                if(roverName == 'curiosity'){
                    num = Math.floor((Math.random() * 855) + 0);
                }
                
                
                picUrl = data.photos[num].img_src;
                dateApi = data.photos[num].earth_date;

                console.log(num);
                console.log(dateApi);
                photoContainer.innerHTML = "<img src='" + picUrl + "'>";
                regen.style.display = "inline";
                homeBtn.style.display = "inline";
                
                datePic.innerHTML = "Date Taken: " + dateApi;

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
            //if curiosity array 0-855 something else 0-5
            num = Math.floor((Math.random() * 5) + 0);
            if(roverName == 'curiosity'){
                num = Math.floor((Math.random() * 855) + 0);
            }
            
            console.log(num);
            picUrl = data.photos[num].img_src;
            dateApi = data.photos[num].earth_date;
            photoContainer.innerHTML = "<img src='" + picUrl + "'>";
            datePic.innerHTML = "Date Taken: " + dateApi;
            regen.style.display = "inline";
            homeBtn.style.display = "inline";
  
            console.log(data);
        })
        .catch(error => console.log("Uh Oh!"));
    }


});