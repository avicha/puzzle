import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_3 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_mother, resources.painting_mother_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_mother, drawingPieceTexture: resources.painting_mother_piece, steps: 4, name: 'scene2-3', nextScene: 'scene2-4', title: '画 家 母 亲 肖 像' })
    }
}