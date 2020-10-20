import DataSource from "../data/DataSource";
import noImage from "src/../assets/no_image.jpg"

customElements.define("app-detail", class Detail extends HTMLElement {

    connectedCallback() {
        this.poster_path_movie = "poster_path"
        this.backdrop_path = "backdrop_path"
        this.title_movie = "title"
        this.overview_movie = "overview"
        this.status_movie = "status"
        this.tagline_movie = "tagline"
        this.vote_count_movie = "vote_count"
        this.runtime_movie = "runtime"
        this.release_date_movie = "release_date"
        this.popularity_movie = "popularity"
        this.homepage_movie = "homepage"
        this.spoken_languages_movie = "spoken_languages"
        this.vote_average_movie = "vote_average"
        this.production_companies_movie = "production_companies"
        this.production_countries_movie = "production_countries"
        this.budget_movie = "budget"
        this.render()
    }

    style() {
        return `
            <style>
                .detail_container {
                    font-size: large;
                    background-image:
                        linear-gradient(to bottom, rgba(255,255,0,0.5), rgba(0,0,255,0.5)),
                        url('${DataSource.URL_MOVIES_POSTER(DataSource.IMAGE_RESOLUTION(), this.getAttribute(this.backdrop_path))}');
                    padding: 20px 10%;
                }
                .detail_poster  {
                    border-top-left-radius: 10px;
                    width: 250px;
                    min-height: 300px;
                }
                .description_container {
                    border-top-right-radius: 10px;
                    padding-left: 10px;
                    color: white;
                }
                .description_container_item {
                    flex: 0 0 25%;
                    text-align: center;
                }
                .bg_dark_transparent_03 {
                    background-color: rgba(0,0,0, 0.3);                 
                }
                @media screen and (max-width: 600px) {
                    .view_production_companies {
                        justify-content: center;
                    }
                    .view_production_countries {
                        justify-content: center;
                    }
                    .detail_container {
                        padding: 0;
                    }
                    .detail_poster {
                        border-top-left-radius: 0;
                        width: 100%;
                        max-height: 130px;
                    }
                    .description_container_item {
                        flex: 0 0 30%;
                        margin-bottom: 10px;
                        padding: 10px;
                        background-color: rgba(0,0,0, 0.3);
                        border-radius: 10px;
                    }
                    .wrapper_detail_first {
                        flex-direction: column;
                    }
                    
                    .bg_item {
                        border-radius: 10px;
                        background-color: rgba(0,0,0, 0.3);
                        padding: 10px;
                    }
                    
                    .recommendation_item movie-item {
                        flex: 0 0 48%;
                        max-width: 48%;
                        margin: 0.5%;
                    }
                    movie-item .container_movie_item {
                        width: 100%;
                        margin: 0;
                    }
                }
            </style>
        `
    }

    view() {
        this.getAttribute(this.production_companies_movie)
        return `
            ${this.style()}
            <div class="detail_container d-flex flex-column">
                <div class="wrapper_detail_first d-flex">
                    <img class="detail_poster" alt="${this.getAttribute(this.title)}" src="${DataSource.URL_MOVIES_POSTER(DataSource.IMAGE_RESOLUTION(), this.getAttribute(this.poster_path_movie))}">
                    <div class="description_container bg_dark_transparent_03 d-flex flex-wrap justify-content-around w-100">
                        <div class="title w-100 h3 mt-4 text-center">${this.getAttribute(this.title_movie)}</div>
                        <div class="tagline w-100 h4 text-center">${this.getAttribute(this.tagline_movie)}</div>
                        <div class="description_container_item">
                            <div>Status</div>
                            <span>${this.getAttribute(this.status_movie)}</span>
                        </div>
                        <div class="description_container_item">
                            <dev>Date</dev>
                            <div>${this.getAttribute(this.release_date_movie)}</div>
                        </div>
                        <div class="description_container_item">
                            <div>Vote</div>
                            <div>${this.getAttribute(this.vote_count_movie)}</div>
                        </div>
                        <div class="description_container_item">
                            <div>Duration</div>
                            <div>${this.getAttribute(this.runtime_movie)} Minute</div>
                        </div>
                        <div class="description_container_item">
                            <div>Popularity</div>
                            <div>${this.getAttribute(this.popularity_movie)}</div>
                        </div>
                        <div class="description_container_item">
                            <div>Budget</div>
                            <div>${this.getAttribute(this.budget_movie) !== "0" ? this.getAttribute(this.budget_movie) : "-"}</div>
                        </div>
                        <div class="description_container_item">
                            <div>Vote Average</div>
                            <div>${this.getAttribute(this.vote_average_movie)}</div>
                        </div>
                        <div class="description_container_item">
                            <div>Spoken Languages</div>
                            <div>${this.view_object(this.getAttribute(this.spoken_languages_movie), false)}</div>
                        </div>
                    </div>               
                </div>
                <div class="wrapper_detail_second bg_dark_transparent_03 p-3 text-white">
                    <div class="h4 mt-3 text-center">OverView</div>
                    <div class="ml-5 mr-5 text-center bg_item p-3">${this.getAttribute(this.overview_movie)}</div>
                    <div class="h4 mt-3 text-center">Production Companies</div>
                    <div class="text-center">${this.view_object(this.getAttribute(this.production_companies_movie), true)}</div>
                    <div class="h4 mt-3 text-center">Production Countries</div>
                    <div class="text-center">${this.view_object(this.getAttribute(this.production_countries_movie), true)}</div>                
                    <div class="w-100 h4 text-center"><a href="${this.getAttribute(this.homepage_movie)}">Home Page</a></div>
                </div>
            </div>

            <div class="container_recommendation pt-5">
                <header class="text-center h3 text-uppercase">Recommendation</header>
                <div class="recommendation_item d-flex flex-wrap justify-content-center"></div>
            </div>
        `
    }

    view_object(attr, bg_item) {
        let view = `<div class="view_production_companies d-flex flex-wrap justify-content-center">`
        attr.split('__').forEach((val) => {
            if (val !== '') {
                view += `<div class="m-1${bg_item ? " bg_item" : ""}">${val}</div>`
            }
        })
        return (view += `</div>`)
    }

    viewRecommendation() {
        new DataSource().getData(DataSource.URL_MOVIES_RECOMMENDATION(this.id, 1)).then((value) => {
            $(value.results).map((index, val) => {
                $('.recommendation_item').append(`
                    <movie-item
                        from="recommendation"
                        id_item="${val.id}"
                        id="${val.id}"
                        img_1="${val.poster_path != null ? DataSource.URL_MOVIES_POSTER(DataSource.IMAGE_RESOLUTION(), val.poster_path) : noImage}" 
                        img_2="${val.backdrop_path != null ? DataSource.URL_MOVIES_POSTER(DataSource.IMAGE_RESOLUTION(), val.backdrop_path) : noImage}"
                        title="${val.title}"
                        vote_average="${val.vote_average}" >
                    </movie-item>
                `)
            })
        })
    }

    render() {
        this.innerHTML = this.view();
        this.viewRecommendation()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== null) {
            new DataSource().getData(DataSource.URL_MOVIES_DETAIL(newValue)).then((value) => {
                this.setAttribute(this.backdrop_path, value.backdrop_path)
                this.setAttribute(this.poster_path_movie, value.poster_path)
                this.setAttribute(this.title_movie, value.title)
                this.setAttribute(this.overview_movie, value.overview)
                this.setAttribute(this.status_movie, value.status)
                this.setAttribute(this.tagline_movie, value.tagline || "")
                this.setAttribute(this.vote_count_movie, value.vote_count)
                this.setAttribute(this.runtime_movie, value.runtime)
                this.setAttribute(this.release_date_movie, value.release_date)
                this.setAttribute(this.popularity_movie, value.popularity)
                this.setAttribute(this.homepage_movie, value.homepage || null)
                this.setAttribute(this.vote_average_movie, value.vote_average)
                this.setAttribute(this.budget_movie, value.budget)
                const obj = (object) => {
                    let result = ''
                    object.forEach((val) => {
                        result += val.name + '__'
                    })
                    return result
                }
                this.setAttribute(this.production_companies_movie, obj(value.production_companies))
                this.setAttribute(this.production_countries_movie, obj(value.production_countries))
                this.setAttribute(this.spoken_languages_movie, obj(value.spoken_languages))
                this.render()
            })
        }
    }

    static get observedAttributes() {
        return ["id"];
    }
});