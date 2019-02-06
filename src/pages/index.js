import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
require("uikit/dist/js/uikit")

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
          <div className="uk-container uk-container-small">
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <article className="uk-article" key={node.fields.slug}>
                  <h1 className="uk-article-title">
                    <Link className="uk-link-reset" to={node.fields.slug}>
                      {title}
                    </Link>
                  </h1>
                  <p className="uk-article-meta">
                    {node.frontmatter.date}
                  </p>
                  <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                </article>
              )
            })}
          </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
