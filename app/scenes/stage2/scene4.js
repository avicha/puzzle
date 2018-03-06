import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_4 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_kiss, resources.painting_kiss_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_kiss, drawingPieceTexture: resources.painting_kiss_piece, steps: 5, name: 'scene2-4', nextScene: 'scene2-5', title: '吻' })
    }
}