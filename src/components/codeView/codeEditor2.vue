<script setup>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

monaco.editor.create(document.getElementById("container"), {
    value: "123"
});
</script>

<template>
    <div id="container" style="height:100%;"></div>

</template>

<style scoped></style>
