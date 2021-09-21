import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import(/* webpackChunkName: "slick-carousel" */ 'slick-carousel/slick/slick.min').then(() => {
  $(document).ready(() => {
    $('.js--detail-slider')
      .on('init', (event, slick) => {
        $(event.target).find('video').each(function () {
          this.muted = 'muted'
        })
        $(slick.$slides[slick.currentSlide]).find('video').each(function () {
          this.play()
        })
      })
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        fade: true,
        adaptiveHeight: true,
        lazyLoad: 'progressive',
        asNavFor: '.js--detail-thumbs'
      })
      .on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        $(slick.$slides[currentSlide]).find('video').each(function () {
          this.pause()
        })
        $(slick.$slides[nextSlide]).find('video').each(function () {
          this.play()
        })
      })

    $('.js--detail-thumbs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      focusOnSelect: true,
      arrows: false,
      infinite: false,
      asNavFor: '.js--detail-slider'
    })

    $('#noSizeItem').on('click', () => {
      $('.js--size').stop().css('backgroundColor', '#f7e9e9').animate({
        'backgroundColor': 'none'
      }, 1000, function () {
        $(this).css('backgroundColor', '')
      })
    })
  })
})