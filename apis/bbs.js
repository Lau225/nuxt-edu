// 点赞/取消点赞
export function usePostSupportApi(post_id,type){
    return useHttpPost("postSupport",`/post/${type}`,{
        body:{
            post_id
        }
    })
}