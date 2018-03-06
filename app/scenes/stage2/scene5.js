import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_5 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_mona_lisa, resources.painting_mona_lisa_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_mona_lisa, drawingPieceTexture: resources.painting_mona_lisa_piece, steps: 7, name: 'scene2-5', nextScene: 'scene2-6', title: '蒙 娜 丽 莎' })
    }
}