class favorites {
  constructor (params) {
    this.container = params.container
    this.activeClass = params.activeClass
    this.dataName = params.dataName
    this.countContainer = params.countContainer
    this.elements = []

    this.initEvents()
    this.init()
  }

  init () {
    $.ajax({
      type: 'POST',
      url: '/ajax/getFavoriteList/',
      dataType: 'json',
      success: (data) => {
        let items = data.result.items || []
        this.elements = items.map(function (item) {
          return parseInt(item)
        })
        this.check()
      }
    })
  }

  initEvents () {
    $('body')
      .on('click', this.container, (event) => {
        let element = event.currentTarget,
          id = $(element).data(this.dataName)

        this.elements.includes(id) ? this.delete(id) : this.add(id)

        event.preventDefault()
        event.stopPropagation()
      })
  }

  check () {
    $(this.countContainer).html(this.elements.length)

    $('body ' + this.container).each((key, element) => {
      let id = $(element).data(this.dataName)

      $(element).removeClass(this.activeClass)
      if (this.elements.includes(id)) {
        $(element).addClass(this.activeClass)
      }
    })
  }

  add (id) {
    $.ajax({
      type: 'POST',
      url: '/ajax/favoriteAdd/',
      data: {
        id: id
      },
      dataType: 'json',
      success: (data) => {
        if (data.error_status === false) {
          if (data.result.result === true) {
            this.elements.push(id)
            this.check()
          }
        }
      }
    })
  }

  delete (id) {
    $.ajax({
      type: 'POST',
      url: '/ajax/favoriteDelete/',
      data: {
        id: id
      },
      dataType: 'json',
      success: (data) => {
        if (data.error_status === false) {
          if (data.result.result === true) {
            this.elements.splice(this.elements.indexOf(id), 1)
            this.check()
          }
        }
      }
    })
  }
}

export default favorites