<script>
export default {
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
    }
  }
}
</script>

<template>
  <div class=" m-0 p-5 h-screen flex align-items-center">
    <div class="grid grid-nogutter surface-section text-800 border-round-xl shadow-2">
      <div class="col-12 lg:col-6 p-4 text-center text-left flex align-items-center">
        <section>
          <span class=" text-6xl font-bold">Welcome To </span>
          <span class="text-6xl text-primary font-bold">B.E.S.T.</span>
          <p class="mt-2 mb-4 text-700 line-height-3">
            &emsp; B.E.S.T. (Better Education Supported Technology) is a platform that provides a wide
            range of courses for students to choose from.
          </p>

          <div>
            <label for="email1" class="block text-900 font-medium mb-2">Email</label>
            <InputText type="text" placeholder="Email address" class="w-full mb-3" v-model="loginData.email" />

            <label for="password1" class="block text-900 font-medium mb-2">Password</label>
            <InputText type="password" placeholder="Password" class="w-full mb-3" v-model="loginData.password" />

            <div class="flex align-items-center justify-content-end mb-5">
              <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer text-primary">
                Forgot password?
              </a>
            </div>

            <Button @click="login()" label="Sign In" class="w-full"></Button>
          </div>
        </section>
      </div>
      <div class="hidden lg:block lg:col-6 overflow-hidden">
        <img src="https://kodus.io/wp-content/uploads/2020/07/15.jpg" alt="Image" class="md:ml-auto block md:h-full"
          style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
      </div>
    </div>
  </div>
</template>