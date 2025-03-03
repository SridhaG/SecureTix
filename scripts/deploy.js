const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "AI Tools and Chatgpt - Workshop",
      cost: tokens(3),
      tickets: 0,
      date: "2025-02-22",
      time: "18:00",
      location: "NIT - Calicut, Kerala"
    },
    {
      name: "Nrithya - Dance Competion",
      cost: tokens(1),
      tickets: 125,
      date: "2025-06-09",
      time: "13:00",
      location: "Jyothi Engineering College - Thrissur,Kerala"
    },
    {
      name: "Cyber Privacy Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "2025-06-10",
      time: "10:00",
      location: "Christ College - Irinjalkuda,Kerala"
    },
    {
      name: "Srishti Exhibition",
      cost: tokens(5),
      tickets: 0,
      date: "2025-06-19",
      time: "14:30",
      location: "FISAT - Kochi, Kerala"
    },
    {
      name: "Yukthi Exhibition ",
      cost: tokens(1.5),
      tickets: 125,
      date: "2025-06-20",
      time: "11:00",
      location: "CUSAT - Kochi, Kerala"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});