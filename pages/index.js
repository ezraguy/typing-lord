import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Words from '../components/words'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Lord 👑</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Words data={data} />
    </div>
  )
}


// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/words`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
