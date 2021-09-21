/** Точка входа в приложение */
/** Подключение стилей */
import './scss/mobile.scss'
import 'es6-promise/auto'
import './js/InputMask'
import favorite from './js/favorites'
import(/* webpackChunkName: "vue" */ './vue/mobile')

$(document).ready(function () {
  new favorite({
    container: '.js--favourites',
    activeClass: 'js--favourites_active',
    countContainer: '.js--favourites__count',
    dataName: 'id'
  })
})