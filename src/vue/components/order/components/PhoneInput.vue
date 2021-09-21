<template>
    <masked-input class="form-control"
                  :name="'ORDER_PROP_' + property.ID" :readonly="readonly"
                  :id="'ORDER_PROP_' + property.ID" :required="isRequired"
                  :placeholder="property.DESCRIPTION"
                  :parameters="{alias: 'rusPhone'}"
                  type="tel"
                  v-model="value"
    ></masked-input>
</template>

<script>
  import InputStore from '../../mixin/InputStore'
  import PhoneInput from '../../PhoneInput'

  export default {
    extends: PhoneInput,
    name: 'phone-input',
    mixins: [InputStore]
  }
</script>

<style lang="scss">
    .el-date-editor {
        width: 100% !important;
        & .el-input__inner {
            border-radius: 0;
            padding-top: 10px;
            padding-bottom: 10px;
            line-height: 1.5;
            font-size: 1rem;
            height: auto;
        }
    }
</style>