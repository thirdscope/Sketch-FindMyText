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
  let prevIndex = (currentIndex - 1) < 0 ? (allHighlight.length - 1) : (currentIndex - 1)
  Settings.setSettingForKey('currentHighlight', prevIndex);
  document.centerOnLayer(allHighlight[prevIndex]);

  allHighlight.map((highlight) => {
    highlight.style.fills = [{fillType: Style.FillType.Color, color: HIGHLIGHT}];
  })
  allHighlight[prevIndex].style.fills = [{fillType: Style.FillType.Color, color: Selector}];

  UI.message(`view: ${prevIndex+1} / ${allHighlight.length}`)
}

