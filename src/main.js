import { createApp, defineAsyncComponent } from "vue";
import router from "./router.js";
import store from "./store/index";
import App from "./App.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";

const app = createApp(App);

const BaseDialogue = defineAsyncComponent(() =>
  import("./components/ui/BaseDialogue.vue")
);

app.component("base-badge", BaseBadge);
app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);
app.component("base-dialogue", BaseDialogue);

app.use(router);
app.use(store);
app.mount("#app");
