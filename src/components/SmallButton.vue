<template>
  <button class="btn btn-primary cool">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "SmallButton"
}
</script>

<style scoped>
.cool{
  font-size: 1rem;
  cursor: pointer;
}
</style>