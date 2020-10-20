import "regenerator-runtime"

import "bootstrap/dist/css/bootstrap.min.css"

import "popper.js/dist/popper.min"
import "bootstrap/dist/js/bootstrap.min"

import "src/style/Loading.css"
import "src/style/MovieItem.css";
import "src/style/footer.css"

import "src/script/component/AppBar";
import "src/script/component/Search";
import "src/script/component/Home";
import "src/script/component/ListMovie";
import "src/script/component/SearchResult";
import "src/script/component/MovieItem";
import "src/script/component/Loading";
import "src/script/component/Detail";

import main from "src/script/Main"

$(window).on('load', main());