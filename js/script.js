class NavigationCircle{
    constructor(el,size){
        this.el = el
        this.xPos = 70
        this.yPos = 105
        this.size = size
        this.offset = size/2
        document.body.addEventListener('click',(e)=>this.move(e))
    }
    move(e){
        const xTarget = e.clientX
        const yTarget = e.clientY
        this.xPos = xTarget
        this.yPos = yTarget
        const offset = this.offset
        this.el.style.left = xTarget-offset+'px'
        this.el.style.top = yTarget-offset+'px'
    }

}

(function() {
    const navElement = document.getElementById('navigationCircle')
    const navCircle = new NavigationCircle(navElement,30)

 })();