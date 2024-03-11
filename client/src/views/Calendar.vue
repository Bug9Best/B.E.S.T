<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card fadein animation-duration-200">
        <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
            <template v-slot:eventContent='arg'>
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
            </template>
        </FullCalendar>
    </div>

    <Dialog :header="title" v-model:visible="displayDetail" :style="{ width: '30vw' }" :modal="true">
        <div class="p-fluid">
            <div class="p-field mb-4">
                <div class="font-bold mb-1 text-lg"> รายละเอียด </div>
                <div>{{ description }}</div>
            </div>
            <div class="grid">
                <div class="col">
                    <p class="font-bold">เริ่ม</p>
                    <i class="pi pi-clock mr-2"></i>
                    {{ startDate }}
                </div>
                <div class="col">
                    <p class="font-bold">จบ</p>
                    <i class="pi pi-clock mr-2"></i>
                    {{ dueDate || '-' }}
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Close" icon="pi pi-times" class="p-button-text" @click="displayDetail = false" />
        </template>
    </Dialog>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './utils/event-utils'

export default defineComponent({
    components: {
        FullCalendar,
    },
    data() {
        return {
            title: '',
            description: '',
            startDate: '',
            dueDate: '',

            displayAdd: false,
            displayDetail: false,
            calendarOptions: {
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin // needed for dateClick
                ],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                initialView: 'dayGridMonth',
                initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                select: this.handleDateSelect,
                eventClick: this.handleEventClick,
                eventsSet: this.handleEvents,
                locales: [
                    {
                        code: 'th',
                        buttonText: {
                            prev: 'ก่อนหน้า',
                            next: 'ถัดไป',
                            today: 'วันนี้',
                            month: 'เดือน',
                            week: 'สัปดาห์',
                            day: 'วัน',
                            list: 'แผนงาน',
                        },
                        weekText: 'สัปดาห์',
                        allDayText: 'ตลอดวัน',
                        moreLinkText: 'เพิ่มเติม',
                        noEventsText: 'ไม่มีกิจกรรม',
                    },
                ],

            },
            currentEvents: [],
        }
    },
    mounted() {
        this.getAssignment()
    },
    methods: {
        handleEventClick(clickInfo) {
            let start = clickInfo.event.startStr
            let end = clickInfo.event.endStr
            this.displayDetail = true;
            this.title = clickInfo.event.title;
            this.description = clickInfo.event.extendedProps["description"];
            this.startDate = start.slice(8, 10) + '-' + start.slice(5, 7) + '-' + start.slice(0, 4);
            this.dueDate = end.slice(8, 10) + '-' + end.slice(5, 7) + '-' + end.slice(0, 4);
            console.log(clickInfo.event)
        },
        handleEvents(events) {
            this.currentEvents = events
        },

        async getAssignment() {
            try {
                const res = await axios.get("http://ec2-34-226-200-25.compute-1.amazonaws.com:8080/api/assignment/getAssignment")
                const data = res.data
                console.log(data)
                this.calendarOptions.events = data.map((item) => {
                    return {
                        id: item.id,
                        title: item.title,
                        start: item.createdAt,
                        end: item.dueDate,
                        description: item.description,
                        allDay: true,
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
    }
})
</script>