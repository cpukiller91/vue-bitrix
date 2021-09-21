<template functional>
    <div class="form-group" :class="data.staticClass">
        <slot name="label" :property="props.property">
            <label :for="'ORDER_PROP_' + props.property.ID"><span
                    v-if="props.property.REQUIRED === 'Y'">*</span>{{props.property.NAME}}:</label>
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