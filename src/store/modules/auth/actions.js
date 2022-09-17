let timer;
export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login"
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup"
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAD-L8RatscKJEAYRmjqKNCVSkjhX3GgQ0";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAD-L8RatscKJEAYRmjqKNCVSkjhX3GgQ0";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }
    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 35000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);
    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expirationDate = localStorage.getItem("tokenExpiration");
    const expiresIn = +expirationDate - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);
    if (token && userId) {
      context.commit("setUser", {
        token,
        userId
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    clearTimeout(timer);
    context.commit("setUser", {
      userId: null,
      token: null
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  }
};
