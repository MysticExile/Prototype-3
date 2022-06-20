import * as PIXI from 'pixi.js'
import bgImage from "./images/background field.png"
import beeImage from "./images/bee.png"
import plantImage from "./images/basis.png"
import violetImage from "./images/viooltjes.png"
import sunflowerImage from "./images/zonnebloem.png"

import { Background } from './Background'
import { Plant } from './Plant'
import { Bee } from './Bee'

export class Game {

    private pixi: PIXI.Application
    private loader: PIXI.Loader
    private background: Background
    private plant: Plant
    private plants: Plant[] = []
    private bee: Bee

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        //load in textures
        this.loader
            .add('bgTexture', bgImage)
            .add('beeTexture', beeImage)
            .add('plantTexture', plantImage)
            .add('violetTexture', violetImage)
            .add('sunflowerTexture', sunflowerImage)

        this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        //load the textures
        this.background = new Background(this.loader.resources["bgTexture"].texture!, this);
        this.pixi.stage.addChild(this.background);

        for (let i = 0; i < this.getRandomInt(5, 20); i++) {
            this.plant = new Plant(this.loader.resources["plantTexture"].texture!,
                this.loader.resources["violetTexture"].texture!,
                this.loader.resources["sunflowerTexture"].texture!,
                this)
            this.plants.push(this.plant);
            this.pixi.stage.addChild(this.plant);
        }

        this.bee = new Bee(this.loader.resources["beeTexture"].texture!, this)
        this.pixi.stage.addChild(this.bee)
        console.log("Loading completed")
        //start ticker
        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    update(delta: number) {
        for (let [plantNr, plant] of this.plants.entries()) {
            plant.update(delta);
            if (this.collision(plant, this.bee)) {
                plant.hit(plantNr)
                console.log(plantNr)
            }
        }
        this.bee.update();
    }

    collision(plant: Plant, bee: Bee) {
        const bounds1 = plant.getBounds()
        const bounds2 = bee.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    destroyChildren() {
        this.pixi.stage.destroy
    }

    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}

new Game()