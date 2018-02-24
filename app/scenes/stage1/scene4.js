import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_4 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.horse, resources.horse_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.horse, drawingPieceTexture: resources.horse_piece, currentRow: 0, currentColumn: 3, steps: 20, name: 'scene1_4', nextScene: 'scene1_5', title: '骏  马', desc: '东 市 买 骏 马，\n西 市 买 鞍 鞯。\n  ——  《木兰诗》' })
    }
}