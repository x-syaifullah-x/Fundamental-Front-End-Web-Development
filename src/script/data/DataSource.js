const apiKey = "ec6eeecd76a7ecdbf34b3daa286e8411";

export default class DataSource {
    static URL_MOVIES_RECOMMENDATION(ID, page) {
        return `https://api.themoviedb.org/3/movie/${ID}/recommendations?api_key=${apiKey}&language=en-US${`&page=${page}` || ""}`
    };

    static URL_MOVIES_DETAIL(ID) {
        return `https://api.themoviedb.org/3/movie/${ID}?api_key=${apiKey}&language=en-US`
    };

    static URL_MOVIES_NOW_PLAYING(page) {
        return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US${`&page=${page}` || ""}`
    };

    static URL_MOVIES_POPULAR(page) {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page || 1}`
    };

    static URL_MOVIES_TOP_RATED(page) {
        return `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page || 1}`
    };

    static URL_MOVIES_UPCOMING(page) {
        return `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page || 1}`
    };

    static URL_MOVIES_SEARCH(name) {
        return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${name}`
    };

    /* size_image w92, w154, w185, w342, w500, w780, original */
    static URL_MOVIES_POSTER(size, name) {
        return `https://image.tmdb.org/t/p/${size}${name}`
    };

    /* size_image w92, w154, w185, w342, w500, w780, original */
    static IMAGE_RESOLUTION(){
        return 'w92'
    }

    getData(url) {
        return fetch(url).then((value => {
            if (value.status === 200){
                return value.json();
            } else {
                return ""
            }
        })).catch((error) =>{
            console.log(error)
        })
    }
}