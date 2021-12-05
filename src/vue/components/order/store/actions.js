import _ from 'lodash'
import api from '../api'

export default {
  setOrder ({commit, state, getters, dispatch}, order) {
    console.log("setOrder",order)
    commit('SET_ORDER', order)
    commit('SET_PROPERTIES_VALUE', _.reduce(order.ORDER_PROP.properties, (result, item) => {
      result[item['ID']] = _.result(item, 'VALUE[0]', '')
      return result
    }, {}))
    commit('SET_BUYER_STORE', order.BUYER_STORE)

    commit('ADD_ORDER_ADDITION_VALUE', {
      name: 'ORDER_DESCRIPTION',
      value: state.order['ORDER_DESCRIPTION'] || ''
    })

    dispatch('setOrderValues')
    dispatch('setCoupons', order)
  },
  setOrderValues ({commit, state, getters}) {
    let orderValues = Object.assign({}, state.orderValues, {
      PERSON_TYPE: getters.personTypeId,
      DELIVERY_ID: getters.deliveryId,
      PAY_SYSTEM_ID: getters.paymentId,
      PROFILE_ID: getters.profileId
    })
    if (_.isEqual(orderValues, state.orderValues)) {
      return
    }
    commit('SET_ORDER_VALUES', orderValues)
  },
  setOrderValuesAddition ({commit, state}, values) {
    if (_.isEqual(values, Object.assign({}, state.orderValuesAddition))) {
      return
    }
    commit('SET_ORDER_ADDITION_VALUES', values)
  },
  setCoupons ({commit}, order) {
    commit('SET_COUPONS', _.reduce(order.COUPON_LIST, (result, coupon) => {
      result[coupon.COUPON] = coupon
      return result
    }, {}))
  },
  async formData ({getters}, submit = false) {
    return new Promise((resolve, reject) => {

      let formData = getters.getFormData(submit)


      if(formData){
        Object.values(getters.deliveryList).forEach(delivery => {
          if(delivery.EXTRA_JS) {
            try
            {
              let extra = new Function(`return ${delivery.EXTRA_JS}`)
              let extraData = extra()
              Object.keys(extraData).forEach(key => {
                formData.append(submit ? key : `order[${key}]`, extraData[key])
              })
            }
            catch (e) {}
          }
        })
      }else{
        console.log("Error: formData deliveryList construction",formData)
      }

      resolve(formData)
    })
  },
  async refresh ({dispatch}, callback = () => {}) {
    return new Promise((resolve, reject) => {
      dispatch('sendAjax', api.refreshOrder(dispatch('formData')))
        .then(data => {
          if (data.success === 'N') {
            document.location.href = document.location.pathname
          }

          dispatch('setOrder', data.order)
          callback(data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  async save ({commit, dispatch}, callback = () => {}) {
    return new Promise((resolve, reject) => {
      dispatch('sendAjax', api.saveOrder(dispatch('formData', true)))
        .then(data => {
          if (callback) {
            callback(data)
          }

          if (data.order.ID > 0 && data.order.REDIRECT_URL) {

            yaCounter30546807.reachGoal('SaleOrderSubmit')
            document.location.href = data.order.REDIRECT_URL

          } else {
            commit('SET_ERRORS', {
              name: 'order',
              value: data.order.ERROR.ORDER || []
            })
            commit('SET_ERRORS', {
              name: 'properties',
              value: data.order.ERROR.PROPERTY || []
            })
          }

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  enterCoupon ({commit, dispatch}, coupon) {
    return new Promise((resolve, reject) => {
      dispatch('sendAjax', api.enterCoupon(dispatch('formData'), coupon))
        .then(data => {
          if (data && data.order) {
            dispatch('setOrder', data.order)
          } else {
            commit('ADD_COUPON', {
              name: data,
              value: {}
            })
          }
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  removeCoupon ({commit, dispatch}, coupon) {
    return new Promise((resolve, reject) => {
      dispatch('sendAjax', api.removeCoupon(dispatch('formData'), coupon))
        .then(data => {
          if (data && data.order) {
            dispatch('setOrder', data.order)
          } else {
            commit('REMOVE_COUPON', data)
          }
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  sendAjax ({commit, state}, httpPromise) {
    if (state.service.isAjaxProcess) {
      return
    }
    commit('SET_AJAX_PROCESS', true)

    return new Promise((resolve, reject) => {
      httpPromise
        .then(response => {
          console.log("sendAjax",response)
          resolve(response.data)
        }, error => {
          reject(error)
        })
        .then(() => {
          commit('SET_AJAX_PROCESS', false)

        })
    })
  }
}
