<script setup>
import directComponent from '@/components/directComponent.vue'
</script>

<template>
  <div id="out">
    <img src="../assets/gif1.gif" alt="" id="el-aside__logo">
    <directComponent style="top: 30%;" id="static">静态</directComponent>
    <directComponent style="top: 50%;" id="dynamic">动态</directComponent>
    <directComponent style="top: 70%;" id="system">系统</directComponent>

    <div id="title">系 统 信 息</div>

    <div id="information">
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;<b>1、系统介绍:</b> 系统采用多模态模型、深度学习模型、Vue.js、SpringBoot、数据库、云服务器等技术，是一款旨在判别APP是否安全、并进一步判断危险类型和进行深度解析的项目。系统功能全面，操作简单，适用于各种用户群体。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;<b>2、功能介绍:</b> 系统支持多种APP下载和离线分析方式、支持黑白名单库的配置、支持APK基本信息提取、 支持APK静态解析、 支持APK动态解析、 支持APK特征信息分析、 进行APP智能判断、 提取APP关键诈骗站点。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;<b>3、系统亮点:</b>（1）、系统使用迁移学习、计算机视觉、 支持向量机、 决策树等多种深度学习和机器学习方法，对APP进行智能分析<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）、融合特征信息分析、图像识别、灰度图识别等多种方法，根据不同方法的擅长分类设定不同权重，提高了识别的准确性；
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）、系统支持静态分析、动态分析、智能分析等多种分析方式，满足不同用户的需求。
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;<b>4、使用指南:</b> 见文件
      </p>
      <br>
      <p style="margin-left: 200px;">联系邮箱：li2727109598@163.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电话：18142349976&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;QQ：2727109598</p>
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
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 60%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    box-shadow: 10px 10px 10px #001529;
    padding: 20px;
    font-size: 18px;
    font-family: KaiTi;
    line-height: 30px;
  }
}
</style>