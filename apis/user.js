// 登录
export  function useLoginApi(body){
    return useHttpPost("login",'/login',{
        body
    })
}

export function useGetinfoApi(){
    return useHttpGet("getinfo",'/getinfo',{
        $:true
    })
}

// 退出登录
export function useLogoutApi(){
    return useHttpPost("logout",'/logout')
}

// 注册
export  function useRegApi(body){
    return useHttpPost("reg",'/reg',{
        body
    })
}

// 获取手机验证码
export function usePhoneCallApi(phone){
    return useHttpPost("getCaptcha",'/get_captcha',{
        body:{
            phone
        }
    })
}

// 绑定手机号
export function useBindPhoneApi(body){
    return useHttpPost("bindphone",'/bind_mobile',{
        body
    })
}

// 忘记密码
export function useForgetApi(body){
    return useHttpPost("forget",'/forget',{
        body
    })
}

// 获取学习记录
export function useUserHistoryApi(query){
    return useHttpGet("userHistory",()=>{
        let q = useQueryToString(query())
        return `/user_history/list${q}`
    },{
        lazy:true
    })
}

// 获取购买记录
export function useOrderListApi(page){
    return useHttpGet("OrderList",`order/list?page=${page}`,{
        lazy:true
    })
}