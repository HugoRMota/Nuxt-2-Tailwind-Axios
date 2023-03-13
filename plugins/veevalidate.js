import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import pt_BR from 'vee-validate/dist/locale/pt_BR'

Validator.localize({ pt_BR: pt_BR })
Vue.use(VeeValidate, {
  locale: 'pt_BR',
  inject: true,
  fieldsBagName: '$veeFields',
  errorBagName: '$veeErrors',
})
