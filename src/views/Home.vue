<template>
  <div class="home">
    Ваши поля:
    <ul>
      <li v-for="(fieldName, idx) in fields" :key="idx">
        <router-link :to="{ name: 'Field', params: { fieldName } }">{{
          fieldName
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    fields: ["112"]
  })
};
</script>
