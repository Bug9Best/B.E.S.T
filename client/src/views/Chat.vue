<script>
export default {
    data() {
        return {
            searchValue: '',
            messageValue: '',
        }
    },
    methods: {
        onSearch() {
            console.log(this.searchValue)
        },
        reload() {
            this.$forceUpdate();
        }
    }
}
</script>

<template>
    <div class="grid-gap fadein animation-duration-200 -mb-5">
        <div class="card layouts">
            <div class="-mt-3 mb-3">
                <p class="font-bold text-900">แชท</p>
            </div>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText type="text" v-model="searchValue" placeholder="ค้นหารายชื่อ"
                    class="p-inputtext-sm border-round-xl border-300" style="width: 240px;" />
            </span>
        </div>
        <div class="card layouts flex flex-column">
            <div style="height: 100vh;"></div>
            <div class="flex align-items-center -mb-3 -mx-3">
                <div class="flex-grow-1">
                    <InputText type="text" v-model="messageValue" placeholder="พิมพ์ข้อความ"
                        class="p-inputtext-sm border-round-xl border-300 w-full" />
                </div>
                <div class="ml-2">
                    <Button icon="pi pi-send" class="p-button-rounded p-button-text p-button-plain" />
                            <Button @click="chooseCallback()" icon="pi pi-paperclip"
                                class="p-button-rounded p-button-text p-button-plain" />
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