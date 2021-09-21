<template>
    <input class="form-control"
           :name="property.name"
           :value="property.value"
           :required="property.required"
           :id="property.id"
           @input="onInput"
           :type="property.type">
</template>

<script>
  export default {
    name: 'base-input',
    props: {
      property: {
        type: Object,
        required: true
      }
    },
    methods: {
      onInput ($event) {
        this.$emit('input', $event.target.value)
      }
    }
  }
</script>