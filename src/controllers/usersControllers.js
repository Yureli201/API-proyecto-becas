import usersDAOs from "../daos/usersDaos.js";

const usersControllers = {};

usersControllers.insertOne = async (req, res) => {
    usersDAOs.insertOne(req.body)
    .then((userInsert) => {
        res.status(201).json({ userInsert });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

usersControllers.getOne = async (req, res) => {
    usersDAOs.getOne(req.params.email)
    .then((user) => {
        if(user !=null)
            res.status(201).json({ user })
        else
            res.status(404).json({ error: "Usuario no encontrado" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

usersControllers.getAll = async (req, res) => {
    usersDAOs.getAll()
    .then((users) => {
        if(users != null)
            res.status(201).json({ users })
        else
            res.status(404).json({ error: "Usuarios no encontrados" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

usersControllers.getRole = async (req, res) => {
    usersDAOs.getRole(req.params.role)
    .then((users) => {
        if(users != null)
            res.status(201).json({ users })
        else
            res.status(404).json({ error: "Usuarios no encontrados" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

usersControllers.update = async (req, res) => {
    usersDAOs.update(req.params.email, req.body)
    .then((userUpdate) => {
        if(userUpdate != null)
            res.status(201).json({ userUpdate })
        else
            res.status(404).json({ error: "Usuario no encontrado" });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

usersControllers.delete = async (req, res) =>{
    usersDAOs.delete(req.params.email)
    .then((userDelete) => {
        res.status(201).json({ userDelete })
    })
    .catch((error) => {
        res.status(500).json({ error: error.message })
    })
} 

export default usersControllers;