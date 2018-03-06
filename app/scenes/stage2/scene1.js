import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_1 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_flower, resources.painting_flower_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_flower, drawingPieceTexture: resources.painting_flower_piece, steps: 2, name: 'scene2-1', nextScene: 'scene2-2', title: '花 瓶 里 的 花' })
    }
}