import Ticket from "../models/ticketModel.js";

const ticketsDAOs = {};

ticketsDAOs.insertOne = async(ticket) => {
    const ticketInsert = await Ticket.create(ticket);
    return ticketInsert;
}

ticketsDAOs.getOne = async (ticket_code) => {
    const ticket = await Ticket.findOne(({ticket_code:ticket_code}));
    return ticket;
}

ticketsDAOs.getMatricula = async (matricula) => {
    const tickets = await Ticket.find({matricula:matricula}).sort({redeemed_at:-1});
    return tickets;
}

/*ticketsDAOs.getRedeemed = async (date) => {
    const tickets = await Ticket.find({redeemed_at:date});
    return tickets;
}*/

ticketsDAOs.getAll = async () => {
    const tickets = await Ticket.find();
    return tickets;
}

export default ticketsDAOs;
