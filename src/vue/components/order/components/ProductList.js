import { mapGetters } from 'vuex'

export default {
  name: 'product-list',
  methods: {
    getProductImage (product) {
      return product.data.PREVIEW_PICTURE_SRC
    },
    getFormattedPrice (price) {
      return price.replace(' руб.', ' ')
    }
  },
  computed: {
    ...mapGetters([
      'getProductRows'
    ])
  }
}