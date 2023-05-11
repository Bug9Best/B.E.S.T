<template>
  <div class="p-5 h-screen flex align-items-center justify-content-center">
      <div class="surface-section text-800 card">
          <div class="col-12 p-6 text-center md:text-left flex align-items-center ">
              <section id="vueRoot">
                  <span class=" text-6xl font-bold">Register to join with </span>
                  <span class="text-6xl text-primary font-bold">Us</span>

                  <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid mt-4">
                      <div class="field">
                          <label for="firstName" :class="{ 'p-error': v$.firstName.$invalid && submitted }">First
                              Name</label>
                          <InputText id="firstName" v-model="v$.firstName.$model"
                              :class="{ 'p-invalid': v$.firstName.$invalid && submitted }" />
                          <small v-if="(v$.firstName.$invalid && submitted) || v$.firstName.$pending.$response"
                              class="p-error">{{
                                  v$.firstName.required.$message.replace('Value', 'First Name') }}</small>
                      </div>

                      <div class="field">
                          <label for="lastName" :class="{ 'p-error': v$.lastName.$invalid && submitted }">Last
                              Name</label>
                          <InputText id="lastName" v-model="v$.lastName.$model"
                              :class="{ 'p-invalid': v$.lastName.$invalid && submitted }" />
                          <small v-if="(v$.lastName.$invalid && submitted) || v$.lastName.$pending.$response"
                              class="p-error">{{
                                  v$.lastName.required.$message.replace('Value', 'Last Name') }}</small>
                      </div>

                      <div class="field">
                          <label for="email" :class="{ 'p-error': v$.email.$invalid && submitted }">Email</label>
                          <div class="p-input-icon-right">
                              <i class="pi pi-envelope" />
                              <InputText id="email" v-model="v$.email.$model"
                                  :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                                  aria-describedby="email-error" />
                          </div>
                          <span v-if="v$.email.$error && submitted">
                              <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                                  <small class="p-error">{{ error.$message }}</small>
                              </span>
                          </span>
                          <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                              class="p-error">{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
                      </div>

                      <div class="field">
                          <label for="password" :class="{ 'p-error': v$.password.$invalid && submitted }">Password</label>
                          <Password id="password" v-model="v$.password.$model"
                              :class="{ 'p-invalid': v$.password.$invalid && submitted }" toggleMask>
                              <template #header>
                                  <h6>Pick a password</h6>
                              </template>
                              <template #footer="sp">
                                  {{ sp.level }}
                                  <Divider />
                                  <p class="mt-2">Suggestions</p>
                                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5;list-style-type: none">
                                      <li>
                                          <i v-if="/[a-z]/.test(this.password)"
                                              class="pi pi-check-circle text-primary"></i>
                                          <i v-else class="pi pi-check-circle text-red-500"></i>
                                          At least one lowercase
                                      </li>
                                      <li>
                                          <i v-if="/[A-Z]/.test(this.password)"
                                              class="pi pi-check-circle text-primary"></i>
                                          <i v-else class="pi pi-check-circle text-red-500"></i>
                                          At least one uppercase
                                      </li>
                                      <li>
                                          <i v-if="/[0-9]/.test(this.password)"
                                              class="pi pi-check-circle text-primary"></i>
                                          <i v-else class="pi pi-check-circle text-red-500"></i>
                                          At least one numeric
                                      </li>
                                      <li>
                                          <i v-if="this.password.length >= 8" class="pi pi-check-circle text-primary"></i>
                                          <i v-else class="pi pi-check-circle text-red-500"></i>
                                          Minimum 8 characters
                                      </li>
                                  </ul>
                              </template>
                          </Password>
                          <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
                              class="p-error">{{ v$.password.required.$message.replace('Value', 'Password') }} (Minimum 8
                              characters)</small>
                      </div>

                      <div class="field">
                          <label for="confirmPassword"
                              :class="{ 'p-error': v$.confirmPassword.$invalid && submitted }">Confirm Password</label>
                          <Password id="confirmPassword" v-model="v$.confirmPassword.$model"
                              :class="{ 'p-invalid': v$.confirmPassword.$invalid && submitted }" :feedback="false"
                              toggleMask>
                          </Password>
                          <small
                              v-show="(v$.confirmPassword.$invalid && !v$.confirmPassword.$sameAsPassword && submitted)"
                              class="p-error">Pass word not match</small>
                      </div>

                      <Button type="submit" label="Submit" class="mt-2" />
                      <router-link to="/">
                          <Button type="submit" label="Back to Signin" class="mt-2 p-button-text p-button-plain" />
                      </router-link>
                  </form>
              </section>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
      return {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          submitted: false,
          showMessage: false,
      }
  },
  validations() {
      return {
          firstName: { required },
          lastName: { required },
          email: { required, email },
          password: { required, minLength: minLength(8) },
          confirmPassword: { sameAsPassword: sameAs(this.password) }
      }
  },

  methods: {
      handleSubmit(isFormValid) {
          this.submitted = true;
          if (!isFormValid) {
              return;
          }
          this.toggleDialog();
          this.signup();
      },
      toggleDialog() {
          this.showMessage = !this.showMessage;

          if (!this.showMessage) {
              this.resetForm();
          }
      },
      resetForm() {
          this.firstName = '';
          this.lastName = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          this.submitted = false;
      },
      async signup() {
          try {
              const res = await axios.post('http://localhost:8080/api/auth/register',
                  {
                      firstName: this.firstName,
                      lastName: this.lastName,
                      email: this.email,
                      password: this.password
                  })
              if (res.data) {
                  localStorage.setItem('token', JSON.stringify(res.data))
                  this.$router.push('/course')
              }
          } catch (err) {
              console.log(err.message)
          }
      },
  }
}
</script>