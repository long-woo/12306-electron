import DatePicker from './DatePicker'
import Autocomplete from './Autocomplete'

DatePicker.install = (Vue) => {
  Vue.component(DatePicker.name, DatePicker)
}

Autocomplete.install = (Vue) => {
  Vue.component(Autocomplete.name, Autocomplete)
}

export default {
  DatePicker,
  Autocomplete
}
