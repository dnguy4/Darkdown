<template>
<div>
  <button @click="print" class="button">Export to PDF</button>
</div>
</template>

<script>
export default {
  props: ["texteditor"],
  methods: {
    async print () {
      let html_content = this.texteditor.ui.view.editable.element;
      await this.$htmlToPaper(html_content);
    }
  },
};
</script>