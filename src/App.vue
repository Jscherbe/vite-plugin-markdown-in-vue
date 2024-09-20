

<template>
  <div>
    <h1>Tests</h1>
    <h2>Markdown block below</h2>
    <MarkdownBlock>
      ## Hello

      - This is working
      - This is a bullet

      <TestComponent/>
    </MarkdownBlock>
    <h2>
      <MarkdownInline>
        This title has **Wow**
      </MarkdownInline>
    </h2>
    <TestComponent/>
  </div>
</template>

<script setup>
  import TestComponent from "./TestComponent.vue";
  console.log("Hello World");
</script>
