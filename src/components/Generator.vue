
<template>
  <div class="generator">
    <label class="generator__word-count" for="wordCount">
      <span>word count :</span>
      <CustomSlideInput tabindex="11" @keypress.enter="generate($event); copy()" v-model="wordCount" @slideend="generate" />
    </label>
    <button tabindex="12" class="generator__generate" @click="generate($event); copy()">generate</button>
    <div class="generator__output">
      <div class="generator__output__area">
        <div class="generator__output__area__text">{{ text }}</div>
        <div class="generator__output__area__bottum">
          <button @click="copy()" tabindex="13">
            copy
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path ref="copyContentLine" d="M19 3H7C5.9 3 5 3.9 5 5V19H7V5H19V3Z" fill="white"/>
              <path ref="copyContentRectangle" d="M22 7H11C9.9 7 9 7.9 9 9V23C9 24.1 9.9 25 11 25H22C23.1 25 24 24.1 24 23V9C24 7.9 23.1 7 22 7ZM22 23H11V9H22V23Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="generator__output__border"></div>
    </div>
  </div>
</template>

<script>
import emitter from 'tiny-emitter/instance'

import CustomSlideInput from './small/CustomSlideInput.vue'
import loremipsum from '../lib/loremipsum.js'

export default {
  components: { CustomSlideInput },
  data() {
    return {
      wordCount: 19,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }
  },
  methods: {
    generate() {
      const wordCount = (this.wordCount ? parseInt(this.wordCount) : 1) || 19;
      if(wordCount !== 0) {
        this.text = (loremipsum + '\n').repeat(Math.floor(wordCount / this.wordsIndex.maxIndex)) + loremipsum.substr(0, this.wordsIndex[wordCount % this.wordsIndex.maxIndex]);
      }
      else {
        this.text = '';
      }
    },
    copy() {
      this.$refs['copyContentLine'].animate([
        { transform: 'translate(0, 0)' },
        { transform: 'translate(-1px, -1px)' },
        { transform: 'translate(1px, 1px)' },
        { transform: 'translate(0, 0)' },
      ], {
        duration: 200,
      });
      this.$refs['copyContentRectangle'].animate([
        { transform: 'translate(0, 0)' },
        { transform: 'translate(1px, 1px)' },
        { transform: 'translate(0, 0)' },
        { transform: 'translate(0, 0)' },
      ], {
        duration: 200,
      });
      navigator.clipboard.writeText(this.text);
      setTimeout(() => {
        emitter.emit('pushNotification', 'copied to clipboard');
      }, 100);
    },
  },
  created() {
    const wordsIndex = {};
    let maxWordsIndex = 0;
    for(let i=0; i<loremipsum.length; i++) {
      if(loremipsum[i] === ' ' || loremipsum[i] === '\n') {
        wordsIndex[++maxWordsIndex] = i;
      }
    }
    wordsIndex.maxIndex = maxWordsIndex;
    this.wordsIndex = wordsIndex;
  },
}
</script>

<style lang="scss">
@import '../scss/var';

.generator {
  font-size: 16px;
  box-shadow: 6px 6px 0px #000000;
  background: $color-white;
  border-radius: 10px;
  width: 100%;
  min-width: 600px;
  max-width: 1000px;
  height: 100%;
  box-sizing: border-box;
  padding: 30px;
  display: grid;
  row-gap: 20px;
  grid-template-rows: max-content auto;
  grid-template-areas: "word-count generate"
                       "output output";

  &__word-count {
    grid-area: word-count;
    font-size: 1.25em;
    padding-top: 4px;
    width: max-content;
    
    span {
      margin-right: 8px;
    }
  }
  .generator__generate {
    grid-area: generate;
    padding: 10px 40px;
    width: max-content;
    justify-self: right;
    transition: transform 100ms;

    &:active {
      transform: scale(97%);
    }
  }
  .generator__output {
    grid-area: output;
    border-radius: 8px;
    position: relative;
    overflow: hidden;

    &__border {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: solid 2px $color-black;
      border-radius: 8px;
    }

    &__area {
      position: relative;
      z-index: 2;
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
      display: flex;
      flex-direction: column;

      &__text {
        padding: 10px;
        text-align: justify;
        white-space: pre-line;
      }
      &__bottum {
        margin: auto 0 0 2px;
        position: sticky;
        z-index: 3;
        bottom: 2px;
        border-radius: 0 0 6px 6px;
        background: linear-gradient(transparent, $color-white);
        display: flex;

        button {
          border-radius: 8px 0 0 0;
          padding: 8px 18px 8px 25px;
          margin-left: auto;
          display: flex;
          column-gap: 15px;
          align-self: center;
        }
      }
    }
  }
  button {
    background: $color-black;
    color: $color-white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-family: $font;
    font-size: 1.25em;
    padding: 10px 20px;
    cursor: pointer;
    outline: none;
  }
  
  @media (max-width: 1150px) {
    min-height: 400px;
  }

  @media (max-width: 700px) {
    border-radius: 0;
    box-shadow: none;
    min-width: unset;
    font-size: 15px;
  }
}
</style>