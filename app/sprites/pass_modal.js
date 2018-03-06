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
        this.titleText = this.scene.addGameObject(new Text(this.position.x + this.width / 2, this.position.y + this.height * 0.1, 1001, { text: this.title, fontColor: '#fafafa', fontSize: 50, lineHeight: 50, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.footprintIcon = this.scene.addGameObject(new Sprite(this.position.x + this.width / 2 - 80, this.position.y + 0.3 * this.height, 1001, { texture: resources.footprint }))
        this.scoreText = this.scene.addGameObject(new Text(this.position.x + this.width / 2 + 20, this.position.y + 0.3 * this.height, 1001, { text: '0', fontColor: '#fafafa', fontSize: 60, lineHeight: 60, align: Text.ALIGN.LEFT, valign: Text.VALIGN.TOP }))
        this.levelstars = []
        for (let i = 0; i < 3; i++) {
            let star = this.scene.addGameObject(new Sprite(this.position.x + this.width / 2 - 150 + i * 120, this.position.y + 0.45 * this.height, 1001, { texture: resources.score_star_empty }))
            this.levelstars.push(star)
        }
        this.level1Text = this.scene.addGameObject(new Text(this.position.x + this.width / 2 - 120, this.position.y + 0.55 * this.height, 1001, { text: `>=${this.steps[1]}`, fontColor: '#fafafa', fontSize: 32, lineHeight: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.level2Text = this.scene.addGameObject(new Text(this.position.x + this.width / 2, this.position.y + 0.55 * this.height, 1001, { text: `< ${this.steps[1]}`, fontColor: '#fafafa', fontSize: 32, lineHeight: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.level3Text = this.scene.addGameObject(new Text(this.position.x + this.width / 2 + 120, this.position.y + 0.55 * this.height, 1001, { text: `< ${this.steps[0]}`, fontColor: '#fafafa', fontSize: 32, lineHeight: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.descText = this.scene.addGameObject(new Text(this.position.x + this.width / 2, this.position.y + 0.7 * this.height, 1001, { text: '耗费步数：', fontColor: '#fafafa', fontSize: 24, lineHeight: 24, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.replayBtn = this.scene.addGameObject(new Button(this.position.x + this.width / 2 - 100, this.position.y + this.height * 0.8, 1001, { text: '重玩', fontColor: '#ff8a65', fontSize: 32, lineHeight: 32, width: 180, height: 68, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, borderColor: '#fafafa', isFilled: true }))
        this.nextBtn = this.scene.addGameObject(new Button(this.position.x + this.width / 2 + 100, this.position.y + this.height * 0.8, 1001, { text: '继续', fontColor: '#ff8a65', fontSize: 32, lineHeight: 32, width: 180, height: 68, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, borderColor: '#fafafa', isFilled: true }))
    }
    setScore(score, best) {
        let stars
        if (score < this.steps[0]) {
            stars = 3
        } else {
            if (score < this.steps[1]) {
                stars = 2
            } else {
                stars = 1
            }
        }
        this.levelstars.forEach((star, i) => {
            if (i < stars) {
                star.texture = resources.score_star_full
            } else {
                star.texture = resources.score_star_empty
            }
        })
        this.scoreText.setText(score.toString())
        this.descText.setText(score < best ? '新最佳通关步数！' : `历史最佳步数  ${best || score}`)
    }
    update(dt) {
        this.titleText.position.y = this.position.y + this.height * 0.1
        this.footprintIcon.position.y = this.position.y + this.height * 0.3
        this.scoreText.position.y = this.position.y + this.height * 0.3
        this.level1Text.position.y = this.position.y + this.height * 0.55
        this.level2Text.position.y = this.position.y + this.height * 0.55
        this.level3Text.position.y = this.position.y + this.height * 0.55
        this.levelstars.forEach(star => {
            star.position.y = this.position.y + this.height * 0.45
        })
        this.descText.position.y = this.position.y + this.height * 0.7
        this.replayBtn.position.y = this.position.y + this.height * 0.8
        this.nextBtn.position.y = this.position.y + this.height * 0.8
    }
    draw(ctx) {
        ctx.fillStyle = '#ff8a65'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}