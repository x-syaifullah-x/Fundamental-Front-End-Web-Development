import DataSource from "src/script/data/DataSource";
import noImage from "src/../assets/no_image.jpg"

const appBarNavigation = {
    "popular": ['Popular', DataSource.URL_MOVIES_POPULAR()],
    "top_rated": ['Top Rated', DataSource.URL_MOVIES_TOP_RATED()],
    "up_coming": ['Up Coming', DataSource.URL_MOVIES_UPCOMING()]
};

customElements.define("list-movie", class ListMovie extends HTMLElement {
    style() {
        return `<style>
                    .list_movie_container movie-item {
                         margin: 1px;
                    }
                    .list_movie_container .container_movie_item {
                        margin: 5px auto;
                    }
                    @media screen and (max-width: 500px) {
                        .container_movie_item {
                            width: 100%;
                        }
                        .list_movie_container movie-item {
                            flex: 0 0 48%;
                            max-width: 48%;
                            margin: 0.5%;
                        }
                    }
                </style>`
    }

    view(value) {
        this.innerHTML = `
                    ${this.style()}
                   <div class="list_movie_container d-flex flex-wrap justify-content-center align-items-center ${window.innerWidth > 1100 ? 'container' : ''}"></div>
                   `
        value.results.map((value, index) => {
            $('.list_movie_container').append(
                this.viewMovieItem(value.id, value.poster_path, value.backdrop_path, value.title || value.original_name, value.vote_average)
            )
        })
        return this.innerHTML += `<button type="button" class="btnLoadMore btn btn-secondary btn-lg btn-block container mb-4">More</button>`;
    }

    connectedCallback() {
        this.page = 1;
        this.innerHTML = `<app-loading/>`;
        Object.keys(appBarNavigation).map((navData, index) => {
            if (navData === this.getAttribute("id")) {
                this.url = appBarNavigation[navData][1];
                $(window).resize((ev) => {
                    const listMovieContainer = $('.list_movie_container');
                    ev.target.innerWidth > 1100 ? listMovieContainer.addClass('container') : listMovieContainer.removeClass('container')

                })
                new DataSource().getData(this.url).then((value) => {
                    this.page = 1;
                    $('app-loading').remove();
                    $('footer').css({opacity: 1})
                    this.innerHTML = this.view(value)
                    $('.btnLoadMore').on('click', (ev) => {
                        const btnMore = $(ev.target);
                        const textLoaded = '<i class="spinner-border mr-3"/><span>Loading ...</span>';
                        if (btnMore.html() !== textLoaded) {
                            btnMore.html(textLoaded)
                        }

                        const scrollPosition = $(window).scrollTop() + window.innerHeight - 100;
                        new DataSource().getData(`${this.url}&page=${++this.page}`).then((value => {
                            btnMore.html("More");
                            value.results.map((value) => {
                                $('.list_movie_container').append(
                                    this.viewMovieItem(value.id, value.poster_path, value.backdrop_path, value.title || value.original_name, value.vote_average)
                                );
                            });
                            $(window).scrollTop(scrollPosition)
                        }))
                    })
                });
            }
        })
    }

    viewMovieItem(id, img_1, img_2, title, voteAverage) {
        return `<movie-item 
                    id_item="${id}"
                    id="${id}"
                    img_1="${img_1 != null ? DataSource.URL_MOVIES_POSTER('w92', img_1) : noImage}" 
                    img_2="${img_2 != null ? DataSource.URL_MOVIES_POSTER('w92', img_2) : noImage}"
                    title="${title}"
                    vote_average="${voteAverage}" >
                </movie-item>`
    }
});