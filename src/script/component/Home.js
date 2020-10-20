import DataSource from "src/script/data/DataSource";
import noImage from "src/../assets/no_image.jpg"
import 'src/style/Home.css'

customElements.define("app-home", class Home extends HTMLElement {
    view(headerText, id) {
        return `
            <style>
                #container_${id} {
                    padding: 3rem;
                }
                #item_${id}{
                    transition: all 1s;
                }
                @media screen and (max-width: 550px) {
                    #container_${id} {
                        padding: 1px;                    
                    }
                }
            </style>
            <div id="container_${id}">
                <header id="header_${id}" class="header h1 text-center text-white font-weight-bolder" >${headerText}</header>
                <div id="item_${id}" class="d-flex overflow-auto pt-3"></div>
            </div>`
    }

    connectedCallback() {
        this.dataSource = new DataSource();
        this.innerHTML = `<app-loading/>`;
        const dataContent = [{
            'now_playing': [DataSource.URL_MOVIES_NOW_PLAYING(), this.view("Now Playing", "now_playing")],
            'popular': [DataSource.URL_MOVIES_POPULAR(), this.view("Popular", "popular")],
            'top_rated': [DataSource.URL_MOVIES_TOP_RATED(), this.view("Top Rated", "top_rated")],
            'up_coming': [DataSource.URL_MOVIES_UPCOMING(), this.view("Up Coming", "up_coming")]
        }]

        dataContent.forEach((value => {
            for (let key in value) {
                this.render(value[key][0], value[key][1], key)
            }
        }))
    }

    render(url, view, id) {
        this.dataSource.getData(url).then((value => {
            if (value.results !== undefined) {
                $(this).append(view);
                const item = $(`#item_${id}`)
                $('app-loading').remove();
                $('footer').css({opacity: 1})

                $(value.results).map((index, value) => {
                    item.append(this.viewMovieItem(
                        value.id, id + value.id, value.poster_path, value.backdrop_path, value.title || value.original_name, value.vote_average
                    ));
                });

                const widthItem = item.children().width();
                const totalItem = item.width() / widthItem;
                let page = 1;
                let index = 0
                let scroll = 0
                const container = $(`#container_${id}`)
                this.setBgContainer($(container), $(item.children()[0]).attr('img_1'))
                $(item).scroll((ev) => {
                    if (ev.target.scrollLeft >= ev.target.scrollWidth - (totalItem * widthItem)) {
                        if (page <= value.total_pages) {
                            this.loadPage(`${url}&page=${++page}`, item, ev.target.scrollWidth - (totalItem * widthItem), id)
                        }
                    }

                    if (Math.round(ev.target.scrollLeft / widthItem) !== index && ev.target.scrollLeft > scroll) {
                        $(item.children()[index + 1]).removeClass('focus')
                        $(item.children()[index + 2]).addClass('focus')
                        this.setBgContainer($(container), $(item.children()[index++ + 2]).attr('img_1'))
                    } else {
                        if (Math.round(ev.target.scrollLeft / widthItem) !== index && ev.target.scrollLeft < scroll || Math.round(ev.target.scrollLeft) === 0) {
                            $(item.children()[index]).addClass('focus')
                            $(item.children()[index + 1]).removeClass('focus')
                            this.setBgContainer($(container), $(item.children()[index--]).attr('img_1'))
                        }
                    }
                    scroll = ev.target.scrollLeft;
                })
            } else {
                console.log("data not found")
            }
        }))
    }

    setBgContainer(selector, url) {
        selector.css({
            transition: 'all 1s',
            background: `linear-gradient(to bottom, rgba(85,87,83,0.9), rgba(0,0,0,0.7)), url(${url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        })
    }

    viewMovieItem(idItem, id, img_1, img_2, title, voteAverage) {
        return `
            <movie-item
                id_item="${idItem}"
                id="${id}"
                img_1="${img_1 != null ? DataSource.URL_MOVIES_POSTER(DataSource.IMAGE_RESOLUTION(), img_1) : noImage}" 
                img_2="${img_2 != null ? DataSource.URL_MOVIES_POSTER(DataSource.IMAGE_RESOLUTION(), img_2) : noImage}"
                title="${title}"
                vote_average="${voteAverage}">
            </movie-item>
        `
    }

    loadPage(url, item, position, id) {
        this.dataSource.getData(url).then(
            value => {
                $(value.results).map((index, value) => {
                    item.append(this.viewMovieItem(
                        value.id,
                        id + value.id,
                        value.poster_path,
                        value.backdrop_path,
                        value.title || value.original_name,
                        value.vote_average
                    ));
                });
                $(item).scrollLeft(position + 400);
            });
    }
});