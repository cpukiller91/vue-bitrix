import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    ...mapGetters([
      'getPropertyValueByCode'
    ]),
    value: {
      get () {
        return this.getPropertyValueByCode(this.property.CODE)
      },
      set (value) {
        this.ADD_PROPERTY_VALUE({
          id: this.property.ID,
          value: value
        })
      }
    },
    isRequired () {
      return this.property.REQUIRED === 'Y'
    }
  },
  methods: {
    ...mapMutations([
      'ADD_PROPERTY_VALUE'
    ])
  }
}