<template>
    <div class="card layouts fadein animation-duration-200">
        <h5>asdas</h5>
        <TabView>
            <TabPanel>
                <template #header>
                    <i class="pi pi-book mr-2"></i>
                    <span>Lectures</span>
                </template>
                <div class="card  shadow-1 p-3">
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
                <div class="card  shadow-1 p-3">
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
                <div class="card  shadow-1 p-3">
                    <p class="font-bold">Forum 1</p>
                </div>
                <div class="flotbutton">
                    <Button label="Create New" icon="pi pi-pencil" @click="addForum()" />
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
                        <div class="col-4" v-for="item in Course.enrollments">
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
                        <p>{{ Course.code }}</p>
                    </div>
                    <div class="flex">
                        <p class="font-bold mr-3">ชื่อรายวิชา</p>
                        <p>{{ Course.title }}</p>
                    </div>
                    <div class="flex" v-for="item, index in Course.owners">
                        <p v-if="index === 0" class="font-bold mr-3">อาจารย์ผู้สอน</p>
                        <p v-else class="font-bold ml-7"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                        <p>{{ item.user.fullname }}</p>
                    </div>
                    <div class="inline">
                        <span>
                            <p class="font-bold ">รายละเอียดวิชา</p>
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
import Course from "../public/json/course.json";
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
            Course: {},
            member: 0
        };
    },
    mounted() {
        this.getCourse();
    },

    watch: {
        id: function () {
            this.getCourse();
        }
    },
    methods: {
        addBlog() {
            console.log("add blog");
        },
        addAssignment() {
            console.log("add assignment");
        },
        addForum() {
            console.log("add forum");
        },
        async getCourse() {
            try {
                const res = await axios.get('http://localhost:8080/api/course/getCourse/:id', {
                    params: {
                        id: this.id
                    }
                })
                this.Course = Object(res.data)
                this.member = this.Course.enrollments.length
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
};
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
</style>