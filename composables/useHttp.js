import { useFetch } from "nuxt/app"

const fetchConfig = {
    headers:{
        appid:"bd9d01ecc75dbbaaefce"
    },
    baseURL:'http://demonuxtapi.dishait.cn/pc',
}

function useGetFetchOptions(options = {}){
    options.baseURL = options.baseURL ?? fetchConfig.baseURL
    options.headers = options.headers ?? fetchConfig.headers
    options.initialCache = options.initialCache ?? false
    options.lazy = options.lazy ?? false

    // 用户登录,默认传token

    return options
}

export async function useHttp(key,url,options = {}){
    options = useGetFetchOptions(options)
    options.key = key

    let res = await useFetch(url,{
        ...options,
        transform:(res) => {
            return res.data
        },
    })

    return res
}

// GET
export function useHttpGet(key,url,options = {}){
    options.method = "GET"
    return useHttp(key,url,options)
}

// POST
export function useHttpPost(key,url,options = {}){
    options.method = "POST"
    return useHttp(key,url,options)
}