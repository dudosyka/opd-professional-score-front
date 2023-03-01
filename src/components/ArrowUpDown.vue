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
  flex-direction: row;
  font-size: 1.5rem;
  justify-content: space-evenly;
  padding: 1rem;
}
i {
  padding: .5rem;
  border: 1px solid black;
  border-radius: .3rem;
  transition-duration: .3s;
}
i:hover {
  background-color: #3F55B1;
  color: white;
}
</style>