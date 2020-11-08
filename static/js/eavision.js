// initiate aos
AOS.init()
new WOW({ mobile: false, offset: 100 }).init();
//bodyOverlay
$(function () {
    var height = $(window).height() - 52
    // if (height < 800) {
    //   height = 268
    // }
    // $('.carousel-item > img').css('height', height)
    $('.navbar-toggler').on('click', function () {
        $('.bodyOverlay').toggleClass('menu-open')
    })
    $(document).mouseup(function (e) {
        var _con = $('#navbarToggler');
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            var className = $('.navbar-collapse').attr('class');
            if (className.indexOf('show') != -1) {
                $('.navbar-toggler').click()
            }
            
        }
    })

    
    if ($('#serviceContact')) {
        $.get('../../contact.html', function (val) {
            var from = $('#frompage').val()
            if (from == 'service') {
                $('#serviceContact').html(val)
            } else {
                $('#serviceContact').html(val)
                $('#contactSubtitles').html(
                    "<div class='row'>" +
                    "<div class='inline mr-4'>" +
                    "<img class='contactIcon' src='/static/img/icons/checkmark.png'>" +
                    "<p class='contactSubtitle inline my-auto'> Free Consultation</p>" +
                    '</div>' +
                    "<div class='inline'>" +
                    "<img class='contactIcon' src='/static/img/icons/checkmark.png'>" +
                    "<p class='contactSubtitle inline my-auto'> Customer Satisfaction Guaranteed</p>" +
                    '</div>' +
                    '</div>'
                )
                // val.replace(
                //   'card-header bg-danger text-white',
                //   'card-header text-white'
                // )
            }

            var name = '';
            var email = '';
            $("#name").blur(function () {
                name = $(this).val();
                if (name && email) {
                    $('#submit').attr("disabled", false);
                } else {
                    $('#submit').attr("disabled", true);
                }
            })
            $("#email").blur(function () {
                email = $(this).val();
                if (name && email) {
                    $('#submit').attr("disabled", false);
                } else {
                    $('#submit').attr("disabled", true);
                }
            });
            $('.select').selectpicker && $('.select').selectpicker();

        })
    }
    if ($('#navbar')) {
        $.get('../../navbar.html', function (val) {
            $('#navbar').html(val)
        })
    }
    if ($('#mobile-navbar')) {
        $.get('../../navbar-mobile.html', function (val) {
            $('#mobile-navbar').html(val)
        })
    }
    if ($('#footer')) {
        $.get('../../footer.html', function (val) {
            $('#footer').html(val);
        })
    }
})

    //Carousel
    // thumbnails.carousel.js jQuery plugin
    ; (function (window, $, undefined) {
        var conf = {
            center: true,
            backgroundControl: false,
        }

        var cache = {
            $carouselContainer: $('.thumbnails-carousel').parent(),
            $thumbnailsLi: $('.thumbnails-carousel li'),
            $controls: $('.thumbnails-carousel').parent().find('.carousel-control'),
        }

        function init() {
            cache.$carouselContainer
                .find('ol.carousel-indicators')
                .addClass('indicators-fix')
            cache.$thumbnailsLi.first().addClass('active-thumbnail')

            if (!conf.backgroundControl) {
                cache.$carouselContainer
                    .find('.carousel-control')
                    .addClass('controls-background-reset')
            } else {
                cache.$controls.height(
                    cache.$carouselContainer.find('.carousel-inner').height()
                )
            }

            if (conf.center) {
                cache.$thumbnailsLi.wrapAll("<div class='center clearfix'></div>")
            }
        }

        function refreshOpacities(domEl) {
            cache.$thumbnailsLi.removeClass('active-thumbnail')
            cache.$thumbnailsLi.eq($(domEl).index()).addClass('active-thumbnail')
        }

        function bindUiActions() {
            cache.$carouselContainer.on('slide.bs.carousel', function (e) {
                refreshOpacities(e.relatedTarget)
            })

            cache.$thumbnailsLi.click(function () {
                cache.$carouselContainer.carousel($(this).index())
            })
        }

        $.fn.thumbnailsCarousel = function (options) {
            conf = $.extend(conf, options)

            init()
            bindUiActions()

            return this
        }


       
        // var myElement = document.getElementById('carouselExampleIndicators')
        // if (myElement) {
        //     var hm = new Hammer(myElement);

        //     hm.on("swipeleft", function () {
        //         $('#carouselExampleIndicators').carousel('next')
        //     })
        //     hm.on("swiperight", function () {
        //         $('#carouselExampleIndicators').carousel('prev')
        //     })
        // }
        
        // $('#carouselExampleIndicators').removeAttr('data-pause')
        
    })(window, jQuery)

$('.thumbnails-carousel').thumbnailsCarousel()

// contact form

get_id = function (id) {
    return document.getElementById(id)
}



function submitForm() {
    get_id('submit').disabled = true
    get_id('submit').value = 'Sending...'
    var from = $('#frompage').val()
    var formdata = new FormData()
    formdata.append('name', get_id('name').value)
    formdata.append('email', get_id('email').value)
    formdata.append('phone', get_id('phone').value)
    formdata.append('topic', get_id('topic').value)
    formdata.append('service', get_id('service').value)
    formdata.append('message', get_id('message').value)
    formdata.append('from', from)
    var ajax = new XMLHttpRequest()
    ajax.open('POST', 'http://39.105.110.190:8686/contact/add')
    //ajax.open('POST', 'http://127.0.0.1:8686/contact/add')
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            if (ajax.responseText == 'ok') {
                get_id('status').innerHTML =
                    '<h3>Thank you for getting in touch!</h3>' +
                    '<p> We appreciate you contacting us about ' +
                    topic.value +
                    '. One of our colleagues will get back to you shortly.' +
                    ' Have a great day!</p>'
                $('#contactSubtitles').html(
                    "<div></div>"
                )

                get_id('name').value = ''
                get_id('email').value = ''
                get_id('phone').value = ''
                get_id('topic').value = ''
                get_id('service').value = ''
                $("#topic").selectpicker('refresh');
                $("#service").selectpicker('refresh');
                get_id('message').value = ''
                get_id('submit').value = 'Send'
                get_id('submit').disabled = false
            } else {
                get_id('status').innerHTML = ajax.responseText
                get_id('submit').disabled = false
            }
        }
    }
    ajax.send(formdata)
}

