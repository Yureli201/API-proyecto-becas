import { model, Schema } from "mongoose";

const ticketSchema = new Schema({
  matricula: {
    type: String,
    required: true
  },
  ticket_code: {
    type: String,
    required: true,
    unique: true
  },
  redeemed_at: {
    type: Date,
    default: Date.now
  }
},
  {
    versionKey: false,
    timestamps: true,
  }
);

ticketSchema.index({ matricula: 1, redeemed_at: 1 }, { unique: true });

export default model("Ticket", ticketSchema);
