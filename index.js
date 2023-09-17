const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth // full width
canvas.height = innerHeight // full height
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.width = 30
    this.height = 30

  }
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

}


const player = new Player()

player.draw()





