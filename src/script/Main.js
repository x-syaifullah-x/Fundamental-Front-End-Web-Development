import logo from "src/../assets/logo_tmdb.svg"

export default function main() {
    const main = $('.main');

    main.append(`<app-search></app-search>`);
    main.append(`<app-home></app-home>`);
    $('.logo').attr('src', logo)

    $('.btnSearch').on('click', (ev) => {
        ev.preventDefault();
        $('.inputSearch').map((index, element) => {
            if ($(element).val() !== '') {
                $($(main).children()[1]).replaceWith(
                    `<search-result title="${$(element).val()}"></search-result>`
                )
            }
            $(element).val("")
        })
    });
}