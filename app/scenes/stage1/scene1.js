import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_1 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.clock, resources.clock_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.clock, drawingPieceTexture: resources.clock_piece, steps: 10, nextScene: 'scene1_2' })
    }
}