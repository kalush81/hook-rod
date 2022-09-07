let polishLetters = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ż", "ź", " "];
let englishLetter = ["a", "c", "e", "l", "n", "o", "s", "z", "z", "-"];

function translate(word) {
  let arr = word.toLowerCase().split("");
  return arr
    .map((currentLetter) => {
      let idx = polishLetters.indexOf(currentLetter);
      if (idx >= 0) {
        return englishLetter[idx];
      }
      return currentLetter;
    })
    .join("");
}

const voivodeshipsData = [
  { id: 1, voiv: "zachodnio-pomorskie", fisheries: [] },
  { id: 2, voiv: "pomorskie", fisheries: [] },
  { id: 3, voiv: "warmińsko-mazurskie", fisheries: [] },
  { id: 4, voiv: "dolnośląskie", fisheries: [] },
  { id: 5, voiv: "lubuskie", fisheries: [] },
  { id: 6, voiv: "wielkopolskie", fisheries: [] },
  { id: 7, voiv: "kujawsko-pomorskie", fisheries: [] },
  { id: 8, voiv: "śląskie", fisheries: [] },
  { id: 9, voiv: "łódzkie", fisheries: [] },
  { id: 10, voiv: "mazowieckie", fisheries: [] },
  { id: 11, voiv: "świętokrzyskie", fisheries: [] },
  { id: 12, voiv: "podlaskie", fisheries: [] },
  { id: 13, voiv: "lubelskie", fisheries: [] },
  { id: 14, voiv: "podkarpackie", fisheries: [] },
  { id: 15, voiv: "opolskie", fisheries: [] },
  { id: 16, voiv: "małopolskie", fisheries: [] },
];

const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

const getStaticDataFromApi = async () => {
  const result = await fetch(
    `https://karpteam.herokuapp.com/api/lakes/static`,
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
};

exports.sourceNodes = async ({
  reporter,
  actions: { createNode },
  createContentDigest,
}) => {
  try {
    const allLakesFromApi = await getStaticDataFromApi();

    allLakesFromApi.map((lake, i) => {
      voivodeshipsData.forEach((v) => {
        if (v.voiv === lake.voivodeship.toLowerCase()) {
          v.fisheries.push(lake);
        }
      });
    });

    const slugifiedData = voivodeshipsData.map((voivData) => {
      const slugifiedFisheries = voivData.fisheries.map((fishery) => ({
        ...fishery,
        regulations: voivData.regulations || "zbiór przepisów",
        citySlug: translate(fishery.city),
        nameSlug: translate(fishery.name),
        voivodeshipSlug: translate(fishery.voivodeship),
        priceLow: fishery.priceLow || 1,
        facilities: fishery.facilities || ["parking", "grill"],
      }));
      return {
        ...voivData,
        fisheries: slugifiedFisheries,
        voiv: translate(voivData.voiv),
      };
    });

    slugifiedData.forEach((data) => {
      createNode({
        id: String(data.id),
        fisheries: data.fisheries,
        slug: data.voiv,
        parent: null,
        children: [],
        internal: {
          type: `Voivodeship`,
          contentDigest: createContentDigest(data),
        },
      });
      data.fisheries.forEach((fishery) => {
        const required = {
          id: String(fishery.id),
          path: `wojewodztwo/${fishery.voivodeshipSlug}/${fishery.nameSlug}`,
          slug: fishery.nameSlug,
        };
        const rest = { ...fishery };
        const node = Object.assign({}, rest, required, {
          parent: null,
          children: [],
          internal: {
            type: `Fishery`,
            contentDigest: createContentDigest(fishery),
          },
        });
        createNode(node);
      });
    });
  } catch (err) {
    console.log("err...", err);
    reporter.info(
      `there was a problem while fetching data for nodes creation from fishery api`
    );
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query FisheryQueryNode {
      allFishery {
        nodes {
          id
          city
          citySlug
          name
          nameSlug
          path
          regulations
          voivodeship
          voivodeshipSlug
          priceLow
          fishOnLake {
            name
            weight
            lenght
          }
          imagePath
          numberOfPegs
          latitude
          longitude
          facilities
        }
      }
    }
  `);
  data.allFishery.nodes.forEach((node) => {
    const myPath = node.path;
    actions.createPage({
      path: myPath,
      component: require.resolve(`./src/templates/fishery.js`),
      context: { ...node },
    });
  });
};
