import '../styles/Home.module.css'
import { listing } from './api/listing'
import 'bulma/css/bulma.min.css';

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
  async function addWishlist(id, e) {
    e.preventDefault();

    const data = {
      id: id,
    }

    const res = await fetch('api/wishlist/add', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    if (res.status === 200) {
      alert("Wishlist created")
      return 'Wishlist created';
    }
  }

  return (
    <>
    <div style={{paddingBottom: 50}}>
    <nav className="navbar is-fixed-top is-spaced" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <img src="https://www.pngfind.com/pngs/m/202-2029636_reading-books-logo-png-transparent-png.png"></img>
        </Link>
        <Link className="navbar-item">
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
        <div className='my-0'>
        <div className="section has-background-light section-padding: 0">
          <div className="columns is-centered">
          <div className="column is-one-third">
          <div className="box" key={data.bookId}>
              <article className="media">
                <div className="media-left">
                  <figure className="image">
                    <img src={data.photo} alt="Image"></img>
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <p key={data.bookId}></p>
                      <h3 className="title"><strong>{data.title}</strong></h3>
                      <h4 className="subtitle">Authors: {data.author}</h4>
                      <h6 className="subtitle is-7">Rating: {data.reting}</h6>
                      <div className='button'  style={{paddingLeft: 0, paddingRight: 0}}>
                        <button className='button-is-medium button is-danger' type='submit' onClick={addWishlist.bind(this, data.bookId)}>Add to Wishlist</button>
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
