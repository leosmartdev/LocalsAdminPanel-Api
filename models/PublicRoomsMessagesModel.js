"use strict";
//created by Hatem Ragap
const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  message: {
    type: String,
    default: ""
  },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  sender_name: { type: String },
  img: { type: String },
  imgs: { type: Array },
  room_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  top: {
    type: Boolean,
    default: false
  },
  top_set_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null
  },
  top_set_time: {
    type: Number,
    default: Date.now
  },
  is_announcement: {
    type: Boolean,
    default: false
  },
  is_admin_announcement: {
    type: Boolean,
    default: false
  },
  announcement_email: {
    type: String,
    default: null
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
  receiver_ids: [{
    type: String,
    ref: 'users',
    default: []
  }],
});

const PublicRoomMessageSchemaModel = mongoose.model(
  "publicRoomMessages",
  messageSchema
);
module.exports = {
  PublicRoomMessageSchemaModel
};
