import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_2 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.bird, resources.bird_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.bird, drawingPieceTexture: resources.bird_piece, steps: 30, nextScene: 'scene1_3' })
    }
}