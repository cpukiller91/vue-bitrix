<template>
    <div>
        <form-group class="row" v-for="property in orderProperties" :property="property" :key="property.ID">
            <template slot="label" slot-scope="{property}">
                <label v-if="property.TYPE === 'Y/N'" class="col-3 col-form-label"></label>
                <label v-else class="col-3 col-form-label" :for="'ORDER_PROP_' + property.ID">{{property.NAME}} <span
                        v-if="property.REQUIRED === 'Y'">*</span></label>
            </template>
            <template slot-scope="{property}">
                <div class="col-9">
                    <component :is="getComponentInputName(property)"
                               :property="property"></component>
                </div>
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
    },
    mounted() {
      console.log("orderProperties",this.orderProperties)
    }
  }
</script>
