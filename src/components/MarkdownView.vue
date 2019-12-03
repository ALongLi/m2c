<!--
 * @description: 
 * @Author: lal
 * @Date: 2019-12-03 10:56:03
 * @LastEditors: lal
 * @LastEditTime: 2019-12-03 14:58:07
 -->
<template>
  <div id="test" class="markdown-editor">
    <textarea
      id="editor"
      class="editor"
      :value="input"
      @input="update"
    ></textarea>
    <textarea
      id="preview"
      class="preview"
      readonly
      v-html="confluenceWiki"
    ></textarea>
    <button class="btn copy" @click="copy">
      Copy
    </button>
  </div>
</template>

<script>
// div.markdown-editor
//   textarea.editor(
//     :value="input"
//     @input="update"
//   )
//   textarea.preview(
//     v-html="confluenceWiki"
//     readonly
//   )
//   button.btn.copy(
//     :data-clipboard-text="confluenceWiki"
//   ) Copy
import { debounce } from "@/utils/utils.js";
// import Clipboard from "clipboard";
import md2cwm from "./md2cwm";
import initialMarkdown from "./initialMarkdown.md";
export default {
  name: "MarkdownView",

  data() {
    return {
      input: initialMarkdown
    };
  },
  computed: {
    confluenceWiki() {
      return md2cwm(this.input, {
        codeStyling: {
          theme: "RDark",
          linenumbers: false
        },
        codeCollapseAt: 500
      });
    }
  },
  methods: {
    update: function(e) {
      this.input = e.target.value;
    },
    copy() {
      let content = document.getElementById("preview");
      content.select();
      document.execCommand("Copy");
      alert("复制成功");
    }
  },
  mounted() {
    // this.clip = new Clipboard(".copy");
    this.update = debounce(this.update);
  }
};
</script>

<style lang="scss">
#test {
  display: flex;
  height: 100%;
}
.markdown-editor {
  display: flex;
  height: 100%;
}

.editor,
.preview {
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  padding: 20px 30px;
  font-family: "Monaco";
  font-size: 14px;
  vertical-align: top;
  border: none;
  outline: none;
  resize: none;
}

.editor {
  color: rgb(171, 178, 191);
  background-color: rgb(40, 44, 52);
  border-right: 1px solid #ccc;
}

.copy {
  position: fixed;
  top: 10px;
  right: 27px;
}

.btn {
  padding: 0.5rem 0.75rem;
  color: #fff;
  background-color: #42a5f5;
  border: 1px solid transparent;
  border-color: #42a5f5;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: #1e88e5;
    border-color: #1e88e5;
  }
}
</style>
