<template>
    <div>
        <div class="row justify-content-center personal-container p-t-10 p-b-40"
             v-loading.fullscreen="service.isAjaxProcess"
             element-loading-spinner="global_ajax_loader__icon"
             element-loading-background="rgba(0, 0, 0, 0.3)">
            <div class="col-11">
                <div class="error-container pb-4" ref="errors" v-if="hasErrorByName('properties') || hasErrorByName('order')">
                    <div class="error-text" v-for="(error, key) in errorList.order" :key="key" v-html="error"></div>
                    <div class="error-text" v-for="(error, key) in errorList.properties" :key="key" v-html="error"></div>
                </div>
                <h4>Информация для оплаты и доставки заказа</h4>
                <form action="" method="POST" name="ORDER_FORM" id="ORDER_FORM" enctype="multipart/form-data"
                      @submit.prevent="saveOrder()">
                    <div id="order_form_content" class="row pt-4">
                        <div class="col-7">
                            <property-list></property-list>
                            <delivery-list></delivery-list>
                            <property-relation-list></property-relation-list>
                            <order-coupon></order-coupon>
                            <payment-list></payment-list>
                        </div>
                        <div class="col-5">
                            <right-block></right-block>
                        </div>
                    </div>
                    <div class="p-b-20 p-t-20">
                        <button type="button" id="ORDER_CONFIRM_BUTTON" @click="saveOrder()"
                                class="button button__width__more transition text-uppercase">оформить заказ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import Order from '../components/order'
  import DeliveryList from './order/components/DeliveryList'
  import PaymentList from './order/components/PaymentList'
  import PropertyList from './order/components/PropertyList'
  import PropertyRelationList from './order/components/PropertyRelationList'
  import RightBlock from './order/components/RightBlock'
  import OrderCoupon from './order/components/OrderCoupon'

  export default {
    extends: Order,
    components: {
      DeliveryList,
      PaymentList,
      PropertyList,
      PropertyRelationList,
      RightBlock,
      OrderCoupon
    }
  }
</script>
