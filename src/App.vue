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
    <h2>Slot Test</h2>
    <TestInSlot>
      <template #default>
        <MarkdownBlock>
          ## Hello

          - This is working
          - This is a bullet

          This is a paragraph with a [link in it](https://www.google.com) and some text
          after it too. Maybe another sentence.

          <TestComponent/>
        </MarkdownBlock>
      </template>
      <template #namedSlot>
        <MarkdownBlock>
          <span class="color-accent">Some Text</span> lorem ipsum et depsi anu dolor et asi. Lorem ipsum et depsi anu dolor et asi.
        </MarkdownBlock>
      </template>
    </TestInSlot>
    <h2>Slot Test (without named)</h2>
    <TestInSlot>
      <MarkdownBlock>
        ## Hello

        - This is working
        - This is a bullet

        This is a paragraph with a [link in it](https://www.google.com) and some text
        after it too. Maybe another sentence.

        <TestComponent/>
      </MarkdownBlock>
    </TestInSlot>
    <h2>Inline test</h2>
    <p>
      <MarkdownInline>This title has *Wow*</MarkdownInline>
    </p>
    <h2>Using custom element name test</h2>
    <MdBlock>
      ## Hello

      - This is working
      - This is a bullet
    </MdBlock>
    <p>
      <MdInline>
        This *is* inline ok
      </MdInline>
    </p>
    <h2>Test in Markdown File</h2>
    <TestInMarkdown/>
  </div>
</template>

<script setup>
  import TestComponent from "./TestComponent.vue";
  import TestInSlot from "./TestInSlot.vue";
  import TestInMarkdown from "./TestInMarkdown.md";
</script>
