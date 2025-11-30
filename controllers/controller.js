import {
    getAllDrivers,
    getDriverById,
    getAllTeamPrincipals,
    getTeamPrincipalById,
    addDriver,
    addTeamPrincipal,
    filterDrivers,
    filterTeamPrincipals,
    updateDriver,
    updateTeamPrincipal,
    earnedDriverPoints,
    penaltyDriverPoints,
    deleteDriver,
    deleteTeamPrincipal
} from "../service/driverservice.js";

async function getAllDriversController(req, res) {
    try {
        const drivers = await getAllDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getDriverByIdController(req, res) {
    try {
        const driverId = Number(req.params.id);
        const driver = await getDriverById(driverId);
        res.status(200).json(driver);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function getAllTeamPrincipalsController(req, res) {
    try {
        const teamPrincipals = await getAllTeamPrincipals();
        res.status(200).json(teamPrincipals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getTeamPrincipalByIdController(req, res) {
    try {
        const teamPrincipalId = Number(req.params.id);
        const teamPrincipal = await getTeamPrincipalById(teamPrincipalId);
        res.status(200).json(teamPrincipal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function filterDriversController(req, res) {
    try {
        const drivers = await filterDrivers(req.query);
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function filterTeamPrincipalsController(req, res) {
    try {
        const principals = await filterTeamPrincipals(req.query);
        res.status(200).json(principals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function addTeamPrincipalController(req, res) {
    try {
        const { nama, team, negara } = req.body;

        // VALIDASI sederhana
        if (!nama || !team || !negara) {
            return res.status(400).json({ message: "nama, team, negara wajib diisi" });
        }

        const newTeamPrincipal = await addTeamPrincipal(nama, team, negara);

        res.status(201).json(newTeamPrincipal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function addDriverController(req, res) {
    try {
        const { nama, team, nomor, points } = req.body;

        // VALIDASI sederhana
        if (!nama || !team || !nomor) {
            return res.status(400).json({ message: "nama, team, nomor wajib diisi" });
        }

        const newDriver = await addDriver(nama, team, nomor, points ?? 0);

        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateDriverController(req, res) {
    try {
        if (!req.body.team && !req.body.nomor && !req.body.points) {
            return res.status(400).json({ message: "Update harus diisi team, nomor, atau points" });
        }

        const updated = await updateDriver(Number(req.params.id), req.body.team, req.body.nomor, req.body.points);
        res.status(200).json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function updateTeamPrincipalController(req, res) {
    try {
        const { team, negara } = req.body;
        const updatedTeamPrincipal = await updateTeamPrincipal(req.params.id, team, negara);
        res.status(200).json(updatedTeamPrincipal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function earnedDriverPointsController(req, res) {
    try {
        if (!req.body.points) {
            return res.status(400).json({ message: "points diperlukan" });
        }

        const updated = await earnedDriverPoints(Number(req.params.id), Number(req.body.points));
        res.status(200).json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function penaltyDriverPointsController(req, res) {
    try {
        if (!req.body.points) {
            return res.status(400).json({ message: "points diperlukan" });
        }

        const updated = await penaltyDriverPoints(Number(req.params.id), Number(req.body.points));
        res.status(200).json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function deleteDriverController(req, res) {
    try {
        const deleted = await deleteDriver(req.params.id);
        res.status(200).json({ message: "Driver deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function deleteTeamPrincipalController(req, res) {
    try {
        const deleted = await deleteTeamPrincipal(req.params.id);
        res.status(200).json({ message: "Team Principal deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export {
    getAllDriversController,
    getDriverByIdController,
    addDriverController,
    filterDriversController,
    filterTeamPrincipalsController,
    updateDriverController,
    earnedDriverPointsController,
    penaltyDriverPointsController,
    deleteDriverController,
    getAllTeamPrincipalsController,
    getTeamPrincipalByIdController,
    addTeamPrincipalController,
    updateTeamPrincipalController,
    deleteTeamPrincipalController
};