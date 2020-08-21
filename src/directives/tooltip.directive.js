export default {
  bind(el, {value}) {
    const options = {
      html: value,
      position: 'bottom'
    }

    if (el.classList.contains('btn-floating')) {
      options.position = 'left'
    } else if (el.classList.contains('btn')) {
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
