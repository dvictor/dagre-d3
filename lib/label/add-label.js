var addTextLabel = require("./add-text-label");
var addHtmlLabel = require("./add-html-label");
var addSVGLabel = require("./add-svg-label");

module.exports = addLabel;

function addLabel(root, node, location) {
    var label = node.label;
    var labelSvg = root.append("g");

    // Allow the label to be a string, a function that returns a DOM element, or
    // a DOM element itself.
    if (node.labelType === "svg") {
        addSVGLabel(labelSvg, node);
    } else if (typeof label !== "string" || node.labelType === "html") {
        addHtmlLabel(labelSvg, node);
    } else {
        addTextLabel(labelSvg, node);
    }

    var labelBBox = labelSvg.node().getBBox();
    var x, y;
    // acceptable values are: left, right, top, bottm, top-left, top-right, bottm-left, bottom-right
    // the single values would center on the other axis
    let [yLocation, xLocation] = (location || '').split('-')
    if (xLocation === undefined) {
        xLocation = yLocation;
    }

    if (xLocation === 'left') {
        x = -node.width / 2 + labelBBox.height * .2;
    } else if (xLocation === 'right') {
        x = node.width / 2 - labelBBox.width -labelBBox.height * .2;
    } else {
        x = -labelBBox.width / 2;
    }
    if (yLocation === 'top') {
        y = (-node.height / 2);
    } else if (yLocation === 'bottom') {
        y = (node.height / 2) - labelBBox.height * 1.2;
    } else {
        y = -labelBBox.height / 2;
    }

    labelSvg.attr(
        "transform",
        "translate(" + x + "," + y + ")");

    return labelSvg;
}
