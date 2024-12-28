<template>
  <Codemirror v-model:value="code" style="font-size: 20px ;font-family: 'Consolas'" :options="cmOptions" border
    ref="cmRef" height="100%" width="100%" @change="onChange" @input="onInput" @ready="onReady">
  </Codemirror>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import "codemirror/theme/eclipse.css"
import "codemirror/mode/clike/clike.js"
import Codemirror from "codemirror-editor-vue3"
// import { useApkStore } from '@/stores'
import { defineProps } from 'vue'

const { code_content } = defineProps(['code_content'])

const code = ref(
  `import com.demo.util.MyType;
import com.demo.util.MyInterface;

public enum Enum {
  VAL1, VAL2, VAL3
}

public class Class<T, V> implements MyInterface {
  public static final MyType<T, V> member;
  
  private class InnerClass {
    public int zero() {
      return 0;
    }
  }

  @Override
  public MyType method() {
    return member;
  }

  public void method2(MyType<T, V> value) {
    method();
    value.method3();
    member = value;
  }
}
  `
)

const cmRef = ref()
const cmOptions = {
  mode: "text/x-java",
  theme: "eclipse",
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

  code.value = code_content
})

onUnmounted(() => {
  cmRef.value?.destroy()
})

defineExpose({ Codemirror })

</script>