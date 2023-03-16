import sketch from "sketch";

var Settings = require('sketch/settings');

export default function () {
  /* 全てのハイライトされたテキストを選択状態にする */
  const allShape = sketch.find("Shape");

  const allHighlight = allShape.filter((shape) => {
    var isHighlight = Settings.layerSettingForKey(shape, 'isHighlight');
    return isHighlight;
  });

  allHighlight.map((highlight) => {
    var highlightTextID = Settings.layerSettingForKey(highlight, 'textID');
    console.log(highlightTextID);
    var text = sketch.find(`*, [id="${highlightTextID}"]`)[0];

    text.selected = true;
  });
}

