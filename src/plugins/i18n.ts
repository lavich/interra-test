import Vue from "vue";
import VueI18n from "vue-i18n";
import ru from "../../locales/intterra-ru-RU.json";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "ru",
  messages: { ru }
});
