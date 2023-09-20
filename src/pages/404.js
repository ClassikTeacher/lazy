import * as React from "react"
import { Link } from "gatsby"
import Layout from '../components/Layout/Layout'



const NotFoundPage = (props) => {
  return (
    <main className="page">
      <Layout location={props.location}>
        <div className="pageWrapper errorPage">
          <div className="container-errorPage">
              <h1 className="container-errorPage__title">
                404
              </h1>
              <div className="container-errorPage__subTitle">
              Oops. The page you were looking for doesn’t exist.
              </div>
              <div className="container-errorPage__description">
                You may have mistyped the address or the page may have moved.
              </div>
              <Link to="/" className="buttonError">
              Take me back to home page
              </Link>
          </div>
        </div>
      </Layout>
    </main>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
