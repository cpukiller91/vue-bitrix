<template>
    <div>
        <input type="hidden" :name="property.name" :value="property.value">
        <el-select :value="property.value" @change="onChange" :required="property.required" placeholder="">
            <el-option
                    v-for="value in property.optionsSort"
                    :key="value"
                    :label="property.options[value]"
                    :value="value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
  import BaseInput from './BaseInput'

  export default {
    extends: BaseInput,
    name: 'enum-input',
    methods: {
      onChange (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss">
    .el-select {
        width: 100%;
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