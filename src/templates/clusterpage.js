import React from "react"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink";

import Layout from "../components/Layout";
import Minimap from "../components/Minimap";
import { aso, asoPositions, aspire, aspirePositions, cap12, cap12Positions, cso, csoPositions, engage, engagePositions, probe, probePositions } from "./buildings"

import Img from "gatsby-image";

export default function ClusterPage({ data }) {
    const { landingImage, title, subtitle, buildingSize, organizations } = data.allContentfulCluster.nodes[0]
    return (
        <Layout pageName="cluster">
            <div className="organization-header">
                <p className="main-header">{subtitle}(<strong>{title}</strong>)</p>
            </div>
            <Minimap minimap={landingImage.fluid.src} buildings={engage} positions={engagePositions} />
            {/* <Minimap minimap={landingImage.fluid.src} buildingSize={buildingSize} organizations={organizations} /> */}
            <div className="organization-list">
                <h1 className="main-header" >Organizations under {title}</h1>
                <div className="sub-line" />
                <div className="list">
                    {organizations ? organizations.map((org, index) => {
                        return (
                            <div className="item" key={index}>
                                <AniLink
                                    cover
                                    to={org.slug}
                                    bg="#6666ff"
                                    duration={0.7}
                                    className="header-link"
                                >
                                    <div className="org-item">
                                        <img className="org-logo" draggable={false} src={org.logo.fluid.src} alt={org.acronym + " Logo"}/>
                                        <h1 className="sub-title">{org.organizationName}(<strong>{org.acronym}</strong>)</h1>
                                    </div>
                                </AniLink>
                            </div>
                        )
                    }) : <div></div>}
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($title: String!) {
    allContentfulCluster(filter: { title: { eq: $title } }) {
        nodes {
            title
            subtitle
            buildingSize
            landingImage{
                fluid{
                    ...GatsbyContentfulFluid
                }
            }
            organizations{
                slug
                organizationName
                acronym
                logo {
                    fluid {
                        ...GatsbyContentfulFluid
                    }
                }
                building {
                    fluid {
                        ...GatsbyContentfulFluid
                    }
                }
                x
                y
            }
        }
    }
  }
`