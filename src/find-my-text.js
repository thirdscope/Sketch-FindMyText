import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/
var Text = require('sketch/dom').Text
var Shape = require('sketch/dom').Shape
var Rectangle = require('sketch/dom').Rectangle
var Style = require('sketch/dom').Style
var Settings = require('sketch/settings')

const HIGHLIGHT = "#FFD000ff";

/* 検索文字を入力するプロンプトを出す。 */
function showSearchPrompt() {
  var text = 0;
  sketch.UI.getInputFromUser(
    "Enter the text",
    {
      initialValue: '',
    },
    (err, value) => {
      if (err) {
        return null
      }
      text = value;
    }
  )
  return text;
}

function highlightText(textShape) {
  let myShape = new Shape({
    name: "highlight",
    parent: textShape.parent,
    frame: {...textShape.frame},
  })

  myShape.index = textShape.index
  myShape.style.fills = [{fillType: Style.FillType.Color, color: HIGHLIGHT}];

  // ハイライトのShapeに対して、どのテキストIDのハイライトなのか、
  // このプラグインによるハイライトなのかを分かるように、settingをもたせる。
  Settings.setLayerSettingForKey(myShape, 'textID', textShape.id);
  Settings.setLayerSettingForKey(myShape, 'isHighlight', true);
}


export default function() {
  const inputText = showSearchPrompt();
  if (!inputText) return;
  
  const allText = sketch.find('Text');
  allText.map((text) => {
    const plainText = text.text.replace(/\r?\n/g, '');
    const regExp = new RegExp(inputText, 'i');
    if (plainText.match(regExp)) {
      highlightText(text);
    }
  });
  
  /* 選択レイヤーにハイライト付与 */
  // var document = require('sketch/dom').getSelectedDocument()
  // for (let i=0; i<document.selectedLayers.length; i++) {
  //   var selectedLayer = document.selectedLayers.layers[i];

  //   let myShape = new Shape({
  //     name: "highlight",
  //     parent: selectedLayer.parent,
  //     frame: {...selectedLayer.frame},
  //   })

  //   myShape.index = selectedLayer.index
  //   myShape.style.fills = [{fillType: Style.FillType.Color, color: '#FF0000ff'}];
  // }
}
