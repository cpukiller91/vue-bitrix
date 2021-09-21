<template>
    <div class="col-6 pl-2 pr-0">
        <button type="button"
                class="button button--bg-light-grey button--color-black button--no-focus w-100 justify-content-between"
                data-toggle="modal"
                :data-target="'#' + modalName">Сортировка
            <img class="sort__image" src="../../images/sort.svg">
        </button>
        <bootstrap-modal :name="modalName" title="Сортировка">
            <div class="filter">
                <form @change="submit">
                    <label v-for="item in items"
                           :key="item.value"
                           :class="{'filter__item': true, 'checkbox': true}">
                        <input type="radio" class="checkbox__input"
                               :value="item.value"
                               name="sort"
                               v-model="checked"
                        />
                        <span class="checkbox__label" v-html="item.label"></span>
                    </label>
                </form>
            </div>
        </bootstrap-modal>
    </div>
</template>

<script>
  import BootstrapModal from '../components/BootstrapModal'

  export default {
    name: 'Sort',
    components: {
      BootstrapModal
    },
    data () {
      return {
        modalName: 'sortModal'
      }
    },
    computed: {},
    methods: {
      submit (event) {
        event.target.form.submit()
      }
    }
  }
</script>

<style scoped>
    .sort__image {
        height: 25px;
    }
</style>