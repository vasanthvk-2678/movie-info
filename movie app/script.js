const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=24b538fdc63aaec27e11ea1e61833db3";

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=24b538fdc63aaec27e11ea1e61833db3&query=" ;
// const SEARCHAPI = "https://api.themoviedb.org/3/movie/550?api_key=&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(APIURL);

async function getMovies(url){
    const resp = await fetch(url);
    console.log(url)
    const respData = await resp.json();
    showMovies(respData);
}


function showMovies(movies) {
    main.innerHTML = "";
    if(!movies.results){
        console.log(movies)
        const {backdrop_path , original_title}  = movies ;
      
        const movieEl = document.createElement("div");
        
        movieEl.classList.add("ind_div");
        movieEl.innerHTML = `
        <img src="${IMGPATH + backdrop_path}" class="ind_img" alt="${original_title}">
        <div class="movie-info">
            <h3>${original_title}</h3>
        </div>
        `;
        console.log(movieEl)
        main.appendChild(movieEl);
   
        return ;
    }
    let ar = movies.results;
    ar.forEach((movie) => {
    
        const{ poster_path, title, vote_average, overview} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="individual" >
        <img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        </div>
        `;
 
        main.appendChild(movieEl);
    });

}




function getClassByRate(vote) {
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else {
        return 'red';
    }
}


let searchButton = document.querySelector('.searchMovie')
 
searchButton.addEventListener("click",(e)=>{
    e.preventDefault();  
    const searchTerm = search.value;
    if(searchTerm){
    console.log('Button Clicked') ;
    console.log(searchTerm)  
    getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }  
});

