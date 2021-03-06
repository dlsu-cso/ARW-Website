const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allContentfulCluster {
        nodes {
          title
        }
      }

      allContentfulOrganization{
        nodes {
          slug
          acronym
          organizationName
          about {
              json
          }
          youtubeVideoLink
          backgroundImage{
              fluid(quality: 80, maxWidth: 900) {
                base64
                aspectRatio
                src
                srcSet
                sizes
              }
          }
          logo {
              title
              fluid( maxWidth: 600) {
                base64
                aspectRatio
                src
                srcSet
                sizes
              }
          }
          mainEvents {
              eventName
              description {
                  json
              }
          }
          media {
              fixed(quality: 80, width: 300, height: 300) {
                base64
                tracedSVG
                srcWebp
                srcSetWebp
              }
          }
          mission {
              json
          }
          vision {
              json
          }
          registrationPackages {
              price
              title
          }
          registrationLink
          email
          facebookUrl
          twitterUrl
        }
      }
    }
  `);

  // console.log(result)
  result.data.allContentfulCluster.nodes.forEach(node => {
    createPage({
      path: `clusters/${node.title}`,
      component: path.resolve(`./src/templates/clusterpage.js`),
      context: {
        title: node.title,
      },
    });
  });

  result.data.allContentfulOrganization.nodes.forEach((organization) => {
    createPage({
      path: `organizations/${organization.slug}`,
      component: path.resolve(`./src/templates/orgTemplate.js`),
      context: {
        data: { organization },
      },
    });
  });
};
