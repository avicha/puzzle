import Stage3 from './base'
import resources from '../../resources'

export default class Scene3_1 extends Stage3 {
    static getResources() {
        return super.getResources().concat([resources.hexagram, resources.white_triangle1, resources.white_triangle2, resources.white_triangle3, resources.green_triangle1, resources.green_triangle2, resources.green_triangle3])
    }
    constructor(game) {
        super(game, { title: '六角星', name: 'scene3-1', nextScene: 'scene3-2', drawingTexture: resources.hexagram, patterns: [resources.white_triangle1, resources.white_triangle2, resources.white_triangle3, resources.green_triangle1, resources.green_triangle2, resources.green_triangle3] })
    }
}