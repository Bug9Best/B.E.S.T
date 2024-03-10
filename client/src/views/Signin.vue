<script>
import axios from 'axios'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
      showMessage: false
    }
  },
  validations() {
    return {
      username: { required },
      password: { required }
    }
  },

  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true
      if (!isFormValid) {
        return
      }
      this.toggleDialog()
      this.login()
    },

    toggleDialog() {
      this.showMessage = !this.showMessage

      if (!this.showMessage) {
        this.resetForm()
      }
    },

    resetForm() {
      this.username = ''
      this.password = ''
    },

    async login() {
      try {
        const res = await axios.post('http://localhost:8080/api/auth/loginCred', {
          username: this.username,
          password: this.password
        })

        if (res) {
          console.log(res.data)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          this.$router.push('/course')
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
</script>

<template>
  <div class="m-0 p-5 h-screen flex align-items-center">
    <div class="grid grid-nogutter surface-section text-800 border-round-xl shadow-2">
      <div class="col-12 lg:col-6 p-4 text-center text-left flex align-items-center">
        <section>
          <span class="text-6xl font-bold">Welcome To </span>
          <span class="text-6xl text-primary font-bold">B.E.S.T.</span>
          <p class="mt-2 mb-4 text-700 line-height-3">
            &emsp; B.E.S.T. (Better Education Supported Technology) is a platform that provides a
            wide range of courses for students to choose from.
          </p>

          <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid mt-4">
            <label for="email1" class="block text-900 font-medium mb-2">Username</label>
            <InputText type="text" v-model="v$.username.$model" placeholder="Username"
              :class="{ 'p-invalid': v$.username.$invalid && submitted }" />
            <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="p-error px-1">{{
              v$.username.required.$message.replace('Value', 'Username') }}
            </small>

            <label for="password" class="block text-900 font-medium mt-2 mb-2">Password</label>
            <InputText type="password" v-model="v$.password.$model" placeholder="Password"
              :class="{ 'p-invalid': v$.password.$invalid && submitted }" />
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error px-1">{{
              v$.password.required.$message.replace('Value', 'Password') }}
            </small>

            <Button type="submit" label="Sign In" class="w-full mt-5"></Button>
          </form>
        </section>
      </div>
      <div class="hidden lg:block lg:col-6 overflow-hidden">
        <img src="https://kodus.io/wp-content/uploads/2020/07/15.jpg" alt="Image" class="md:ml-auto block md:h-full"
          style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)" />
      </div>
    </div>
  </div>
</template>
