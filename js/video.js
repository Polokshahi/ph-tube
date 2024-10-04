// create loadCategorise

const loadCategorise = () => {
//fatch

fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(res => res.json())
.then(data => displayCategorise(data.categories))
.catch(err => console.error('somthing error: ' + err))



}
// video loads
const loadVideos = () => {
//fatch

fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
.then(res => res.json())
.then(data => displayVideos(data.videos))
.catch(err => console.error('somthing error: ' + err))



}

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('videos');
    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class ="h-[200px]">
                <img class ="h-full w-full object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
            </figure>

            <div class="px-0 py-2 flex gap-2">

            <div> 
            <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}">
            </div>

             <div> 

             <h1 class="font-bold">${video.title}</h1>

            <div class = "flex items-center">
            <p class="text-gray-500">${video.authors[0].profile_name}</p>
            <img class="w-5 h-5 mx-1 object-cover" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">
             
            </div>
             <p class="text-gray-500">${video.others.views}</p>


             
            
            
            </div>
            
            
            
            
            </div>
        
            </div>
            `

            videoContainer.appendChild(card)
        

    })
    

}


// create displayCategorise

const displayCategorise = (categorise) => {
    const categorisContainer = document.getElementById('categories');

    categorise.forEach(item => {
        // create a btn
        const button = document.createElement('button');
        button.classList = "btn";
        button.innerText = item.category;
        categorisContainer.appendChild(button);
        
    });
    
    
}


loadCategorise()
loadVideos()
