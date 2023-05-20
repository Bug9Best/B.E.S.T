<template>
  <div class="card layouts fadein animation-duration-200">
    <h5>{{ Course.title }}</h5>
    <TabView>
      <TabPanel>
        <template #header>
          <i class="pi pi-book mr-2"></i>
          <span>Lectures</span>
        </template>
        <div class="card shadow-1 p-3">
          <p class="font-bold">Topic 1</p>
        </div>
        <div class="flotbutton">
          <Button label="Create New" icon="pi pi-pencil" @click="addBlog()" />
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-file mr-2"></i>
          <span>Assignments</span>
        </template>
        <div class="card shadow-1 p-3">
          <p class="font-bold">Assignment 1</p>
        </div>
        <div class="flotbutton">
          <Button label="Create New" icon="pi pi-pencil" @click="addAssignment()" />
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-clone mr-2"></i>
          <span>Forum</span>
        </template>
        <ScrollPanel style="width: 100%; height: 480px">
          <div class="card p-3 mb-2" v-for="item in listPost">
            <p class="text-sm">
              {{ item.author.fullname }} :
              {{ new Date(item.createdAt).toLocaleDateString() }}
              {{ new Date(item.createdAt).toTimeString().substring(0, 8) }}
            </p>
            <div class="flex justify-content-between align-items-start">
              <p class="font-bold text-lg">{{ item.content }}</p>
              <Button
                icon="pi pi-comment"
                class="p-button-text p-button-lg"
                @click="changeComment(item.id)"
              ></Button>
            </div>
            <div class="comment" v-for="comments in item.comments">
              <hr />
              <div class="text-sm">
                {{ comments.author.fullname }} :
                {{ new Date(comments.createdAt).toLocaleDateString() }}
                {{ new Date(comments.createdAt).toTimeString().substring(0, 8) }}
              </div>
              <div class="mt-2 font-bold">
                {{ comments.content }}
              </div>
            </div>
          </div>
        </ScrollPanel>
        <div v-if="isPost">
          <hr />
          <div class="flex w-full">
            <InputText class="mr-2 w-full" v-model="centent" />
            <Button
              label="โพสต์"
              icon="pi pi-send"
              @click="createPost()"
              class="p-buuton-text"
              style="width: 100px"
            >
            </Button>
          </div>
        </div>
        <div v-else>
          <hr />
          <div class="flex w-full">
            <InputText class="mr-2 w-full" v-model="centent" />
            <Button
              label="แสดงความคิดเห็น"
              icon="pi pi-comment"
              @click="createComment()"
              class="p-buuton-text mr-2"
              style="width: 250px"
            >
            </Button>
            <Button
              label="ยกเลิก"
              icon="pi pi-comment"
              @click="changePost()"
              class="p-buuton-text p-button-danger"
              style="width: 150px"
            >
            </Button>
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-users mr-2"></i>
          <span>Members</span>
        </template>
        <div class="flex justify-content-end align-items-center mb-3">
          <p class="text-base font-bold ml-1">สมาชิก {{ member }} คนได้เข้าร่วมแล้ว</p>
        </div>
        <ScrollPanel style="width: 100%; height: 460px">
          <div class="grid overflow-hidden">
            <div class="col-4" v-for="(item, index) in Course.enrollments" :key="index">
              <div class="card shadow-1 p-3 flex justify-content-between align-items-center">
                <p class="font-bold pt-3">{{ item.student.fullname }}</p>
                <Button
                  @click="createChat(item.student.id)"
                  icon="pi pi-comments"
                  class="p-button-primary p-button-text"
                />
              </div>
            </div>
          </div>
        </ScrollPanel>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-exclamation-circle mr-2"></i>
          <span>Detail</span>
        </template>
        <div class="text-lg">
          <div class="flex">
            <p class="font-bold mr-3">รหัสรายวิชา</p>
            <p>{{ Course.code }}</p>
          </div>
          <div class="flex">
            <p class="font-bold mr-3">ชื่อรายวิชา</p>
            <p>{{ Course.title }}</p>
          </div>
          <div class="flex" v-for="(item, index) in Course.owners">
            <p v-if="index === 0" class="font-bold mr-3">อาจารย์ผู้สอน</p>
            <p v-else class="font-bold ml-7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p>{{ item.user.fullname }}</p>
          </div>
          <div class="inline">
            <span>
              <p class="font-bold">รายละเอียดวิชา</p>
            </span>
            <p class="mt-2">{{ Course.description }}</p>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import axios from 'axios'
import Course from '../public/json/course.json'
export default {
  name: 'CourseDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      Course: {},
      listPost: {},
      centent: '',
      member: 0,
      isPost: true,
      postId: null,
      user: null
    }
  },

  created() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  },
  mounted() {
    this.getCourse()
  },

  watch: {
    id: function () {
      this.getCourse()
    }
  },
  methods: {
    async createChat(receiverId) {
      try {
        console.log(receiverId, this.user.id)
        if (this.user.id == receiverId) {
          return alert('ไม่สามารถส่งข้อความถึงตัวเองได้')
        }
        await axios.post('http://localhost:8080/api/chat/create', {
          senderId: this.user.id,
          receiverId: receiverId
        })
        this.$router.push('/chat')
      } catch (error) {
        console.log(error)
      }
    },

    resetForm() {
      this.centent = ''
      this.postId = null
    },

    changePost() {
      this.isPost = true
      this.resetForm()
    },

    changeComment(id) {
      this.isPost = false
      this.postId = id
      this.content = ''
    },

    addBlog() {
      console.log('add blog')
    },
    addAssignment() {
      console.log('add assignment')
    },
    async createPost() {
      try {
        const res = await axios.post('http://localhost:8080/api/post/createPost', {
          courseId: this.id,
          authorId: this.user.id,
          content: this.centent
        })
        this.resetForm()
        this.getCourse()
      } catch (error) {
        console.log(error)
      }
    },

    async createComment() {
      try {
        const res = await axios.post('http://localhost:8080/api/comment/createComment', {
          postId: this.postId,
          authorId: this.user.id,
          content: this.centent
        })
        this.resetForm()
        this.getCourse()
      } catch (error) {
        console.log(error)
      }
    },

    async getCourse() {
      try {
        const res = await axios.get('http://localhost:8080/api/course/getCourse/:id', {
          params: {
            id: this.id
          }
        })
        this.Course = Object(res.data)
        this.listPost = Object(res.data.posts)
        this.member = this.Course.enrollments.length
        console.log(res.data)
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

.flotbutton {
  position: absolute;
  top: -5.5rem;
  right: 0;
}

.menu-post {
  z-index: 10;
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
