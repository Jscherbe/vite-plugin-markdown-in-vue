

<template>
  <div>
    <h1>Tests</h1>
    <h2>Markdown block below</h2>
    <MarkdownBlock>
      ## Hello

      - This is working
      - This is a bullet

      This is a paragraph with a [link in it](https://www.google.com) and some text
      after it too. Maybe another sentence.

      <TestComponent/>
    </MarkdownBlock>
    <h2>
      <MarkdownInline>
        This title has *Wow*
      </MarkdownInline>
    </h2>
    <TestComponent/>
  </div>
</template>

<script setup>
  import TestComponent from "./TestComponent.vue";
  console.log("Hello World");
</script>
