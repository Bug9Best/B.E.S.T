<script>
import axios from 'axios'
import io from 'socket.io-client'
export default {
  data() {
    return {
      searchValue: '',
      messageValue: '',
      rooms: [],
      messages: [],
      userId: null,
      chooseRoomId: null
    }
  },
  created() {
    if (!this.userId) {
      this.userId = JSON.parse(localStorage.getItem('user')).id
    }
  },
  mounted() {
    this.getRoomChat()
    io('http://localhost:4000')
      .on('sendMessage', () => {
        this.getMessage(this.chooseRoomId)
      })
      .on('createChat', () => {
        this.getRoomChat()
      })
  },
  methods: {
    onSearch() {
      console.log(this.searchValue)
    },
    reload() {
      this.$forceUpdate()
    },
    async getRoomChat() {
      try {
        const res = await axios.get(`http://localhost:8080/api/user/chat/${this.userId}`)
        this.rooms = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async getMessage(chatId) {
      try {
        const res = await axios.get(`http://localhost:8080/api/chat/message/${chatId}`)
        this.messages = res.data
        this.chooseRoomId = chatId
      } catch (error) {
        console.log(error)
      }
    },
    async sendMessage() {
      try {
        await axios.post(`http://localhost:8080/api/chat/message`, {
          message: this.messageValue,
          chatId: this.chooseRoomId,
          userId: this.userId
        })
        this.messageValue = ''
        this.getMessage(this.chooseRoomId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div class="flex grid-gap fadein animation-duration-200 -mb-5">
    <div class="card layouts">
      <div class="-mt-3 mb-3">
        <p class="font-bold text-900">แชท</p>
      </div>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          type="text"
          v-model="searchValue"
          placeholder="ค้นหารายชื่อ"
          class="p-inputtext-sm border-round-xl border-300"
          style="width: 240px"
        />
      </span>
      <div class="w-full flex flex-column row-gap-2 mt-3">
        <div
          class="w-full p-2 border-round-xl border-1 border-300 cursor-pointer"
          @click="getMessage(room.id)"
          v-for="room in rooms"
          :key="room.id"
        >
          {{ room?.sender?.fullname || room?.receive?.fullname }}
        </div>
      </div>
    </div>
    <div class="card layouts flex flex-column flex-grow-1" v-if="chooseRoomId">
      <div style="height: 100vh" class="overflow-y-scroll flex flex-column gap-y-2">
        <div v-for="message in messages" :key="message.id">
          <div
            class="w-full border-round border-1 border-300 p-2"
            :class="message.userId == userId ? 'text-right' : ' text-left'"
          >
            <div class="font-medium">
              {{ message.user.fullname }}
            </div>
            <div class="">
              {{ message.content }}
            </div>
            <div class="">
              {{ new Date(message.createdAt).toLocaleTimeString('th').slice(0, 5) }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex align-items-center -mb-3 -mx-3">
        <div class="flex-grow-1">
          <InputText
            type="text"
            v-model="messageValue"
            placeholder="พิมพ์ข้อความ"
            class="p-inputtext-sm border-round-xl border-300 w-full"
          />
        </div>
        <div class="ml-2">
          <Button
            @click="sendMessage"
            icon="pi pi-send"
            class="p-button-rounded p-button-text p-button-plain"
          />
          <Button
            @click="chooseCallback()"
            icon="pi pi-paperclip"
            class="p-button-rounded p-button-text p-button-plain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style setup>
.layouts {
  height: calc(100vh - 12rem);
}

.grid-gap {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 0;
}
</style>
