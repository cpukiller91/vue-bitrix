import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'payment-list',
  computed: {
    ...mapGetters([
      'paymentId',
      'paymentList'
    ]),
    value: {
      get () {
        return this.paymentId
      },
      set (value) {
        this.ADD_ORDER_VALUE({
          name: 'PAY_SYSTEM_ID',
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
