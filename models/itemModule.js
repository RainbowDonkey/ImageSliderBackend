const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const itemModel = new Schema({
    title: { type: String },
    photo: { type: String }
});

//export default mongoose.model('items', itemModel);
module.exports = mongoose.model('item', itemModel);