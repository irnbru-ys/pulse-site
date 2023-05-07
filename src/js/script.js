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
