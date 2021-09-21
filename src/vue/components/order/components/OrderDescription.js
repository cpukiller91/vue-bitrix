import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'order-description',
  computed: {
    ...mapGetters([
      'getOrderValuesAddition'
    ]),
    value: {
      get () {
        return this.getOrderValuesAddition.ORDER_DESCRIPTION
      },
      set (value) {
        this.ADD_ORDER_ADDITION_VALUE({
          name: 'ORDER_DESCRIPTION',
          value: value
        })
      }
    }
  },
  methods: {
    ...mapMutations([
      'ADD_ORDER_ADDITION_VALUE'
    ])
  }
}
