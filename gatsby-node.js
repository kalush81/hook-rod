const { createRemoteFileNode } = require("gatsby-source-filesystem");
//const { createNodeId } = require("gatsby");
//const { createNodeId } = require("gatsby");
//const { cache } = require("gatsby");
// let polishLetters = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ż", "ź", " "];
// let englishLetter = ["a", "c", "e", "l", "n", "o", "s", "z", "z", "-"];
// function translate(word) {
//   let arr = word.toLowerCase().split("");
//   return arr
//     .map((currentLetter) => {
//       let idx = polishLetters.indexOf(currentLetter);
//       if (idx >= 0) {
//         return englishLetter[idx];
//       }
//       return currentLetter;
//     })
//     .join("");
// }
// const voivodeshipsData = [
//   { id: "zachodnio-pomorskie", voiv: "zachodnio-pomorskie", fisheries: [] },
//   { id: "pomorskie", voiv: "pomorskie", fisheries: [] },
//   { id: "warmińsko-mazurskie", voiv: "warmińsko-mazurskie", fisheries: [] },
//   { id: "dolnośląskie", voiv: "dolnośląskie", fisheries: [] },
//   { id: "lubuskie", voiv: "lubuskie", fisheries: [] },
//   { id: "wielkopolskie", voiv: "wielkopolskie", fisheries: [] },
//   { id: "kujawsko-pomorskie", voiv: "kujawsko-pomorskie", fisheries: [] },
//   { id: "śląskie", voiv: "śląskie", fisheries: [] },
//   { id: "łódzkie", voiv: "łódzkie", fisheries: [] },
//   { id: "mazowieckie", voiv: "mazowieckie", fisheries: [] },
//   { id: "świętokrzyskie", voiv: "świętokrzyskie", fisheries: [] },
//   { id: "podlaskie", voiv: "podlaskie", fisheries: [] },
//   { id: "lubelskie", voiv: "lubelskie", fisheries: [] },
//   { id: "podkarpackie", voiv: "podkarpackie", fisheries: [] },
//   { id: "opolskie", voiv: "opolskie", fisheries: [] },
//   { id: "małopolskie", voiv: "małopolskie", fisheries: [] },
// ];

function sortData(data) {
  const result = {
    voivodeships: [],
    cities: [],
  };

  const voivodeships = new Set();
  const cities = new Set();

  data.forEach((item) => {
    voivodeships.add(item.voivodeship);
    cities.add(item.city);
  });

  voivodeships.forEach((voivodeship) => {
    result.voivodeships.push({
      name: voivodeship,
      items: data.filter((item) => item.voivodeship === voivodeship),
    });
  });

  cities.forEach((city) => {
    result.cities.push({
      name: city,
      items: data.filter((item) => item.city === city),
      voivodeship: data.find((item) => item.city === city).voivodeship,
    });
  });
  return result;
}

const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

const getStaticDataFromApi = async () => {
  try {
    const result = await fetch(
      `https://hookandrod.herokuapp.com/api/lakes/static`,
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
    return await result.json();
  } catch (error) {
    console.error("error while fetchoing from API", error);
  }
};

exports.createPages = async ({ actions: { createPage }, createNodeId }) => {
  const data = await getStaticDataFromApi();
  const sortedData = sortData(data); //data sorted by voivodeship and city
  const allLakes = data; // unsorted raw data of all lakes
  sortedData.voivodeships.forEach((voiv) => {
    createPage({
      path: `${voiv.name}`,
      component: require.resolve("./src/templates/voivodeship"),
      context: { voivodeship: voiv.name },
    });
  });
  sortedData.cities.forEach((city) => {
    createPage({
      path: `${city.voivodeship}/${city.name}`,
      component: require.resolve("./src/templates/city"),
      context: { city: city.name },
    });
  });
  allLakes.forEach(async (item) => {
    const lake = {
      ...item,
      imagePath: `https://hookrod.s3.eu-central-1.amazonaws.com/${item.imagePath}`,
    };
    createPage({
      path: `${lake.voivodeship}/${lake.city}/${lake.name}`,
      component: require.resolve("./src/templates/lake"),
      context: {
        id: String(lake.id),
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type Lake implements Node {
      id: ID!
      name: String!
      imagePath: String
      city: String!
      voivodeship: String!
      numberOfPegs: Int!
      priceLow: Float!
      regulations: String
      latitude: Float!
      longitude: Float!
      fishOnLake: [FishOnLake]
      facilities: [Facility]
    }

    type FishOnLake {
      name: String
      weight: Float,
      length: Float
    }

    type Facility {
      name: String
    }
  `);
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const lakes = await getStaticDataFromApi();
  lakes.forEach((item) => {
    const node = {
      id: `${item.id}`,
      name: item.name,
      city: item.city,
      voivodeship: item.voivodeship,
      numberOfPegs: item.numberOfPegs,
      priceLow: item.priceLow,
      latitude: item.latitude,
      longitude: item.longitude,
      parent: null,
      children: [],
      internal: {
        type: "Lake",
        contentDigest: createContentDigest(item),
      },
    };
    if (item.imagePath) {
      node.imagePath = `https://hookrod.s3.eu-central-1.amazonaws.com/${item.imagePath}`;
    } else {
      node.imagePath =
        "https://hookrod.s3.eu-central-1.amazonaws.com/Extra+Carp+Radymno/1675710309282-117714995_3471086599610855_7441530922398424970_o.jpg";
    }
    if (
      item.fishOnLake &&
      Array.isArray(item.fishOnLake) &&
      item.fishOnLake.length > 0
    ) {
      node.fishOnLake = item.fishOnLake;
    }
    if (
      item.facilities &&
      Array.isArray(item.facilities) &&
      item.facilities.length > 0
    ) {
      node.facilities = item.facilities;
    }
    actions.createNode(node);
  });
};
