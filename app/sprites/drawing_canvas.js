import Sprite from '../../prime/sprite'
import Adapter from '../adapter'

export default class DrawingCanvas extends Sprite {
    constructor(...args) {
        super(...args)
        this.canvas = Adapter.createCanvas()
        this.canvas.width = this.shape.width
        this.canvas.height = this.shape.height
        this.context = this.canvas.getContext('2d')

    }
    addPattern(pattern, pos) {
        pattern.drawTile(this.context, pos.x, pos.y)
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = '#f5ead6'
        ctx.fillRect(this.position.x, this.position.y, this.canvas.width, this.canvas.height)
        ctx.closePath()
        ctx.drawImage(this.canvas, this.position.x, this.position.y)
        ctx.beginPath()
        ctx.fillStyle = '#424242'
        ctx.fillRect(this.position.x + this.shape.pivot.x - 4, this.position.y + this.shape.pivot.y - 4, 8, 8)
        ctx.closePath()
    }
    reset() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    rotate(deg) {
        let canvas = Adapter.createCanvas()
        canvas.width = this.canvas.width
        canvas.height = this.canvas.height
        let context = canvas.getContext('2d')
        context.drawImage(this.canvas, 0, 0)
        this.context.save()
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2)
        this.context.rotate(deg)
        this.context.translate(-this.canvas.width / 2, -this.canvas.height / 2)
        this.context.drawImage(canvas, 0, 0)
        this.context.restore()
    }
}