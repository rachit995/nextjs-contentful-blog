import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

let client = require('contentful').createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.DELIVERY_API_KEY
})

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'article'
  })
  return {
    props: {
      articles: data.items
    }
  }
}

export default function Home({ articles }) {
  console.log({ articles })
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to my blog!
        </h1>
        <ul>
          {
            articles.map(article => (
              <li key={article.sys.id}>
                <Link href={`/articles/${article.fields.slug}`}>
                  {article.fields.title}
                </Link>
              </li>
            ))
          }
        </ul>

      </main>

      <footer>
      </footer>
    </div>
  )
}
