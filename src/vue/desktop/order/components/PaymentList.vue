<template>
    <div>
        <div class="p-t-20 p-b-20">
            <h4>Способ оплаты:</h4>
        </div>
        <div class="paysystem-container">
            <div class="delivery-item" v-for="payment in paymentList" :key="+payment.ID">
                <label class="pseudo-label">
                    <input type="radio" name="PAY_SYSTEM_ID" :value="+payment.ID" v-model="value">
                    <span>
                        <div class="bx_description">
                            <strong>{{payment.PSA_NAME}}</strong>
                        </div>
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
  import PaymentList from '../../../components/order/components/PaymentList'
  import FormGroup from './FormGroup'

  export default {
    name: 'payment-list',
    extends: PaymentList,
    components: {
      FormGroup
    }
  }
</script>
