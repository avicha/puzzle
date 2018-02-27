import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_1 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_flower, resources.painting_flower_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_flower, drawingPieceTexture: resources.painting_flower_piece, steps: 2, name: 'scene2_1', nextScene: 'scene2_2', title: '花 瓶 里 的 花', desc: '这 是 美 国 艺 术 家 Maurice Prendergast\n创 作 于 1910 - 1913 的 油 画，\n现 藏 于 美 国 布 鲁 克 林 博 物 馆。\n  ——  莫 里 斯《 花 瓶 里 的 花 》' })
    }
}