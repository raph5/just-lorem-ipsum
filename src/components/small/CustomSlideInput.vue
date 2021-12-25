
<template>
  <input
    :name="name"
    type="text"
    v-model="intValue"
    @keypress="$emit('keypress', $event)"
    @mousedown="slideInit($event); focus = true">
  <div
    class="background"
    v-if="focus"
    @mouseup="focus = false"
    @mousemove="slide"></div>
</template>

<script>
export default {
  props: ['name', 'modelValue'],
  emits: ['update:modelValue', 'keypress'],
  data() {
    return {
      focus: false,
    }
  },
  methods: {
    slideInit(event) {
      console.log(this.value)
      this.slideData = {
        originX: event.pageX,
        originY: event.pageY,
        value: this.value,
        input: event.target,
        deltaValueAverage: 0,
      }
    },
    slide(event) {
      if(Math.abs(this.slideData.originX - event.pageX) > 5 || Math.abs(this.slideData.originY - event.pageY) > 5) {
        this.slideData.input.blur();
      }

      // slide formula
      const deltaValue = (event.pageX - this.slideData.originX) / 10 + this.slideData.value - this.value;
      this.slideData.deltaValueAverage = (this.slideData.deltaValueAverage * 4 + deltaValue) / 5;
      const newValue = this.value + this.slideData.deltaValueAverage;

      if(newValue >= 0) {
        this.value = newValue;
      }
      else {
        this.value = 0;
        this.slideData.value = 0;
        this.slideData.originX = event.pageX;
      }
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', parseInt(value))
      }
    },
    intValue: {
      get() {
        return Math.floor(this.value)
      },
      set(value) {
        this.value = value
      }
    }
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