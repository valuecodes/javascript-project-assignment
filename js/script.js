class NavigationCircle{
    constructor(el,size,infoContainers,obstacles){
        this.el = el
        this.speakingBubble = document.getElementById('speakingBubble')
        this.yPos = 70
        this.xPos = 30
        this.size = size
        this.offset = size/2
        this.infoContainers = infoContainers
        this.obstacles = obstacles
        document.body.addEventListener('click',(e)=>this.move(e))
    }
    move(e){
        this.speakingBubble.style.visibility = 'hidden'
        
        const xTarget = e.clientX-this.offset
        const yTarget = e.clientY-this.offset
        let currentX = this.xPos
        let currentY = this.yPos
        const xSpeed = Math.abs((xTarget-currentX)/100)
        const ySpeed = Math.abs((yTarget-currentY)/100)

        this.rotate(xTarget,yTarget,currentX,currentY)
        
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
            
            let collision = false;

            elem.obstacles.forEach(obstacle =>{
                if(obstacle.detectCollision(elem)){
                    collision=true
                } 
            })

            if(Math.abs(currentX-xTarget)>1&&Math.abs(currentY-yTarget)>1&&!collision){
                setTimeout(()=>{
                    moveElem(elem)
                },10)
            }              
        }
        moveElem(this)
    }
    speak(line,fontSize=10){
        this.speakingBubble.style.fontSize = fontSize+'px'
        this.speakingBubble.style.visibility = 'visible'
        this.speakingBubble.textContent = line
    }
    rotate(xTarget,yTarget,currentX,currentY){
        let rotation = 0
        if(xTarget<currentX){
            rotation-=180
        }
        this.speakingBubble.style.transform = `rotateY(${rotation}deg)`
        this.el.style.transform = `rotateY(${rotation}deg)`;
    }
}

class InfoContainer{
    constructor(elem,index){
        this.elem = elem
        this.bgcolor = ''
        this.index = index
    }

    checkIfCircleIsInside(navCircle){
        const { yPos, xPos } = navCircle
        const { index } = this
        const { top, right, bottom, left } = this.elem.getBoundingClientRect()
        console.log(index)
        if(yPos>top&&yPos<bottom&&xPos>left&&xPos<right){
            if(index===1)navCircle.speak('Hey I found something!')
            if(index===2)navCircle.speak('Nice picture')
            if(index===3)navCircle.speak('Click download to get pdf')
            if(index===4)navCircle.speak('Destination reached!')
            this.elem.style.cssText = 'filter: blur(0);'
        }else{
            this.elem.style.cssText = 'filter: blur(50px);'
        }
    }
}

class Obstacle{
    constructor(elem){
        this.elem = elem
    }
    detectCollision(navCircle){
        const { yPos, xPos, size } = navCircle
        const { top, right, bottom, left } = this.elem.getBoundingClientRect()
        if(
            yPos+size>top&&
            yPos<bottom&&
            xPos+size>left&&
            xPos<right
        ){
            navCircle.speak('Ouch I hit a wall!')
            this.elem.style.backgroundColor = 'salmon'
            return true
        }else{
            this.elem.style.backgroundColor = 'dimgray'
            return false
        }
    }
}

(function() {

    let infoContainers = []
    let obstacles = []

    for(var i=1;i<=4;i++){
        const infoContainerElement = document.getElementById('infoContainer'+i)   
        infoContainers.push(new InfoContainer(infoContainerElement,i))     
    }

    for(var i=1;i<=6;i++){
        const obstacleElement = document.getElementById('obstacle'+i)   
        obstacles.push(new Obstacle(obstacleElement))
    }

    const navElement = document.getElementById('navigationCircle')
    const navCircle = new NavigationCircle(navElement,30,infoContainers,obstacles)
 
})();