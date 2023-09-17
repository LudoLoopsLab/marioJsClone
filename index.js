const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth // full width
canvas.height = innerHeight // full height

const gravity = 1.5

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 1
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
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    } else this.velocity.y = 0

  }
}



const player = new Player()
player.update()


const animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.update()
}


animate()


