<template>
    <div>
        <label v-for="item in items.VALUES_NAT" :key="item.ID"
               :class="{'filter__item': true, 'checkbox': true, 'checkbox--disabled': item.DISABLED}">
            <input type="checkbox" class="checkbox__input"
                   :true-value="item.HTML_VALUE"
                   :name="item.CONTROL_NAME"
                   v-model="values[item.CONTROL_NAME]"
            />
            <span class="checkbox__label" :title="item.VALUE">{{item.VALUE}}</span>
        </label>
    </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'filter-base',
    props: {
      items: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        values: Object.values(this.items.VALUES_NAT).reduce((result, value) => {
          result[value.CONTROL_NAME] = value.CHECKED ? value.HTML_VALUE : ''
          return result
        }, {})
      }
    },
    watch: {
      values: {
        handler (val) {
          this.$emit('change', val)
        },
        deep: true
      }
    },
    methods: {
      clear () {
        _.each(this.values, (value, key) => this.values[key] = '')
      },
      getValues () {
        return _.reduce(this.values, (result, value, key) => {
          if(value !== '') {
            result[key] = value
          }
          return result
        }, {})
      }
    }
  }
</script>