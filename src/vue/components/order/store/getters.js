import _ from 'lodash'

export default {
  orderProperties: state => {
    return state.order['ORDER_PROP'].properties
  },
  getOrderPropertiesNotRelation: (state, getters) => {
    return _.filter(getters.orderProperties, property => {
      return !property.RELATION
    })
  },
  getOrderPropertiesRelation: (state, getters) => {
    return _.filter(getters.orderProperties, property => {
      return property.RELATION && Object.keys(property.RELATION).length
    })
  },
  getProductRows: state => {
    console.log("getProductRows",state.order)
    return state.order['GRID']['ROWS']
  },
  getOrderTotal: state => {
    return state.order['TOTAL']
  },
  getOrderValuesAddition: (state, getters) => {
    return {
      PERSON_TYPE_OLD: getters.personTypeId,
      PROFILE_ID_OLD: getters.profileId,
      profile_change: getters.profileId === state.orderValues.PROFILE_ID ? 'N' : 'Y',
      ZIP_PROPERTY_CHANGED: 'N',
      BUYER_STORE: getters.storeId,
      ORDER_DESCRIPTION: state.orderValuesAddition.ORDER_DESCRIPTION
    }
  },
  // orderDescription: (state, getters) => {
  //   return getters.getOrderValuesAddition['ORDER_DESCRIPTION']
  // },
  // данные по складам
  storeList: state => {
    return state.order['STORE_LIST'] || {}
  },
  deliveryStoreList: (state, getters) => {
    return _.filter(getters.storeList, store => {
      return _.isArray(getters.delivery.STORE) ? getters.delivery.STORE.includes(store.ID) : false
    })
  },
  store: (state, getters) => {
    return state.buyerStore in getters.storeList ? getters.storeList[state.buyerStore] : null
  },
  storeId: (state, getters) => {
    return getters.store ? +getters.store.ID : null
  },
  // данные по типо плательщика
  personTypeList: state => {
    return state.order['PERSON_TYPE']
  },
  personType: (state, getters) => {
    return getters.getChecked(getters.personTypeList)
  },
  personTypeId: (state, getters) => {
    return +getters.personType.ID || null
  },
  // данные по доставке
  deliveryList: state => {
    return state.order['DELIVERY']
  },
  delivery: (state, getters) => {
    return getters.getChecked(getters.deliveryList)
  },
  deliveryId: (state, getters) => {
    return +getters.delivery.ID || null
  },
  // данные по платежным системам
  paymentList: state => {
    return state.order['PAY_SYSTEM']
  },
  payment: (state, getters) => {
    return getters.getChecked(getters.paymentList)
  },
  paymentId: (state, getters) => {
    return +getters.payment.ID || null
  },
  // данные по профилям
  profileList: state => {
    return state.order['USER_PROFILES']
  },
  profile: (state, getters) => {
    return getters.getChecked(getters.profileList)
  },
  profileId: (state, getters) => {
    return +getters.profile.ID || 0
  },
  // вспомогательные геттеры
  getChecked: () => data => {
    return _.find(data, item => {
      return item.CHECKED === 'Y'
    }) || []
  },
  getPropertiesByGroup: (state, getters) => id => {
    return _.filter(getters.orderProperties, ['PROPS_GROUP_ID', id])
  },
  getPropertyByCode: (state, getters) => code => {
    return _.find(getters.orderProperties, ['CODE', code])
  },
  getPropertyIdByCode: (state, getters) => code => {
    let property = getters.getPropertyByCode(code)
    return property ? property.ID : null
  },
  getPropertyValueByCode: (state, getters) => code => {
    return state.orderPropertiesValue[getters.getPropertyIdByCode(code)]
  },
  getResponsePropertyValueByCode: (state, getters) => code => {
    let property = getters.getPropertyByCode(code)
    return property ? _.result(property, 'VALUE[0]', '') : ''
  },
  getFormData: (state) => (submit = false) => {
    let formData = new FormData()
    _.each(state.orderValues, (value, key) => {
      formData.append(key, _.toString(value))
      formData.append(`order[${key}]`, _.toString(value))
    })
    _.each(state.orderValuesAddition, (value, key) => {
      formData.append(key, _.toString(value))
      formData.append(`order[${key}]`, _.toString(value))
    })
    _.each(state.additionFormData, (value, key) => {
      formData.append(key, value)
      formData.append(`order[${key}]`, value)
    })
    _.each(state.orderPropertiesValue, (value, key) => {
      formData.append(`ORDER_PROP_${key}`, value)
      formData.append(`order[ORDER_PROP_${key}]`, value)
    })
    return formData
  }
}
