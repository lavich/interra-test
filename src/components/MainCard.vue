<template>
  <div class="main-card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.main-card {
  padding: 23px 28px;
  max-height: calc(100% - 46px);
  background: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
