<template>
    <el-select v-model="value" :required="isRequired" placeholder="" default-first-option>
        <el-option
                v-for="value in property.OPTIONS_SORT"
                :key="value"
                :label="property.OPTIONS[value]"
                :value="value">
        </el-option>
    </el-select>
</template>

<script>
  import EnumInput from '../../EnumInput'
  import InputStore from '../../mixin/InputStore'

  export default {
    extends: EnumInput,
    mixins: [InputStore],
    name: 'enum-input'
  }
</script>

<style lang="scss">
    .el-select-dropdown {
        border-radius: 0;
        margin: 0 !important;
    }
    .el-autocomplete-suggestion {
        border-radius: 0;
        & li {
            padding: 0 .75rem;
            &.highlighted, &:hover {
                color: #9f7d4c;
                background: none;
            }
        }
    }
    .el-popper .popper__arrow {
        display: none !important;
    }
    .el-input__inner {
        padding: .5rem .75rem;
    }
    .el-select .el-input__inner {
        font-size: 14px;
        line-height: 1.25;
        padding-top: .5rem;
        padding-bottom: .5rem;
    }
    .el-input__icon {
        line-height: 35px;
    }
    .el-select-dropdown__item {
        color: #2b2b2b;
        font-size: 12px;
        line-height: 20px;
        height: auto;
        padding: 5px .75rem;
        &.selected {
            color: #2b2b2b;
            font-weight: normal;
        }
        &.hover, &:hover {
            color: #9f7d4c;
            background: none;
        }
    }
</style>