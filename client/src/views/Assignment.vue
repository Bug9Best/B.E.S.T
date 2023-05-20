<script>
import axios from 'axios'
export default {
  data() {
    return {
      asssignment: null,
      userId: null
    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem('user')).id
  },
  mounted() {
    this.getAssignment()
  },
  methods: {
    async getAssignment() {
      try {
        const res = await axios.get(`http://localhost:8080/api/user/assignment/${this.userId}`)
        const groupedData = res.data.reduce((result, item) => {
          const { createdAt } = item

          if (!result[createdAt]) {
            result[createdAt] = [] // Create an array for the grouping key if it doesn't exist
          }

          result[createdAt].push(item) // Push the item to the corresponding group

          return result
        }, {})
        this.asssignment = groupedData
        console.table(groupedData)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div class="card layouts flex flex-column align-items-center fadein animation-duration-200">
    <div v-if="!asssignment" class="flex flex-column align-items-center">
      <i class="pi pi-exclamation-circle text-300 text-7xl"></i>
      <span class="mt-4 text-xl text-400">คุณยังไม่มีงานที่ได้รับมอบหมาย</span>
    </div>
    <div class="w-full flex flex-column">
      <div class="" v-for="(item, index) in asssignment" :key="index">
        <div>{{ new Date(index).toLocaleDateString('th') }}</div>
        <div
          class="mt-2 border border border-round shadow-1 p-2 flex flex-column hover:shadow-2"
          v-for="(item, index) in item"
          :key="index"
        >
          <div class="flex justify-content-between px-3 py-1">
            <div class="font-bold text-lg">{{ item.title }}</div>
            <div class="text-sm">
              ครบกำหนด
              {{ new Date(item.dueDate).toLocaleDateString() }}
              {{ new Date(item.dueDate).toTimeString().substring(0, 8) }}
            </div>
          </div>
          <div class="px-3 py-1">{{ item.description }}</div>
          <hr />
          <Button label="หฟกฟหกฟหก" class="p-button-text p-button-secondary"></Button>
          <div class=""></div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<style>
.layouts {
  height: calc(100vh - 12rem);
}
</style>
