
<template>
  <!-- chrome -->
  <input
    v-if="!firefox"
    :name="name"
    type="text"
    v-model="value"
    @keypress="$emit('keypress', $event)"
    @mousedown="slideInit($event); focus = true"
    :tabindex="tabindex">
  <div
    v-if="!firefox && focus"
    class="background"
    @mouseup="focus = false; $emit('slideend')"
    @mouseleave="focus = false; $emit('slideend')"
    @mouseout="focus = false; $emit('slideend')"
    @mousemove="slide"></div>
  
  <!-- firefox -->
  <input
    v-if="firefox"
    :name="name"
    type="text"
    v-model="value"
    @keypress="$emit('keypress', $event)"
    @mousedown="slideInit($event); focus = true"
    @mouseup="focus = false; $emit('slideend')"
    @mousemove="slide"
    :tabindex="tabindex">
</template>

<script>
export default {
  props: ['name', 'modelValue', 'tabindex'],
  emits: ['update:modelValue', 'keypress', 'slideend'],
  data() {
    return {
      focus: false,
      firefox: false,
    }
  },
  methods: {
    slideInit(event) {
      const intValue = (this.value ? parseInt(this.value) : 1) || 1
      this.slideData = {
        originX: event.pageX,
        originY: event.pageY,
        initValue: intValue,
        floatValue: intValue,
        input: event.target,
        deltaValueAverage: 0,
      }
    },
    slide(event) {
      if(this.focus) {
        if(Math.abs(this.slideData.originX - event.pageX) > 5 || Math.abs(this.slideData.originY - event.pageY) > 5) {
          this.slideData.input.blur();
        }
  
        // slide formula
        const deltaValue = (event.pageX - this.slideData.originX) / 10 + this.slideData.initValue - this.slideData.floatValue;
        if(deltaValue > 20) {
          focus = false;
          $emit('slideend');
          return null
        }
        
        this.slideData.deltaValueAverage = (this.slideData.deltaValueAverage * 4 + deltaValue) / 5;
        const newValue = this.slideData.floatValue + this.slideData.deltaValueAverage;
  
        if(newValue >= 1) {
          this.slideData.floatValue = newValue;
          this.value = Math.floor(newValue)
        }
        else {
          this.slideData.floatValue = 1;
          this.value = 1
          this.slideData.initValue = 1;
          this.slideData.originX = event.pageX;
        }
      }
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
  },
  mounted() {
    try {
      this.firefox = navigator.userAgent.search(/Firefox/g) !== -1
    } catch {}
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/var';

input {
  position: relative;
  display: inline;
  width: max-content;
  font-size: 20px;
  font-family: $font;
  background: transparent;
  border: none;
  border-bottom: solid 1px $color-black;
  outline: none;
  width: 50px;
  padding: 0 3px;
  cursor: e-resize;

  &:focus {
    border-bottom: solid 2px $color-black;
  }
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: all;
  cursor: e-resize;
}
</style>