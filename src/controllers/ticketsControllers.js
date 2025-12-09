import ticketsDAOs from "../daos/ticketsDaos.js";

const ticketsControllers = {}

ticketsControllers.insertOne = (req, res) => {
    // Seguridad adicional: asegurarse que el middleware de auth adjuntó `req.user`
    if (!req.user) return res.status(401).json({ error: 'Token no válido o no proporcionado' });

    // Asociar información del usuario que crea el ticket
    const ticketData = { ...req.body, createdBy: req.user.id || req.user.email, createdAt: new Date() };

    ticketsDAOs.insertOne(ticketData)
    .then((ticketInsert) => {
        res.status(201).json({ ticketInsert });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    })
}

ticketsControllers.getOne = (req, res) => {
    ticketsDAOs.getOne(req.params.ticket_code)
    .then((ticket) => {
        if(ticket !=null)
            res.status(201).json({ ticket })
        else
            res.status(404).json({ error: "Ticket no encontrado" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    })
}

ticketsControllers.getAll = (req, res) => {
    ticketsDAOs.getAll()
    .then((tickets) => {
        if(tickets != null)
            res.status(201).json({ tickets })
        else
            res.status(404).json({ error: "Tickets no encontrados" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    })
}

ticketsControllers.getMatricula = (req, res) => {
    ticketsDAOs.getMatricula(req.params.matricula)
    .then((tickets) => {
        if(tickets != null)
            res.status(201).json({ tickets })
        else
            res.status(404).json({ error: "Tickets no encontrados" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    })
}

/*ticketsControllers.getRedeemed = (req, res) => {
    ticketsDAOs.getRedeemed(req.params.date)
    .then((tickets) => {
        if(tickets != null)
            res.status(201).json({ tickets })
        else
            res.status(404).json({ error: "Tickets no encontrados" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    })
}*/

export default ticketsControllers;