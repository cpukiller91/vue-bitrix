<template>
  <div class="col-6 pl-0 pr-2">
    <button type="button"
            class="button button--bg-light-grey button--color-black button--no-focus w-100 justify-content-between"
            data-toggle="modal"
            :data-target="'#' + modalName">Фильтры
      <img class="smart-filter__image" src="../../images/settings.svg">
    </button>
    <bootstrap-modal :name="modalName" :title="title">
      <template slot="label" slot-scope="{property}">
        <div class="modal-label">
          <div v-if="active" class="modal__back" @click="onChangeActive(null)"></div>
          <h3 class="modal-title text-center" :id="property.name + 'Label'">{{property.title}}</h3>
        </div>
      </template>
      <div v-loading.fullscreen="isAjaxProcess"
           element-loading-spinner="global_ajax_loader__icon"
           element-loading-background="rgba(0, 0, 0, 0.3)">
      </div>
      <div class="d-flex flex-column h-100">
        <div class="filter filter--overflow flex-remain">
          <form :action="action">
            <transition-group tag="div" name="component-fade" mode="out-in">
              <root-filter key="root-filter" v-show="active === null" :items="items"
                           @changeMenu="onChangeActive"></root-filter>
              <component ref="filter" v-for="item in items" :key="item.ID" v-show="active === item.ID"
                         :items="item"
                         :is="componentName(item)"
                         @change="submit"></component>
            </transition-group>
          </form>
        </div>
        <div class="p-t-20 flex-auto">
          <div class="p-t-10 p-b-10">
            <a :href="url" class="button w-100 transition">
              <span v-if="count !== null">Показать ({{count}})</span>
              <span v-else>Показать</span>
            </a>
          </div>
          <div class="p-t-10 p-b-10">
            <button type="button" class="button w-100 button__bg__white__border__brown transition"
                    @click="clear">Сбросить фильтр
            </button>
          </div>
        </div>
      </div>
    </bootstrap-modal>
  </div>
</template>

<script>
  import BootstrapModal from '../components/BootstrapModal'
  import RootFilter from '../components/RootFilter'
  import FilterBase from '../components/FilterBase'
  import FilterRange from '../components/FilterRange'
  import FilterImage from '../components/FilterImage'
  import Axios from 'axios'
  import _ from 'lodash'

  export default {
    name: 'SmartFilter',
    components: {
      BootstrapModal,
      RootFilter,
      FilterBase,
      FilterRange,
      FilterImage
    },
    data () {
      return {
        modalName: 'smartFilterModal',
        active: null,
        url: '',
        count: null,
        isAjaxProcess: false
      }
    },
    computed: {
      title () {
        return this.active === null ? 'Фильтры' : this.currentItems.NAME
      },
      currentItems () {
        return this.active === null ? this.items : Object.values(this.items).find(item => item.ID === this.active)
      }
    },
    methods: {
      componentName (item) {
        if (item.DISPLAY_TYPE === 'A' || item.PRICE) {
          return 'filter-range'
        }

        if (item.HAS_IMAGE) {
          return 'filter-image'
        }

        return 'filter-base'
      },
      onChangeActive (id) {
        this.active = id
      },
      submit: _.debounce(function () {
        if (this.isAjaxProcess) {
          return
        }
        this.isAjaxProcess = true

        let params = Object.assign({}, ...this.$refs.filter.map(filter => filter.getValues()))
        Object.values(this.hidden).forEach(item => {
          params[item.CONTROL_NAME] = item.HMTL_VALUE
        })
        params.ajax = 'y'

        Axios.get(this.action, {
          params: params
        })
          .then(response => {
            this.items = response.data.items
            this.url = response.data.url
            this.count = response.data.count
          })
          .catch(error => {
            console.log(error)
          })
          .then(() => {
            this.isAjaxProcess = false
          })
      }, 1000),
      clear () {
        this.$refs.filter.forEach(filter => filter.clear())
        this.submit()
      }
    }
  }
</script>

<style>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }

  .smart-filter__image {
    height: 20px;
  }
</style>
