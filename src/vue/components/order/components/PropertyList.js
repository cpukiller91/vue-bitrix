import BaseInput from './BaseInput'
import PhoneInput from './PhoneInput'
import EnumInput from './EnumInput'
import CheckBox from './CheckBox'
import TextareaInput from './TextareaInput'
import LocationInput from './LocationInput'

import { mapGetters } from 'vuex'

export default {
  name: 'property-list',
  components: {
    BaseInput,
    PhoneInput,
    EnumInput,
    CheckBox,
    TextareaInput,
    LocationInput
  },
  computed: {
    ...mapGetters({
      orderProperties: 'getOrderPropertiesNotRelation'
    })
  },
watch:{
  orderProperties(nv){
    console.log("orderPropertiesLISTER",this.orderProperties)
  }
},
  methods: {
    getComponentInputName (property) {
      if (property.IS_PHONE === 'Y') {
        return 'phone-input'
      }
      if (property.TYPE === 'ENUM') {
        return 'enum-input'
      }
      if (property.TYPE === 'Y/N') {
        return 'check-box'
      }
      if (property.IS_LOCATION === 'Y') {
        return 'location-input'
      }
      if (property.MULTILINE === 'Y') {
        return 'textarea-input'
      }
      return 'base-input'
    },
  }
}
