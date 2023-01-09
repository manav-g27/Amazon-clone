import Head from "next/head";
import Banner from "../components/banner";
import Header from "../components/header";
import Productfeed from "../components/productfeed";

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* header component */}
      <Header/>
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
      <Banner/>
        {/* Productfeed */}
        <Productfeed products={products}/>
      </main>
    </div>
  );
}

export async function getServerSideProps(context)
{
  const products = await fetch("https://fakestoreapi.com/products").then((res)=>res.json())
  return {
    props:{
      products
    }
  }
}