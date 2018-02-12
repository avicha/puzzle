import Scene from '../../prime/scene'
import TWEEN from '../../prime/tween'

export default class BaseScene extends Scene {
    constructor(game) {
        super()
        this.game = game
    }
    enter(callback) {
        this.leavingProgress = 1
        this.leavingTween = new TWEEN.Tween(this).to({ leavingProgress: 0 }, 1000).easing(TWEEN.Easing.Quadratic.Out).start()
        if (callback) {
            this.leavingTween.onComplete(callback)
        }
    }
    leave(callback) {
        this.leavingProgress = 1
        callback()
    }
    update(dt) {
        super.update(dt)
        TWEEN.update()
    }
    draw(ctx) {
        super.draw(ctx)
        if (this.leavingProgress) {
            ctx.fillStyle = `rgba(56,56,56,${this.leavingProgress})`
            ctx.fillRect(this.game.renderStageZone.left, this.game.renderStageZone.top, this.game.renderStageZone.width, this.game.renderStageZone.height)
        }
    }
}