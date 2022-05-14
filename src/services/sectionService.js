const Section = require("../models/section");
const { default: mongoose } = require("mongoose");

module.exports.updateOrder = async (lecon, oldOrder, newOrder) => {
    let sections = null;
    let value = 0;
    if (oldOrder < newOrder) {
        sections = await Section.find({ lecon: mongoose.Types.ObjectId(lecon), ordre: { $lte: newOrder, $gt: oldOrder } }).sort({ ordre: 1 });
        value = -1;
    } else {
        sections = await Section.find({ lecon: mongoose.Types.ObjectId(lecon), ordre: { $lt: oldOrder, $gte: newOrder } }).sort({ ordre: 1 });
        value = 1;
    }
    for (let item of sections) {
        item.ordre += value;
        await item.save();
    }
}