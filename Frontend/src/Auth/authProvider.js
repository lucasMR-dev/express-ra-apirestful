import config from "../Api/config";
const apiUrl = config.apiUrl;
const authProvider = {
  login: async ({ email, password }) => {
    try {
      const request = new Request(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
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
  register: async ({ email, username, password, isActive, access_type }) => {
    try {
      const request = new Request(`${apiUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ email, password, username, isActive, access_type }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      const response = await fetch(request);
      const res = await response.json();
      if (response.status < 200 || response.status >= 300) {
        throw new Error(res.Error.message);
      }
      Promise.resolve({redirectTo: '#/login'});
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
        const request = new Request(`${apiUrl}/employees/${profile}`, {
          method: "GET",
        });
        const response = await fetch(request);
        const res = await response.json();
        const id = res.id;
        const fullName = res.profile.firstname + " " + res.profile.lastname;
        const avatar = res.profile.path;
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
