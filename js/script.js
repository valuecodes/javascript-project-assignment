class NavigationCircle{
    constructor(el,size,infoContainers){
        this.el = el
        this.yPos = 70
        this.xPos = 105
        this.size = size
        this.offset = size/2
        this.infoContainers = infoContainers
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
            elem.infoContainers.forEach(infoContainer =>
                 infoContainer.checkIfCircleIsInside(elem)   
            )
            
            if(Math.abs(currentX-xTarget)>1&&Math.abs(currentY-yTarget)>1){
                setTimeout(()=>{
                    moveElem(elem)
                },10)
            }              
        }
        moveElem(this)
    }
}

class InfoContainer{
    constructor(elem,dimensions){
        this.elem = elem
        this.bgcolor = ''
    }

    checkIfCircleIsInside(navCircle){
        const { yPos, xPos } = navCircle
        const { top, right, bottom, left } = this.elem.getBoundingClientRect()
        if(yPos>top&&yPos<bottom&&xPos>left&&xPos<right){
            this.elem.style.backgroundColor = 'gray'
        }else{
            this.elem.style.backgroundColor = ''
        }
    }
}

(function() {

    let infoContainers = []

    for(var i=1;i<=4;i++){
        const infoContainerElement = document.getElementById('infoContainer'+i)   
        infoContainers.push(new InfoContainer(infoContainerElement))     
    }

    console.log(window.innerHeight)

    const navElement = document.getElementById('navigationCircle')
    const navCircle = new NavigationCircle(navElement,30,infoContainers)
 
})();