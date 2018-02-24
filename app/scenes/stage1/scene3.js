import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_3 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.lotus, resources.lotus_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.lotus, drawingPieceTexture: resources.lotus_piece, currentRow: 0, currentColumn: 2, steps: 30, name: 'scene1_3', nextScene: 'scene1_4', title: '荷  花', desc: '小 荷 才 露 尖 尖 角，\n早 有 蜻 蜓 立 上 头。\n  ——  杨万里《小池》' })
    }
}