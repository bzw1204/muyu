<template>
  <n-layout has-sider position="absolute">
    <!-- 菜单 -->
    <mu-menu />
    <!-- 头部 -->
    <n-layout>
      <mu-header />
      <n-layout-content class="h-[calc(100%_-_45px)] max-h-[calc(100%_-_45px)] overflow-hidden" :native-scrollbar="false" content-style="padding: 24px;">
        <router-view v-slot="{ Component, route }">
          <transition name="scale-up-tl" mode="out-in" appear>
            <div class="layout-content-wrap">
              <component :is="Component" v-if="route.meta?.ignoreCache ?? true" :key="route.fullPath" />
              <keep-alive v-else :include="[]">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </div>
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts" name="MainLayout">
  import { MuMenu, MuHeader } from './components'
</script>

<style lang="less" scoped></style>
