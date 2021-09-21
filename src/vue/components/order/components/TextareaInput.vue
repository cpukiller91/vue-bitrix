<template>
    <textarea class="form-control" :placeholder="property.DESCRIPTION"
              :name="'ORDER_PROP_' + property.ID" :readonly="readonly"
              :rows="property.ROWS"
              :cols="property.COLS"
              :id="'ORDER_PROP_' + property.ID" :required="isRequired" v-model="value"></textarea>
</template>

<script>
  import BaseInput from '../../BaseInput'
  import InputStore from '../../mixin/InputStore'

  export default {
    name: 'textarea-input',
    extends: BaseInput,
    mixins: [InputStore]
  }
</script>