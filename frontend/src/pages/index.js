import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import dateformat from 'dateformat'

export default function Home({data, error}) {
  console.log('data :>> ', data);
  console.log('done :>> ', error);
  useEffect(()=>{
    console.log('process.env.NEXT_PUBLIC_BASE_URL :>> ', process.env.NEXT_PUBLIC_BASE_URL);
  },[])
  return (
    <div>
      <Head>
        <title>Campaign Manager: | Home</title>
        <meta name="description" content="A site for campaigns" />
      </Head>
      <main className={styles.main}>
        <div className={styles.innerContent}>
        <h1>Available campaigns</h1>
        {error&&<p>{JSON.stringify(error)}</p>}
        {data.map((element) => <div key={element.slug}>
          <div className={styles.item}>
            <div className={styles.imgContainer}>
              <Image className={styles.img} src={"https://res.cloudinary.com/dtfqrpldp/" + element.logo} height={120} width={120} alt="Campaign Banner"/>
            </div>
            <div className={styles.rightItems}>
              <h1>{element.title}</h1>
              <p>{element.description}</p>
              <small>{dateformat(new Date(element.created_at), "dddd, mmmm, dS, yyyy, h:MM:ss TT")}</small>
            </div>
          </div>
        </div>)}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps(){
  let data=[];
  let error=null;
  try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`)
    data=await response.json()

  } catch (err) {
    error = err.message?err.message:"Something went wrong"
  }
  return {
    props:{
      data: data,
      error: error,
    }
  }
}