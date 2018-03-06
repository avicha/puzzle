import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_2 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_bedroom, resources.painting_bedroom_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_bedroom, drawingPieceTexture: resources.painting_bedroom_piece, steps: 3, name: 'scene2-2', nextScene: 'scene2-3', title: '卧 室' })
    }
}