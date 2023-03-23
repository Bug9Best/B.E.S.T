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
            <div class="p-field">
                <p class="font-bold"> Description </p>
                <p>-</p>
            </div>
            <div class="grid">
                <div class="col">
                    <p class="font-bold">Start</p>
                    <i class="pi pi-clock mr-2"></i>
                    {{ startDate }}
                </div>
                <div class="col">
                    <p class="font-bold">End</p>
                    <i class="pi pi-clock mr-2"></i>
                    {{ endDate }}
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Close" icon="pi pi-times" class="p-button-text" @click="displayDetail = false" />
        </template>
    </Dialog>
</template>

<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './utils/event-utils'

export default defineComponent({
    components: {
        FullCalendar,
    },
    data() {
        return {
            title: '',
            startDate: '',
            endDate: '',
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
                eventsSet: this.handleEvents
                /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
            },
            currentEvents: [],
        }
    },
    methods: {
        handleWeekendsToggle() {
            this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
        },
        handleDateSelect(selectInfo) {
            let title = prompt('Please enter a new title for your event')
            let calendarApi = selectInfo.view.calendar
            calendarApi.unselect() // clear date selection
            if (title) {
                calendarApi.addEvent({
                    id: createEventId(),
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay
                })
            }
        },
        handleEventClick(clickInfo) {
            let start = clickInfo.event.startStr
            let end = clickInfo.event.endStr
            this.displayDetail = true;
            this.title = clickInfo.event.title;
            this.startDate = start.slice(8, 10) + '-' + start.slice(5, 7) + '-' + start.slice(0, 4);
            this.endDate = end.slice(8, 10) + '-' + end.slice(5, 7) + '-' + end.slice(0, 4);
            console.log(clickInfo.event)
            // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            //     clickInfo.event.remove()
            // }
        },
        handleEvents(events) {
            this.currentEvents = events
        },
    }
})
</script>

<!-- <template>
    <div>
        
    </div>
</template> -->