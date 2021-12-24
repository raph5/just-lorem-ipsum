
<template>
  <div class="generator">
    <label class="generator__word-count" for="wordCount">
      <span>word count :</span>
      <input name="wordCount" type="text" value="19" ref="wordCountInupt" @keypress.enter="generate">
    </label>
    <button class="generator__generate" @click="generate">generate</button>
    <div class="generator__output">
      <div class="generator__output__area">
        <div class="generator__output__area__text">{{ text }}</div>
        <div class="generator__output__area__bottum">
          <button @click="copy">
            copy
            <img src="/assets/content_copy_white_24dp.svg" alt="content copy">
          </button>
        </div>
      </div>
      <div class="generator__output__border"></div>
    </div>
  </div>
</template>

<script>
import loremipsum from '../lib/loremipsum.js';

export default {
  data() {
    return {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }
  },
  methods: {
    generate() {
      const wordCount = parseInt(this.$refs['wordCountInupt'].value);
      if(wordCount) {
        this.text = (loremipsum + '\n').repeat(Math.floor(wordCount / this.wordsIndex.maxIndex)) + loremipsum.substr(0, this.wordsIndex[wordCount % this.wordsIndex.maxIndex]);
      }
      else {
        this.text = loremipsum.substr(0, this.wordsIndex[19]);
      }
    },
    copy() {
      navigator.clipboard.writeText(this.text)
    }
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
    font-size: 20px;
    padding-top: 4px;

    input {
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
    span {
      margin-right: 8px;
    }
  }
  .generator__generate {
    grid-area: generate;
    padding: 10px 40px;
    width: max-content;
    justify-self: right;
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
          padding: 10px 20px 10px 25px;
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
    font-size: 20px;
    padding: 10px 20px;
    cursor: pointer;
  }
}
</style>