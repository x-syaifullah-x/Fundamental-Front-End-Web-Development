customElements.define("app-bar", class AppBar extends HTMLElement {

    connectedCallback() {
        this.render()
    }

    style() {
        this.appBarTitleBrand = 'The Movie'
        this.idAppBarTitleBrand = this.appBarTitleBrand.replace(' ', '_')
        return `<style>
                    #${this.idAppBarTitleBrand} {
                        text-shadow: 2px 2px 4px wheat;
                    }
                    .navbar {
                        transition: top 0.4s;
                    }
                    .navigation.nav-link.active {
                        text-shadow: 1px -1px black, 2px -2px black;
                    }
                    .navigation.nav-link {
                        text-shadow: 1px -1px black, 2px -2px black;
                    }
                </style>`
    }

    view() {
        return `
            ${this.style()}
            <header>
                <nav class="navbar navbar-dark bg-dark fixed-top navbar-expand-sm">
                    <button class="btnCollapseNavBar navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <a id="${this.idAppBarTitleBrand}" class="navigation nav-link navbar-brand font-weight-bold" href="#">${this.appBarTitleBrand}</a>
            
                    <div class="navbar-collapse collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                                <a id="home" class="navigation nav-link active" href="#">Home<span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a id="popular" class="navigation nav-link" href="#popular">Popular</a>
                            </li>
                            <li class="nav-item">
                                <a id="top_rated" class="navigation nav-link" href="#">Top Rated</a>
                            </li>
                            <li class="nav-item">
                                <a id="up_coming" class="navigation nav-link" href="#">Up Coming</a>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0 invisible">
                            <input class="inputSearch form-control mr-sm-2" type="search" placeholder="Search Movie" aria-label="Search">
                            <button class="btnSearch btn btn-outline-success my-2 my-sm-0 btn-outline-info" type="submit">Search</button>
                        </form>
                    </div>
                </nav> 
            </header>`
    }

    render() {
        this.innerHTML = this.view();
        const nav = $('nav');
        const navHeight = nav[0].offsetHeight + 10;
        let pageYOffset = window.pageYOffset;
        const visible = $('.invisible');
        $(window).scroll((ev) => {
            if ($('.collapse.show').length === 1) {
                $('.collapse').removeClass('show')
            }
            if ($(ev.target).scrollTop() > $('.container_search')[0].offsetHeight) {
                visible.removeClass('invisible')
            } else if ($(ev.target).scrollTop() < 170) {
                visible.addClass('invisible')
            }
            nav.css({'top': `${pageYOffset > (pageYOffset = window.pageYOffset) ? '0' : `-${nav.css('height')}`}`});
        });

        this.navigation(navHeight);
    }

    navigation() {
        $('.nav-link').on('click', (ev) => {
            ev.preventDefault();
            $('footer').css({opacity: 0})

            if ($('.collapse.show').length === 1) {
                $('.collapse').removeClass('show')
            }

            $('.nav-link').each((index, element) => {
                element.id === ev.target.id ? $(element).addClass("active") : $(element).removeClass('active');
            });

            $($('main').children()[1]).replaceWith(
                (ev.target.id === 'home' || ev.target.id === this.idAppBarTitleBrand) ? `<app-home></app-home>` : `<list-movie id="${ev.target.id}"></list-movie>`
            )
        })
    }
});