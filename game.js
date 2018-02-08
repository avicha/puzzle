import Engine from 'prime/engine'
import Menu from 'app/scenes/menu'
import Stage from 'app/scenes/stage'
import Scene1 from 'app/scenes/scene1'
import Adapter from 'app/adapter'

let game = new Engine({ debug: false, stageScaleMode: 'cover', fps: 60, orientation: 'landscape' })
game.setStageSize(1780, 750)
game.launch(Menu)
game.on('switchScene', (sceneName, ...args) => {
    switch (sceneName) {
        case 'menu':
            return game.launch(Menu, ...args)
        case 'stage':
            return game.launch(Stage, ...args)
        case 'scene1':
            return game.launch(Scene1, ...args)
    }
})
game.on('error', ({ message, stack }) => {
    console.error(message)
})