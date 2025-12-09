import Ticket from "../models/ticketModel.js";

const ticketsDAOs = {};

ticketsDAOs.insertOne = async (ticket) => {
  const ticketInsert = await Ticket.create(ticket);
  return ticketInsert;
};

ticketsDAOs.getOne = async (ticket_code) => {
  const ticket = await Ticket.findOne({ ticket_code: ticket_code });
  return ticket;
};

ticketsDAOs.getMatricula = async (matricula) => {
  const tickets = await Ticket.find({ matricula: matricula }).sort({
    redeemed_at: -1,
  });
  return tickets;
};

ticketsDAOs.getRedeemed = async (date) => {
  const searchDate = new Date(date);

  const startOfDay = new Date(searchDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(searchDate);
  endOfDay.setHours(23, 59, 59, 999);

  const tickets = await Ticket.find({
    redeemed_at: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).sort({ redeemed_at: -1 });
  return tickets;
};

ticketsDAOs.getAll = async () => {
  const totalTickets = await Ticket.countDocuments();
  return totalTickets;
};

export default ticketsDAOs;
