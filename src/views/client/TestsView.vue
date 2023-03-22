<template>
  <PassedTestListView :get-by-current="true"></PassedTestListView>
</template>

<script>
import PassedTestListView from "@/views/admin/test/PassedTestListView.vue";

export default {
  name: "TestsView",
  components: {PassedTestListView}
}
</script>

<style scoped>

</style>