import { makeAutoObservable } from "mobx";
import instance from "../stores/instance";
import decode from "jwt-decode";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  signup = async (userData) => {
    try {
      const response = await instance.post("/signup", userData);

      this.user = decode(response.data.token);
      // console.log("userrr " + Object.entries(this.user));
      instance.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      console.log("Dataaa" + response.data.token);
      localStorage.setItem("myToken", response.data.token);
    } catch (error) {
      console.error("ERORRRRRRR" + error);
    }
  };
  signin = async (userData) => {
    try {
      const res = await instance.post("/signin", userData);
      this.user = decode(res.data.token);
      instance.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      localStorage.setItem("myToken", res.data.token);
      console.log("signed in");
    } catch (error) {
      console.log("AuthStore -> signin -> error", error);
    }
  };
  signout = () => {
    delete instance.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    this.user = null;
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        localStorage.setItem("myToken", token);
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        this.user = decode(token);
      } else {
        this.signout();
      }
    }
  };
}

const authstore = new AuthStore();
authstore.checkForToken();

export default authstore;
