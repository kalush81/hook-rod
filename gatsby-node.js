const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  try {
    const result = await fetch(
      `https://karpteam.herokuapp.com/api/lakes/woj?voivodeship=${"Podkarpackie"}`,
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
    const resultData = await result.json();

    resultData.forEach((data) => {
      createNode({
        //use any arbitrary fields from the data
        name: data.name,
        city: data.city,
        voiv: data.voivodeship,
        // required fields
        id: String(data.id),
        parent: null,
        children: [],
        internal: {
          type: `Fishery`,
          contentDigest: createContentDigest(resultData),
        },
      });
    });
  } catch (err) {
    console.log("err...", err);
    reporter.info(
      `there was a problem while fetching data for nodes creation from fishery api`
    );
  }
};
