<template>
    <div class="form-input__container">
        <el-autocomplete style="width: 100%" v-model="text"
                         :fetch-suggestions="onInput"
                         placeholder="Введите город"
                         :trigger-on-focus="false"
                         @select="onSelect"
                         @blur="onBlur"
        >
            <template slot-scope="props">
                <div class="value">{{props.item.displayName}}</div>
            </template>
        </el-autocomplete>
        <div class="form-input__error"></div>
    </div>
</template>

<style lang="css">
    .el-autocomplete .el-input__inner {
        color: #464a4c;
        border-radius: 0;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, .15);
        width: 100%;
        height: auto;
        padding: .5rem .75rem;
        font-size: 14px;
        line-height: 1.25;
    }

    .input.form-input__container_valid .el-input__inner.form-input__input_valid {
        border: solid 1px #11911c;
    }
</style>

<script>
  /* eslint-disable keyword-spacing */
  import InputStore from '../../mixin/InputStore'
  import { mapActions } from 'vuex'

  export default {
    name: 'location-input',
    mixins: [InputStore],
    data () {
      return {
        text: '',
        textInstance: '',
        mutationValue: null
      }
    },
    props: {
      property: {
        type: Object,
        required: true
      },
      valueType: {
        type: String,
        default: 'code',
        validator (value) {
          return ['code', 'id'].indexOf(value) !== -1
        }
      }
    },
    methods: {
      ...mapActions([
        'refresh'
      ]),
      getList: function (query) {
        let params = new FormData()
        params.append('query', query)
        params.append('limit', 10)
        return this.$http.post('/ajax/getLocationsByFilter/', params)
      },
      getNameByCode: function (code) {
        let params = new FormData()
        let vm = this
        params.append('code', code)
        this.$http.post('/ajax/getLocationNameByCode/', params)
          .then(response => {
            if (response.data.result) {
              vm.text = vm.textInstance = response.data.result
            } else {
              vm.text = vm.textInstance = ''
            }
          })
          .catch(function (error) {
            console.log(error)
            vm.text = vm.textInstance = ''
          })
      },
      getNameById: function (id) {
        let params = new FormData()
        let vm = this
        params.append('id', id)
        this.$http.post('/ajax/getLocationNameById/', params)
          .then(response => {
            if (response.data.result) {
              vm.text = vm.textInstance = response.data.result
            } else {
              vm.text = vm.textInstance = ''
            }
          })
          .catch(function (error) {
            console.log(error)
            vm.text = vm.textInstance = ''
          })
      },
      onInput (query, callbackF) {
        this.getList(query)
          .then(function (response) {
            if (response.data.result) {
              callbackF(response.data.result.map(item => {
                return {
                  value: item['DISPLAY_NAME'],
                  code: item['CODE'],
                  id: item['ID'],
                  displayName: item['DISPLAY_FULL_NAME']
                }
              }))
            } else {
              callbackF([])
            }
          })
          .catch(function (error) {
            console.log(error)
            callbackF([])
          })
      },
      onSelect (item) {
        this.mutationValue = this.valueType === 'code' ? item.code : item.id
        this.textInstance = item.value
      },
      onBlur (ev) {
        if (ev.explicitOriginalTarget.data === undefined) {
          this.text = this.textInstance
        }
      }
    },
    mounted () {
      if (this.valueType === 'code') {
        this.getNameByCode(this.value)
      } else {
        this.getNameById(this.value)
      }
    },
    watch: {
      mutationValue (value) {
        this.value = value
        this.$nextTick(() => {
            this.refresh()
        })
      }
    }
  }
</script>