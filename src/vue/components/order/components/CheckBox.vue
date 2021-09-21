<template>
    <label id="labelOferta" class="form-check-label pseudo-checkbox">
        <input class="form-check-input check_oferta" type="checkbox" :name="'ORDER_PROP_' + property.ID"
               :readonly="readonly"
               :id="'ORDER_PROP_' + property.ID" :required="isRequired"
               true-value="Y"
               false-value="N"
               v-model="value">
        <span>
        Я согласен с условиями
            <a href="/personal/oferta/"
               target="_blank">Публичной оферты и обработки персональных данных</a>
        </span>
    </label>
</template>

<script>
  import CheckBox from '../../CheckBox'
  import InputStore from '../../mixin/InputStore'

  export default {
    name: 'check-box',
    extends: CheckBox,
    mixins: [InputStore]
  }
</script>