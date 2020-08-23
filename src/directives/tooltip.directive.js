export default {
  bind(el, {value}) {
    const options = {
      html: value,
      position: 'bottom'
    }

    if (el.dataset.btn === 'add' || el.dataset.btn === 'refresh') {
      options.position = 'left'
    } else if (el.dataset.btn === 'open') {
      options.position = 'top'
    }

    window.M.Tooltip.init(el, options)
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
