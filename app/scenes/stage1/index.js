import StageSelectorScene from '../stage_selector'
import resources from '../../resources'

export default class StageSelector1 extends StageSelectorScene {
    static getResources() {
        return super.getResources().concat([resources.chrysanthemum_thumb, resources.tree_thumb, resources.lotus_thumb, resources.horse_thumb, resources.bird_thumb, resources.butterfly_thumb])
    }
    constructor(game) {
        let stageData = {
            title: '还    原',
            desc: '把 错 乱 的 拼 图 回 到 最 初 的 状 态',
            scenes: [{
                scene: 'scene1_1',
                stage: '1-1',
                texture: resources.chrysanthemum_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_2',
                stage: '1-2',
                texture: resources.tree_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_3',
                stage: '1-3',
                texture: resources.lotus_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_4',
                stage: '1-4',
                texture: resources.horse_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_5',
                stage: '1-5',
                texture: resources.bird_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_6',
                stage: '1-6',
                texture: resources.butterfly_thumb,
                type: 'stageSelector'
            }]
        }
        super(game, stageData)
    }
}