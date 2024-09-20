<template>
  <div class="test-component">
    <button @click="onClick">Click Me</button>
    <p v-if="clicked">Working</p>
  </div>
</template>

<script>
  export default {
    name: "TestComponent",
    data() {
      return {
        clicked: false
      }
    },
    methods: {
      onClick() {
        this.clicked = !this.clicked;
      }
    }
  };
</script>