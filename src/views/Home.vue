<template>
  <div class="home">
    <h1>Ваши поля:</h1>
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
