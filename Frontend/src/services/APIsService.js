import axios from "axios";
import { jwtDecode } from "jwt-decode";
const { VITE_API_ENDPOINT } = import.meta.env;
const baseURL = VITE_API_ENDPOINT;

const authorizedAxios = axios.create();

authorizedAxios.interceptors.request.use(
    async (config) => {
        const currentDate = new Date();
        const decodedToken = jwtDecode(localStorage.getItem("access_token"));
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await refreshToken();
            localStorage.setItem("access_token", data.accessToken);
            config.headers["authorization"] = "Bearer " + data.accessToken;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

authorizedAxios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error;
        if (res?.response?.status === 401 || res === "Invalid token specified") {
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            window.location.href = `${process.env.REACT_APP_HOST}`;
        }

        console.error(`Looks like there was a problem. Status Code: ` + res?.response?.status);
        return error;
    }
);

export const postCall = async (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(baseURL + url, data)
            .then((data) => {
                resolve({
                    ...data.data,
                    ...(data.headers.refresh_token && {
                        refresh_token: data.headers.refresh_token,
                    }),
                    ...(data.headers.access_token && {
                        access_token: data.headers.access_token,
                    }),
                });
            })
            .catch((err) => reject(err));
    });
};

export const patchCall = async (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(baseURL + url, data)
            .then((data) => {
                resolve({
                    ...data.data,
                    ...(data.headers.refresh_token && {
                        refresh_token: data.headers.refresh_token,
                    }),
                    ...(data.headers.access_token && {
                        access_token: data.headers.access_token,
                    }),
                });
            })
            .catch((err) => reject(err));
    });
};

export const getCall = async (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(baseURL + url)
            .then((data) => {
                resolve(data.data);
            })
            .catch((err) => reject(err));
    });
};

export const authorizedPostCall = async (url, data) => {
    return new Promise((resolve, reject) => {
        authorizedAxios
            .post(baseURL + url, data, {
                headers: {
                    access_token: "Bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((data) => {
                if (data?.status >= 200 && data?.status <= 299) resolve(data.data);
                else reject(data);
            })
            .catch((err) => reject(err));
    });
};

export const authorizedPutCall = async (url, data) => {
    return new Promise((resolve, reject) => {
        authorizedAxios
            .put(baseURL + url, data, {
                headers: {
                    access_token: "Bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((data) => {
                if (data?.status >= 200 && data?.status <= 299) resolve(data.data);
                else reject(data);
            })
            .catch((err) => reject(err));
    });
};

export const authorizedPatchCall = async (url, data) => {
    return new Promise((resolve, reject) => {
        authorizedAxios
            .patch(baseURL + url, data, {
                headers: {
                    access_token: "Bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((data) => {
                if (data?.status >= 200 && data?.status <= 299) resolve(data.data);
                else reject(data);
            })
            .catch((err) => reject(err));
    });
};

export const authorizedDeleteCall = async (url) => {
    return new Promise((resolve, reject) => {
        authorizedAxios
            .delete(baseURL + url, {
                headers: {
                    access_token: "Bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((data) => {
                if (data?.status >= 200 && data?.status <= 299) resolve(data.data);
                else reject(data);
            })
            .catch((err) => reject(err));
    });
};

export const authorizedGetCall = async (url) => {
    return new Promise((resolve, reject) => {
        authorizedAxios
            .get(baseURL + url, {
                headers: {
                    access_token: "Bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((data) => {
                if (data?.status >= 200 && data?.status <= 299) resolve(data.data);
                else reject(data);
            })
            .catch((err) => reject(err));
    });
};
