$(document).ready(function () {
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

    $("[data-modalm=consultation]").on("click", function () {
        $(".overlay, #consultation").fadeIn("slow");
    });
    $(".modalm__close").on("click", function () {
        $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
    });
    // $('.button--mini').on('click', function() {
    //     $('.overlay, #order').fadeIn('slow');
    // });

    $(".button--mini").each(function (i) {
        $(this).on("click", function () {
            $("#order .modalm__descr").text(
                $(".catalog-item__subtitle").eq(i).text()
            );
            $(".overlay, #order").fadeIn("slow");
        });
    });

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
    }

    validForms("#consultation-form");
    validForms("#consultation form");
    validForms("#order form");

    $("input[name=phone]").mask("+7(999) 999-99-99");

    $("form").submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize(),
        }).done(function () {
            $(this).find("input").val("");
            $("#consultation, #order").fadeOut();
            $(".overlay, #thanks").fadeIn();

            $("form").trigger("reset");
        });
        return false;
    });
    // Smooth scroll and pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $(".pageup").fadeIn();
        } else {
            $(".pageup").fadeOut();
        }
    });

    // Add smooth scrolling to all links
    $("a").on("click", function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                50,
                function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            );
        } // End if
    });

    new WOW().init();
});
