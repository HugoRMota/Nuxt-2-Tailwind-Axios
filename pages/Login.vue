<template>
  <div
    class="d-flex align-items-center justify-content-center"
    style="height: 100% ; background-color:;#cbd5e1"
  >
    <b-card header="Login" class="w-25 pt-12">
      <div>
        <b-form @submit.stop.prevent="login">
          <b-form-group id="email" label="Email" label-for="email">
            <b-form-input
              id="input-1"
              name="email"
              v-model="form.email"
              type="email"
              placeholder="email@email.com"
              v-validate="{ required: true, min: 3 }"
              data-vv-as="Email"
              :state="validateState('email')"
            ></b-form-input>
            <b-form-invalid-feedback id="input-2-live-feedback">{{
              $veeErrors.first('email')
            }}</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="password" label="Password:" label-for="password">
            <b-form-input
              id="password"
              name="password"
              v-model="form.password"
              placeholder="*******"
              v-validate="{ required: true, min: 6 }"
              data-vv-as="Password"
              :state="validateState('password')"
            ></b-form-input>
            <b-form-invalid-feedback id="input-2-live-feedback">{{
              $veeErrors.first('password')
            }}</b-form-invalid-feedback>
          </b-form-group>

          <b-button type="submit" variant="primary">Access</b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    validateState(ref) {
      if (
        this.$veeFields[ref] &&
        (this.$veeFields[ref].dirty || this.$veeFields[ref].validated)
      ) {
        return !this.$veeErrors.has(ref)
      }
      return null
    },
    async login() {
      const valid = await this.$validator.validate()
      if (valid) {
        this.loading = true
        try {
          await this.$auth.loginWith('local', {
            data: {
              login: { email: this.form.email, password: this.form.password },
            },
          })

          localStorage.setItem('email', this.form.email)
          this.$store.state.auth.loggedIn = true
          this.$router.push('/')
        } catch ({ response }) {
          console.log('🚀 ~ file: Login.vue:85 ~ login ~ error:', response)

          this.$toast.error(response.data.data, { timeout: 5000 })
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
