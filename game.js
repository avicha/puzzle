import Engine from 'prime/engine'
import Scene1 from 'app/scenes/scene1'
import Adapter from 'app/adapter'

let game = new Engine({ debug: true, stageScaleMode: 'cover', fps: 60, orientation: 'landscape' })
game.setStageSize(1780, 750)
game.launch(Scene1)
game.on('switchScene', (sceneName, ...args) => {
    switch (sceneName) {
        default: return game.launch(Scene1, ...args)
    }
})
game.on('error', ({ message, stack }) => {
    console.error(message)
})