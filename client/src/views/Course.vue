<template>
  <div class="card fadein animation-duration-200">
    <div class="flex justify-content-end">
      <Button label="Create New" icon="pi pi-plus" size="small"></Button>
    </div>
    <div class="flex nodata align-items-center mt-4">
      <div v-if="listCourses.length" class="flex flex-column align-items-center w-full">
        <i class="pi pi-exclamation-circle text-300 text-7xl"></i>
        <span class="mt-4 text-xl text-400">คุณยังไม่มีงานที่ได้รับมอบหมาย</span>
      </div>
      <div v-else class="grid">
        <div class="card">

        </div>
      </div>
    </div>
  </div>
</template>

<style setup>
.nodata {
  height: calc(100vh - 21rem);
}
</style>

<script>
export default {
  data() {
    return {
      listCourses: [],
      listEstimate: []
    }
  }
}
</script>