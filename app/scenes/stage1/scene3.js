import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_3 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_fish, resources.paper_fish_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_fish, drawingPieceTexture: resources.paper_fish_piece, currentRow: 2, currentColumn: 2, steps: 20, name: 'scene1_3', nextScene: 'scene1_4', title: '年 年 有 余', desc: '莲 花、鲤 鱼，\n是 中 国 传 统 的 吉 祥 元 素，\n喻 示 生 活 富 足，年 年 有 余。' })
    }
}