<template>
  <div class="card fadein animation-duration-200">
    <div class="flex justify-content-end mb-4">
      <Button v-show="!isStudent" @click="visible = true" label="เพิ่มคอร์ส" icon="pi pi-plus" size="small">
      </Button>
      <Dialog modal header="เพิ่มคอร์สเรียน" :visible="visible" @update:visible="handleClose" :style="{ width: '50vw' }">
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid mt-4">
          <div class="grid mt-2">
            <div class="col-3">
              <label for="code" class="text-lg">รหัสวิชา</label>
            </div>
            <div class="col-9">
              <InputText id="code" v-model="formData.code" class="w-full" :class="{ 'p-invalid': v$.formData.code.$invalid && submitted }"/>
              <small v-if="(v$.formData.code.$invalid && submitted) || v$.formData.code.$pending.$response"
                class="p-error px-1">{{ v$.formData.code.required.$message.replace('Value', 'รหัสรายวิชา').replace('is required', 'จำเป็นต้องกรอก') }}
              </small>
            </div>
          </div>

          <div class="grid">
            <div class="col-3">
              <label for="term" class="text-lg">ภาคเรียน/ปีการศึกษา</label>
            </div>
            <div class="col-9">
              <InputText id="term" v-model="formData.term" class="w-full" :class="{ 'p-invalid': v$.formData.term.$invalid && submitted }"/>
              <small v-if="(v$.formData.term.$invalid && submitted) || v$.formData.term.$pending.$response"
                class="p-error px-1">{{ v$.formData.term.required.$message.replace('Value', 'ภาคเรียน/ปีการศึกษา').replace('is required', 'จำเป็นต้องกรอก') }}
              </small>
            </div>
          </div>

          <div class="grid">
            <div class="col-3">
              <label for="title" class="text-lg">ชื่อรายวิชา</label>
            </div>
            <div class="col-9">
              <InputText id="title" v-model="formData.title" class="w-full" :class="{ 'p-invalid': v$.formData.title.$invalid && submitted }"/>
              <small v-if="(v$.formData.title.$invalid && submitted) || v$.formData.title.$pending.$response"
                class="p-error px-1">{{ v$.formData.title.required.$message.replace('Value', 'ชื่อรายวิชา').replace('is required', 'จำเป็นต้องกรอก') }}
              </small>
            </div>
          </div>

          <div class="grid">
            <div class="col-3">
              <label for="description" class="text-lg">รายละเอียดวิชา</label>
            </div>
            <div class="col-9">
              <InputTextarea id="description" rows="5" v-model="formData.description" class="w-full">
              </InputTextarea>
            </div>
          </div>

          <div class="grid">
            <div class="col-9 col-offset-3">
              <Button type="submit" label="สร้างคอร์ส" icon="pi pi-save" size="small">
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
    <div v-if="listCourses.length" class="grid">
      <div class="col-4" v-for="item in Course" :key="item.id">
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
            <Button label="เข้าร่วม" class="p-3 w-full mt-auto" @click="enroll(item.id)"></Button>
          </div>
        </div>
      </div>
      <ConfirmDialog></ConfirmDialog>
    </div>
    <div v-else class="flex flex-column nodata align-items-center justify-content-center">
      <i class="pi pi-exclamation-circle text-300 text-7xl"></i>
      <span class="mt-4 text-xl text-400">ยังไม่มีคอร์สในขณะนี้</span>
    </div>
  </div>
  <Toast position="bottom-right" />
</template>

<style setup>
.nodata {
  height: calc(100vh - 21rem);
}
</style>

<script>
import axios from 'axios'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      formData: {
        code: '',
        title: '',
        term: '',
        description: '',
        owner: null
      },
      listCourses: [],
      listEstimate: [],
      isStudent: true,
      visible: false,
      user: null,
      submitted: false,
      showMessage: false
    }
  },
  validations() {
    return {
      formData: {
        code: { required },
        title: { required },
        term: { required },
      }
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user.role == 'Student') {
      this.isStudent = true
    } else {
      this.isStudent = false
    }
  },
  mounted() {
    this.getCourse()
    this.getEnroll()
    this.formData.owner = this.user.id
  },

  computed: {
    Course() {
      return this.listCourses.filter(
        (course) => this.listEstimate.find((enroll) => enroll.courseId === course.id) === undefined
      )
    }
  },

  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true
      if (!isFormValid) {
        return
      }
      this.toggleDialog()
      this.createCourse()
    },

    toggleDialog() {
      this.showMessage = !this.showMessage

      if (!this.showMessage) {
        this.resetForm()
      }
    },

    handleClose(value) {
      this.visible = value
    },

    resetForm() {
      this.formData = {
        code: '',
        title: '',
        term: '',
        description: ''
      }
    },

    enroll(id) {
      this.$confirm.require({
        message: 'คุณต้องการที่จะเข้าร่วมคอร์สเรียนนี้ใช่หรือไม่?',
        header: 'ยืนยัน',
        acceptLabel: 'ยืนยัน',
        rejectLabel: 'ยกเลิก',
        accept: async () => {
          try {
            const res = await axios.post('http://localhost:8080/api/enrollment/createEnroll', {
              courseId: id,
              userId: this.user.id
            })
            this.$toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เข้าร่วมคอร์สเรียนสำเร็จ!', life: 3000 });
            this.getEnroll()
          } catch (error) {
            console.log(error)
            this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
          }
        }
      })
    },

    async createCourse() {
      try {
        const res = await axios.post('http://localhost:8080/api/course/createCourse', this.formData)
        this.visible = false
        this.$toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มคอร์สเรียนสำเร็จ!', life: 3000 });
        this.resetForm()
        this.getCourse()
      } catch (error) {
        console.log(error)
        this.$toast.add({ severity: 'error', summary: 'ล้มเหลว', detail: error.message, life: 3000 });
      }
    },

    async getEnroll() {
      try {
        const res = await axios.get('http://localhost:8080/api/enrollment/getEnroll',
          {
            params: {
              id: this.user.id
            }
          })
        this.listEstimate = res.data
        localStorage.setItem('myCourse', JSON.stringify(this.listEstimate))
      } catch (error) {
        console.log(error)
      }
    },

    async getCourse() {
      try {
        const res = await axios.get('http://localhost:8080/api/course/getCourse')
        this.listCourses = res.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>