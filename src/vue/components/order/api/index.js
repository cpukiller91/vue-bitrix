import httpClient from '../../../http'

class API {
  constructor () {
    this.url = null
    this.actionName = 'soa-action'
  }

  setAjaxUrl (url) {
    this.url = url
  }

  setActionName (name) {
    this.actionName = name
  }

  /**
   *
   * @param {Promise} formDataPromise
   * @return {Promise<AxiosPromise<any>>}
   */
  async refreshOrder (formDataPromise) {
    let formData = await formDataPromise
    formData.append(this.actionName, 'refreshOrderAjax')
    return httpClient.post(this.url, formData)
  }

  /**
   *
   * @param {Promise} formDataPromise
   * @return {Promise<AxiosPromise<any>>}
   */
  async saveOrder (formDataPromise) {
    let formData = await formDataPromise
    formData.append(this.actionName, 'saveOrderAjax')
    formData.append('save', 'Y')
    return httpClient.post(document.location.href, formData)
  }

  /**
   *
   * @param {Promise} formDataPromise
   * @param coupon
   * @return {Promise<AxiosPromise<any>>}
   */
  async enterCoupon (formDataPromise, coupon) {
    let formData = await formDataPromise
    formData.append(this.actionName, 'enterCoupon')
    formData.append('coupon', coupon)
    return httpClient.post(this.url, formData)
  }

  /**
   *
   * @param {Promise} formDataPromise
   * @param coupon
   * @return {Promise<AxiosPromise<any>>}
   */
  async removeCoupon (formDataPromise, coupon) {
    let formData = await formDataPromise
    formData.append(this.actionName, 'removeCoupon')
    formData.append('coupon', coupon)
    return httpClient.post(this.url, formData)
  }
}

export default new API()