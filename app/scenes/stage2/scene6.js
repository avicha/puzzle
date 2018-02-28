import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_6 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_cows, resources.painting_cows_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_cows, drawingPieceTexture: resources.painting_cows_piece, steps: 9, name: 'scene2_6', nextScene: 'stage3', title: '百 骏 图', desc: '中 国 清 代 宫 廷 画 家 郎 世 宁 所 作，\n骏 马 百 匹，姿 态 各 异，\n是 中 国 十 大 传 世 名 画 之 一。\n  ——  郎 世 宁《 百 骏 图 》' })
    }
}