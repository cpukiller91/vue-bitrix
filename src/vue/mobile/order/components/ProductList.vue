<template>
    <table class="table no-border">
        <tbody>
        <tr v-for="product in getProductRows" :key="product.id">
            <td>
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