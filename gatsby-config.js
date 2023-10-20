// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.

module.exports = {
  siteMetadata: {
    title: `System Rezerwacji Na Łowiskach`,
    description: `platforma słuząca do rezerwacji stanowisk na łowiskach komercyjnych , jak równiez wszelakich udogodnień`,
    twitterUsername: `@unknown`,
    image: ``,
    siteUrl: `localhost:8000`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `lato`,
          `lato:300,400,400,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            "primary-color": "#ff8800",
            "border-radius-base": "5px",
            "border-width-base": "2px",
            "height-lg": "36px",
            "btn-height-lg": "40px",
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          // eslint-disable-next-line prettier/prettier
          include: /\.inline\.svg$/,
        },
      },
    },
    "gatsby-plugin-svgr",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify",
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "Lake",
        imagePath: "mainImagePath",
        name: "lakeMainImageFile",
        prepareUrl: (url) => encodeURI(url),
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "Lake",
        imagePath: "images[].path",
        name: "lakeOtherImagesFiles",
        //type: "array",
        prepareUrl: (url) =>
          `https://hookrod.s3.eu-central-1.amazonaws.com${encodeURI(
            "/" + url
          )}`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/assets/data`,
      },
    },
  ],
};
