<template>
    <Codemirror v-model:value="code" :options="cmOptions" border ref="cmRef" height="510" width="410" @change="onChange"
        @input="onInput" @ready="onReady">
    </Codemirror>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import "codemirror/mode/javascript/javascript.js"
import Codemirror from "codemirror-editor-vue3"
const code = ref(
    `var i = 0;
  for (; i < 9; i++) {
      console.log(i);
      // more statements
  }
  `
)

const cmRef = ref()
const cmOptions = {
    mode: "text/javascript"
}
const onChange = (val, cm) => {
    console.log(val)
    console.log(cm.getValue())
}

const onInput = (val) => {
    console.log(val)
}

const onReady = (cm) => {
    console.log(cm.focus())
}

onMounted(() => {
    setTimeout(() => {
        cmRef.value?.refresh()
    }, 1000)

    setTimeout(() => {
        cmRef.value?.cminstance.isClean()
    }, 3000)
})

onUnmounted(() => {
    cmRef.value?.destroy()
})

defineExpose({ Codemirror })

</script>