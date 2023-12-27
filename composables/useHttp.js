import { createDiscreteApi } from 'naive-ui'
export const fetchConfig = {
    headers: {
        appid: "bd9d01ecc75dbbaaefce"
    },
    baseURL: 'http://demonuxtapi.dishait.cn/pc',
}

function useGetFetchOptions(options = {}) {
    options.baseURL = options.baseURL ?? fetchConfig.baseURL
    options.headers = options.headers ?? fetchConfig.headers
    options.initialCache = options.initialCache ?? false
    options.lazy = options.lazy ?? false

    // 用户登录,默认传token

    const token = useCookie("token")
    if (token.value) {
        options.headers.token = token.value
    }

    return options
}

export async function useHttp(key, url, options = {}) {
    options = useGetFetchOptions(options)
    options.key = key

    if (options.$) {
        const data = ref(null)
        const error = ref(null)
        return await $fetch(url, options).then(res => {
            data.value = res.data
            return {
                data,error
            }
        }).catch(err => {
            error.value = err?.data?.data
            if(process.client){
                const { message } = createDiscreteApi(["message"])
                message.error(error.value || '服务端错误')
            }
            return {
                data,
                error
            }
        })
    }

    let res = await useFetch(url, {
        ...options,
        transform: (res) => {
            return res.data
        },
    })

    // 客户端处理错误

    if (process.client && res.error.value) {
        const msg = res.error.value?.data?.data
        if (!options.lazy) {
            const { message } = createDiscreteApi(["message"])
            message.error(msg || '服务端错误')
        }
    }

    return res
}

// GET
export function useHttpGet(key, url, options = {}) {
    options.method = "GET"
    return useHttp(key, url, options)
}

// POST
export function useHttpPost(key, url, options = {}) {
    options.method = "POST"
    return useHttp(key, url, options)
}