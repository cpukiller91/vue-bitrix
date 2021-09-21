/** Подключение vue */
import Vue from 'vue'
import _ from 'lodash'
import httpClient from './http'
import { Autocomplete, Select, Loading, Option } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

/** Настройки vue */
Vue.config.productionTip = false

Vue.prototype.$http = httpClient

Vue.use(Autocomplete)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service

$(document).ready(() => {
  /** Монтирование компонентов в DOM */
  const appElements = document.querySelectorAll('[is]')

  if (appElements.length === 0) {
    return
  }

  /** Подключение компонентов _base-*.vue */
  const requireComponent = require.context(
    // Смотреть файлы из директории
    './desktop',
    // Не смотреть поддиректории
    false,
    // подключать только файлы с префиксом "_base-" с префиксом .vue
    /_base-[\w-]+\.vue$/
  )

  let elementsName = _.reduce(appElements, (result, element) => {
    result.push(element.getAttribute('is'))
    return result
  }, [])

  requireComponent.keys().forEach(fileName => {
    // Get the PascalCase version of the component name
    const componentName = _.upperFirst(
      _.camelCase(
        fileName
        // Удаляем `_` из начала
          .replace(/^\.\/_/, '')
          // Удаляем `base` из начала
          .replace(/^base/, '')
          // Удаляем .vue
          .replace(/\.\w+$/, '')
      )
    )

    if (_.includes(elementsName, componentName)) {
      // Получаем конфиг компонента
      const componentConfig = requireComponent(fileName)

      // Глобально регистрируем компонент
      Vue.component(componentName, componentConfig.default || componentConfig)
    }
  })

  Array.from(appElements).forEach(element => {
    let componentName = element.getAttribute('is')
    let props = {}
    _.forEach(element.attributes, attribute => {
      let name = _.startsWith(attribute.name, 'data-') ? attribute.name.substr(5) : attribute.name
      name = _.startsWith(name, 'v-bind:') ? name.substr(7) : name
      props[_.camelCase(name)] = attribute.value
    })

    let vueData = window[element.dataset.vueData] || {}

    let component = Vue.extend(Vue.component(componentName))
    new component({
      el: element,
      propsData: props,
      data: vueData
    })
  })
})