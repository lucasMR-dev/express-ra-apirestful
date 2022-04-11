import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import config from "./config";
const apiUrl = config.apiUrl;
const httpClient = (url, options = {}) => {
  const token = localStorage.getItem("token");
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  /**
   * @description Default RA Queries
   * If you need a diferent approach to your data follow the examples at the end of this file.
   */
  // Get All
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}/?${stringify(query)}`;
    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("X-Total-Count")),
    }));
  },

  // Get One by Id
  getOne: async (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
      ({ json }) => ({
        data: json,
      })
    );
  },

  // Get More than one By Ids
  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}/?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  // Get By Foreing Keys
  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}/?${stringify(query)}`;
    const { headers, json } = await httpClient(url);
    return {
      data: json,
      total: parseInt(headers.get("X-Total-Count")),
    };
  },

  // Update By Id
  update: async (resource, params) => {
    let path = resource;
    let optionHeader = new Headers({ Accept: "*/*" });
    optionHeader.delete("content-type");
    if (path === "products") {
      const formData = new FormData();
      formData.append("sku", params.data.sku);
      formData.append("name", params.data.name);
      formData.append("brand", params.data.brand);
      formData.append("price", params.data.price);
      formData.append("salePrice", params.data.salePrice);
      formData.append("discount", params.data.discount);
      formData.append("newPro", params.data.newPro);
      formData.append("sale", params.data.sale);
      formData.append("stock", params.data.stock);
      formData.append("shortDetails", params.data.shortDetails);
      formData.append("description", params.data.description);
      formData.append("tags", JSON.stringify(params.data.tags));
      formData.append("colorAvailable", params.data.colorAvailable);
      formData.append("categories", JSON.stringify(params.data.categories));

      if (params.data.new_pictures) {
        let small = params.data.new_pictures[0];
        let big = params.data.new_pictures[1];
        if (small) {
          formData.append("pictures", small.rawFile);
        }
        if (big) {
          formData.append("pictures", big.rawFile);
        }
      }

      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PATCH",
        body: formData,
        headers: optionHeader,
      }).then(({ json }) => ({ data: json }));
    }
    else if (path === "brands") {
      const formData = new FormData();
      if (params.data.newlogo) {
        const file = params.data.newlogo;
        if (file.rawFile.size > 0) {
          formData.append("logo", file.rawFile);
        }
      }
      formData.append("name", params.data.name);
      formData.append("partnerStatus", params.data.partnerStatus);
      formData.append("active", params.data.active);
      formData.append("categories", JSON.stringify(params.data.categories));

      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PATCH",
        body: formData,
        headers: optionHeader,
      }).then(({ json }) => ({ data: json }));
    }
    else if (path === "categories") {
      const name = params.data.name;
      const family = params.data.family.id;
      const data = { name, family };
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then(({ json }) => ({ data: json }));
    }
    else if (path === "families") {
      const name = params.data.name;
      const data = { name };
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then(({ json }) => ({ data: json }));
    }
    else if (path === 'employees') {

      const firstname = params.data.profile.firstname;
      const lastname = params.data.profile.lastname;
      const birthday = params.data.profile.birthday;
      const phone = params.data.phone;
      const username = params.data.user.username;
      const email = params.data.user.email;
      const isActive = params.data.user.isActive;
      const job_name = params.data.job_name;
      const hire_date = params.data.hire_date;
      const salary = params.data.salary;
      const position = params.data.position;
      const department = params.data.department;

      const data = { firstname, lastname, birthday, phone, username, email, isActive, job_name, hire_date, salary, position, department };

      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then(({ json }) => ({ data: json }));
    }
    else {
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    }
  },

  // Update Multiple By Ids
  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const { json } = await httpClient(
      `${apiUrl}/${resource}/?${stringify(query)}`,
      {
        method: "PATCH",
        body: JSON.stringify(params.data),
      }
    );
    return { data: json };
  },

  // Post Single
  create: async (resource, params) => {
    let path = resource;
    let optionHeader = new Headers({ Accept: "*/*" });
    optionHeader.delete("content-type");
    if (path === "brands") {
      const file = params.data.logo;
      const formData = new FormData();

      // Fill the form
      formData.append("name", params.data.name);
      formData.append("partnerStatus", params.data.partnerStatus);
      formData.append("active", params.data.active);
      formData.append("categories", JSON.stringify(params.data.categories));
      formData.append("logo", file.rawFile);

      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
        headers: optionHeader,
      }).then(({ json }) => ({ data: json }));
    } else if (path === "products") {
      let small = params.data.pictures[0];
      let big = params.data.pictures[1];
      const formData = new FormData();
      // Fill the form
      formData.append("sku", params.data.sku);
      formData.append("name", params.data.name);
      formData.append("brand", params.data.brand);
      formData.append("price", params.data.price);
      formData.append("salePrice", params.data.salePrice);
      formData.append("discount", params.data.discount);
      formData.append("newPro", params.data.newPro);
      formData.append("sale", params.data.sale);
      formData.append("stock", params.data.stock);
      formData.append("shortDetails", params.data.shortDetails);
      formData.append("description", params.data.description);
      formData.append("tags", JSON.stringify(params.data.tags));
      formData.append("colorAvailable", params.data.colorAvailable);
      formData.append("categories", params.data.categories);
      formData.append("pictures", small.rawFile);
      formData.append("pictures", big.rawFile);

      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
        headers: optionHeader,
      }).then(({ json }) => ({ data: json }));
    }
    else if (path === "employees") {
      const file = params.data.picture;
      const formData = new FormData();

      // Fill the form
      formData.append("firstname", params.data.firstname);
      formData.append("lastname", params.data.lastname);
      formData.append("birthday", params.data.birthday);
      formData.append("phone", params.data.phone);
      formData.append("picture", file.rawFile);
      formData.append("username", params.data.username);
      formData.append("password", params.data.password);
      formData.append("email", params.data.email);
      formData.append("isActive", params.data.isActive);
      formData.append("job_name", params.data.job_name);
      formData.append("hire_date", params.data.hire_date);
      formData.append("salary", params.data.salary);
      formData.append("position", params.data.position);
      formData.append("department", params.data.department);

      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
        headers: optionHeader,
      }).then(({ json }) => ({ data: json }));
    } else {
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    }
  },

  // Delete one By Id
  delete: async (resource, params) => {
    const res = httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: res };
  },

  // Delete Multiple By Id
  deleteMany: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "DELETE",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  /**
   * Custom API CALLS
   * @description You can either override default RA Queries or add a custom Query and later call it throw default apiService
   */
  // GET DATA WITH OUT FORMAT
  getCustomList: async (resource) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url).then(({ json }) => ({
      data: json,
    }));
  },
  updateUserProfile: async (params) => {
    let picture = params.data.picture;
    let birthday = params.data.birthday;
    let phone = params.data.phone;
    const formData = new FormData();
    let optionHeader = new Headers({ Accept: "*/*" });
    // Fill the form
    formData.append("birthday", birthday);
    formData.append("phone", phone);
    if (picture) {
      if (picture.rawFile.size > 0) {
        formData.append("picture", picture.rawFile);
      }
    }
    const { update } = await httpClient(`${apiUrl}/employees/profile/${params.data.id}`, {
      method: "PATCH",
      body: formData,
      headers: optionHeader,
    });
    return { data: update };
  },
  updateSettings: async (params) => {
    localStorage.removeItem('locale');
    const { json } = await httpClient(`${apiUrl}/employees/config/${params.data.id}`, {
      method: "PATCH",
      body: JSON.stringify({ profile: { config: { ...params.data.config } } }),
    });
    return { data: json };
  }

};

export default dataProvider;