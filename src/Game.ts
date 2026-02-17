import { sdk } from '@smoud/playable-sdk';
import * as PIXI from 'pixi.js';
import { TextureAtlas } from '@pixi-spine/base';
import { Spine } from 'pixi-spine';
import { SkeletonJson, AtlasAttachmentLoader } from '@pixi-spine/runtime-4.1';
// Using assets/* alias configured in tsconfig.json for direct assets import
import buttonBg from 'assets/button.png';
import spineboyTexture from 'assets/spineboy.png';
import spineboyAtlasData from 'assets/spineboy.atlas';
import spineboySpineData from 'assets/spineboy.json';

export class Game {
  private app: PIXI.Application;
  private installButton: PIXI.Container;
  private buttonTexture: PIXI.Texture;
  private spineboy: Spine | null = null;

  constructor(width: number, height: number) {
    this.app = new PIXI.Application({
      width,
      height,
      backgroundColor: 0x1c1c1c,
      resolution: 1.5,
      autoDensity: true
    });

    document.body.appendChild(this.app.view as HTMLCanvasElement);

    this.preload();
  }

  private preload(): void {
    PIXI.Assets.load(buttonBg).then((texture) => {
      this.buttonTexture = texture;
      this.loadSpineAnimation();
    });
  }

  private loadSpineAnimation(): void {
    // Load spine animation
    new TextureAtlas(
      spineboyAtlasData,
      (_line, callback) => {
        const image = new Image();
        image.src = spineboyTexture;
        image.onload = () => {
          callback(PIXI.BaseTexture.from(image));
        };
      },
      (atlas) => {
        const atlasLoader = new AtlasAttachmentLoader(atlas);
        const spineJsonParser = new SkeletonJson(atlasLoader);

        const spineJSON = JSON.parse(spineboySpineData as any);
        const skeletonData = spineJsonParser.readSkeletonData(spineJSON);

        this.spineboy = new Spine(skeletonData as any);
        this.spineboy.state.setAnimation(0, 'idle', true);
        this.app.stage.addChild(this.spineboy);

        const animations = skeletonData.animations.map((anim) => anim.name);
        let currentIndex = 0;
        let timeAcc = 0;
        this.app.ticker.add((delta) => {
          if (this.spineboy) {
            this.spineboy.update(delta * 0.001);
            timeAcc += delta / 60;

            if (timeAcc >= 2) {
              timeAcc = 0;
              currentIndex = (currentIndex + 1) % animations.length;
              this.spineboy.state.setAnimation(0, animations[currentIndex], true);
            }
          }
        });

        this.create();
      }
    );
  }

  public create(): void {
    this.installButton = new PIXI.Container();
    this.installButton.eventMode = 'static';
    this.installButton.cursor = 'pointer';
    this.app.stage.addChild(this.installButton);

    const buttonBackground = new PIXI.Sprite(this.buttonTexture);
    buttonBackground.anchor.set(0.5);
    buttonBackground.scale.set(0.35);
    this.installButton.addChild(buttonBackground);

    const installText = new PIXI.Text(
      'Install',
      new PIXI.TextStyle({
        fontFamily: 'cursive',
        fontSize: 35,
        fill: 0xffffff,
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowColor: 0xfffc6a,
        dropShadowAlpha: 0.63,
        dropShadowBlur: 9,
        dropShadowDistance: 4,
        dropShadowAngle: Math.PI / 6
      })
    );
    installText.anchor.set(0.5);
    this.installButton.addChild(installText);

    this.installButton.on('pointerdown', () => sdk.install());

    sdk.on('interaction', (count: number) => {
      console.log(`Interaction count: ${count}`);

      if (sdk.interactions >= 10) {
        sdk.finish();
      }
    });

    sdk.start();
  }

  public resize(width: number, height: number): void {
    this.app.renderer.resize(width, height);

    // Calculate scale based on screen dimensions
    const scaleX = width / 320;
    const scaleY = height / 480;
    const scale = Math.min(scaleX, scaleY);

    if (this.spineboy) {
      this.spineboy.x = width / 2;
      this.spineboy.y = height * 0.65;
      this.spineboy.scale.set(0.3 * scale);
    }

    if (this.installButton) {
      this.installButton.position.set(width / 2, height * 0.75);
      this.installButton.scale.set(scale);
    }
  }

  public pause(): void {
    console.log('Game paused');
  }

  public resume(): void {
    console.log('Game resumed');
  }

  public volume(value: number): void {
    console.log(`Volume changed to: ${value}`);
  }

  public finish(): void {
    console.log('Game finished');
  }
}
