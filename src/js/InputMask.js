import Inputmask from 'inputmask'

Inputmask.extendAliases({
  'rusPhone': {
    mask: '[+[7]] (999) 999-99-99',
    preValidation (buffer, pos, char) {
      if (pos === 0) {
        if (char === '8') {
          return {
            pos: 3
          }
        }
        let num = char.replace(/\D+/g,'')
        if (num.length && num !== '7') {
          return {
            char: num,
            pos: 4
          }
        }
      }
      return !(pos === 1 && char !== '7' && buffer[0] === '+')
    },
    postValidation (buffer, pos) {
      if (pos.char) {
        let correctedBuffer = buffer
        correctedBuffer[pos.pos] = pos.char
        return {
          buffer: correctedBuffer,
          refreshFromBuffer: true,
          pos: pos.pos
        }
      }
      return true
    },
    clearIncomplete: true,
    showMaskOnHover: false,
    showMaskOnFocus: false
  }
})

class InputMask {
  constructor () {
    $(document).ready(() => {
      InputMask.refresh()

      $(document).on('ajaxSuccess', function () {
        InputMask.refresh()
      })

      BX.addCustomEvent('onAjaxSuccess', function () {
        InputMask.refresh()
      })
    })
  }

  static refresh () {
    Inputmask().mask(document.querySelectorAll('[data-inputmask]'))
  }

}

export default new InputMask()