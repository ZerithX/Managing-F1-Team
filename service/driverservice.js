import { dataDriver, dataTeamPrincipal } from "../data.js";

async function getAllDrivers() {
  return dataDriver;
}

async function getAllTeamPrincipals() {
  return dataTeamPrincipal;
}

async function filterDrivers(query) {
  let result = dataDriver;

  if (query.team) {
    result = result.filter(d => d.team.toLowerCase() == query.team.toLowerCase());
  }

  if (query.minPoints) {
    result = result.filter(d => d.points >= Number(query.minPoints));
  }

  if (query.sort == "points") {
    result = result.sort((a, b) => b.points - a.points);
  }
  
  return result;
}

async function filterTeamPrincipals(query) {
  let result = dataTeamPrincipal;

  if (query.negara) {
    result = result.filter(t => t.negara.toLowerCase() === query.negara.toLowerCase());
  }

  return result;
}

async function getDriverById(id) {
  const driver = dataDriver.find((d) => d.id == id);
  if (!driver) {
    throw new Error("Driver not found");
  }

  return driver;
}

async function getTeamPrincipalById(id) {
  const teamPrincipal = dataTeamPrincipal.find((t) => t.id == id);
  if (!teamPrincipal) {
    throw new Error("Team Principal not found");
  }

  return teamPrincipal;
}

async function addDriver(nama, team, nomor, points) {
  const year = new Date().getFullYear().toString().slice(-2);
  const roleCode = "001";
  const sameYearData = dataDriver.filter(
    (item) => item.id && String(item.id).startsWith(year)
  );
  const nextOrder = (sameYearData.length + 1).toString().padStart(2, "0");
  const id = `${year}${roleCode}${nextOrder}`;
  const newDriver = {
    id: Number(id),
    nama,
    team,
    nomor,
    points,
  };

  dataDriver.push(newDriver);
  return newDriver;
}

async function addTeamPrincipal(nama, team, negara) {
  const year = new Date().getFullYear().toString().slice(-2);
  const roleCode = "101";
  const sameYearData = dataTeamPrincipal.filter(
    (item) => item.id && String(item.id).startsWith(year)
  );
  const nextOrder = (sameYearData.length + 1).toString().padStart(2, "0");
  const id = `${year}${roleCode}${nextOrder}`;
  const newTeamPrincipal = {
    id: Number(id),
    nama,
    team,
    negara,
  };

  dataTeamPrincipal.push(newTeamPrincipal);
  return newTeamPrincipal;
}

async function updateDriver(id, newTeam, newNomor) {
  const driverIndex = dataDriver.findIndex((d) => d.id == id);
  if (driverIndex === -1) {
    throw new Error("Driver not found");
  }
  dataDriver[driverIndex].team = newTeam;
  dataDriver[driverIndex].nomor = newNomor;
  return dataDriver[driverIndex];
}

async function updateTeamPrincipal(id, newTeam, newNegara) {
  const teamPrincipalIndex = dataTeamPrincipal.findIndex((t) => t.id == id);  
  if (teamPrincipalIndex === -1) {
    throw new Error("Team Principal not found");
  }
  dataTeamPrincipal[teamPrincipalIndex].team = newTeam;
  dataTeamPrincipal[teamPrincipalIndex].negara = newNegara;
  return dataTeamPrincipal[teamPrincipalIndex];
}

async function earnedDriverPoints(id, earnedPoints) {
  const driverIndex = dataDriver.findIndex((d) => d.id == id);
  if (driverIndex == -1) {
    throw new Error("Driver not found");
  }
  dataDriver[driverIndex].points += earnedPoints;
  return dataDriver[driverIndex];
}

async function penaltyDriverPoints(id, penaltyPoints) {
  const driverIndex = dataDriver.findIndex((d) => d.id == id);
  if (driverIndex == -1) {
    throw new Error("Driver not found");
  }
  dataDriver[driverIndex].points -= penaltyPoints;
  return dataDriver[driverIndex];
}

async function deleteDriver(id) {
  const driverIndex = dataDriver.findIndex((d) => d.id == id); 
  if (driverIndex === -1) {
    throw new Error("Driver not found");
  }
  dataDriver.splice(driverIndex, 1);
  return dataDriver[0];
}

async function deleteTeamPrincipal(id) {
  const teamPrincipalIndex = dataTeamPrincipal.findIndex((t) => t.id == id);
  if (teamPrincipalIndex === -1) {
    throw new Error("Team Principal not found");
  }
  dataTeamPrincipal.splice(teamPrincipalIndex, 1);
  return dataTeamPrincipal[0];
}

export { getAllDrivers,
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
  deleteTeamPrincipal }; 