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

    //modal

    $("[data-modalM=consultation]").on("click", function () {
        $(".overlay, #consultation").fadeIn("slow");
    });
    $(".modalM__close").on("click", function () {
        $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
    });
    // $('.button--mini').on('click', function() {
    //     $('.overlay, #order').fadeIn('slow');
    // });

    $(".button--mini").each(function (i) {
        $(this).on("click", function () {
            $("#order .modal__descr").text(
                $(".catalog-item__subtitle").eq(i).text()
            );
            $(".overlay, #order").fadeIn("slow");
        });
    });

    // $("#consultation-form").validate();
    // $("#consultation form").validate({
    //     rules: {
    //         name: {
    //             required: true,
    //             minlength: 2,
    //         },
    //         phone: {
    //             required: true,
    //             minlength: 11,
    //         },
    //         email: {
    //             required: true,
    //             email: true,
    //         },
    //     },
    //     messages: {
    //         name: {
    //             required: "Пожалуйста, введите Ваше имя",
    //             minlength: jQuery.validator.format(
    //                 "Введите минимум {0} символа!"
    //             ),
    //         },
    //         phone: "Пожалуйста, введите свой номер телефона (формата 89632346534 (11 цифр)",
    //         email: {
    //             required: "Пожалуйста, введите сввой E-mail",
    //             email: "Ваш E-mail должен быть формата: name@domain.ru",
    //         },
    //     },
    // });
    // $("#order form").validate();

    function validForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: {
                    required: true,
                    minlength: 11,
                },
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите Ваше имя",
                    minlength: jQuery.validator.format(
                        "Введите минимум {0} символа!"
                    ),
                },
                phone: "Пожалуйста, введите свой номер телефона (формата 89632346534 (11 цифр)",
                email: {
                    required: "Пожалуйста, введите сввой E-mail",
                    email: "Ваш E-mail должен быть формата: name@domain.ru",
                },
            },
        });
    };

    validForms("#consultation-form");
    validForms("#consultation form");
    validForms("#order form");
});
