import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_5 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_mona_lisa, resources.painting_mona_lisa_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_mona_lisa, drawingPieceTexture: resources.painting_mona_lisa_piece, steps: 7, name: 'scene2_5', nextScene: 'scene2_6', title: '蒙 娜 丽 莎', desc: '这 是 意 大 利 画 家 达 芬 奇 的 作 品，\n创 作  于 欧 洲 文 艺 复 兴 时 期，\n现 藏 于 法 国 罗 浮 宫 博 物 馆。\n  ——  达 芬 奇《 蒙 娜 丽 莎 》' })
    }
}