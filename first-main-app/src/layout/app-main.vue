<template>
  <a-layout-content>
    <router-view  v-if="!$route.meta.isMicro"/>
    <section v-else id="microAppContainer"></section>
  </a-layout-content>
</template>
