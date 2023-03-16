import sketch from "sketch";
var UI = require('sketch/ui')
var Settings = require('sketch/settings');
var document = require('sketch/dom').getSelectedDocument();
var Style = require('sketch/dom').Style

const HIGHLIGHT = "#FFD000ff";
const Selector = "#A2870Dff";

export default function () {
  const allShape = sketch.find("Shape");

  const allHighlight = allShape.filter((shape) => {
    var isHighlight = Settings.layerSettingForKey(shape, 'isHighlight');
    return isHighlight;
  });

  let currentIndex = Settings.settingForKey('currentHighlight');
  currentIndex = currentIndex ? currentIndex : 0
  let nextIndex = (currentIndex + 1) >= allHighlight.length ? 0 : (currentIndex + 1)
  Settings.setSettingForKey('currentHighlight', nextIndex);
  document.centerOnLayer(allHighlight[nextIndex]);
  
  allHighlight.map((highlight) => {
    highlight.style.fills = [{fillType: Style.FillType.Color, color: HIGHLIGHT}];
  })
  allHighlight[nextIndex].style.fills = [{fillType: Style.FillType.Color, color: Selector}];

  UI.message(`view: ${nextIndex+1} / ${allHighlight.length}`)
}

