import * as components from './bsExtend'

const VuePlugin = {
  install (Vue) {
    // 注册组件
    for (let component in components) {
      const comName = components[component].name

      if (!/Alert|Toast/.test(component)) {
        Vue.component(comName, components[component])
        continue
      }

      if (component === 'Alert') {
        const AlertConstructor = Vue.extend(components[component])
        let $vmAlert = new AlertConstructor().$mount()

        // 全局函数
        Vue.alert = (content, opt) => Vue.prototype.$alert(content, opt)

        Vue.prototype.$alert = (content, opt) => {
          Object.assign($vmAlert, opt)

          if ($vmAlert.show) return

          $vmAlert.content = content
          $vmAlert.show = true

          if (!document.getElementsByClassName('bs-alert').length) {
            document.body.appendChild($vmAlert.$el)
          }

          if ($vmAlert.timeout > 0) {
            setTimeout(() => {
              $vmAlert.show = false

              if ($vmAlert.onHide) $vmAlert.onHide()
            }, $vmAlert.timeout)
          }
        }
        continue
      }

      if (component === 'Toast') {
        const ToastConstructor = Vue.extend(components[component])
        let $vmToast = new ToastConstructor().$mount()

        // 显示函数
        Vue.toast = (content, opt) => Vue.prototype.$toast(content, opt)

        // 隐藏函数
        Vue.hideToast = () => {
          $vmToast.show = false

          if ($vmToast.onHide) $vmToast.onHide()
        }

        Vue.prototype.$toast = (content, opt) => {
          Object.assign($vmToast, opt)

          if ($vmToast.show) return

          $vmToast.content = content
          $vmToast.show = true

          if (!document.getElementsByClassName('bs-toast').length) {
            document.body.appendChild($vmToast.$el)
          }
        }
        continue
      }
    }
  }
}

export default VuePlugin
