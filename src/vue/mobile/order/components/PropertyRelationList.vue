<template>
    <div class="pt-4">
        <form-group v-for="property in orderProperties" :property="property" :key="property.ID">
            <template slot="label" slot-scope="{property}">
                <label class="col-form-label" :for="'ORDER_PROP_' + property.ID">{{property.NAME}} <span
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
  import { mapGetters } from 'vuex'
  import PropertyList from '../../../components/order/components/PropertyList'
  import FormGroup from './FormGroup'

  export default {
    extends: PropertyList,
    name: 'property-relation-list',
    components: {
      FormGroup
    },
    computed: {
      ...mapGetters({
        orderProperties: 'getOrderPropertiesRelation'
      })
    },
  }
</script>