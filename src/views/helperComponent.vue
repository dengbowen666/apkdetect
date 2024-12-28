<script setup>
import directComponent from '@/components/directComponent.vue'
import { ref, onMounted, nextTick } from 'vue'
import { question } from '@/api/static/static';
import { ElMessage } from 'element-plus'

const messages = ref(["欢迎使用信息查询助手!", "示例：activities有哪些，他们的作用是什么", '根据提供的内容，activities有：(1)、com.stub.stub01.StartActivity；（2）、 com.ubix.ssp.open.comm.UBiXVideoActivity （3）、com.ubix.ssp.UBiXWebViewActivity （4）、com.beizi.ad.AdActivity （5）、com.qihoo.ak.landingpage.LandingPage （6）、com.qihoo.ak.click.dialog.DownloadDialogActivity \n 这些activity可能是应用程序的一部分，用于执行各种任务和功能。例如，StartActivity可能是一个 启动页面或主界面，而AdActivity可能是用于显示广告的activity。具体的作用和功能需要参考相应的代码和文档。']);
// const formattedMessages = computed(() => {
//     return messages.value.map(message => message.replace(/\n/g, '<br>'));
// });

const newMessage = ref('');
const scroll = ref(null)

var status = ref(true)

async function setScrollToBottom() {
    // 注意：需要通过 nextTick 以等待 DOM 更新完成
    await nextTick()
    // console.log(scroll)
    const max = scroll.value.scrollHeight
    // 如：当 count = 5 时，max = 总项数 * 每一项的高度 + 外边距 * (总项数 - 1)，即 max = 5 * 50px + 20px * (5 - 1) = 330px
    // scroll.value.scrollTop
    // console.log(max)
    scroll.value.scrollTo({ top: max, behavior: 'smooth' })
}

const sendMessage = async () => {
    if (messages.value[-1] === "正在生成中……") {
        return;
    }
    if (newMessage.value.trim() !== '') {
        // scroll.scrollTo(0, scroll.scrollHeight)
        if (messages.value.length === 3 && messages.value[1] === "示例：activities有哪些，他们的作用是什么") {
            messages.value.pop();
            messages.value.pop();
        }
        messages.value.push(newMessage.value);
        messages.value.push("正在生成中……");
        var tempMessage = newMessage.value;
        newMessage.value = '';
        await question(tempMessage).then((res) => {
            messages.value.pop();
            messages.value.push(res.data["answer"]);
        });
        // const scroll = document.getElementsByClassName('message1')
        setScrollToBottom()
    } else {
        ElMessage({
            message: '请输入内容',
            type: 'warning'
        });
    }
};

onMounted(() => {
    //绑定监听事件
    window.addEventListener('keydown', (e) => {
        if (status.value === false) return;
        status.value = false;
        if (messages.value[-1] === "正在生成中……") {
            return;
        }
        if (e.key === 'Enter') sendMessage();
        status.value = true;
    })
});

// function handleScroll({ scrollTop }) {
//     console.log('scrollTop', scrollTop)
// }

</script>

<template>
    <div id="out">
        <img src="../assets/gif1.gif" alt="" id="el-aside__logo">
        <directComponent style="top: 30%;" id="static">静态</directComponent>
        <directComponent style="top: 50%;" id="dynamic">动态</directComponent>
        <directComponent style="top: 70%;" id="system">系统</directComponent>

        <div id="title">信 息 查 询 助 手</div>

        <div id="information">
            <div class="chatroom">
                <el-scrollbar ref="scroll" always height="480px">
                    <div class="message-list">
                        <div class="message" v-for="(message, index) in messages" :key="index">
                            <div class="message1" v-if="index % 2 == 0">
                                <!-- <div style="clear: both;margin: 0;min-height: 0"></div> -->
                                <el-avatar style="float: left;"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                <p style="float: left;">{{ message }}</p>
                                <div style="clear: both;"></div>
                            </div>
                            <div class="message1" v-else>
                                <el-avatar style="float: right;"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                <p style="float: right;">
                                    {{ message }}
                                </p>
                                <div style="clear: both;"></div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>

                <div class="input-box">
                    <el-input style="height: 40px;width: 85%;margin-right: 20px;" v-model="newMessage"
                        placeholder="请输入……" />
                    <el-button style="height: 40px;width: 70px;" @click="sendMessage">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#out {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url('../assets/bcg1.png');

    #el-aside__logo {
        position: fixed;
        width: 15%;
        height: 30%;
        top: 0;
    }

    #title {
        position: absolute;
        top: 8%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 38px;
        color: #fff;
        font-family: KaiTi;
    }

    #information {
        position: absolute;
        top: 18%;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 70%;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 30px;
        box-shadow: 10px 10px 10px #001529;
        padding: 20px;
        font-size: 18px;
        font-family: KaiTi;
        line-height: 30px;
        padding-left: 2%;

        .chatroom {
            display: flex;
            flex-direction: column;
            /* height: 100vh; */
            width: 100%;
        }

        .message-list {
            /* flex: 1; */

            .message {
                .message1 {
                    /* padding: 0; */
                    width: 100%;
                    min-height: 50px;
                    /* clear: both; */
                    margin-bottom: 20px;

                    p {
                        /* width: 90%; */
                        max-width: 85%;
                        /* height: 90%; */
                        margin-left: 20px;
                        margin-right: 20px;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        border-radius: 5px 5px 5px 5px;
                        background-color: whitesmoke;
                        float: left;
                        padding-left: 5px;
                        padding-right: 5px;
                        line-height: 45px
                    }
                }


            }
        }
    }
}
</style>