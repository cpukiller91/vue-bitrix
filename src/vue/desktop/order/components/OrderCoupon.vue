<template>
    <div>
        <div class="p-t-20 p-b-20">
            <h4>Промокод:</h4>
        </div>
        <div class="form-group row">
            <div class="col-8">
                <input class="input form-control" type="text" v-model="value" placeholder="Ввести промокод"
                       @keydown.enter.prevent="add">
            </div>
            <div class="col-4">
                <button class="button button__width__more button__bg__white__border__brown transition"
                        type="button"
                        @click="add"
                >Применить
                </button>
            </div>
        </div>
        <div class="form-group row align-items-center" :class="getClass(coupon)" v-for="(coupon, key) in coupons"
             :key="key">
            <div class="col-8">
                <input class="input form-control" disabled="" readonly="" :value="key" type="text"
                       :title="getTitle(coupon)">
            </div>
            <div class="col-4">
                <span class="control flex align-items-center">
                    <a href="javascript:void(0)" class="transition clear" @click="removeCoupon(key)">×</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
  import OrderCoupon from '../../../components/order/components/OrderCoupon'


  export default {
    name: 'order-coupon',
    extends: OrderCoupon
  }
</script>

<style scoped>
    .clear {
        padding: 0;
    }
</style>