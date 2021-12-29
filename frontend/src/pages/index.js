import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({data, done}) {
  console.log('data :>> ', data);
  console.log('done :>> ', done);
  return (
    <>
    <h1>Available campaigns</h1>
    <p>lorem test</p>
    </>
  )
}

export async function getStaticProps(){
  const response=await fetch("http://localhost:8000/api/campaigns")

  const data=await response.json()
  return {
    props:{
      data: data,
      done: true,
    }
  }
}