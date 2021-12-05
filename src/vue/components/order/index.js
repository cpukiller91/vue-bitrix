import api from './api'
import PropertyList from './components/PropertyList.js'
import DeliveryList from './components/DeliveryList.js'
import PaymentList from './components/PaymentList.js'
import ProductList from './components/ProductList.js'
import store from './store'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Order',
  store,
  components: {
    PropertyList,
    DeliveryList,
    PaymentList,
    ProductList
  },
  computed: {
    ...mapState([
      'errorList',
      'service'
    ]),
    ...mapGetters([
      'getOrderValuesAddition'
    ])
  },
  created () {
    this.setApiParameters()
    this.setOrder(this.order)
    this.SET_ADDITION_FORM_DATA(this.formData)
    window.addEventListener('BasketReload', () => {
      this.refresh()
    })
  },
  watch: {
    getOrderValuesAddition: {
      handler (value) {
        this.setOrderValuesAddition(value)
      }
    }
  },
  methods: {
    ...mapActions([
      'setOrder',
      'setOrderValuesAddition',
      'refresh',
      'save'
    ]),
    ...mapMutations([
      'SET_ADDITION_FORM_DATA'
    ]),
    setApiParameters () {
      api.setAjaxUrl(this.ajaxUrl)
      api.setActionName(this.actionVariable)

      this.refresh()
    },
    hasErrorByName (name) {
      return Object.keys(this.errorList[name]).length > 0
    },
    saveOrder () {
      this.save()
        .then(data => {
          this.$nextTick(() => {
            $('html, body').animate({scrollTop: $(this.$refs.errors).offset().top - 50}, 500)
          })
        })
    }
  }
}
