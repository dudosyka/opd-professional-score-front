<template>
  <label class="container">
    <input v-model="checkboxValue" type="checkbox">
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      checkboxValue: false,
    }
  },
  created() {
    this.checkboxValue = this.value;
  },
  methods: {
    changed(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
.container {
  display: block;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  cursor: pointer;
  width: 2rem;
  height: 2rem;

}

.checkmark {
  top: 0;
  left: 0;
  background-color: rgba(223, 237, 250, 0.94);
  transition-duration: .2s;
  border-radius: 5px;
}

.container:hover input ~ .checkmark {
  background-color: #3F55B1;
}

.container input:checked ~ .checkmark {
  background-color: #3F55B1;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>