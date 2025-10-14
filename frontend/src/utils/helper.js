const toFarsiNumber = (n) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n
    ?.toString()
    .split("")
    .map((x) => farsiDigits[x])
    .join("");
};

const toFarsiNumberWithSeparator = (n) => {
  if (n === undefined || n === null) return "";

  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const withCommas = n.toLocaleString("en-US");
  return withCommas.replace(/[0-9]/g, (x) => farsiDigits[x]);
};

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${toFarsiNumber(m)}:${toFarsiNumber(s.toString().padStart(2, "0"))}`;
};

const translateCityName = (city) => {
  const map = {
    isfahan: "اصفهان",
    tehran: "تهران",
    shiraz: "شیراز",
    tabriz: "تبریز",
    mashhad: "مشهد",
    sulaymaniyah: "سلیمانیه",
    erbil: "اربیل",
    sanandaj: "سنندنج",
    madrid: "مادرید",
    italy: "ایتالیا",
    hewler: "هولر",
    mazandaran: "مازندران",
    gilan: "گیلان",
    offroad: "گیلان",
  };

  return map[city?.toLowerCase()] || city;
};

const translateVehicleName = (vehicle) => {
  const map = {
    train: "قطار",
    bus: "اتوبوس",
    ship: "کشتی",
    airplane: "هواپیما",
    suv: "اتوبوس",
    van: "ون",
  };

  return map[vehicle?.toLowerCase()] || vehicle;
};

const toJalaliDate = (isoString) => {
  const gDate = new Date(isoString);
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(gDate);
};

export {
  toFarsiNumber,
  formatTime,
  translateCityName,
  toJalaliDate,
  translateVehicleName,
  toFarsiNumberWithSeparator,
};
