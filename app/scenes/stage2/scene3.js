import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_3 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.mother, resources.mother_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.mother, drawingPieceTexture: resources.mother_piece, steps: 4, name: 'scene2_3', nextScene: 'scene2_4', title: '画 家 母 亲 肖 像', desc: '这 是 画 家 惠 斯 勒 为 母 亲 创 作 的 作 品，\n被 誉 为 19 世 纪 最 伟 大 的 肖 像 画 之 一，\n现 藏 于 法 国 巴 黎 奥 赛 博 物 馆。\n  ——  惠 斯 勒《 画 家 母 亲 肖 像 》' })
    }
}