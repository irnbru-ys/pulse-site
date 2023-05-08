const slider = tns({
    container: ".carousel__inner",
    items: 1,
    slideBy: "page",
    autoplay: false,
    controls: false,
    navPosition: "bottom",
    nav: true,

    controlsText: [
        '<img src="../icons/left.png">',
        '<img src="../icons/right.png">',
    ],
    responsive: {
        320: {
            items: 1,
            nav: true,
        },

        573: {
            items: 1,
            nav: true,
        },

        574: {
            items: 1,
            nav: false,
            edgePadding: 20,
            gutter: 20,
        },

        700: {
            items: 1,
            nav: false,
        },
    },
});

document.querySelector(".prev").addEventListener("click", function () {
    slider.goTo("prev");
});
document.querySelector(".next").addEventListener("click", function () {
    slider.goTo("next");
});

$(document).ready(function () {
    $("ul.catalog__tabs").on(
        "click",
        "li:not(.catalog__tab--active)",
        function () {
            $(this)
                .addClass("catalog__tab--active")
                .siblings()
                .removeClass("catalog__tab--active")
                .closest("div.container")
                .find("div.catalog__content")
                .removeClass("catalog__content--active")
                .eq($(this).index())
                .addClass("catalog__content--active");
        }
    );

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".catalog-item__content")
                    .eq(i)
                    .toggleClass("catalog-item__content--active");
                $(".catalog-item__list")
                    .eq(i)
                    .toggleClass("catalog-item__list--active");
            });
        });
    }

    toggleSlide(".catalog-item__link");
    toggleSlide(".catalog-item__back");
});
