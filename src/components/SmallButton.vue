<template>
  <button class="cool">
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
  background-color: #3F55B1;
  width: 10vw;
  height: 4vh;
  font-size: 1rem;
  color: #FFFFFF;
  font-family: Rubik;
  border-radius: 10px;
  border: #3F55B1 solid 3px;
  margin: 1rem;
  cursor: pointer;
}
</style>