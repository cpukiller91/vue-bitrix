import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'delivery-list',
  computed: {
    ...mapGetters([
      'deliveryId',
      'deliveryList'
    ]),
    value: {
      get () {
        return this.deliveryId
      },
      set (value) {
        this.ADD_ORDER_VALUE({
          name: 'DELIVERY_ID',
          value: value
        })
        this.refresh()
      }
    }
  },
  methods: {
    ...mapMutations([
      'ADD_ORDER_VALUE'
    ]),
    ...mapActions([
      'refresh'
    ])
  }
}
