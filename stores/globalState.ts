import { reactive } from "vue";

const defaultState = {
  theme: "light",
  actions: {
    setTheme: setTheme,
  },
};

function setTheme(theme: string) {
  globalState.theme = theme;
}

const globalState = reactive({ ...defaultState });
export default globalState;
