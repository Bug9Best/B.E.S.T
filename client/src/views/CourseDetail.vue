<template>
    <div class="card layouts fadein animation-duration-200">
        <h5>{{ this.Course.title }}</h5>
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
                    <Button label="Create New" icon="pi pi-pencil" @click="addBlog()"/>
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
                    <Button label="Create New" icon="pi pi-pencil" @click="addAssignment()"/>
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
                    <Button label="Create New" icon="pi pi-pencil" @click="addForum()"/>
                </div>
            </TabPanel>


            <TabPanel>
                <template #header>
                    <i class="pi pi-users mr-2"></i>
                    <span>Members</span>
                </template>
                <div class="flex justify-content-between align-items-center">
                    <p class="font-bold ml-1">100 members applied</p>
                    <div class="col-12 md:col-4 p-0 mb-3">
                        <div class="p-inputgroup">
                            <InputText placeholder="Keyword" />
                            <Button icon="pi pi-search" class="p-button-primary" />
                        </div>
                    </div>
                </div>
                <ScrollPanel style="width: 100%; height: 460px">
                    <div class="grid overflow-hidden">
                        <div class="col-4" v-for="i in 100">
                            <div class="card  shadow-1 p-3">
                                <p class="font-bold">Topic {{ i }}</p>
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
                <div class="flex">
                    <p class="font-bold mr-3">รหัสรายวิชา</p>
                    <p>{{ this.Course.courseNo }}</p>
                </div>
                <div class="flex">
                    <p class="font-bold mr-3">ชื่อรายวิชา</p>
                    <p>{{ this.Course.title }}</p>
                </div>
                <div class="flex" v-for="item, index in Course.publisher">
                    <p v-if="index === 0" class="font-bold mr-3">อาจารย์ผู้สอน</p>
                    <p v-else class="font-bold ml-7"> &nbsp;&nbsp;&nbsp;&nbsp; </p>
                    <p>{{ item.name }} </p>
                </div>
                <div class="inline">
                    <span>
                    <p class="font-bold ">รายละเอียดวิชา</p>
                    </span>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, sequi! Expedita, animi. Saepe iusto doloremque illo nobis incidunt earum omnis. At dolor quasi dignissimos assumenda doloremque quis temporibus voluptatem ab.</p>
                </div>
            </TabPanel>
        </TabView>
    </div>
</template>

<script>
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
            Course: {}
        };
    },
    mounted() {
        this.Course = Course.find(course => course.id == this.id);
    },
    watch: {
        id: function () {
            this.Course = Course.find(course => course.id == this.id);
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