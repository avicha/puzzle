import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_4 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.kiss, resources.kiss_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.kiss, drawingPieceTexture: resources.kiss_piece, steps: 5, name: 'scene2_4', nextScene: 'scene2_5', title: '吻', desc: '这 是 奥 地 利 画 家 Gustav Klimt 创 作 于 1908 年 的 油 画，\n画 中 使 用 金 银 装 饰 色 彩，\n现 藏 于 奥 地 利 国 家 美 术 馆。\n  ——  克 里 姆 特 《 吻 》' })
    }
}