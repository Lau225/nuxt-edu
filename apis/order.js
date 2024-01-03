// 获取产品信息
export function useGetGoodsInfoApi(id,type = "course"){
    return useHttpGet('getGoodsInfo',`/goods/read?type=${type}&id=${id}`,{
        lazy:true
    })
}

// 获取可用优惠券
export function useGetUseableUserCouponApi(id,type){
    return useHttpGet('getUseableUserCoupon',`/user_coupon?goods_id=${id}&type=${type}&page=1`)
}


// 创建订单
export function useCreateOrderApi(body){
    return useHttpPost("CreateOrder",`/order/save`,{
        body
    })
}