import config from "../Api/config";
const apiUrl = config.apiUrl;
const authProvider = {
  login: async ({ username, password }) => {
    try {
      const request = new Request(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      const response = await fetch(request);
      const res = await response.json();
      if (response.status < 200 || response.status >= 300) {
        throw new Error(res.Error.message);
      }
      localStorage.setItem("token", res.token);
      localStorage.setItem("expiresIn", res.exp);
      localStorage.setItem("userLogged", res.sub);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject({ message: false });
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogged");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  getIdentity: async () => {
    const profile = localStorage.getItem("userLogged");
    if (profile !== null) {
      try {
        const request = new Request(`${apiUrl}/profile/${profile}`, {
          method: "GET",
        });
        const response = await fetch(request);
        const res = await response.json();
        const id = res._id;
        const fullName = res.firstname;
        const avatar = apiUrl + "/Public/" + res.path;
        return Promise.resolve({ id, fullName, avatar });
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject();
    }
  },
  getPermissions: async () => {
    const user = localStorage.getItem("userLogged");
    if (user !== null) {
      try {
        const request = new Request(`${apiUrl}/users/${user}`, {
          method: "GET",
        });
        const response = await fetch(request);
        const res = await response.json();
        const role = res.access_type;
        localStorage.setItem("permissions", role);
        return Promise.resolve(role);
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject();
    }
  },
};

export default authProvider;
