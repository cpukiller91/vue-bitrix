<template>
    <div>
        <div class="form-group row low-padding price-container">
            <div class="col-6">
                <input
                        class="min-price form-control form-control-sm"
                        type="text"
                        :name="items.VALUES.MIN.CONTROL_NAME"
                        :id="items.VALUES.MIN.CONTROL_ID"
                        v-model.number="values[0]"
                        size="5"/>
            </div>
            <div class="col-6">
                <input
                        class="max-price form-control form-control-sm"
                        type="text"
                        :name="items.VALUES.MAX.CONTROL_NAME"
                        :id="items.VALUES.MAX.CONTROL_ID"
                        v-model.number="values[1]"
                        size="5"/>
            </div>
        </div>

        <vue-slider v-model="values" tooltip="none"
                    :min="min"
                    :max="max"
                    :dot-size="26"
                    :height="6"
                    :marks="marks"
                    :contained="true"
                    @error="error"
                    ref="slider"
                    :lazy="true"
                    :enable-cross="false"></vue-slider>
    </div>
</template>

<script>
  import VueSlider from 'vue-slider-component'
  import FilterBase from './FilterBase'

  const ERROR_TYPE = {
    VALUE: 1,
    INTERVAL: 2,
    MIN: 3,
    MAX: 4,
    ORDER: 5,
  }

  export default {
    extends: FilterBase,
    name: 'filter-range',
    components: {
      VueSlider
    },
    data () {
      return {
        values: [
          parseFloat(this.items.VALUES.MIN.HTML_VALUE) || parseFloat(this.items.VALUES.MIN.VALUE),
          parseFloat(this.items.VALUES.MAX.HTML_VALUE) || parseFloat(this.items.VALUES.MAX.VALUE)
        ]
      }
    },
    computed: {
      min () {
        return parseFloat(this.items.VALUES.MIN.VALUE)
      },
      max () {
        return parseFloat(this.items.VALUES.MAX.VALUE)
      },
      marks () {
        return [
          this.min,
          this.max
        ]
      }
    },
    methods: {
      error (type) {
        switch (type) {
          case ERROR_TYPE.MIN:
            this.$nextTick(() => {
              this.$refs.slider.setValue([
                this.min,
                this.values[1]
              ])
            })
            break
          case ERROR_TYPE.MAX:
            this.$nextTick(() => {
              this.$refs.slider.setValue([
                this.values[0],
                this.max
              ])
            })
            break
        }
      },
      getValues() {
        let values = {}
        if(this.values[0]) {
          values[this.items.VALUES.MIN.CONTROL_NAME] = this.values[0]
        }
        if(this.values[1]) {
          values[this.items.VALUES.MAX.CONTROL_NAME] = this.values[1]
        }
        return values
      }
    }
  }
</script>

<style lang="scss">
    $bgColor: #ebebeb;
    $railBorderRadius: 0;
    $dotShadow: none;
    $dotShadowFocus: none;
    $themeColor: #696969;
    @import '~vue-slider-component/lib/theme/default.scss';

    .vue-slider {
        $slider: &;

        &-mark:first-child &-mark-step {
            right: 2px;
            left: auto;
        }

        &-mark:first-child &-mark-label {
            left: 0;
            transform: none;
        }

        &-mark:last-child &-mark-step {
            left: 2px;
        }

        &-mark:last-child &-mark-label {
            left: auto;
            right: 0;
            transform: none;
        }

        &-mark:first-child &-mark-step, &-mark:last-child &-mark-step {
            display: block;
            top: -6px;
            width: 1px;
            height: 17px;
            background: #a2bfc7;
        }

        &-dot-handle {
            border: 2px solid #ddd;
        }
    }
</style>
