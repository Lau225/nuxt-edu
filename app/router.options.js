export default{
    scrollBehavior(to,from,savePosition){
        // 在按下后退或者前进按钮时，就会像浏览器的原生表现那样
        if(savePosition){
            return savePosition
        }

        return {
            top:0
        }
    }
}