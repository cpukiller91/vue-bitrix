<template>
    <div class="custom-control custom-checkbox">
        <input type="hidden" :name="property.name" v-if="checked" :value="checked">
        <input type="checkbox" class="custom-control-input" :true-value="property.optionsSort[0]" v-model="checked"
               :id="property.id">
        <label class="custom-control-label" :for="property.id">{{property.title}}</label>
    </div>
</template>

<script>
  import BaseInput from './BaseInput'

  export default {
    extends: BaseInput,
    name: 'check-box',
    computed: {
      checked: {
        get () {
          return this.property.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>
