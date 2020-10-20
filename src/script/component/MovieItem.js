import DataSource from "../data/DataSource";

customElements.define("movie-item", class MovieItem extends HTMLElement {
    connectedCallback() {
        this.id_item = this.getAttribute("id_item") || null;
        this.img_1 = this.getAttribute("img_1") || null;
        this.img_2 = this.getAttribute("img_2") || null;
        this.description = this.getAttribute("description") || null;
        this.title = this.getAttribute("title") || null;
        this.overview = this.getAttribute("overview") || null;
        this.popularity = this.getAttribute("popularity") || null;
        this.release_date = this.getAttribute("release_date") || null;
        this.original_language = this.getAttribute("original_language") || null;
        this.vote_average = this.getAttribute("vote_average") || null;
        this.render()
    }

    view() {
        return `
            <div class="container_movie_item card">
                <div id="carouselExampleCaptions${this.id}" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleCaptions${this.id}" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleCaptions${this.id}" data-slide-to="1"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${this.img_1}" class="d-block w-100 image_movie" alt="${this.title}">
                        </div>
                        <div class="carousel-item">
                            <img src="${this.img_2}" class="d-block w-100 image_movie" alt="${this.title}">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions${this.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions${this.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            
                <div id="description_movie${this.id}" class="description_movie">
                    <div class="title_movie h5">${this.title}</div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ${this.vote_average * 100 / 10}%">
                            <span>vote : ${this.vote_average * 100 / 10}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    render() {
        this.innerHTML = this.view();
        setTimeout(() => {
            $(`.container_movie_item.card`).addClass('container_movie_item_show')
        })

        $(`#description_movie${this.id}`).on('click', (ev) => {
            const footer = $('footer');
            footer.css({opacity: 0})
            new DataSource().getData(DataSource.URL_MOVIES_DETAIL(this.id_item)).then((value) => {
                if (this.getAttribute('from') === 'recommendation') {
                    $('app-detail').attr('id', this.id_item)
                } else if (this.getAttribute('from') === 'search_result') {
                    this.setDetailAttr($('search-result'), value)
                } else {
                    const navActive = $('.navigation.nav-link.active');
                    if (navActive.attr('id') === 'home' || navActive.attr('id') === 'The_Movie') {
                        this.setDetailAttr($('app-home'), value)
                    } else {
                        this.setDetailAttr($('list-movie'), value)
                    }
                }
            })
            window.scrollTo(0, 0)
            footer.css({opacity: 0});
        })
    }

    setDetailAttr(selector, value) {
        const obj = (value) => {
            let result = ''
            value.forEach((val) => {
                result += val.name + '__'
            })
            return result;
        }

        return $(selector).replaceWith(
            `<app-detail 
                id="${this.id_item}"
                title="${value.title}"
                poster_path="${value.poster_path}"
                backdrop_path="${value.backdrop_path}"
                overview="${value.overview}"
                status="${value.status}"
                tagline="${value.tagline}"
                vote_count="${value.vote_count}"
                runtime="${value.runtime}"
                release_date="${value.release_date}"
                popularity="${value.popularity}"
                homepage="${value.homepage}"
                vote_average="${value.vote_average}"
                spoken_languages="${obj(value.spoken_languages)}"
                production_companies="${obj(value.production_companies)}"
                production_countries="${obj(value.production_countries)}"
                budget="${value.budget}">
            </app-detail>`
        )
    }
});