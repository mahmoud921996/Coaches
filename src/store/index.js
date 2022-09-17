import { createStore } from "vuex";

import coachesModule from "./modules/coaches/index";
import requestsModule from "./modules/requests/index";
import authModeule from "./modules/auth/index";
const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModeule
  }
});

export default store;
