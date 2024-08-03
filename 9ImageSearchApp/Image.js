

const apiKey = "4Glre3F14r3xm747kqunzgfy3BQYHOSe_n-2IqN7oqw";
const searchForm = document.querySelector('form');
const imageContainer = document.querySelector('.imageContainer');
const searchInput = document.querySelector('.TypeImage');
const loadBtn = document.querySelector('.loadBtn');

let page = 1;
/// Function to fetch images using unplash API
const fetchImages = async (query,pageNo)=>{
    // Empty the container in next search
    try{
        if(pageNo===1){
            imageContainer.innerHTML = '';
        }

        const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${apiKey}`;
        const response = await fetch(url);
        let data = await response.json();
        console.log(data);
    
        if(data.results.length > 0){
            data.results.forEach(eachElement => {
                const imageBox = document.createElement('div');
                imageBox.innerHTML = `<img src=${eachElement.urls.regular}>`;
                imageBox.classList.add('imageDiv');
        
                /// Creating Overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlayDiv');
        
                /// Creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${eachElement.alt_description}`;
        
                overlayElement.appendChild(overlayText);
                imageBox.appendChild(overlayElement);
                imageContainer.appendChild(imageBox);
            })
        
            if(data.total_pages === pageNo){
                loadBtn.style.display = "none";
            }
            else{
                loadBtn.style.display = "block";
            }
        }
        else{
            imageContainer.innerHTML = `<h2>No Image found</h2>`
        }

    }
    catch(err){
        imageContainer.innerHTML = `<h2>failed to fetch images</h2>`
    }
}

/// Adding eventListener to search form...
searchForm.addEventListener('submit' , (ele)=>{
    //When we submit our form then it usually autosubmit , so to prevent it we use it
    ele.preventDefault();
    const info = searchInput.value.trim();
    if(info !== ''){
        page = 1;
        fetchImages(info,page);
    }
    else{
        imageContainer.innerHTML = `<h2>Please enter your image query ?</h2>`
        if(loadBtn.style.display === "block"){
            loadBtn.style.display === "none";
        }
    }
})

/// Adding eventListener to load more button
loadBtn.addEventListener('click', ()=>{
    fetchImages(searchInput.value.trim(),++page);
})


