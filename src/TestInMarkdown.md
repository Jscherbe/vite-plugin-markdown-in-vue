---
title: Title of file
---

This is a vue markdown file

<TestInSlot>
  <MarkdownBlock>
    ## Test in default slot

    - This is working
    - This is a bullet

    This is a paragraph with a [link in it](https://www.google.com) and some text
    after it too. Maybe another sentence.
  </MarkdownBlock>

  <p>
    <MarkdownInline>
      This *is* inline
    </MarkdownInline>
  </p>
</TestInSlot>

<TestInSlot>
  <template #namedSlot>
    <MarkdownBlock>
      ## Test in named slot

      - This is working
      - This is a bullet

      This is a paragraph with a [link in it](https://www.google.com) and some text
      after it too. Maybe another sentence.

      ```js
        // This is code block
      ```
    </MarkdownBlock>

    <p>
      <MarkdownInline>This *is* inline</MarkdownInline>
    </p>
  </template>
</TestInSlot>

<script setup>
  import TestInSlot from "./TestInSlot.vue";
</script>