customElements.define("app-search", class Search extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    getStyle() {
        return `
            <style>
                .container_search {
                    padding: 110px 10% 1% 10%;
                    background: rgba(52, 58, 64, 1);
                }
                /*.header_search {*/
                /*    font-size: 25px;*/
                /*    text-shadow: 2px 2px 4px wheat, -2px -2px wheat;*/
                /*}*/
                @media screen and (max-width: 500px) {
                    .container_search {
                        padding: 80px 1px 10px 1px;
                    }
                }
            </style>`
    }

    render() {
        this.innerHTML = `
             ${this.getStyle()}
             <div class="container_search">
                <div class="col-lg-12">
<!--                    <header class="header_search">Search</header>-->
                    <form class="input-group input-group-lg" autocomplete="off">
                        <input type="search" class="inputSearch form-control" id="search-church"
                               placeholder="Search Movie">
                        <span class="input-group-lg">
                                <button class="btnSearch btn btn-lg btn-outline-info" type="submit">Search</button>
                              </span>
                    </form>
                </div>
                <hr class="my-4">
            </div>
        `
    }
});