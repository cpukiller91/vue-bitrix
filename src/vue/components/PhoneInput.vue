<template>
    <masked-input class="form-control"
                  :name="property.name"
                  :value="property.value"
                  :id="property.id"
                  :required="property.required"
                  :readonly="property.readonly"
                  :parameters="{alias: 'rusPhone'}"
                  type="tel"
                  @input="onInput"
    ></masked-input>
</template>

<script>
  import MaskedInput from './MaskedInput'
  import BaseInput from './BaseInput'

  export default {
    extends: BaseInput,
    name: 'phone-input',
    components: {MaskedInput},
    methods: {
      onInput (value) {
        this.$emit('input', value)
      }
    }
  }
</script>