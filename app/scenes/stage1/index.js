import StageSelectorScene from '../stage_selector'
import resources from '../../resources'

export default class StageSelector1 extends StageSelectorScene {
    static getResources() {
        return super.getResources().concat([resources.paper_dog_thumb, resources.paper_happy_thumb, resources.paper_fish_thumb, resources.paper_shanxi_thumb, resources.paper_magpie_thumb, resources.paper_horse_thumb])
    }
    constructor(game) {
        let stageData = {
            title: '还    原',
            desc: '把 错 乱 的 剪 纸 回 到 最 初 的 状 态',
            scenes: [{
                scene: 'scene1_1',
                stage: '1-1',
                texture: resources.paper_dog_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_2',
                stage: '1-2',
                texture: resources.paper_happy_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_3',
                stage: '1-3',
                texture: resources.paper_fish_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_4',
                stage: '1-4',
                texture: resources.paper_shanxi_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_5',
                stage: '1-5',
                texture: resources.paper_magpie_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_6',
                stage: '1-6',
                texture: resources.paper_horse_thumb,
                type: 'stageSelector'
            }]
        }
        super(game, stageData)
    }
}