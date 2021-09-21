<template>
  <div>
    <label v-for="item in items.VALUES_NAT" :key="item.ID"
           :class="{'filter__item': true, 'checkbox': true, 'checkbox--disabled': item.DISABLED}">
            <span class="sizes align-items-center">
                <span class="mr-3 size filter__color" v-if="item.IMAGE">
                    <img :src="item.IMAGE" :alt="item.VALUE" class="w-100">
                </span>
            </span>
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
  import FilterBase from './FilterBase'

  export default {
    extends: FilterBase,
    name: 'filter-image'
  }
</script>
