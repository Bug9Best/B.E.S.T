<template>
  <ul class="layout-menu flex flex-column flex-grow-0 flex-shrink-1">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
  <ul class="layout-menu flex flex-column flex-grow-0 flex-shrink-1 absolute bottom-0 mb-3">
    <template v-for="(item, i) in assistant" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
      <div style="width: 260px"></div>
    </template>
  </ul>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import AppMenuItem from './AppMenuItem.vue'
import io from 'socket.io-client'

export default {
  components: {
    AppMenuItem
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      myCourse: [],
      model: [
        {
          label: 'หน้า',
          items: [
            { label: 'คอร์สเรียน', icon: 'pi pi-fw pi-book', to: '/course' },
            { label: 'ปฏิทิน', icon: 'pi pi-fw pi-calendar', to: '/calendar' },
            { label: 'งานที่ได้รับมอบหมาย', icon: 'pi pi-fw pi-file', to: '/assignment' },
            { label: 'แชท', icon: 'pi pi-fw pi-comments', to: '/chat' },
            {
              label: 'คอร์สของฉัน',
              icon: 'pi pi-fw pi-book',
              to: '/course_detail',
              items: this.myCourse
            }
          ]
        }
      ],
      assistant: [
        {
          items: [
            { label: 'เกี่ยวกับโปรแกรมนี้', icon: 'pi pi-fw pi-verified', to: '/about' },
            { label: 'ทีมพัฒนา', icon: 'pi pi-fw pi-users', to: '/team' }
          ]
        }
      ]
    }
  },
  mounted() {
    this.getEnrollments()
    io('http://localhost:4000').on('enroll', () => {
      this.getEnrollments()
    })
  },
  methods: {
    async getEnrollments() {
      try {
        const res = await axios.get('http://localhost:8080/api/enrollment/getEnroll', {
          params: {
            id: this.user.id
          }
        })
        this.myCourse = res.data.map((course) => {
          return {
            label: course.course.title,
            icon: 'pi pi-fw pi-book',
            to: '/course_detail/' + course.courseId
          }
        })
        this.model[0].items[4].items = this.myCourse
        console.log(this.myCourse)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
