<template>
  <div class="content">
  <i class="fa-sharp fa-solid fa-arrow-up" @click="$emit('Up')"></i>
  <i class="fa-sharp fa-solid fa-arrow-down" @click="$emit('Down')"></i>
  </div>
</template>

<script>
export default {
  name: "ArrowUpDown"
}
</script>

<style scoped>
.content{
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
}
</style>