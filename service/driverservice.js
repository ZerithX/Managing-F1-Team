import { dataDriver, dataTeamPrincipal } from "../data.js";

function validateTeamPrincipalInput(nama, team, negara) {
  if (!nama || !team || !negara) {
    throw new Error("All fields (nama, team, negara) are required");
  }
}

async function getAllDrivers() {
  return dataDriver;
}

async function getAllTeamPrincipals() {
  return dataTeamPrincipal;
}

async function filterDrivers(query) {
  let result = dataDriver;

  if (query.search) {
    const key = query.search.toLowerCase();
    result = result.filter(
      d =>
        d.nama.toLowerCase().includes(key) ||
        d.team.toLowerCase().includes(key)
    );
  }
  if (query.team) {
    result = result.filter(d => d.team.toLowerCase() === query.team.toLowerCase());
  }
  if (query.minPoints) {
    result = result.filter(d => d.points >= Number(query.minPoints));
  }
  if (query.sort) {
    const order = query.order === "asc" ? 1 : -1;
    result = result.sort((a, b) =>
      (a[query.sort] > b[query.sort] ? 1 : -1) * order
    );
  }
  return result;
}

async function filterTeamPrincipals(query) {
  let result = dataTeamPrincipal;

  if (query.search) {
    const key = query.search.toLowerCase();
    result = result.filter(
      t =>
        t.nama.toLowerCase().includes(key) ||
        t.team.toLowerCase().includes(key)
    );
  }
  if (query.negara) {
    result = result.filter(t => t.negara.toLowerCase() === query.negara.toLowerCase());
  }
  if (query.sort) {
    const order = query.order === "asc" ? 1 : -1;
    result = result.sort((a, b) =>
      (a[query.sort] > b[query.sort] ? 1 : -1) * order
    );
  }
  return result;
}

async function getDriverById(id) {
  const driver = dataDriver.find(d => d.id == id);
  if (!driver) throw new Error("Driver not found");
  return driver;
}

async function getTeamPrincipalById(id) {
  const teamPrincipal = dataTeamPrincipal.find(t => t.id == id);
  if (!teamPrincipal) throw new Error("Team Principal not found");
  return teamPrincipal;
}

async function addDriver(nama, team, nomor, points) {
  validateDriverInput(nama, team, nomor, points);

  if (dataDriver.some(d => d.nomor === nomor)) {
    throw new Error("Driver number already exists");
  }

  const year = new Date().getFullYear().toString().slice(-2);
  const roleCode = "001";
  const sameYearData = dataDriver.filter(item => String(item.id).startsWith(year));
  const nextOrder = (sameYearData.length + 1).toString().padStart(2, "0");
  const id = `${year}${roleCode}${nextOrder}`;

  const newDriver = {
    id: Number(id),
    nama,
    team,
    nomor,
    points,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  dataDriver.push(newDriver);
  return newDriver;
}

async function addTeamPrincipal(nama, team, negara) {
  validateTeamPrincipalInput(nama, team, negara);

  const year = new Date().getFullYear().toString().slice(-2);
  const roleCode = "101";
  const sameYearData = dataTeamPrincipal.filter(item => String(item.id).startsWith(year));
  const nextOrder = (sameYearData.length + 1).toString().padStart(2, "0");
  const id = `${year}${roleCode}${nextOrder}`;

  const newTeamPrincipal = {
    id: Number(id),
    nama,
    team,
    negara,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  dataTeamPrincipal.push(newTeamPrincipal);
  return newTeamPrincipal;
}

async function updateDriver(id, newTeam, newNomor) {
  const driverIndex = dataDriver.findIndex(d => d.id == id);
  if (driverIndex === -1) throw new Error("Driver not found");
  if (
    dataDriver.some(d => d.nomor === newNomor && d.id != id)
  ) {
    throw new Error("Driver number already used by another driver");
  }

  dataDriver[driverIndex].team = newTeam;
  dataDriver[driverIndex].nomor = newNomor;
  dataDriver[driverIndex].updatedAt = new Date();

  return dataDriver[driverIndex];
}

async function updateTeamPrincipal(id, newTeam, newNegara) {
  const teamPrincipalIndex = dataTeamPrincipal.findIndex(t => t.id == id);
  if (teamPrincipalIndex === -1) {
    throw new Error("Team Principal not found");
  }

  dataTeamPrincipal[teamPrincipalIndex].team = newTeam;
  dataTeamPrincipal[teamPrincipalIndex].negara = newNegara;
  dataTeamPrincipal[teamPrincipalIndex].updatedAt = new Date();

  return dataTeamPrincipal[teamPrincipalIndex];
}

async function earnedDriverPoints(id, earnedPoints) {
  const driverIndex = dataDriver.findIndex(d => d.id == id);
  if (driverIndex === -1) throw new Error("Driver not found");

  dataDriver[driverIndex].points += earnedPoints;
  dataDriver[driverIndex].updatedAt = new Date();

  return dataDriver[driverIndex];
}

async function penaltyDriverPoints(id, penaltyPoints) {
  const driverIndex = dataDriver.findIndex(d => d.id == id);
  if (driverIndex === -1) throw new Error("Driver not found");

  dataDriver[driverIndex].points -= penaltyPoints;
  dataDriver[driverIndex].updatedAt = new Date();

  return dataDriver[driverIndex];
}

async function deleteDriver(id) {
  const driverIndex = dataDriver.findIndex(d => d.id == id);
  if (driverIndex === -1) throw new Error("Driver not found");

  dataDriver.splice(driverIndex, 1);

  return { message: "Driver deleted" };
}

async function deleteTeamPrincipal(id) {
  const teamPrincipalIndex = dataTeamPrincipal.findIndex(t => t.id == id);
  if (teamPrincipalIndex === -1) throw new Error("Team Principal not found");

  dataTeamPrincipal.splice(teamPrincipalIndex, 1);

  return { message: "Team Principal deleted" };
}

export {
  getAllDrivers,
  getDriverById,
  getAllTeamPrincipals,
  getTeamPrincipalById,
  addDriver,
  addTeamPrincipal,
  filterDrivers,
  filterTeamPrincipals,
  updateDriver,
  earnedDriverPoints,
  penaltyDriverPoints,
  deleteDriver,
  updateTeamPrincipal,
  deleteTeamPrincipal
};