import hills from '../img/hills.png'
import background from '../img/background.png'
import platform from '../img/platform.png'
import platformSmallTall from '../img/platformSmallTall.png'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.5

class Player {
  constructor() {
    this.speed = 10
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30

  }
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    }

  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = { x, y }
    this.image = image
    this.width = image.width
    this.height = image.height

  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)

  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = { x, y }
    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)

  }
}

const createImage = (imageSrc) => {
  const image = new Image()
  image.src = imageSrc
  return image
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let player = new Player()
let platforms = []
let genericObjects = []

let scrollOffset = 0

const init = () => {
  platformImage = createImage(platform)

  player = new Player()
  platforms = [
    new Platform({ x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width, y: 270, image: createImage(platformSmallTall) }),
    new Platform({ x: -1, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 2 + 100, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 3 + 300, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 4 + 300 - 2, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 5 + 700 - 2, y: 470, image: platformImage }),

  ]

  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: createImage(background) }),
    new GenericObject({ x: -1, y: -1, image: createImage(hills) }),]

  scrollOffset = 0
}


const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
}


init()
const animate = () => {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  genericObjects.forEach(object => {
    object.draw()
  })

  platforms.forEach(platform => {
    platform.draw()
  })

  player.update()
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach(platform => {
        platform.position.x -= player.speed
      })
      genericObjects.forEach(object => {
        object.position.x -= player.speed * .66
      })
    } else if (keys.left.pressed) {
      scrollOffset -= player.speed
      platforms.forEach(platform => {
        platform.position.x += player.speed
      })
      genericObjects.forEach(object => {
        object.position.x += player.speed * .66
      })
    }
  }

  // platform collision detection
  platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0
    }
  })

  // win condition
  if (scrollOffset > platformImage.width * 5 + 350 - 2) {
    console.log('you win')
  }

  // lose condition
  if (player.position.y > canvas.height) {
    console.log('you lose')
    init()
  }

}

animate()


addEventListener('keydown', ({ code }) => {

  switch (code) {
    case 'KeyA':
    case 'ArrowLeft':
      keys.left.pressed = true
      break

    case 'KeyD':
    case 'ArrowRight':
      keys.right.pressed = true
      break

    case 'KeyW':
    case 'ArrowUp':
    case 'Space':
      if (player.velocity.y === 0) {
        player.velocity.y -= 25
      }
      break

    case 'KeyS':
    case 'ArrowDown':
      break
  }
})


addEventListener('keyup', ({ code }) => {

  switch (code) {
    case 'KeyA':
    case 'ArrowLeft':
      keys.left.pressed = false
      break

    case 'KeyD':
    case 'ArrowRight':
      keys.right.pressed = false
      break

    case 'KeyW':
    case 'ArrowUp':
      break

    case 'KeyS':
    case 'ArrowDown':
      break
  }
})