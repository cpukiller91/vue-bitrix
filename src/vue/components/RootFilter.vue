<template>
    <div>
        <a v-for="item in filteredItems" :key="item.ID" @click="onClick(item.ID)" class="filter__item">{{item.NAME}}</a>
    </div>
</template>

<script>
  export default {
    name: 'root-filter',
    props: {
      items: {
        type: [Object, Array],
        required: true
      }
    },
    computed: {
      filteredItems () {
        return Object.values(this.items)
          .filter(item => {
            if (item.HIDDEN) {
              return false
            }
            if (!Object.keys(item.VALUES).length) {
              return false
            }
            if (item.DISPLAY_TYPE === 'A' && (item.VALUES.MAX.VALUE - item.VALUES.MIN.VALUE <= 0)) {
              return false
            }

            return true
          })
          .sort((a, b) => {
            if (a.PRICE === b.PRICE) {
              return 0
            }
            return a.PRICE ? 1 : -1
          })
      }
    },
    methods: {
      onClick (id) {
        this.$emit('changeMenu', id)
      }
    }
  }
</script>
