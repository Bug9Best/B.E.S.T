<template>
  <div class="card fadein animation-duration-200">
    <div class="flex justify-content-end mb-4">
      <Button label="Create New" icon="pi pi-plus" size="small"></Button>
    </div>
    <div v-if="listCourses.length" class="grid">
      <div class="col-4" v-for="item in listCourses" :key="item.id">
        <div class="p-3 h-full">
          <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
            <img src="../public/img/courseImg.avif" alt="courseImg" />
            <div class="text-900 font-medium text-lg mt-3">{{ item.title }} ({{ item.term }})</div>
            <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
            <ul class="list-none p-0 m-0 flex-grow-1 mb-2" v-for="owner in item.owners" :key="owner">
              <li class="flex align-items-center">
                <i class="pi pi-user text-green-500 mr-2"></i>
                <span>{{ owner.user.fullname }}</span>
              </li>
            </ul>
            <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
            <Button label="Enroll" class="p-3 w-full mt-auto" @click="enroll(item.id)"></Button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-column nodata align-items-center justify-content-center">
      <i class="pi pi-exclamation-circle text-300 text-7xl"></i>
      <span class="mt-4 text-xl text-400">ยังไม่มีคอร์สในขณะนี้</span>
    </div>
  </div>
</template>

<style setup>
.nodata {
  height: calc(100vh - 21rem);
}
</style>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      listCourses: [],
      listEstimate: []
    }
  },
  mounted() {
    this.getCourse()
  },
  methods: {
    async getCourse() {
      try {
        const res = await axios.get('http://localhost:8080/api/course/getCourse')
        this.listCourses = res.data
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>