const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const itemModel = new Schema({
    a_title: { type: String },
    a_photo: { type: String }
});

//export default mongoose.model('items', itemModel);
module.exports = mongoose.model('item', itemModel);