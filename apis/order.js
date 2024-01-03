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
export function useCreateOrderApi(body,type = ''){
    let url = `/order/save`
    if(type === 'flashsale'){
        url = `/order/flashsale`
    }
    return useHttpPost("CreateOrder",url,{
        body
    })
}


// 微信pc支付
export function useWxPayApi(no){
    return useHttpPost("WxPay",`/order/wxpay`,{
        body:{
            no
        }
    })
}

// 查询订单是否支付成功
export function useIsWxPayApi(no){
    return useHttpPost("isWxPay",`/order/iswxpay`,{
        body:{
            no
        },
        $:true
    })
}