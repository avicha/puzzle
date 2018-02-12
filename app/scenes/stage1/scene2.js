import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_2 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.bird, resources.bird_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.bird, drawingPieceTexture: resources.bird_piece, steps: 2, name: 'scene1_2', nextScene: 'scene1_3', title: '黄  莺  🐦', desc: '留 连 戏 蝶 时 时 舞 ，\n自 在 娇 莺 恰 恰 啼。\n  ——  杜甫《江畔独步寻花·其六》' })
    }
}