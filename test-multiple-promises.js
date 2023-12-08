const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

const voivodeships = [
  "zachodnio-pomorskie",
  "pomorskie",
  "warmińsko-mazurskie",
  "dolnośląskie",
  "lubuskie",
  "wielkopolskie",
  "kujawsko-pomorskie",
  "śląskie",
  "łódzkie",
  "mazowieckie",
  "świętokrzyskie",
  "podlaskie",
  "lubelskie",
  "podkarpackie",
  "opolskie",
  "małopolskie",
];
// const getDataByVoiv = async (voiv) => {
//   const result = await fetch(
//     `https://karpteam.herokuapp.com/api/lakes/woj?voivodeship=${voiv}`,
//     {
//       mode: "cors",
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       withCredentials: false,
//       credentials: "same-origin",
//       crossdomain: true,
//     }
//   );
//   return result.json();
// };
// const promises = voivodeships.map((voiv) => {
//   return getDataByVoiv(voiv);
// });

//Promise.all(promises).then((data) => console.log("data", data));

//promise construct
// const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //total 16

// const getVoiv = (id) => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res(voivodeships[id]);
//     }, 1000);
//   });
// };

// const promises = ids.map((id) => {
//   return getVoiv(id);
// });

// Promise.all(promises).then((x) => console.log("x", x));

//test fetch malopolska voivodeship , probably returns mix data from two voivs

const getDataByVoiv = async (voiv) => {
  const result = await fetch(
    `https://karpteam.herokuapp.com/api/lakes/woj?voivodeship=${voiv}`,
    {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: false,
      credentials: "same-origin",
      crossdomain: true,
    }
  );
  return result.json();
};

getDataByVoiv(voivodeships[14]).then((data) => console.log(data));

