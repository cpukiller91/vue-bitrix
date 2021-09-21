<template>
    <div>
        <div class="p-t-20 p-b-20">
            <h4>Способ получения заказа:</h4>
        </div>
        <div class="delivery-container">
            <div class="delivery-item" v-for="delivery in deliveryListSorted" :key="+delivery.ID">
                <label class="pseudo-label">
                    <input type="radio" name="DELIVERY_ID" :value="+delivery.ID" v-model="value">
                    <span>
                        <div class="bx_description ">
                            <div class="name"><strong>{{delivery.NAME}}</strong></div>
                            <span class="grey-color bx_result_price" v-if="delivery.PERIOD_TEXT">{{delivery.PERIOD_TEXT}}</span>
                            <div class="text-left" v-if="delivery.CHECKED === 'Y' && delivery.CALCULATE_ERRORS">
                                <div class="error-text" v-html="delivery.CALCULATE_ERRORS"></div>
                            </div>
                            <p class="grey-color delivery-item__description" v-html="delivery.DESCRIPTION"></p>
                        </div>
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
  import DeliveryList from '../../../components/order/components/DeliveryList'
  import FormGroup from './FormGroup'

  export default {
    name: 'delivery-list',
    extends: DeliveryList,
    components: {
      FormGroup
    },
    computed: {
      deliveryListSorted () {
        let deliveryList = Object.values(this.deliveryList)
        deliveryList.sort((a, b) => {
          let sort = parseInt(a.SORT) - parseInt(b.SORT)
          if (sort === 0) {
            return a.OWN_NAME.toLowerCase() > b.OWN_NAME.toLowerCase()
              ? 1
              : (a.OWN_NAME.toLowerCase() < b.OWN_NAME.toLowerCase() ? -1 : 0)
          }
          return sort
        })
        return deliveryList
      }
    }
  }
</script>
