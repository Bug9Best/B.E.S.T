<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="card layouts flex flex-column align-items-center fadein animation-duration-200">
    <div v-if="!asssignment" class="flex flex-column align-items-center">
      <i class="pi pi-exclamation-circle text-300 text-7xl"></i>
      <span class="mt-4 text-xl text-400">คุณยังไม่มีงานที่ได้รับมอบหมาย</span>
    </div>

    <div v-else class="w-full flex flex-column">
      <div class="" v-for="(item, index) in asssignment" :key="index">
        <div class="mb-3 font-bold">วันที่ : {{ item.createdAtDate }}</div>
        <div class="mt-2 border border border-round shadow-1 p-2 flex flex-column hover:shadow-2"
          v-for="(item, index) in item.items" :key="index">
          <div class="flex justify-content-between px-3 py-1">
            <div class="font-bold text-lg">{{ item.title }}</div>
            <div class="text-sm">
              ครบกำหนด
              {{ new Date(item.dueDate).toLocaleDateString() }}
              {{ new Date(item.dueDate).toLocaleTimeString().slice(0, 4) }}
            </div>
          </div>
          <div class="px-3 py-1">{{ item.description }}</div>
          <hr />
          <div class="flex flex-column px-3 py-1" v-if="item.fileName">
            <div class="font-bold text-base">ไฟล์แนบ</div>
            <a class="file-container mt-2" :href="item.fileUrl">
              {{ item.fileName }}
            </a>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      asssignment: {},
      userId: null,
    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem('user')).id
  },
  mounted() {
    this.getAssignment()
  },
  methods: {
    async groupByDate(data) {
      return Object.values(
        data.reduce((result, item) => {
          const { createdAt } = item
          const createdAtDate = new Date(createdAt).toLocaleDateString('th')
          if (!result[createdAtDate]) {
            result[createdAtDate] = { createdAtDate, items: [] }
          }

          result[createdAtDate].items.push(item)

          return result
        }, {})
      )
    },
    async getAssignment() {
      try {
        const res = await axios.get(import.meta.env.VITE_ENDPOINT + `/api/user/assignment/${this.userId}`)
        const data = res.data
        const group = await this.groupByDate(data)
        console.log(group)
        this.asssignment = group
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.layouts {
  height: calc(100vh - 12rem);
}

.file-container {
  color: #000;
  background-color: whitesmoke;
  border-radius: 8px;
  padding: 8px 16px;
}
</style>
