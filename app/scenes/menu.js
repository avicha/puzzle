import BaseScene from './base'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Text from '../../prime/ui/text'
import Button from '../../prime/ui/button'
import Maze from '../utils/maze'
import resources from '../resources'
import TWEEN from '../../prime/tween'

export default class Menu extends BaseScene {
    constructor(game) {
        super(game)
        let stageColor = game.context.createLinearGradient(0, 0, 0, this.game.stageHeight)
        stageColor.addColorStop(0, '#fff9c4')
        stageColor.addColorStop(1, '#ffb74d')
        game.opts.stageColor = stageColor
        this.puzzle = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 100, 1, { text: 'P  U  Z  Z  L  E', fontColor: '#ff8a65', fontSize: 100, lineHeight: 150, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.beginBtn = this.addGameObject(new Button(this.game.renderStageZone.pivot.x, this.game.renderStageZone.pivot.y - 50, 1, { text: '开 始', fontColor: '#f5ead6', fontSize: 28, lineHeight: 28, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, width: 180, height: 68, borderColor: '#ff8a65', borderWidth: 4, isFilled: true }))
        this.settingBtn = this.addGameObject(new Button(this.game.renderStageZone.pivot.x, this.game.renderStageZone.pivot.y + 50, 1, { text: '排 行 榜', fontColor: '#f5ead6', fontSize: 28, lineHeight: 28, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, width: 180, height: 68, borderColor: '#ff8a65', borderWidth: 4, isFilled: true }))
        this.maze = new Maze(6, 20)
        this.maze.make()
        this.maze.startAt(0, 1, 'up').endAt(5, 18, 'down').begin()
        this.mazeCeilSize = new Vector2(50, 30)
        this.mazePosition = new Vector2(this.game.renderStageZone.left + (this.game.renderStageZone.width - this.maze.columns * this.mazeCeilSize.x) / 2, this.game.renderStageZone.bottom - this.maze.rows * this.mazeCeilSize.y - 50)
        this.mazeCurrentPos = {
            x: this.mazePosition.x + (this.maze.startPos.column + 0.5) * this.mazeCeilSize.x,
            y: this.mazePosition.y + (this.maze.startPos.row + 0.5) * this.mazeCeilSize.y
        }
        this.mazeEndPos = {
            x: this.mazePosition.x + (this.maze.endPos.column + 0.5) * this.mazeCeilSize.x,
            y: this.mazePosition.y + (this.maze.endPos.row + 0.5) * this.mazeCeilSize.y
        }
        this.maze.resolve(this.maze.startPos, this.maze.endPos)
        let mazeResolveResult = this.maze.getResolveResult()
        let mazeXTween = []
        let mazeYTween = []
        mazeResolveResult.forEach(pos => {
            mazeXTween.push(this.mazePosition.x + (pos.column + 0.5) * this.mazeCeilSize.x)
            mazeYTween.push(this.mazePosition.y + (pos.row + 0.5) * this.mazeCeilSize.y)
        })
        this.mazeTween = new TWEEN.Tween(this.mazeCurrentPos).to({ x: mazeXTween, y: mazeYTween }, 500 * mazeResolveResult.length).easing(TWEEN.Easing.Linear.None).repeat(Infinity).start()
        this.on('tap', e => {
            switch (e.target) {
                case this.beginBtn:
                    this.leave(() => {
                        this.trigger('switchScene', 'stage')
                    })
                    break
            }
        })
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.strokeStyle = '#f5ead6'
        ctx.lineWidth = 4
        for (let i = 0; i < this.maze.rows; i++) {
            for (let j = 0; j < this.maze.columns; j++) {
                let ceil = this.maze.ceils[i][j]
                if (ceil.walls[0]) {
                    ctx.moveTo(this.mazePosition.x + j * this.mazeCeilSize.x, this.mazePosition.y + i * this.mazeCeilSize.y)
                    ctx.lineTo(this.mazePosition.x + (j + 1) * this.mazeCeilSize.x, this.mazePosition.y + i * this.mazeCeilSize.y)
                }
                if (ceil.walls[1]) {
                    ctx.moveTo(this.mazePosition.x + (j + 1) * this.mazeCeilSize.x, this.mazePosition.y + i * this.mazeCeilSize.y)
                    ctx.lineTo(this.mazePosition.x + (j + 1) * this.mazeCeilSize.x, this.mazePosition.y + (i + 1) * this.mazeCeilSize.y)
                }
                if (ceil.walls[2]) {
                    ctx.moveTo(this.mazePosition.x + (j + 1) * this.mazeCeilSize.x, this.mazePosition.y + (i + 1) * this.mazeCeilSize.y)
                    ctx.lineTo(this.mazePosition.x + j * this.mazeCeilSize.x, this.mazePosition.y + (i + 1) * this.mazeCeilSize.y)
                }
                if (ceil.walls[3]) {
                    ctx.moveTo(this.mazePosition.x + j * this.mazeCeilSize.x, this.mazePosition.y + (i + 1) * this.mazeCeilSize.y)
                    ctx.lineTo(this.mazePosition.x + j * this.mazeCeilSize.x, this.mazePosition.y + i * this.mazeCeilSize.y)
                }
                ctx.stroke()
            }
        }
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(this.mazeCurrentPos.x, this.mazeCurrentPos.y)
        ctx.fillStyle = '#f5ead6'
        ctx.arc(this.mazeCurrentPos.x, this.mazeCurrentPos.y, 6, 0, 360, false)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(this.mazeEndPos.x, this.mazeEndPos.y)
        ctx.fillStyle = '#ef5350'
        ctx.arc(this.mazeEndPos.x, this.mazeEndPos.y, 6, 0, 360, false)
        ctx.fill()
        ctx.closePath()
        super.draw(ctx)
    }
}