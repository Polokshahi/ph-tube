// create loadCategorise

const loadCategorise = () => {
//fatch

fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(res => res.json())
.then(data => displayCategorise(data.categories))
.catch(err => console.error('somthing error: ' + err))



}

// timeConvert function
const timeConvert = (time) => {
    const hour = parseInt(time / 36000);
    let remainingSecond = time % 3600;
    let minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    
    
    return `${hour}h ${minute}m ${remainingSecond}s`
}
// video loads
const loadVideos = (search ="") => {
//fatch

fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
.then(res => res.json())
.then(data => displayVideos(data.videos))
.catch(err => console.error('somthing error: ' + err))



}

const displayDetails =(videoo)=>{
    console.log(videoo);
    document.getElementById('showModalData').click();
    // document.getElementById("customModal").showModal();
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `

    <img src=${videoo.thumbnail}>
    <p class="mt-1">${videoo.description}</p>
    
    
    
    `


}
 const loadDetails = async(videoId) =>{

    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
    
}





const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if(videos.length ==0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        

        <div class="min-h-[300px] w-full flex fle-col gap-5 justify-center items-center"> 
        <img src="assets/Icon.png"> 

        <h2 class="text-xl  font-bold">No Content Here</h2>
        
        </div>
        
        
        `;
        return;
    }else{
        videoContainer.classList.add('grid');
       
    }



    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class ="h-[200px]">
                <img class ="h-full w-full object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                ${
                    video.others.posted_date?.length == 0 ? "" :`<span class="absolute text-sm right-2 p-1 top-40 bg-black rounded text-white">
                ${timeConvert(video.others.posted_date)}
                </span>`
                }
               
                
                
            </figure>

            <div class="px-0 py-2 flex gap-2">

            <div> 
            <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}">
            </div>

             <div> 

             <h1 class="font-bold">${video.title}</h1>

            <div class = "flex items-center">
            <p class="text-gray-500">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified == true ? `<img class="w-5 h-5 mx-1 object-cover" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">` : ``}
             
            </div>
             <p class="text-gray-500">${video.others.views}</p>
            </div>

        
            
            
            
            
            </div>
            <p><button onclick="loadDetails('${video.video_id}')" class="btn mx-10 btn-sm btn-error">Details</button></p>
        
            </div>
            `

            videoContainer.appendChild(card)
        

    })
    

}

const removeActiveclass = () => {
    const buttons = document.getElementsByClassName("btn-categories");
    for(let btns of buttons){
        btns.classList.remove('active')
    }

}


const loadCategoris = (id) =>{
    // alert(id);

fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
.then(res => res.json())
.then((data) => {

    removeActiveclass()
    const activeBtn = document.getElementById(`btn-${id}`)
    activeBtn.classList.add('active')
    
    displayVideos(data.category)

})

.catch(err => console.error('somthing error: ' + err))

}


// create displayCategorise

const displayCategorise = (categorise) => {
    const categorisContainer = document.getElementById('categories');

    categorise.forEach(item => {
        // create a btn
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `

        <button id="btn-${item.category_id}" onclick="loadCategoris(${item.category_id})"  class="btn btn-categories">
        ${item.category}
        </button>
        
        
        `
        categorisContainer.appendChild(buttonContainer);
        
    });
    
    
}

document.getElementById("search-input").addEventListener("keyup", (e)=>{
    loadVideos(e.target.value);

})


loadCategorise()
loadVideos()

