import Vue from 'vue'

export default {
  SET_ORDER (state, order) {
    state.order = order
  },
  SET_ORDER_VALUES (state, orderValues) {
    state.orderValues = orderValues
  },
  ADD_ORDER_VALUE (state, {name, value}) {
    state.orderValues[name] = value
  },
  SET_BUYER_STORE (state, buyerStore) {
    state.buyerStore = buyerStore
  },
  SET_ORDER_ADDITION_VALUES (state, values) {
    state.orderValuesAddition = values
  },
  ADD_ORDER_ADDITION_VALUE (state, {name, value}) {
    state.orderValuesAddition[name] = value
  },
  SET_PROPERTIES_VALUE (state, values) {
    state.orderPropertiesValue = values
  },
  ADD_PROPERTY_VALUE (state, {id, value}) {
    state.orderPropertiesValue[id] = value
  },
  SET_ADDITION_FORM_DATA (state, data) {
    state.additionFormData = data
  },
  SET_ERRORS (state, {name, value}) {
    state.errorList[name] = value
  },
  ADD_ERROR (state, {name, value}) {
    state.errorList[name].push(value)
  },
  SET_AJAX_PROCESS (state, flag) {
    state.service.isAjaxProcess = flag
  },
  SET_COUPONS (state, coupons) {
    state.coupons = coupons
  },
  ADD_COUPON (state, {name, value}) {
    state.coupons[name] = value
  },
  REMOVE_COUPON (state, name) {
    Vue.delete(state.coupons, name)
  }
}
