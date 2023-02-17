const voivodeships = {
  "zachodnio-pomorskie": "zachodnio-pomorskie",
  pomorskie: "pomorskie",
  "warmińsko-mazurskie": "warminsko-mazurskie",
  dolnośląskie: "dolnoslaskie",
  lubuskie: "lubuskie",
  wielkopolskie: "wielkopolskie",
  "kujawsko-pomorskie": "kujawsko-pomorskie",
  śląskie: "slaskie",
  łódzkie: "lodzkie",
  mazowieckie: "mazowieckie",
  świętokrzyskie: "swietokrzyskie",
  podlaskie: "podlaskie",
  lubelskie: "lubelskie",
  podkarpackie: "podkarpackie",
  opolskie: "opolskie",
  małopolskie: "malopolskie",
};
export const slugifyVoiv = (voivodeship) => {
  return voivodeships[voivodeship.toLowerCase()];
};
