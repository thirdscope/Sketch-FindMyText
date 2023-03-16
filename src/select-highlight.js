import sketch from "sketch";

var Settings = require('sketch/settings');

export default function () {
  const allShape = sketch.find("Shape");

  /* 全てのハイライトを選択状態にする */
  allShape.map((shape) => {
    var isHighlight = Settings.layerSettingForKey(shape, 'isHighlight');
    if (isHighlight) {
      shape.selected = true;
    }
  });
}
