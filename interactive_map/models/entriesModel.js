const { Schema, model } = require('mongoose');

const EntrySchema = new Schema({
    
    title:{
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    status:{
        type: Boolean,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    iconType: { 
        type: String, 
        required: true 
    },
    icon: {
        options: {
            iconSize: { type: [Number], required: true },
            iconAnchor: { type: [Number], required: true },
            popupAnchor: { type: [Number], required: true },
            iconUrl: { type: String, required: true },
            
        }
    }
});

module.exports = model('Entry', EntrySchema)
