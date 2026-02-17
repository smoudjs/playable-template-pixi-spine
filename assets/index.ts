import { Application, BaseTexture } from 'pixi.js';
import { TextureAtlas } from '@pixi-spine/base';
import { Spine } from 'pixi-spine';
import { SkeletonJson, AtlasAttachmentLoader } from '@pixi-spine/runtime-4.1';

import janeTexture from './spineboy-ess.png';
import janeAtlasData from './spineboy-ess.atlas';
import janeSpineData from './spineboy-ess.json';

async function main() {
  const app = new Application({
    width: 400,
    height: 600,
    backgroundColor: 0x1099bb
  });

  document.body.appendChild(app.view);

  loadSpineAnimation(app);
}

function loadSpineAnimation(app: Application) {
  const base64Data = janeAtlasData.split(',')[1];
  const atlasString = atob(base64Data);

  new TextureAtlas(
    atlasString,
    (_line, callback) => {
      const image = new Image();
      image.src = janeTexture;
      image.onload = () => {
        callback(BaseTexture.from(image));
      };
    },
    (atlas) => {
      const atlasLoader = new AtlasAttachmentLoader(atlas);
      const spineJsonParser = new SkeletonJson(atlasLoader);

      const spineJSON = JSON.parse(janeSpineData);
      const skeletonData = spineJsonParser.readSkeletonData(spineJSON);

      const spineObject = new Spine(skeletonData);

      spineObject.scale.set(0.5);

      spineObject.x = app.screen.width / 2;
      spineObject.y = app.screen.height * 0.7;

      spineObject.state.setAnimation(0, 'idle', true);

      app.stage.addChild(spineObject);

      app.ticker.add((dt) => {
        spineObject.update(dt * 0.01);
      });
    }
  );
}

main();
