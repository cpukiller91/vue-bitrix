<template>
    <div class="row">
        <div v-if="getOrderTotal.DISCOUNT_PRICE > 0" key="price-total"
             class="col-12 flex justify-content-between summary-container">
            <div>
                <b>Стоимость без скидки:</b>
            </div>
            <div>
                <del>
                    <b>{{getFormattedPrice(getOrderTotal.PRICE_WITHOUT_DISCOUNT)}}<i class="fa fa-rub"></i></b>
                </del>
            </div>
        </div>
        <div class="col-12 flex justify-content-between summary-container">
            <div>
                <b>Стоимость покупки:</b>
            </div>
            <div>
                <b>{{getFormattedPrice(getOrderTotal.ORDER_PRICE_FORMATED)}}<i class="fa fa-rub"></i></b>
            </div>
        </div>
        <div v-if="getOrderTotal.DISCOUNT_PRICE > 0" key="price-discount"
             class="col-12 flex justify-content-between summary-container">
            <div>
                <b>Ваша выгода:</b>
            </div>
            <div>
                <b>{{getFormattedPrice(getOrderTotal.DISCOUNT_PRICE_FORMATED)}}<i class="fa fa-rub"></i></b>
            </div>
        </div>
        <div class="col-12 flex justify-content-between summary-container">
            <div>
                <b>Доставка:</b>
            </div>
            <div>
                <b>{{getFormattedPrice(getOrderTotal.DELIVERY_PRICE_FORMATED)}}<i class="fa fa-rub"></i></b>
            </div>
        </div>
        <div class="col-12 flex justify-content-between summary-container">
            <div>
                <b>Итого:</b>
            </div>
            <div>
                <b>{{getFormattedPrice(getOrderTotal.ORDER_TOTAL_PRICE_FORMATED)}}<i class="fa fa-rub"></i></b>
            </div>
        </div>
    </div>
</template>

<script>
  import OrderTotal from '../../../components/order/components/OrderTotal'

  export default {
    extends: OrderTotal
  }
</script>