import axios from "axios";
/**
 * 빈 값 여부를 확인한다.
 * @param value
 */
export const isEmpty = (value: any) => {
    if (value != undefined && value != null) {
        return false;
    } else {
        return true;
    }
};
const domain = "http://localhost:8080";
/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiGet = async (
    url: any,
    params?: any,
    withoutErr: boolean = false
) => {
    const response = await axios({
        method: "GET",
        url: domain + url,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        params: {
            ...params,
            // access_token: window.localStorage.getItem("access_token"),
            // refresh_token: window.localStorage.getItem("refresh_token"),
        },
        withCredentials: true,
    });
    console.log("RESPONSE", response);
    return response.data;
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPost = async (url: any, params?: any) => {
    // const access_token = window.localStorage.getItem("access_token");
    // const refresh_token = window.localStorage.getItem("refresh_token");
    // if (
    //     access_token == null &&
    //     url.indexOf("login") == -1 &&
    //     url.indexOf("sign-up") == -1
    // )
    //     throw new Error("");
    if (params == undefined) params = {};
    // Object.assign(params, { access_token });
    // Object.assign(params, { refresh_token });
    const response = await axios({
        method: "POST",
        url: domain + url,
        data: params,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
    });
    console.log(response);
    // if (response.data.resultCode != 200) {
    //     throw response.data.errorMsg;
    // }
    return response.data;
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPostWithFile = async (
    url: any,
    files?: any[],
    params?: any
) => {
    let formData = new FormData();
    if (params)
        Object.keys(params).forEach((key) => {
            formData.append(key, params[key]);
        });

    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    if (access_token == null) throw new Error("로그인 만료");
    formData.append("access_token", access_token ? access_token : "");
    formData.append("refresh_token", refresh_token ? refresh_token : "");

    //files append
    if (files)
        files.map((raw, idx) => {
            formData.append("file", raw);
        });
    else formData.append("file", "");
    const response = await axios({
        method: "POST",
        url: domain + url,
        data: formData,
        headers: {
            "Access-Control-Allow-Origin": "*",
            // "Content-Type": "multipart-form-data",
        },
        withCredentials: true,
    });

    if (response.data.resultCode != 200) {
        throw response.data.errorMsg;
    }

    return response.data;
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPostWithFiles = async (
    url: any,
    files?: any,
    params?: any
) => {
    let formData = new FormData();
    if (params)
        Object.keys(params).forEach((key) => {
            if (typeof params[key] == "object") {
                formData.append(key, JSON.stringify(params[key]));
            } else {
                formData.append(key, params[key]);
            }
        });

    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    if (access_token == null) throw new Error("로그인 만료");
    formData.append("access_token", access_token ? access_token : "");
    formData.append("refresh_token", refresh_token ? refresh_token : "");
    for (var key of Object.keys(files)) {
        if (files[key]) {
            formData.append("file", files[key]);
        }
    }
    const response = await axios({
        method: "POST",
        url: domain + url,
        data: formData,
        headers: {
            "Access-Control-Allow-Origin": "*",
            // "Content-Type": "multipart-form-data",
        },
        withCredentials: true,
    });
    if (response.data.resultCode != 200) {
        throw response.data.errorMsg;
    }

    return response.data;
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPut = async (url: any, params?: any) => {
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    if (access_token == null) throw new Error("로그인 만료");
    Object.assign(params, {
        access_token: access_token ? access_token : "",
    });
    Object.assign(params, {
        refresh_token: refresh_token ? refresh_token : "",
    });

    const response = await axios({
        method: "PUT",
        url: domain + url,
        params: params,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        // withCredentials : true
    });

    if (response.data.resultCode != 200) {
        throw response.data.errorMsg;
    }
    return response.data;
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiDelete = async (url: any, params?: any) => {
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    if (access_token == null) throw new Error("");
    Object.assign(params, {
        access_token: access_token ? access_token : "",
    });
    Object.assign(params, {
        refresh_token: refresh_token ? refresh_token : "",
    });

    const response = await axios({
        method: "DELETE",
        url: domain + url,
        params: params,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
    });

    if (response.data.resultCode != 200) {
        throw response.data.errorMsg;
    }
    return response.data;
};

/**
 * Login 이후 처리 로직
 * @param response /api/login의 응답값 (JWT TOKEN)
 */
export const onLoginSuccess = (response:any) => {
    const { accessToken } = response;
    window.sessionStorage.setItem("isLogin","true");
    window.sessionStorage.setItem("Authorization",`Bearer ${accessToken}`);

}