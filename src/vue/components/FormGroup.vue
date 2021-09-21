<template functional>
    <div class="form-group">
        <slot name="label" :property="props.property">
            <label :for="props.property.id"><span
                    v-if="props.property.required">*</span>{{props.property.title}}:</label>
        </slot>
        <slot :property="props.property"></slot>
    </div>
</template>

<script>
  /* компонент для отрисовки сгруппированных названия и поля */
  export default {
    name: 'form-group',
    props: {
      property: {
        type: Object,
        required: true
      }
    }
  }
</script>