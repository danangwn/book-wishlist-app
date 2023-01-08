import 'bulma/css/bulma.min.css';
import { listing } from '../api/wishlist/listing';
import Link from 'next/link';
import Image from 'next/image';

export async function getServerSideProps(ctx: { key: string | undefined }){
    const books = await listing();
    return {
      props: {
          data: books
      }
    }
  }
  
export default function Wishlist(props: { data: any[] }) {
    async function removeWishlist(id, e) {
        e.preventDefault();
    
        const data = {
          id: id,
        }
    
        console.log('data', data);
        const res = await fetch('api/wishlist/remove', {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
        if (res.status === 200) {
          alert("Wishlist removed")
          return 'Wishlist created';
        }
    }

    return (
        <>
        <div style={{paddingBottom: 50}}>
        <nav className="navbar is-fixed-top is-spaced" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            {/* <Link className="navbar-item" href="/">
              <Image src="https://www.pngfind.com/pngs/m/202-2029636_reading-books-logo-png-transparent-png.png" width={100} height={100}></Image>
            </Link> */}
            <Link className="navbar-item" href="/">
                Home
              </Link>
    
              <Link className="navbar-item" href="/wishlist">
                Wishlist
              </Link>
          </div>
        </nav>
        </div>

        <div>
            {props.data.map(data => (
                <div key={data.id}>
                <div className="section has-background-light section-padding: 0">
                <div className="columns is-centered">
                <div className="column is-one-third">
                <div className="box" key={data.id}>
                    <article className="media">
                        <div className="media-left">
                        <figure className="image">
                            <Image src={data.photo} alt="Image" width={100} height={100}></Image>
                        </figure>
                        </div>
                        <div className="media-content">
                        <div className="content">
                            <p>
                            <p key={data.id}></p>
                            <h3 className="title"><strong>{data.title}</strong></h3>
                            <h4 className="subtitle">Authors: {data.author}</h4>
                            <h6 className="subtitle is-7">Rating: {data.reting}</h6>
                            <div className='button'  style={{paddingLeft: 0, paddingRight: 0}}>
                                <button className='button-is-medium button is-danger' type='submit' onClick={removeWishlist.bind(this, data.id)}>Remove</button>
                            </div>
                            </p>
                        </div>
                        </div>
                    </article>
                    </div>
                </div>
                </div>
                </div>
                </div>
            ))}
        </div>
        </>
    )
}