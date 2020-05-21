module.exports = {
    siteMetadata: {
      title: `Thai Food Bank`,
      description: `Thai Food Bank`,
      author: `TeamTFB`,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images`,
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `Thai Food Bank`,
          short_name: `starter`,
          start_url: `/`,
          background_color: `#ffffff`,
          theme_color: `#ffffff`,
          display: `minimal-ui`,
          icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        },
      },
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "UA-167313684-1",
        }
      }
    ],
  }
  