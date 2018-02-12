import Sprite from '../../prime/sprite'
import resources from '../resources'
import Rectangle from '../../prime/rectangle'
import Text from '../../prime/ui/text'
import Button from '../../prime/ui/button'
import Adapter from '../adapter'

export default class PassModal extends Sprite {
    constructor(...args) {
        super(...args)
        this.shape = new Rectangle(0, 0, this.width, this.height)
        this.canvas = Adapter.createCanvas()
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context = this.canvas.getContext('2d')
        this.context.fillStyle = '#ff8a65'
        this.context.fillRect(0, 0, this.width, this.height)
        let title = new Text(this.width / 2, this.height * 0.1, 1, { text: this.title, fontColor: '#fafafa', fontSize: 50, lineHeight: 50, align: 'center', valign: 'top' })
        this.context.drawImage(title.canvas, title.position.x, title.position.y)
        if (this.desc) {
            let desc = new Text(this.width / 2, this.height * 0.4, 1, { text: this.desc, fontColor: '#fafafa', fontSize: 32, lineHeight: 80, align: 'center', valign: 'top' })
            this.context.drawImage(desc.canvas, desc.position.x, desc.position.y)
        }
        let next = new Button(this.width / 2, this.height * 0.8, 1, { text: '下一关', fontColor: '#ff8a65', fontSize: 32, lineHeight: 32, width: 180, height: 68, align: 'center', valign: 'top', borderColor: '#fafafa', isFilled: true })
        next.draw(this.context)
    }
    draw(ctx) {
        super.draw(ctx)
    }
}