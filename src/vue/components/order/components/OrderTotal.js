import { mapGetters } from 'vuex'

export default {
  name: 'order-total',
  methods: {
    getFormattedPrice (price) {
      return price.replace(' руб.', ' ')
    }
  },
  computed: {
    ...mapGetters([
      'getOrderTotal'
    ])
  }
}