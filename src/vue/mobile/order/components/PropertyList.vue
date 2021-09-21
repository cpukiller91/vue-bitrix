<template>
    <div>
        <form-group v-for="property in orderProperties" :property="property" :key="property.ID">
            <template slot="label" slot-scope="{property}">
                <label v-if="property.TYPE === 'Y/N'" class="d-none"></label>
                <label v-else :for="'ORDER_PROP_' + property.ID">{{property.NAME}}<span
                        v-if="property.REQUIRED === 'Y'">*</span></label>
            </template>
            <template slot-scope="{property}">
                <component :is="getComponentInputName(property)"
                           :property="property"></component>
            </template>
        </form-group>
    </div>
</template>

<script>
  import PropertyList from '../../../components/order/components/PropertyList'
  import FormGroup from './FormGroup'

  export default {
    extends: PropertyList,

    components: {
      FormGroup
    }
  }
</script>