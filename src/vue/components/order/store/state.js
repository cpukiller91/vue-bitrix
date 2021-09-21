export default {
  order: {},
  orderPropertiesValue: {},
  buyerStore: null,
  additionFormData: [],
  orderValues: {
    PERSON_TYPE: null,
    DELIVERY_ID: null,
    PAY_SYSTEM_ID: null,
    PROFILE_ID: null,
    PAY_CURRENT_ACCOUNT: 'N'
  },
  orderValuesAddition: {
    PERSON_TYPE_OLD: null,
    PROFILE_ID_OLD: null,
    profile_change: 'N',
    ZIP_PROPERTY_CHANGED: 'N',
    BUYER_STORE: null,
    ORDER_DESCRIPTION: ''
  },
  coupons: {},
  service: {
    isAjaxProcess: false,
  },
  errorList: {
    properties: [],
    order: []
  }
}
