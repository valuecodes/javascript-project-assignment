// Navigation circle aka 'bird'
class NavigationCircle{
    constructor(el,size,infoContainers,obstacles){
        this.el = el
        this.speakingBubble = document.getElementById('speakingBubble')
        this.scoreTracking = document.getElementById('scoreTracking')
        this.progressTracking = document.getElementById('progress')
        this.yPos = 70 /*Pixel coornates on the screen */
        this.xPos = 30 /*Pixel coornates on the screen */
        this.size = size
        this.offset = size/2
        this.wallHits = 0
        this.progress = 0
        this.infoContainers = infoContainers
        this.obstacles = obstacles
        document.body.addEventListener('click',(e)=>this.move(e))
    }

    // Move NavigationCircle('Bird') to x y position where user have clicked
    move(e){

        this.speakingBubble.style.visibility = 'hidden'
        
        const xTarget = e.clientX-this.offset
        const yTarget = e.clientY-this.offset
        let currentX = this.xPos
        let currentY = this.yPos
        // Speed is distance to target / 100
        const xSpeed = Math.abs((xTarget-currentX)/100)
        const ySpeed = Math.abs((yTarget-currentY)/100)

        this.rotate(xTarget,yTarget,currentX,currentY)
        
        // Self invoking function to move the bird to the target user have clicked
        function moveElem(elem){

            // Modify current position by adding or decrementing speed based on the current position
            if(currentX!==xTarget){
                currentX +=  currentX < xTarget ? xSpeed: -xSpeed
            }
            if(currentX!==xTarget){
                currentY +=  currentY < yTarget ? ySpeed: -ySpeed
            }

            elem.xPos = currentX
            elem.yPos = currentY
            elem.el.style.left = currentX+'px'
            elem.el.style.top = currentY+'px'

            // Detect if Bird is inside Information container
            elem.infoContainers.forEach(infoContainer =>
                 infoContainer.checkIfCircleIsInside(elem)   
            )

            // Detect if Bird is collided with obstacle
            let collision = false;
            elem.obstacles.forEach(obstacle =>{
                if(obstacle.detectCollision(elem)){
                    collision=true
                } 
            })

            // Call function again if bird is not reached close enough to user click coordinates
            if(Math.abs(currentX-xTarget)>1&&Math.abs(currentY-yTarget)>1&&!collision){
                setTimeout(()=>{
                    moveElem(elem)
                },10)
            }              
        }
        moveElem(this)
    }

    // Updates Speaking Bubble text
    speak(line,fontSize=10){
        this.speakingBubble.style.fontSize = fontSize+'px'
        this.speakingBubble.style.visibility = 'visible'
        this.speakingBubble.textContent = line
    }

    // Rotate bird direction towards spot where bird is flying
    rotate(xTarget,yTarget,currentX,currentY){
        let rotation = 0
        if(xTarget<currentX){
            rotation-=180
        }
        this.speakingBubble.style.transform = `rotateY(${rotation}deg)`
        this.el.style.transform = `rotateY(${rotation}deg)`;
    }

    // Updates wallhit count text
    wallhit(){
        this.wallHits++
        this.scoreTracking.textContent = this.wallHits
    }

    // Updates progress text
    updateProgress(value){
        this.progress = value*=25
        this.progressTracking.textContent = this.progress + '%'

    }
}

class InfoContainer{
    constructor(elem,index){
        this.elem = elem
        this.bgcolor = ''
        this.index = index
    }

    // Detect if bird is inside information container by checking container coordinates and size relative to the viewport
    checkIfCircleIsInside(navCircle){
        
        const { yPos, xPos } = navCircle
        const { index } = this
        const { top, right, bottom, left } = this.elem.getBoundingClientRect()

        if(yPos>top&&yPos<bottom&&xPos>left&&xPos<right){
            if(index===1)navCircle.speak('Hey I found something!')
            if(index===2)navCircle.speak('Nice picture')
            if(index===3)navCircle.speak('Click download to get pdf')
            if(index===4)navCircle.speak('Destination reached!')
            this.elem.style.cssText = 'filter: blur(0);'
            navCircle.updateProgress(index)
        }else{
            this.elem.style.cssText = 'filter: blur(50px);'
        }
        
    }
}

class Obstacle{
    constructor(elem){
        this.elem = elem
    }
    // Detect bird obstacle collision by checking obstacles coordinates and size relative to the viewport
    detectCollision(navCircle){
       
        const { yPos, xPos, size } = navCircle
        const { top, right, bottom, left } = this.elem.getBoundingClientRect()
        
        if(
            yPos+size>top&&
            yPos<bottom&&
            xPos+size>left&&
            xPos<right
        ){
            navCircle.wallhit()
            navCircle.speak('Ouch I hit a wall!')
            this.elem.style.backgroundColor = 'salmon'
            return true
        }else{
            this.elem.style.backgroundColor = 'dimgray'
            return false
        }
    }
}

// Init function
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