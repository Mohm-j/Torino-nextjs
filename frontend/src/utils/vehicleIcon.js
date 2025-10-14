export const getVehicleIcon = (vehicleType) => {
  const icons = {
    Bus: "/icons/bus.svg",
    Van: "/icons/bus.svg",
    SUV: "/icons/bus.svg",
    Airplane: "/icons/airplane.svg",
    ship: "/icons/ship.svg",
    train: "/icons/train.svg",
  };

  return icons[vehicleType] || "/icons/bus.svg";
};
