<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-0 p-5 h-screen flex align-items-center justify-content-center">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Signup</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid mt-4">
        <label for="username" class="block text-900 font-medium mt-2 mb-2">Username</label>
        <InputText type="text" v-model="v$.username.$model" placeholder="Email"
          :class="{ 'p-invalid': v$.username.$invalid && submitted }" />
        <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="p-error px-1">{{
        v$.username.required.$message.replace('Value', 'Email') }}
        </small>

        <label for="password1" class="block text-900 font-medium mt-2 mb-2">Password</label>
        <InputText type="password" v-model="v$.password.$model" placeholder="Password"
          :class="{ 'p-invalid': v$.password.$invalid && submitted }" />
        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error px-1">{{
        v$.password.required.$message.replace('Value', 'Password') }}
        </small>

        <Divider />

        <label for="email" class="block text-900 font-medium mt-2 mb-2">Email</label>
        <InputText type="email" v-model="v$.email.$model" placeholder="Email"
          :class="{ 'p-invalid': v$.email.$invalid && submitted }" />
        <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error px-1">{{
        v$.email.required.$message.replace('Value', 'Email') }}
        </small>

        <label for="firstName" class="block text-900 font-medium mt-2 mb-2">First Name</label>
        <InputText type="text" v-model="v$.firstName.$model" placeholder="First Name"
          :class="{ 'p-invalid': v$.firstName.$invalid && submitted }" />
        <small v-if="(v$.firstName.$invalid && submitted) || v$.firstName.$pending.$response" class="p-error px-1">{{
        v$.firstName.required.$message.replace('Value', 'Fist Name') }}
        </small>

        <label for="lastName" class="block text-900 font-medium mt-2 mb-2">Last Name</label>
        <InputText type="text" v-model="v$.lastName.$model" placeholder="Last Name"
          :class="{ 'p-invalid': v$.lastName.$invalid && submitted }" />
        <small v-if="(v$.lastName.$invalid && submitted) || v$.lastName.$pending.$response" class="p-error px-1">{{
        v$.lastName.required.$message.replace('Value', 'Last Name') }}
        </small>

        <Divider />
        <div class="flex gap-3">
          <Button @click="goSignin" label="Cancel" class="p-button-danger p-button-outlined w-full"></Button>
          <Button type="submit" label="Sign In" icon="pi pi-user" class="w-full"></Button>
        </div>
      </form>
    </div>
  </div>
</template>

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
      email: '',
      firstName: '',
      lastName: '',
      submitted: false,
      showMessage: false
    }
  },
  validations() {
    return {
      username: { required },
      password: { required },
      email: { required, email: true },
      firstName: { required },
      lastName: { required },
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
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.username = ''
      this.password = ''
    },

    async login() {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password
      }
      console.log(data)
      try {
        const res = await axios.post(import.meta.env.VITE_ENDPOINT + "/api/auth/register", data)
        if (res) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          this.$router.push('/course')
        }
      } catch (err) {
        console.log(err)
      }
    },
    goSignin() {
      this.$router.push('/signin')
    }
  }
}
</script>