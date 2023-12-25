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