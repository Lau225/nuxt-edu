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