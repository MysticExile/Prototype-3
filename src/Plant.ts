import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Plant extends PIXI.Sprite {

    game: Game
    private plantName: string
    private secondaryTexture: PIXI.Texture
    private tertiaryTexture: PIXI.Texture
    private primaryTexture: PIXI.Texture

    constructor(texture: PIXI.Texture, secondaryTexture: PIXI.Texture, tertiaryTexture: PIXI.Texture, game: Game) {
        super(texture);
        this.primaryTexture = texture;
        this.secondaryTexture = secondaryTexture;
        this.tertiaryTexture = tertiaryTexture;
        this.game = game;
        this.y = this.game.getRandomInt(0, 450);
        this.x = this.game.getRandomInt(0, 800);
        this.width = 50
        this.height = 70
    }

    setPlantName(plantName: string) {
        this.plantName = plantName;
    }

    getPlantName() {
        return this.plantName;
    }

    hit(modulo: number) {
        if (modulo % 2 == 0) {
            this.texture = this.secondaryTexture;
            this.plantName = "Violet";
        }
        else {
            this.texture = this.tertiaryTexture;
            this.plantName = "Zonnebloem";
        }
    }

    update(delta: number) {
        this.x -= 2
        if (this.x <= -100) {
            this.x = 850;
            this.y = this.game.getRandomInt(0, 450);
            this.texture = this.primaryTexture;

        }
    }
}