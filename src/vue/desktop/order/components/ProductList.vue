<template>
    <table class="table no-border">
        <tbody>
        <tr v-for="product in getProductRows" :key="product.id">
            <td width="110">
                <div class="order-images-container">
                    <img :src="getProductImage(product)" alt="" width="110">
                </div>
            </td>
            <td>
                {{product.data.NAME}}
                <div style="color: #000;">
                    <span v-for="property in product.data.PROPS" :key="property.ID"
                          v-if="property.CODE === 'ARTICLE'">{{property.VALUE}}</span>
                </div>
            </td>
            <td class="text-right">
                <div>
                    <del v-if="product.data.DISCOUNT_PRICE">
                        <b>{{getFormattedPrice(product.data.SUM_BASE_FORMATED)}}<i class="fa fa-rub"></i></b>
                    </del>
                </div>
                <div><b>{{getFormattedPrice(product.data.SUM)}}<i class="fa fa-rub"></i></b></div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
  import ProductList from '../../../components/order/components/ProductList'

  export default {
    extends: ProductList,
  }
</script>