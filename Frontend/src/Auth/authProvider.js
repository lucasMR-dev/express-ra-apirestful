import config from "../Api/config";
import { stringify } from "query-string";
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
      Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  checkError: async (error) => {
    const status = error.status;
    if (status === 401) {
      try {
        const tokenWeb = localStorage.getItem('token');
        const user = localStorage.getItem('userLogged');
        const request = new Request(`${apiUrl}/auth/refresh`, {
          method: "POST",
          body: JSON.stringify({ tokenWeb, user }),
          headers: new Headers({ "Content-Type": "application/json" }),
        });
        const response = await fetch(request);
        const res = await response.json();
        if (response.status === 404) {
          localStorage.removeItem("token");
          localStorage.removeItem("expiresIn");
          localStorage.removeItem("userLogged");
          localStorage.removeItem("permissions");
          throw new Error(res);
        }
        else {
          localStorage.setItem("token", res.token);
          localStorage.setItem("expiresIn", res.exp);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("userLogged");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  getIdentity: async () => {
    const profile = localStorage.getItem("userLogged");
    if (profile !== null) {
      try {
        const query = {
          sort: JSON.stringify(['id', 'ASC']),
          range: JSON.stringify([0, 9]),
          filter: JSON.stringify({ "user": profile }),
        };
        const url = `${apiUrl}/employees/?${stringify(query)}`;
        const request = new Request(url, {
          method: "GET",
        });
        const response = await fetch(request);
        const res = await response.json();
        const id = res[0].id;
        const fullName = res[0].profile.firstname + " " + res[0].profile.lastname;
        const avatar = res[0].profile.path;
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
        let role;
        if (res.access_type > 0) {
          role = res.access_type;
          localStorage.setItem("permissions", role);
        }
        else {
          const url = `${apiUrl}/employees/${user}`;
          const request = new Request(url, {
            method: "GET",
          });
          const response = await fetch(request);
          const res = await response.json();          
          let department = res.department;
          let position = res.position;
          const departments = `${apiUrl}/departments/${department}`;
          const requestD = new Request(departments, {
            method: "GET",
          });
          const responseD = await fetch(requestD);
          const resD = await responseD.json();
          const departmentName = resD.name;
          role = [departmentName, position];
          localStorage.setItem("permissions", role);
        }
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
