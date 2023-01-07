import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import '../styles/Home.module.css'
import { listing } from './api/hello'
import 'bulma/css/bulma.min.css';

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(ctx: { key: string | undefined }){
  const key = ctx.key ? ctx.key : 'Test';
  const books = await listing(key);
  return {
    props: {
        data: books
    }
  }
}

export default function Home(props: { data: any[] }) {
  return (
    <>
    <div>
      {props.data.map(data => (
        <div className="section">
          <div className="columns is-centered">
          <div className="column is-one-third">
          <div className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image">
                    <img src={data.photo} alt="Image"></img>
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <h1 className="title"><strong>{data.title}</strong></h1>
                      <h2 className="subtitle">Authors: {data.author}</h2>
                      <h5 className="subtitle is-5">Rating: {data.reting}</h5>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}
