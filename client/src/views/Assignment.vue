<script>
import axios from 'axios'
import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'
const storage = useFirebaseStorage()
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
    async groupByDate(data) {
      return Object.values(
        data.reduce((result, item) => {
          const { createdAt } = item
          if (!result[createdAt]) {
            result[createdAt] = { createdAt, items: [] }
          }

          result[createdAt].items.push(item)

          return result
        }, {})
      )
    },
    async getAssignment() {
      try {
        const res = await axios.get(`http://localhost:8080/api/user/assignment/${this.userId}`)
        const data = res.data

        await Promise.all(
          data.map(async (item) => {
            const starsRef = storageRef(storage, 'assignments/' + item.id)
            const search = await listAll(starsRef)
            item.file = []

            await Promise.all(
              search.items.map(async (file) => {
                const download = await getDownloadURL(file)
                item.file.push({ url: download.toString(), name: file.name })
              })
            )
          })
        )

        const group = await this.groupByDate(data)

        console.log(group[0].items[0])

        this.asssignment = group
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
        <div>{{ new Date(item.createdAt).toLocaleDateString('th') }}</div>
        <div
          class="mt-2 border border border-round shadow-1 p-2 flex flex-column hover:shadow-2"
          v-for="(item, index) in item.items"
          :key="index"
        >
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
          <div class="flex flex-column" v-if="item.file">
            <a v-for="(file, index) in item.file" :key="index" :href="file.url">
              {{ file.name }}
            </a>
          </div>
          <!-- <Button label="หฟกฟหกฟหก" class="p-button-text p-button-secondary"></Button> -->
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
