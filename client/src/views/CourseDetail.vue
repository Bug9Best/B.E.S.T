<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="card layouts fadein animation-duration-200">
    <h5>{{ course.title }}</h5>
    <TabView>
      <TabPanel>
        <template #header>
          <i class="pi pi-book mr-2"></i>
          <span>เอกสารประกอบการเรียน</span>
        </template>
        <ScrollPanel style="width: 100%; height: 550px">
          <div class="card shadow-1 py-3" v-for="item in listLecture">
            <div class="flex justify-content-between align-items-center">
              <div class="font-bold">{{ item.content }}</div>
              <div v-if="this.authorId == this.user.id">
                <Button @click="deleteLecture(item.id)" class="p-button-text p-button-danger p-button-rounded"
                  icon="pi pi-trash"></Button>
              </div>
            </div>

            <div class="flex flex-column mb-1">
              <hr>
              <div class="text-sm">ไฟล์แนบ : </div>
              <a class="file-container mt-2" target="_blank" :href="item.fileUrl"> {{ item.fileName }} </a>
            </div>
          </div>
        </ScrollPanel>
        <div class="flotbutton">
          <Button v-show="!isStudent" class="p-button-text" label="เพิ่มเอกสาร" icon="pi pi-plus"
            @click="visibleLecture = true" />
          <Dialog modal header="เพิ่มเอกสารประกอบการเรียนการสอน" :visible="visibleLecture" @update:visible="handleClose"
            :style="{ width: '50vw' }">
            <div class="grid">
              <div class="col-3">
                <label for="content" class="text-lg">รายละเอียด</label>
              </div>
              <div class="col-9">
                <InputTextarea rows="5" id="content" v-model="formLecture.content" class="w-full"></InputTextarea>
              </div>
            </div>

            <div class="grid">
              <div class="col-3">
                <label for="file" class="text-lg">ไฟล์</label>
              </div>
              <div class="col-9">
                <input type="file" class="custom-file-input" @change="onUpload" />
              </div>
            </div>

            <div class="grid mt-2">
              <div class="col-9 col-offset-3">
                <Button @click="createLecture()" label="สร้างงานมอบหมาย" icon="pi pi-save" size="small">
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-file mr-2"></i>
          <span>งานที่มอบหมาย</span>
        </template>
        <ScrollPanel style="width: 100%; height: 550px">
          <div class="card shadow-1 py-3" v-for="item in listAssignment">
            <div class="flex justify-content-between">
              <div class="font-bold">{{ item.title }}</div>
              <div v-if="this.authorId == this.user.id">
                <Button @click="deleteAssignment(item.id)" class="p-button-text p-button-danger p-button-rounded"
                  icon="pi pi-trash"></Button>
              </div>
            </div>
            <div class="text-sm">{{ item.description }}</div>
            <div class="text-sm">
              ครบกำหนด :
              {{ new Date(item.dueDate).toLocaleDateString() }}
            </div>
            <div class="flex flex-column mb-1">
              <hr>
              <div class="text-sm">ไฟล์แนบ : </div>
              <a class="file-container mt-2" target="_blank" :href="item.fileUrl"> {{ item.fileName }} </a>
            </div>

          </div>
        </ScrollPanel>
        <div class="flotbutton">
          <Button v-show="!isStudent" class="p-button-text" label="สร้างการบ้าน" icon="pi pi-plus"
            @click="visible = true" />
          <Dialog modal header="เพิ่มงานมอบหมาย" :visible="visible" @update:visible="handleClose"
            :style="{ width: '50vw' }">
            <form @submit.prevent="handleSubmitAssignment(!v$.$invalid)" class="p-fluid mt-4">

              <div class="grid">
                <div class="col-3">
                  <label for="title" class="text-lg">ชื่องานที่มอบหมาย</label>
                </div>
                <div class="col-9">
                  <InputText id="title" v-model="formData.title" class="w-full"
                    :class="{ 'p-invalid': v$.formData.title.$invalid && submitted }" />
                  <small v-if="(v$.formData.title.$invalid && submitted) || v$.formData.title.$pending.$response"
                    class="p-error px-1">{{ v$.formData.title.required.$message.replace('Value',
      'ชื่องานที่มอบหมาย').replace('is required', 'จำเป็นต้องกรอก') }}
                  </small>
                </div>
              </div>

              <div class="grid">
                <div class="col-3">
                  <label for="description" class="text-lg">รายละเอียดงาน</label>
                </div>
                <div class="col-9">
                  <InputTextarea id="description" rows="5" v-model="formData.description" class="w-full">
                  </InputTextarea>
                </div>
              </div>

              <div class="grid">
                <div class="col-3">
                  <label for="duedate" class="text-lg">วันที่ครบกำหนด</label>
                </div>
                <div class="col-9">
                  <Calendar v-model="formData.dueDate" class="w-full"
                    :class="{ 'p-invalid': v$.formData.dueDate.$invalid && submitted }" />
                  <small v-if="(v$.formData.dueDate.$invalid && submitted) || v$.formData.dueDate.$pending.$response"
                    class="p-error px-1">{{ v$.formData.dueDate.required.$message.replace('Value',
      'วันที่ครบกำหนด').replace('is required', 'จำเป็นต้องกรอก') }}
                  </small>
                </div>
              </div>

              <div class="grid">
                <div class="col-3">
                  <label for="file" class="text-lg">ไฟล์</label>
                </div>
                <div class="col-9">
                  <input type="file" class="custom-file-input" @change="onUpload" />
                </div>
              </div>

              <div class="grid mt-2">
                <div class="col-9 col-offset-3">
                  <Button type="submit" label="สร้างงานมอบหมาย" icon="pi pi-save" size="small">
                  </Button>
                </div>
              </div>
            </form>
          </Dialog>
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-clone mr-2"></i>
          <span>กระทู้</span>
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
              <div class="flex align-items-center">
                <Button icon="pi pi-comment" class="p-button-text p-button-lg" @click="changeComment(item.id)">
                </Button>
                <div v-if="this.authorId == this.user.id">
                  <Button @click="deletePost(item.id)" class="p-button-text p-button-danger p-button-rounded"
                    icon="pi pi-trash"></Button>
                </div>
              </div>
            </div>
            <div class="comment" v-for="comments in item.comments">
              <hr />
              <div class="flex justify-content-between">
                <div class="flex flex-column">
                  <div class="text-sm">
                    {{ comments.author.fullname }} :
                    {{ new Date(comments.createdAt).toLocaleDateString() }}
                    {{ new Date(comments.createdAt).toTimeString().substring(0, 8) }}
                  </div>
                  <div class="mt-2 font-bold">
                    {{ comments.content }}
                  </div>
                </div>
                <div>
                  <div v-if="this.authorId == this.user.id">
                    <Button @click="deleteComment(comments.id)" class="p-button-text p-button-danger p-button-rounded"
                      icon="pi pi-trash"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollPanel>
        <div v-if="isPost">
          <hr />
          <div class="flex w-full">
            <InputText class="mr-2 w-full" v-model="centent" />
            <Button label="โพสต์" icon="pi pi-send" @click="createPost()" class="p-buuton-text" style="width: 100px">
            </Button>
          </div>
        </div>
        <div v-else>
          <hr />
          <div class="flex w-full">
            <InputText class="mr-2 w-full" v-model="centent" />
            <Button label="แสดงความคิดเห็น" icon="pi pi-comment" @click="createComment()" class="p-buuton-text mr-2"
              style="width: 250px">
            </Button>
            <Button label="ยกเลิก" icon="pi pi-comment" @click="changePost()" class="p-buuton-text p-button-danger"
              style="width: 150px">
            </Button>
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-users mr-2"></i>
          <span>ผู้เข้าร่วมคอร์ส</span>
        </template>
        <div class="flex justify-content-end align-items-center mb-3">
          <div class="text-base font-bold ml-1">สมาชิก {{ member }} คนได้เข้าร่วมแล้ว</div>
        </div>
        <ScrollPanel style="width: 100%; height: 460px">
          <div class="grid overflow-hidden">
            <div class="col-4" v-for="item in course.enrollments">
              <div class="card shadow-1 p-3 flex justify-content-between align-items-center">
                <p class="font-bold pt-3">{{ item.student.fullname }}</p>
                <Button @click="createChat(item.student.id)" icon="pi pi-comments"
                  class="p-button-primar1y p-button-text" v-show="item.student.id !== user.id" />
              </div>
            </div>
          </div>
        </ScrollPanel>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-exclamation-circle mr-2"></i>
          <span>รายละเอียด</span>
        </template>
        <div class="text-lg">
          <div class="flex">
            <p class="font-bold mr-3">รหัสรายวิชา</p>
            <p>{{ course.code }}</p>
          </div>
          <div class="flex">
            <p class="font-bold mr-3">ชื่อรายวิชา</p>
            <p>{{ course.title }}</p>
          </div>
          <div class="flex" v-for="(item, index) in course.owners">
            <p v-if="index === 0" class="font-bold mr-3">อาจารย์ผู้สอน</p>
            <p v-else class="font-bold ml-7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p>{{ item.user.fullname }}</p>
          </div>
          <div class="inline">
            <span>
              <p class="font-bold">รายละเอียดวิชา</p>
            </span>
            <p class="mt-2">{{ course.description }}</p>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
  <Toast position="bottom-right" />
</template>
<script>
import axios from 'axios'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import AWSS3UploadAshClient from 'aws-s3-upload-ash';


export default {
  name: 'CourseDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      formData: {
        courseId: null,
        creatorId: null,
        title: null,
        description: null,
        dueDate: null
      },
      formLecture: {
        courseId: null,
        content: null,
      },
      user: {},
      course: {},
      listPost: {},
      listAssignment: {},
      listLecture: {},
      postId: null,
      file: null,
      centent: '',
      member: 0,
      isPost: true,
      visible: false,
      visibleLecture: false,
      isStudent: true,

      authorId: null,

      submitted: false,
      showMessage: false,
      config: {
        bucketName: 'beststoragetrue',
        region: 'us-east-1',
        accessKeyId: 'AKIAU6GDWX7JNKIQ6Q4L',
        secretAccessKey: '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',
        s3Url: 'https://beststoragetrue.s3.amazonaws.com/'
      }
    }
  },
  validations() {
    return {
      formData: {
        title: { required },
        dueDate: { required },
      },
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user.role == 'Student') {
      this.isStudent = true
    } else {
      this.isStudent = false
    }
    this.getCourse()
  },

  watch: {
    id: function () {
      this.getCourse()
    }
  },
  methods: {
    handleSubmitAssignment(isFormValid) {
      this.submitted = true
      if (!isFormValid) {
        return
      }
      this.toggleDialog()
      this.createAssignment()
    },

    toggleDialog() {
      this.showMessage = !this.showMessage

      if (!this.showMessage) {
        this.resetFormLecture()
        this.resetFormAssignment()
      }
    },

    resetForm() {
      this.centent = ''
      this.postId = null
    },

    resetFormLecture() {
      this.formData.content = ''
      this.file = null
    },

    resetFormAssignment() {
      this.formData.title = ''
      this.formData.description = ''
      this.formData.dueDate = new Date()
      this.file = null
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

    handleClose(value) {
      this.visible = value
      this.visibleLecture = value
    },

    async createChat(receiverId) {
      try {
        console.log(receiverId, this.user.id)
        if (this.user.id == receiverId) {
          return alert('ไม่สามารถส่งข้อความถึงตัวเองได้')
        }
        await axios.post('http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/chat/create', {
          senderId: this.user.id,
          receiverId: receiverId
        })
        this.$router.push('/chat')
      } catch (error) {
        console.log(error)
      }
    },

    onUpload(event) {
      const file = event.target.files[0]
      const S3CustomClient = new AWSS3UploadAshClient(this.config);
      S3CustomClient.uploadFile(
        file,
        file.type,
        undefined,
        file.name,
        "public-read",
      )
        .then(response => {
          this.file = {
            name: response.key,
            url: response.location
          };
          this.$toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'อัพโหลดไฟล์สำเร็จ', life: 3000 });
        })
        .catch(err => { this.$toast.add({ severity: 'error', summary: 'สำเร็จ', detail: err, life: 3000 }) })
    },

    async createAssignment() {
      let data = {
        courseId: this.id,
        creatorId: this.user.id,
        title: this.formData.title,
        description: this.formData.description,
        dueDate: this.formData.dueDate,
        fileName: this.file.name,
        fileUrl: this.file.url
      }
      try {
        await axios.post('http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/assignment/createAssignment', data)
        this.visible = false
        this.$toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มงานมอบหมายสำเร็จ!', life: 3000 });
        this.resetFormAssignment()
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async createLecture() {
      let data = {
        courseId: this.id,
        content: this.formLecture.content,
        fileName: this.file.name,
        fileUrl: this.file.url
      }
      try {
        await axios.post('http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/lecture/createLecture', data)
        this.visibleLecture = false
        this.$toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มเอกสารประกอบการเรียนสำเร็จ!', life: 3000 });
        this.resetFormLecture()
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async deleteAssignment(id) {
      try {
        await axios.delete(`http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/assignment/deleteAssignment/${id}`)
        this.$toast.add({ severity: 'warn', summary: 'สำเร็จ', detail: 'ลบงานมอบหมายสำเร็จ!', life: 3000 });
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async deleteLecture(id) {
      try {
        await axios.delete(`http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/lecture/deleteLecture/${id}`)
        this.$toast.add({ severity: 'warn', summary: 'สำเร็จ', detail: 'ลบเอกสารประกอบการเรียนสำเร็จ!', life: 3000 });
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async createPost() {
      try {
        await axios.post('http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/post/createPost', {
          courseId: this.id,
          authorId: this.user.id,
          content: this.centent
        })
        this.$toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'โพสกระทู้สำเร็จ!', life: 3000 });
        this.resetForm()
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async deletePost(id) {
      try {
        await axios.delete(`http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/post/deletePost/${id}`)
        this.$toast.add({ severity: 'warn', summary: 'สำเร็จ', detail: 'ลบโพสสำเร็จ!', life: 3000 });
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async createComment() {
      try {
        await axios.post('http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/comment/createComment', {
          postId: this.postId,
          authorId: this.user.id,
          content: this.centent
        })
        this.$toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ตอบกลับสำเร็จ!', life: 3000 });
        this.resetForm()
        this.isPost = true
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async deleteComment(id) {
      console.log(id)
      try {
        await axios.delete(`http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/comment/deleteComment/${id}`)
        this.$toast.add({ severity: 'warn', summary: 'สำเร็จ', detail: 'ลบคอมเมนต์สำเร็จ!', life: 3000 });
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async exitCourse(id) {
      console.log(id)
      try {
        await axios.post(`http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/enrollment/exitCourse`, {
          courseId: this.id,
          userId: this.user.id
        })
        this.$toast.add({ severity: 'warn', summary: 'สำเร็จ', detail: 'ลบคอมเมนต์สำเร็จ!', life: 3000 });
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async getCourse() {
      try {
        const res = await axios.get('http://ec2-3-89-104-54.compute-1.amazonaws.com:8080/api/course/getCourse/:id', {
          params: {
            id: this.id
          }
        })
        this.authorId = res.data.owners[0].user.id
        this.listAssignment = res.data.assignments ? res.data.assignments : []
        this.listLecture = res.data.lectures ? res.data.lectures : []
        this.course = Object(res.data)
        this.listPost = Object(res.data.posts)
        this.member = this.course.enrollments.length
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
  top: -5rem;
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

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'อัพโหลดไฟล์';
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid rgb(211, 211, 211);
  border-radius: 6px;
  padding: 8px 16px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}

.custom-file-input:hover::before {
  border-color: #14b8a6;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

.file-container {
  color: #000;
  background-color: whitesmoke;
  border-radius: 8px;
  padding: 8px 16px;
}

.file-container:hover {
  color: #14b8a6;
  border: #14b8a6 solid 1px;
}
</style>
