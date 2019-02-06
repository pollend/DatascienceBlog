import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import classNames from  'classnames'

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.mdx
        const siteTitle = this.props.data.site.siteMetadata.title
        const {previous, next} = this.props.pageContext
        const post_type = post.frontmatter.type;

        const container_classes = classNames({
            'uk-container': post_type == 'centered',
            'uk-container-large': post_type == 'centered'
        })

        return (

            <Layout location={this.props.location} title={siteTitle}>
                <div className={container_classes}>
                    <SEO title={post.frontmatter.title} description={post.excerpt}/>
                    <h1>{post.frontmatter.title}</h1>
                    <p>
                        {post.frontmatter.date}
                    </p>
                    <MDXRenderer scope={this.props.__mdxScope}>
                        {post.code.body}
                    </MDXRenderer>
                    <hr/>

                    <ul
                        style={{
                            display: `flex`,
                            flexWrap: `wrap`,
                            justifyContent: `space-between`,
                            listStyle: `none`,
                            padding: 0,
                        }}
                    >
                        <li>
                            {previous && (
                                <Link to={previous.fields.slug} rel="prev">
                                    ← {previous.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li>
                            {next && (
                                <Link to={next.fields.slug} rel="next">
                                    {next.frontmatter.title} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </Layout>

        )
    }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
       code {
        body
      }
      frontmatter {
        title
        type
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
