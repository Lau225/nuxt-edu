// 将对象转成url参数
export function useQueryToString(query = {}){
    let q = ""
    for (const key in query) {
        if(q == ""){
            q = `?${key}=${query[key]}`
        }else{
            q += `&${key}=${query[key]}`
        }
    }
    return q
}

// 时间状态判断
export function useTimeStatus(start,end){
    let status = ""
    start = (new Date(start)).getTime()
    end = (new Date(end)).getTime()
    const now = Date.now()
    if(start < now && now < end){
        status = 'ing'
    }else if(start>=now){
        status = "pending"
    }else{
        status = "end"
    }
    return status
}