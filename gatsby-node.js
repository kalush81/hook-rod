// const { createRemoteFileNode } = require("gatsby-source-filesystem");
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
    });
  });

  return result;
}

const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

const getStaticDataFromApi = async () => {
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
};

const createPages = async () => {
  const data = await getStaticDataFromApi();
  const sortedData = sortData(data);
  console.log("sorted data, ready to be served for createPage()", sortedData);
};

createPages();
// exports.sourceNodes = async ({
//   reporter,
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   try {
//     const allLakesFromApi = await getStaticDataFromApi();
//     allLakesFromApi.forEach((lake) => {
//       voivodeshipsData.forEach((v) => {
//         if (v.voiv === lake.voivodeship.toLowerCase()) {
//           v.fisheries.push(lake);
//         }
//       });
//     });

//     const slugifiedData = voivodeshipsData.map((voivData) => {
//       const slugifiedFisheries = voivData.fisheries.map((fishery) => ({
//         ...fishery,
//         imagePath:
//           `https://hookrod.s3.eu-central-1.amazonaws.com/${fishery.imagePath}` ||
//           "",
//         fishOnLake: fishery.fishOnLake || [{ name: "", weight: 0, length: 0 }],
//         facilities: fishery.facilities || [{ name: "" }],
//         regulations: voivData.regulations || "zbiór przepisów",
//         citySlug: translate(fishery.city),
//         nameSlug: translate(fishery.name),
//         voivodeshipSlug: translate(fishery.voivodeship),
//         priceLow: fishery.priceLow || 1,
//       }));
//       return {
//         ...voivData,
//         fisheries: slugifiedFisheries,
//         voiv: translate(voivData.voiv),
//       };
//     });

//     slugifiedData.forEach((data) => {
//       createNode({
//         id: String(data.id),
//         fisheries: data.fisheries,
//         slug: data.voiv,
//         parent: null,
//         children: [],
//         internal: {
//           type: `Voivodeship`,
//           contentDigest: createContentDigest(data),
//         },
//       });
//       data.fisheries.forEach((fishery) => {
//         const required = {
//           id: String(fishery.id),
//           myPath: `wojewodztwo/${fishery.voivodeshipSlug}/${fishery.nameSlug}`,
//           slug: fishery.nameSlug,
//         };
//         const rest = { ...fishery };
//         const node = Object.assign({}, rest, required, {
//           parent: null,
//           children: [],
//           internal: {
//             type: `Fishery`,
//             contentDigest: createContentDigest(fishery),
//           },
//         });
//         createNode(node);
//       });
//     });
//   } catch (err) {
//     console.log("err...", err);
//     reporter.info(
//       `there was a problem while fetching data for nodes creation from fishery api`
//     );
//   }
// };

// exports.createPages = async function ({ actions, graphql }) {
//   const { data } = await graphql(`
//     query FisheryQueryNode {
//       allFishery {
//         nodes {
//           id
//           city
//           citySlug
//           name
//           nameSlug
//           myPath
//           regulations
//           voivodeship
//           voivodeshipSlug
//           priceLow
//           fishOnLake {
//             name
//             weight
//             length
//           }
//           imagePath
//           numberOfPegs
//           latitude
//           longitude
//           facilities {
//             name
//           }
//           fields {
//             localFile
//           }
//         }
//       }
//     }
//   `);
//   data.allFishery.nodes.forEach((node) => {
//     const myPath = node.myPath;
//     actions.createPage({
//       path: myPath,
//       component: require.resolve(`./src/templates/fishery.js`),
//       context: { ...node },
//     });
//   });
// };

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;
//   createTypes(`
//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       featuredImg: File @link(from: "fields.localFile")
//     }

//     type Frontmatter {
//       title: String!
//       featuredImgUrl: String
//       featuredImgAlt: String
//     }
//   `);
// };

// exports.onCreateNode = async ({
//   node,
//   actions: { createNode, createNodeField },
//   createNodeId,
//   getCache,
// }) => {
//   if (node.internal.type === "Fishery" && node.imagePath !== "") {
//     const fileNode = await createRemoteFileNode({
//       url: node.imagePath, // string that points to the URL of the image
//       parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
//       createNode, // helper function in gatsby-node to generate the node
//       createNodeId, // helper function in gatsby-node to generate the node id
//       getCache,
//     });

//     // if the file was created, extend the node with "localFile"
//     if (fileNode) {
//       createNodeField({ node, name: "localFile", value: fileNode.id });
//     }
//   }
// };
