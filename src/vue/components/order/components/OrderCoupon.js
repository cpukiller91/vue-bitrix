import { mapActions, mapState } from 'vuex'

export default {
  name: 'OrderCoupon',
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState([
      'coupons'
    ])
  },
  methods: {
    ...mapActions([
      'enterCoupon',
      'removeCoupon'
    ]),
    getClass (coupon) {
      if (!coupon.JS_STATUS || coupon.JS_STATUS === 'BAD') {
        return 'has-danger'
      }
      if (coupon.JS_STATUS === 'ENTERED') {
        return 'has-warning'
      }
      return 'has-success'
    },
    getTitle (coupon) {
      return coupon ? coupon.JS_CHECK_CODE : 'не найден'
    },
    add () {
      if (!this.value) {
        return
      }

      this.enterCoupon(this.value)
        .then(() => {
          this.value = ''
        })
    }
  }
}