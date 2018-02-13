import Scene from '../../prime/scene'
import TWEEN from '../../prime/tween'

export default class BaseScene extends Scene {
    constructor(game) {
        super()
        this.game = game
        this.enter()
    }
    enter(callback) {
        this.opacity = 1
        this.enteringTween = new TWEEN.Tween(this).to({ opacity: 0 }, 1000).easing(TWEEN.Easing.Quadratic.Out).start()
        if (callback) {
            this.enteringTween.onComplete(callback)
        }
    }
    update(dt) {
        super.update(dt)
        TWEEN.update()
    }
    draw(ctx) {
        super.draw(ctx)
        if (this.opacity) {
            ctx.fillStyle = `rgba(56,56,56,${this.opacity})`
            ctx.fillRect(this.game.renderStageZone.left, this.game.renderStageZone.top, this.game.renderStageZone.width, this.game.renderStageZone.height)
        }
    }
}