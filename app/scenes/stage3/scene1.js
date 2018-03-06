import Stage3 from './base'
import resources from '../../resources'

export default class Scene3_1 extends Stage3 {
    static getResources() {
        return super.getResources().concat([resources.painting_flower, resources.painting_flower_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_flower, drawingPieceTexture: resources.painting_flower_piece, steps: 2, name: 'scene3-1', nextScene: 'scene3-2', title: '花 瓶 里 的 花' })
    }
}