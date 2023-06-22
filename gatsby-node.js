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
    console.log("lake item", item);
    const lake = {
      ...item,
      //mainImagePath: `https://hookrod.s3.eu-central-1.amazonaws.com/${item.mainImagePath}`,
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
// https://hookrod.s3.eu-central-1.amazonaws.com/Extra+Carp+Radymno/1675710309282-117714995_3471086599610855_7441530922398424970_o.jpg
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  //todo : Add properties for SEO such as description and keywords
  createTypes(`
    type Lake implements Node {
      id: ID!
      pegs: [Peg!]!
      name: String!
      mainImagePath: String
      images: [ImageUrl]
      city: String!
      voivodeship: String!
      numberOfPegs: Int!
      priceMin: Float!
      regulations: String
      latitude: Float!
      longitude: Float!
      fishOnLake: [FishOnLake]!
      facilities: [Facility]!
      pegBasePrice:  Float!
    }

    type Peg {
      pegId: Int
      pegName: String
      pegNumber: Int
    }

    type ImageUrl {
      path: String
    }

    type FishOnLake {
      name: String
      weight: Float
      length: Float
    }

    type Facility {
      name: String
      basePrice: Int
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
      priceMin: item.priceMin,
      latitude: item.latitude,
      longitude: item.longitude,
      pegs: item.pegs,
      //images: item.images,
      pegBasePrice: item.pegBasePrice,
      parent: null,
      children: [],
      internal: {
        type: "Lake",
        contentDigest: createContentDigest(item),
      },
    };
    if (item.images.length > 0) {
      node.images = item.images;
    }
    if (item.mainImagePath) {
      node.mainImagePath = `https://hookrod.s3.eu-central-1.amazonaws.com/${item.mainImagePath}`;
    } else {
      node.mainImagePath =
        "https://hookrod.s3.eu-central-1.amazonaws.com/Extra+Carp+Radymno/1675710309282-117714995_3471086599610855_7441530922398424970_o.jpg";
    }
    if (
      item.fishOnLake &&
      Array.isArray(item.fishOnLake) &&
      item.fishOnLake.length > 0
    ) {
      node.fishOnLake = item.fishOnLake;
    } else {
      node.fishOnLake = [];
    }
    if (
      item.facilities &&
      Array.isArray(item.facilities) &&
      item.facilities.length > 0
    ) {
      node.facilities = item.facilities;
    } else {
      node.facilities = [];
    }
    actions.createNode(node);
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
  });
};
