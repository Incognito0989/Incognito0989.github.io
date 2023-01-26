const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5
const bound = {
    upper: 400,
    lower: 100
}
const flatVolume = 'https://lh6.googleusercontent.com/5nZkfUzdXBcDuVBWLkYrv6IP2IVoFfKSWB1O-J5Pos1YSqbOT265EtzkkxgTljrcgWs=w2400'
const floor = 'https://www.3dxo.com/images/textures/s/arroway.de_concrete19_d100.png'


class Player {
    constructor() {
        this.jump = .02 * canvas.height
        this.speed = 3
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 150
        this.height = 150
        this.idle = [
            createImage('https://lh3.googleusercontent.com/bkqzLRX74anBPlv20mZXI7pYc_ZQkJkZe_Cc3G6qorHIJbu8X_3pccZjRjNrN6URneQ=w2400'),
        ]
        this.running = [
            createImage('https://lh4.googleusercontent.com/gdWDoMBrWX5z5F6wMoSVJRvh0f_H_KG5dqiD4nOTUqd6j8oc-0TErxp5huSDkYhi9lo=w2400'),
            createImage('https://lh6.googleusercontent.com/E5xo6XlKYzwcROAzsgDQPL0PDhnpjkN0GBH0eTpxNMbuguadn12H-xLiRjjqqZaiLWs=w2400')
        ]
        this.frames = 0
    }

    draw() {
        if(this.velocity.x > 0) {
            c.drawImage(this.running[this.frames % 2], this.position.x, this.position.y, this.width, this.height)
        } else if(this.velocity.x == 0) {
            c.drawImage(this.idle[this.frames % 1], this.position.x, this.position.y, this.width, this.height)
        }
        
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <=  canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

function createImage(src) {
    const img = new Image()
    img.src = src
    return img
}

class GenericObject {
    constructor({x, y}) {
        this.position = {
            x: x,
            y: y
        }
        this.img = createImage('https://lh4.googleusercontent.com/prw19UGuul909ffRZVSvo2kqKiXkI06o-VGCeY0ei2Jqx1Ejp6CUSJMhkuNgrTzaaN0=w2400')
    }

    draw() {
        c.drawImage(this.img, this.position.x, this.position.y, canvas.width, canvas.height)
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x: x,
            y: y
        }
    }
    collision(){}
    draw() {}
}

class Rectangle extends Platform {
    constructor({x, y, width, height, src, offset}) {
        super({x: x, y: y})
        this.width = width
        this.height = height
        this.img = createImage(src)
        this.offset = {
            x: offset[0] * width,
            y: offset[1] * height
        }
    }
    
    collision(player) {
        return player.position.y + player.height <= this.position.y + this.offset.y &&
            player.position.y + player.height + player.velocity.y >= this.position.y + this.offset.y &&
            player.position.x + player.width >= this.position.x + this.offset.x &&
            player.position.x <= this.position.x + this.width - this.offset.x
    }

    draw() {
        c.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [
    new Rectangle({x: -500, y: canvas.height - 100, width: 20000, height: 200, src: floor, offset: [0, .2]}),
    new Rectangle({x: 100, y: 500, width: 200, height: 200, src: flatVolume, offset: [.1, .2]}),
    new Rectangle({x: 200, y: 200, width: 400, height: 100, src: flatVolume, offset: [.1, .2]})
]
const genericObjects = [
    new GenericObject({x: -canvas.width, y: 0}),
    new GenericObject({x: 0, y: 0}),
    new GenericObject({x: canvas.width, y: 0}),
    new GenericObject({x: canvas.width * 2, y: 0}),
    new GenericObject({x: canvas.width * 3, y: 0}),
    new GenericObject({x: canvas.width * 4, y: 0}),
    new GenericObject({x: canvas.width * 5, y: 0}),
]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0;

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,  0, canvas.width, canvas.height)
    
    c.clearRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })

    if (keys.right.pressed &&
        player.position.x < bound.upper) {
        player.velocity.x = player.speed
    } else if (keys.left.pressed &&
        player.position.x > bound.lower) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if(keys.right.pressed) {
            scrollOffset += player.speed
            player.frames++
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            }) 
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed / 3
            })
        } else if(keys.left.pressed) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed / 3
            })
        }
    }
    platforms.forEach((platform) => {
        if (platform.collision(player)) {
            player.velocity.y = 0
        }
    })
    player.update()
}

animate()

window.addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 65:
            //left
            keys.left.pressed = true
            break
        case 83:
            //down
            break
        case 68:
            //right
            keys.right.pressed = true
            break
        case 87:
            //up
            player.velocity.y -= player.jump
            break
    }
})

window.addEventListener('keyup', ({keyCode}) => {
    switch(keyCode) {
        case 65:
            //left
            keys.left.pressed = false
            break
        case 83:
            //down
            break
        case 68:
            //right
            keys.right.pressed = false
            break
        case 87:
            //up
            break
    }
})