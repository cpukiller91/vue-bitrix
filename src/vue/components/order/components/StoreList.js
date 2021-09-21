import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'store-list',
  computed: {
    ...mapState([
      'buyerStore'
    ]),
    ...mapGetters([
      'storeId',
      'deliveryStoreList'
    ]),
    value: {
      get () {
        return this.buyerStore
      },
      set (value) {
        this.SET_BUYER_STORE(value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_BUYER_STORE'
    ])
  }
}
