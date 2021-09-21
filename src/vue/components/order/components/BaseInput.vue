<template>
    <input class="form-control" :class="{'text-capitalize': property.CODE === 'FIO'}" :type="getType" :placeholder="property.DESCRIPTION"
           :name="'ORDER_PROP_' + property.ID" :readonly="readonly"
           :id="'ORDER_PROP_' + property.ID" :required="isRequired" v-model="value">
</template>

<script>
  import BaseInput from '../../BaseInput'
  import InputStore from '../../mixin/InputStore'

  export default {
    name: 'base-input',
    extends: BaseInput,
    mixins: [InputStore],
    computed: {
      getType () {
        if (this.property.IS_EMAIL === 'Y') {
          return 'email'
        }
        return 'text'
      }
    }
  }
</script>