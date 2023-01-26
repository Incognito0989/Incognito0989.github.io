const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5
const bound = {
    upper: canvas.width,
    lower: 0
}
const flatVolume = 'https://lh6.googleusercontent.com/5nZkfUzdXBcDuVBWLkYrv6IP2IVoFfKSWB1O-J5Pos1YSqbOT265EtzkkxgTljrcgWs=w2400'
const floor = 'https://www.3dxo.com/images/textures/s/arroway.de_concrete19_d100.png'
const wall = 'https://lh6.googleusercontent.com/rYJVgxK9pNiNYFqm3mST0nevMkk22dh1ILPkdB5vg_yFGyiw3ADbSHFmmdEx--U7E4Q=w2400'

class Player {
    constructor() {
        this.offset = {
            right: .7,
            left: .4
        }
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

        this.idleRight = [
            createImage('https://lh6.googleusercontent.com/hMjRHJ9yDt2PtmFeepDxxOroI1yMhTNiG2NBNzRU1ADfO73V2W6qRtYXEjBYTyFqNvI=w2400'),
            createImage('https://lh5.googleusercontent.com/0ijfzBWqp4cnNwpAnoxG5qAJCONS8emGn-48G3gBvgeduzcGGzFcgOO00o_gFTGkm7s=w2400'),
            createImage('https://lh4.googleusercontent.com/dsqLR7ZOBC_e6-AAfp_CCWUjYv-8EtkMF-h_ZsrF8zHKdMOAuzIOg-bIA4gs-cJMbOY=w2400'),
            createImage('https://lh4.googleusercontent.com/CoQ6peH_EhiUKG6PyviGS9FSAeRSlbrOe05dpytR3iGfeo2yJOxp6ugFuHgU9DgYbl4=w2400'),
            createImage('https://lh3.googleusercontent.com/hU-bI5L8cEA2l-eq77l6TW1XRrtlKMV9rC-SuNACRydKwFyyi1GPoCoRo8kgffyPGVs=w2400'),
            createImage('https://lh4.googleusercontent.com/QazKj8HiKz9_Fb18wm50j_NsPDakil2pZ5uEG6ec2OOI7sTiznBdYyuTAqNEmKVdDaA=w2400'),
            createImage('https://lh5.googleusercontent.com/5J39P1VUJN9W1Ru-ixM-gg5OS1_UD6Z9Q3e6pUEGj6BUJEh8eBomFVQ9ves5HJtftXQ=w2400'),
            createImage('https://lh5.googleusercontent.com/V_LKmjW_vSBQPJMnXSm_UndzgAptAZLWlLn0GU95LjefDz-tJP_uGJvCHWe2-9Iyhbs=w2400'),
            createImage('https://lh3.googleusercontent.com/nmDT0FF3_nkLJAJCZVDpCsKKbN3HUJHJ8WjfuJ042yvt8sIFgv1o3KqjPhzrdVUvPj8=w2400'),
            createImage('https://lh4.googleusercontent.com/D4JNurAnNNGEwucon6fFaBy_3tmvGxiiwXKyVUx2lHDJSd33Z9XKJ2BP2KMUSoa7HAk=w2400'),
            createImage('https://lh3.googleusercontent.com/Z05f1JlgNlBiqwO0mQqZAvXv6L0R7NifP9g_vNsz9lrrL6q9Ify9BanXbJuUaD240ys=w2400'),
            createImage('https://lh3.googleusercontent.com/T0OeMbPcbQLaaPGfUQq95iNgy3gz8XAmKKUBC1YDGow0QwmRsa4b--QqHv7LAdpP5kM=w2400'),
            createImage('https://lh3.googleusercontent.com/tyY9-5YZD8QxcFUP_eh44o7ep3WbEaOjDrEBAUfKIB9axOqzdAJ8fDF9qAi3FzSREU8=w2400'),
            createImage('https://lh4.googleusercontent.com/tX-Tx9TZPhUREJgTKqkgVFHcZAPQ1fNMvJKihttHF7T4eBQeFzV2Y1Ap9An2eSOoLUc=w2400'),
            createImage('https://lh5.googleusercontent.com/ilOWp-xxHOf0Z4I8lJeuOAhD42v1NB3R-vXjv7OwFWnLrC-45H09aii6NEGl4w7v5fA=w2400')
        ]

        this.up = [
            createImage('https://lh4.googleusercontent.com/ywYXnumHdZkChuCJh1g3H564UMZzlg19jyBE8N0TutrG2BoSPi9XTTYFOmV2POdkrFM=w2400'),
            createImage('https://lh4.googleusercontent.com/JVIIcBnr0IExdyoR15mz_S7BijaVwyVrUSzqD2VRQ4lMs7-6vJyd2-H0MeNx6OrOqMU=w2400'),
            createImage('https://lh3.googleusercontent.com/3WrSlHGXALLbkF1qHKymioyD_YnEP9ZAeLwnXWVcdAa38J-1Js9Hq2Z9rA0r2XyHEGg=w2400'),
            createImage('https://lh6.googleusercontent.com/Y-0DwetJeNJPFz0RJD9n8WI2GKZz8awZycP1EMfCIh6iEH76zYz_nw546L3QkVNy6BM=w2400'),
            createImage('https://lh6.googleusercontent.com/VLHBQ9PH8otmpFsyIVGThzFDhMbRIf0AB2OcSkm2JM1zPYIW61j_nGifvJ0pgzUkg7I=w2400'),
            createImage('https://lh4.googleusercontent.com/5dyJB2eDPDaNmtiNuF0qI85zB3Fsk5tuG9zGHlxGtzY76mmXC56vdf3GW50ZphzC0jE=w2400'),
            createImage('https://lh5.googleusercontent.com/hx0u4KIVaYMzU-4K6UOsU-YWD4Y4KytaJ6H49BusW2LvpGtD8vIJv4zv29roQuAV0X4=w2400'),
            createImage('https://lh4.googleusercontent.com/QqMsuU-0K7vDPmPj_eAftAKRC9Bd-NI7yjR_vgTp3hsKwVDTlGS4VP_OCQnn1MuFv4E=w2400'),
            createImage('https://lh4.googleusercontent.com/R_AHScYvB-YZF7oAUu0NaYhxFEgFy0QRiHQR6iZGVqocQ9ErwJjDzdE-sN5-wPtJMHU=w2400'),
            createImage('https://lh4.googleusercontent.com/WtjqDe8m4qKh9i-1tSQt2Vm9fvqcXY_KVx-xUBVjCYhqGQx58uU9di3uE2JFG6Kclbk=w2400')
        ]

        this.walkRight = [
            createImage('https://lh3.googleusercontent.com/Jjji4RDs7ao1vRzAZR-kQIIbuhaiJUTb4eD0d7X7g6oWNL3jIhU9t1xpki7b4fhba20=w2400'),
            createImage('https://lh4.googleusercontent.com/le9IxeIoxILYNs0hmq8TMzNT8SokHvVSUgDW37KIJpup3_gs80tPfx1CGxftT6pVF90=w2400'),
            createImage('https://lh3.googleusercontent.com/b6vXNSZVpMm-jEAtkSSgW0WlO7-QWSxBRAY53-1MuafXVeiMIleNiLMDvs6l2efXirA=w2400'),
            createImage('https://lh5.googleusercontent.com/tU1g3KbZxDoMw9bJWSpk6E9HKyOV53DA2XmZ-KxT31ajAFOyxWHU8a2S-JqDs364EZw=w2400'),
            createImage('https://lh3.googleusercontent.com/bTijT6bcspu1x5-CLIv25quinaQM8wQIC1i3LehxnSXeLxdu3vOVAZuyVx9gDTEfqYY=w2400'),
            createImage('https://lh4.googleusercontent.com/cwtlf25lcGwqWKj-UDccVn7Xps9ydNOIyQzP-T5gLyKiS2h5pkyvB86Vsw6O8mOtDyQ=w2400'),
            createImage('https://lh4.googleusercontent.com/s5HRFeC1A-KNvJfdXURvaEROnTkQ52bXDsRYC6dZx5PhfvtLsq4Hbgp6zQEXUd7ZQpM=w2400'),
            createImage('https://lh6.googleusercontent.com/ciHPxVZlrjeGeV87G7Gd2bWoaHjGFVKNUw775TonQ3HvC5biCbjjW-rRt2MElMcpuus=w2400'),
            createImage('https://lh5.googleusercontent.com/cWPRBjMjape0YVVcZAG1I4yulPeki7NmXkF1LGPd6v5MlQ3w4QMO9-WTc-qkY0DA2eE=w2400'),
            createImage('https://lh3.googleusercontent.com/BE0CZuIfdXg9Q5MEO8azB9qciA2We-f0nqauPUrcjyLF8wc8nKJuq29LsybBgpv7CTc=w2400'),
            createImage('https://lh6.googleusercontent.com/5nkWMyo-utKNUNwyH68FftOXcW_JH6_x_vaXhzGGiPt2ITOdRxGPJQyYxir3h0_9KDw=w2400'),
            createImage('https://lh4.googleusercontent.com/xLDJmHdvU-LwJdf-2RGKPP5TabfjpFNNsWryDc3qwLicWK9AjsgTczKG8vMOruxkBG8=w2400'),
            createImage('https://lh3.googleusercontent.com/D6MPqkr-461eCeVr97gIOuqPyS68QQ_kIv-J2UOGG0ScrHVraXFSiMZogDTjLS_XLHg=w2400'),
            createImage('https://lh6.googleusercontent.com/s9mOhKrLoEQe2xFUlXJGpNnSBC7_68GzWionVSIGfBqpgwr58paR7zMMH0y2JwS0GeU=w2400'),
            createImage('https://lh3.googleusercontent.com/lbQfjC5qgQeSSwFu02DeOhEaaXHah0faxMnU6sCOZKuyh9ZZyLARtdpMoKv7f7y5aFg=w2400'),
            createImage('https://lh6.googleusercontent.com/nh4XkTXmReKk00FqtQW_g_3j4Qp_JCvhOHd4Q9vqpHB-3dAZ9vrRQOrzykcwJYVxtQs=w2400'),
            createImage('https://lh5.googleusercontent.com/OIMOT2fr8lDfLa7Tu4J25m81SVkd-eFAj73kzgeo-DkjMentLw7lFoShfs0wHqF1o7o=w2400'),
            createImage('https://lh3.googleusercontent.com/SUvseo3V8jyqjlhknUqEK5Fjg9Jjzn1Q06Bf0shYyfeQIhV5SVmbXuUPV16duWz1nHw=w2400'),
            createImage('https://lh6.googleusercontent.com/dhsvSl0h18TmocwU5NlhYe8ed8mS0jriyzJ0hPymrnc8cKdpug-4yx8YXrdtb-axlck=w2400'),
            createImage('https://lh6.googleusercontent.com/p6Xu7hHWXvIVh8I7p3FFNXLmNMe_FNbTRvOrW1UCXx9nlnUEr0my9lrbf1cufevTG1A=w2400'),
        ]

        this.frames = 0
    }

    draw() {
        console.log(bound.upper + " : " + this.position.x)
        if(this.velocity.y < 0 || this.velocity.y > 0)
            c.drawImage(this.up[Math.floor(this.frames) % 10], this.position.x, this.position.y, this.width, this.height)
        else if(this.velocity.y == 0 && (this.velocity.x > 0 || scrollOffset > 0))
            c.drawImage(this.walkRight[Math.floor(this.frames) % 20], this.position.x, this.position.y, this.width, this.height)
        else if((this.velocity.x == 0 || scrollOffset == 0) && this.velocity.y == 0)
            c.drawImage(this.idleRight[Math.floor(this.frames) % 15], this.position.x, this.position.y, this.width, this.height)

    }

    update() {
        this.frames += .12
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
        //this.img = createImage('https://lh4.googleusercontent.com/prw19UGuul909ffRZVSvo2kqKiXkI06o-VGCeY0ei2Jqx1Ejp6CUSJMhkuNgrTzaaN0=w2400')
        this.img = createImage(wall)
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
    constructor({x, y, width}) {
        super({x: x, y: y})
        this.width = width
        this.height = 1
        this.offset = {
            x: 0,
            y: 0
        }
    }
    
    collision(player) {
        return player.position.y + player.height <= this.position.y + this.offset.y &&
            player.position.y + player.height + player.velocity.y >= this.position.y + this.offset.y &&
            player.position.x + player.width * player.offset.right >= this.position.x + this.offset.x &&
            player.position.x + player.width * player.offset.left <= this.position.x + this.width - this.offset.x
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [
    new Rectangle({x: canvas.width * .24, y: canvas.height * .38, width: 100})
    // new Rectangle({x: -500, y: canvas.height - 100, width: 20000, height: 200, src: floor, offset: [0, .2]}),
    // new Rectangle({x: 100, y: 500, width: 200, height: 200, src: flatVolume, offset: [.1, .2]}),
    // new Rectangle({x: 200, y: 200, width: 400, height: 100, src: flatVolume, offset: [.1, .2]})
]
const genericObjects = [
    new GenericObject({x: 0, y: 0})
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
        player.position.x + player.width < bound.upper) {
        player.velocity.x = player.speed
    } else if (keys.left.pressed &&
        player.position.x > bound.lower) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0
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