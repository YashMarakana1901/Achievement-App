import { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { TOKEN } from "./constant";
import moment from "moment";

const getItemFromCookie = (key: string) => {
  return Cookies.get(key);
};

const setToken = (token: string) => {
  return Cookies.set(TOKEN, token);
};

const removeItemInCookie = (key: string) => Cookies.remove(key);

const clientConfig = (config: InternalAxiosRequestConfig) => {
  const token = getItemFromCookie(TOKEN);

  if (token) {
    config.headers = config.headers ?? {};
    config.headers[`Authorization`] = "Bearer " + token;
  }

  return config;
};

const handleAxiosError = () => {
  removeItemInCookie(TOKEN);
};

// style={dropDownArrowStyle}
const dropDownArrowStyle = {
  dropdownIndicator: (
    base: any,
    state: { selectProps: { menuIsOpen: any } }
  ) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
};

function capitalizeFirstLetter(str: string | undefined): string {
  if (str) {
    return str.charAt(0).toUpperCase();
  }
  return "";
}

const dateConvert = (epochTime: any) => {
  if (!epochTime) {
    return "-";
  }
  const date = moment.unix(epochTime);
  return date.isValid() ? date.format("DD MMMM YYYY") : "-";
};

const timeConvert = (epochTime: any) => {
  if (!epochTime) {
    return "-";
  }
  const date = moment.unix(epochTime);
  return date.isValid() ? date.format("hh:mm A") : "-";
};

export {
  removeItemInCookie,
  clientConfig,
  getItemFromCookie,
  handleAxiosError,
  dropDownArrowStyle,
  capitalizeFirstLetter,
  setToken,
  dateConvert,
  timeConvert,
};
