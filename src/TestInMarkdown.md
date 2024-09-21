This is a vue markdown file

<TestInSlot>
  <MarkdownBlock>
    ## Hello

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

<script setup>
  import TestInSlot from "./TestInSlot.vue";
</script>