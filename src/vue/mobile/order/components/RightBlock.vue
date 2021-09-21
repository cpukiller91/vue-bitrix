<template>
    <div>
        <div class="right-column mt-3">
            <product-list></product-list>
            <order-total></order-total>
        </div>
    </div>
</template>

<script>
    import ProductList from './ProductList'
    import OrderTotal from './OrderTotal'

  /* eslint-disable no-trailing-spaces,spaced-comment */
  require('sticky-kit/dist/sticky-kit')

  export default {
    name: 'right-block',
    components: {
      ProductList,
      OrderTotal
    },
    mounted () {
      this.stickyInit()
    },
    destroyed () {
      this.stickyDestroy()
    },
    methods: {
      stickyInit () {
        window.$(this.$el).stick_in_parent({
          'offset_top': 50
        })
      },
      stickyDestroy () {
        window.$(this.$el).trigger('sticky_kit:detach')
      }
    }
  }
</script>
