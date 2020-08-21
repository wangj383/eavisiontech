// initiate aos
AOS.init()

//bodyOverlay
$(function () {
  $('.navbar-toggler').on('click', function () {
    $('.bodyOverlay').toggleClass('menu-open')
  })
  if ($('#serviceContact')) {
    $.get('../../contact.html', function (val) {
      $('#serviceContact').html(val)
    })
  }
})

//Carousel
// thumbnails.carousel.js jQuery plugin
;(function (window, $, undefined) {
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
  formdata.append('subject', get_id('subject').value)
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
          subject.value +
          '. One of our colleagues will get back to you shortly.' +
          '<br/> Have a great day!</p>'

        get_id('name').value = ''
        get_id('email').value = ''
        get_id('phone').value = ''
        get_id('subject').value = ''
        get_id('message').value = ''
        get_id('submit').value = 'Send'
        get_id('submit').disabled = false
      } else {
        get_id('status').innerHTML = ajax.responseText
        get_id('submit').disabled = false
      }
      //   if (ajax.responseText == 'success') {
      //     get_id('contact_form').innerHTML =
      //       '<h2>Thanks ' +
      //       get_id('name').value +
      //       ', your message has been sent.</h2>'
      //   } else {
      //     get_id('status').innerHTML = ajax.responseText
      //     get_id('submit').disabled = false
      //     get_id('submit').value = 'Send'
      //   }
    }
  }
  ajax.send(formdata)
}
