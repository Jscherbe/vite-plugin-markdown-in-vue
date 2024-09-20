<template>
  <div class="slot-test">
    <div class="default-slot" v-if="$slots.default">
      <slot/>
    </div>
    <div class="named-slot" v-if="$slots.namedSlot">
      <slot name="namedSlot"/>
    </div>
  </div>
</template>