<template>
    <input>
</template>

<script>
  import Inputmask from 'inputmask'

  export default {
    name: 'masked-input',
    props: {
      parameters: {
        type: Object,
        default () {
          return {}
        }
      },
      value: {
        type: String,
        default: ''
      }
    },
    mounted () {
      this.maskInit()
    },
    data: function () {
      return {
        isComplete: false
      }
    },
    watch: {
      value: function (value) {
        window.$(this.$el).val(value)
        this.maskInit()
      },
      isComplete: function (value) {
        this.$emit('input', window.$(this.$el).val())
      }
    },
    destroyed: function () {
      this.maskDestroy()
    },
    methods: {
      maskInit () {
        let vm = this
        let parameters = Object.assign({}, vm.parameters, {

          oncomplete () {
            vm.isComplete = true
            vm.$emit('input', window.$(this).val())
          },
          onincomplete () {
            vm.isComplete = false
            vm.$emit('input', window.$(this).val())
          }
        })
          //console.log("Inputmask-->maskInit",parameters)
        window.$(this.$el).val(this.value)
        this.isComplete = Inputmask(parameters).mask(this.$el).isComplete()

        //фикс бага с отображением маски без значения
        if (this.value !== '') {
          window.$(vm.$el).trigger('input')
        }
      },
      maskDestroy () {
        Inputmask.remove(this.$el)
      }
    }
  }
</script>
