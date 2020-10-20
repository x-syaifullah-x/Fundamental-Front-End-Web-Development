import DataSource from "../data/DataSource";
import noImage from "src/../assets/no_image.jpg"
import data_not_found from "src/../assets/not_found.png"

customElements.define("search-result", class SearchResult extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<app-loading/>`;
        this.title = this.getAttribute("title");
        this.dataSource = new DataSource();
        this.render()
    }

    style() {
        return `
            <style>
                @media screen and (max-width: 600px) {
                     .contentSearchResult movie-item {
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

    viewMovieItem(id, img_1, img_2, title, voteAverage) {
        return `
            <movie-item 
                from="search_result"
                id_item="${id}"
                id="${id}"
                img_1="${img_1 != null ? DataSource.URL_MOVIES_POSTER('w92', img_1) : noImage}" 
                img_2="${img_2 != null ? DataSource.URL_MOVIES_POSTER('w92', img_2) : noImage}"
                title="${title}"
                vote_average="${voteAverage}">
            </movie-item>
        `
    }

    render() {
        this.innerHTML += `${this.style()}<h1 class="headerSearchResult text-center text-dark">Search Result</h1>`;
        this.dataSource.getData(DataSource.URL_MOVIES_SEARCH(this.title)).then((value => {
            $('app-loading').remove();
            if (value.total_results !== 0) {
                this.innerHTML += `<div class="contentSearchResult d-flex flex-wrap justify-content-center"></div>`;
                value.results.map((value) => {
                    $('.contentSearchResult').append(this.viewMovieItem(value.id, value.poster_path, value.backdrop_path, value.title || value.original_name, value.vote_average))
                });
            } else {
                this.innerHTML += `<div class="text-center" style="min-height: 250px"><img alt="data not found" src="${data_not_found}"></div>`
            }
        }));
    }
});