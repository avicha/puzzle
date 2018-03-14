import Engine from 'prime/engine'
import Menu from 'app/scenes/menu'
import StageSelector1 from 'app/scenes/stage1/index'
import StageSelector2 from 'app/scenes/stage2/index'
import Scene1_1 from 'app/scenes/stage1/scene1'
import Scene1_2 from 'app/scenes/stage1/scene2'
import Scene1_3 from 'app/scenes/stage1/scene3'
import Scene1_4 from 'app/scenes/stage1/scene4'
import Scene1_5 from 'app/scenes/stage1/scene5'
import Scene1_6 from 'app/scenes/stage1/scene6'
import Scene2_1 from 'app/scenes/stage2/scene1'
import Scene2_2 from 'app/scenes/stage2/scene2'
import Scene2_3 from 'app/scenes/stage2/scene3'
import Scene2_4 from 'app/scenes/stage2/scene4'
import Scene2_5 from 'app/scenes/stage2/scene5'
import Scene2_6 from 'app/scenes/stage2/scene6'
import Adapter from 'app/adapter'

let game = new Engine({ debug: false, stageScaleMode: 'cover', fps: 60, orientation: 'landscape' })
game.setStageSize(1780, 750)
Adapter.setStorage('scene1-1_active', true)
game.launch(Menu)
game.on('switchScene', (sceneName, ...args) => {
    game.pause()
    game._context.fillStyle = '#383838'
    game._context.fillRect(0, 0, game._canvas.width, game._canvas.height)
    switch (sceneName) {
        case 'menu':
            return game.launch(Menu, ...args)
        case 'stage1':
            return game.launch(StageSelector1, ...args)
        case 'stage2':
            return game.launch(StageSelector2, ...args)
        case 'scene1-1':
            return game.launch(Scene1_1, ...args)
        case 'scene1-2':
            return game.launch(Scene1_2, ...args)
        case 'scene1-3':
            return game.launch(Scene1_3, ...args)
        case 'scene1-4':
            return game.launch(Scene1_4, ...args)
        case 'scene1-5':
            return game.launch(Scene1_5, ...args)
        case 'scene1-6':
            return game.launch(Scene1_6, ...args)
        case 'scene2-1':
            return game.launch(Scene2_1, ...args)
        case 'scene2-2':
            return game.launch(Scene2_2, ...args)
        case 'scene2-3':
            return game.launch(Scene2_3, ...args)
        case 'scene2-4':
            return game.launch(Scene2_4, ...args)
        case 'scene2-5':
            return game.launch(Scene2_5, ...args)
        case 'scene2-6':
            return game.launch(Scene2_6, ...args)
    }
})
game.on('error', ({ message, stack }) => {
    console.error(message)
})