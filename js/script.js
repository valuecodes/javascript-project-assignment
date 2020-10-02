class NavigationCircle{
    constructor(el,size){
        this.el = el
        this.yPos = 70
        this.xPos = 105
        this.size = size
        this.offset = size/2
        
        document.body.addEventListener('click',(e)=>this.move(e))
    }
    move(e){
        const xTarget = e.clientX-this.offset
        const yTarget = e.clientY-this.offset
        let currentX = this.xPos
        let currentY = this.yPos
        const xSpeed = Math.abs((xTarget-currentX)/100)
        const ySpeed = Math.abs((yTarget-currentY)/100)
        
        function moveElem(elem){
            if(currentX!==xTarget){
                currentX +=  currentX<xTarget?xSpeed:-xSpeed
            }
            if(currentX!==xTarget){
                currentY +=  currentY<yTarget?ySpeed:-ySpeed
            }       
            elem.xPos = currentX
            elem.yPos = currentY
            elem.el.style.left = currentX+'px'
            elem.el.style.top = currentY+'px'   
            if(Math.abs(currentX-xTarget)>1&&Math.abs(currentY-yTarget)>1){
                setTimeout(()=>{
                    moveElem(elem)
                },10)
            }              
        }
        moveElem(this)
    }
}

(function() {
    const navElement = document.getElementById('navigationCircle')
    const navCircle = new NavigationCircle(navElement,30)

 })();