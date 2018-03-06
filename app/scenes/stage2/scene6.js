import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_6 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_cows, resources.painting_cows_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_cows, drawingPieceTexture: resources.painting_cows_piece, steps: 9, name: 'scene2-6', nextScene: 'stage3', title: '百 骏 图' })
    }
}