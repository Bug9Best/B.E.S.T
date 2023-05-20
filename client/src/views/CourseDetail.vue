<template>
    <div class="card layouts fadein animation-duration-200">
        <h5>{{ course.title }}</h5>
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
                    <Button class="p-button-text" label="เพิ่มเอกสาร" icon="pi pi-plus" @click="addAssignment()" />
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
                    <Button class="p-button-text" label="สร้างการบ้าน" icon="pi pi-plus" @click="visible = true" />
                    <Dialog modal header="เพิ่มงานมอบหมาย" :visible="visible" @update:visible="handleClose"
                        :style="{ width: '50vw' }">
                        <div class="grid">
                            <div class="col-3">
                                <label for="title" class="text-lg">ชื่องานที่มอบหมาย</label>
                            </div>
                            <div class="col-9">
                                <InputText id="title" v-model="formData.title" class="w-full" />
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
                                <label for="description" class="text-lg">วันที่ครบกำหนด</label>
                            </div>
                            <div class="col-9">
                                <Calendar v-model="formData.dueDate" class="w-full" />
                            </div>
                        </div>

                        <div class="grid">
                            <div class="col-3">
                                <label for="description" class="text-lg">ไฟล์</label>
                            </div>
                            <div class="col-9">
                                <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*"
                                    :maxFileSize="1000000" @upload="onUpload" class="p-button-sm p-button-outlined" />
                            </div>
                        </div>

                        <div class="grid mt-2">
                            <div class="col-9 col-offset-3">
                                <Button @click="createAssignment" label="สร้างงานมอบหมาย" icon="pi pi-save" size="small">
                                </Button>
                            </div>
                        </div>
                    </Dialog>
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
                            {{ new Date(item.createdAt).toTimeString().substring(0, 8) }}</p>
                        <div class="flex justify-content-between align-items-start">
                            <p class="font-bold text-lg">{{ item.content }}</p>
                            <Button icon="pi pi-comment" class="p-button-text p-button-lg" @click="changeComment(item.id)">
                            </Button>
                        </div>
                        <div class="comment" v-for="comments in item.comments">
                            <hr>
                            <div class="text-sm">
                                {{ comments.author.fullname }} :
                                {{ new Date(comments.createdAt).toLocaleDateString() }}
                                {{ new Date(comments.createdAt).toTimeString().substring(0, 8) }}</div>
                            <div class="mt-2 font-bold">
                                {{ comments.content }}
                            </div>
                        </div>
                    </div>
                </ScrollPanel>
                <div v-if="isPost">
                    <hr>
                    <div class="flex w-full">
                        <InputText class="mr-2  w-full" v-model="centent" />
                        <Button label="โพสต์" icon="pi pi-send" @click="createPost()" class="p-buuton-text"
                            style="width: 100px;">
                        </Button>
                    </div>
                </div>
                <div v-else>
                    <hr>
                    <div class="flex w-full">
                        <InputText class="mr-2  w-full" v-model="centent" />
                        <Button label="แสดงความคิดเห็น" icon="pi pi-comment" @click="createComment()"
                            class="p-buuton-text mr-2" style="width: 250px;">
                        </Button>
                        <Button label="ยกเลิก" icon="pi pi-comment" @click="changePost()"
                            class="p-buuton-text p-button-danger" style="width: 150px;">
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
                        <div class="col-4" v-for="item in course.enrollments">
                            <div class="card shadow-1 p-3 flex justify-content-between align-items-center">
                                <p class="font-bold pt-3">{{ item.student.fullname }}</p>
                                <Button icon="pi pi-comments" class="p-button-primary p-button-text" />
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
                        <p class="font-bold  mr-3">รหัสรายวิชา</p>
                        <p>{{ course.code }}</p>
                    </div>
                    <div class="flex">
                        <p class="font-bold mr-3">ชื่อรายวิชา</p>
                        <p>{{ course.title }}</p>
                    </div>
                    <div class="flex" v-for="item, index in course.owners">
                        <p v-if="index === 0" class="font-bold mr-3">อาจารย์ผู้สอน</p>
                        <p v-else class="font-bold ml-7"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                        <p>{{ item.user.fullname }}</p>
                    </div>
                    <div class="inline">
                        <span>
                            <p class="font-bold ">รายละเอียดวิชา</p>
                        </span>
                        <p class="mt-2">{{ course.description }}</p>
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
    name: "CourseDetail",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            formData: {
                courseId: null,
                creatorId: null,
                title: null,
                description: null,
                dueDate: new Date(),
            },
            user: {},
            course: {},
            listPost: {},
            postId: null,
            centent: "",
            member: 0,
            isPost: true,
            visible: false,
        };

    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'))
        this.getCourse();
    },

    watch: {
        id: function () {
            this.getCourse();
        }
    },
    methods: {
        resetForm() {
            this.centent = '';
            this.postId = null;
        },

        changePost() {
            this.isPost = true;
            this.resetForm();
        },

        changeComment(id) {
            this.isPost = false;
            this.postId = id;
            this.content = "";
        },

        handleClose(value) {
            this.visible = value
        },

        addBlog() {
            console.log("add blog");
        },

        addAssignment() {
            console.log("add assignment");
        },

        async createChat() {
            try {
                const res = await axios.post('http://localhost:8080/api/chat/createChat', {
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

        async createAssignment() {
            try {
                const res = await axios.post('http://localhost:8080/api/post/createPost', {
                    courseId: this.id,
                    creatorId: this.user.id,
                    title: this.formData.title,
                    description: this.formData.description,
                    dueDate: this.formData.dueDate,
                })
                this.resetForm();
                this.getCourse();
            } catch (error) {
                console.log(error)
            }
        },

        async createPost() {
            try {
                const res = await axios.post('http://localhost:8080/api/post/createPost', {
                    courseId: this.id,
                    authorId: this.user.id,
                    content: this.centent,
                })
                this.resetForm();
                this.getCourse();
            } catch (error) {
                console.log(error)
            }
        },

        async createComment() {
            try {
                const res = await axios.post('http://localhost:8080/api/comment/createComment', {
                    postId: this.postId,
                    authorId: this.user.id,
                    content: this.centent,
                })
                this.resetForm();
                this.getCourse();
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
                this.course = Object(res.data)
                this.listPost = Object(res.data.posts)
                this.member = this.course.enrollments.length
                // console.log(res.data)
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
