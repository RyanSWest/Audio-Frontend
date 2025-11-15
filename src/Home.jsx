import React from 'react'
import { Container } from 'react-bootstrap';
import{Link} from 'react-router-dom';
function Home() {
  return (
    <Container> 

 
        <div className="home">
            <h1 className='neon-text'> Maybe Art Reords</h1>
          <h2 className="neon-text">🎵 Audio Upload</h2>
          </div>
          <section className='up-sec'> 

            <Link to ='/login'>   <h3 className='profile-text'> Login</h3></Link>
            <Link to ='/register'> <h3 className='profile-text'> Register</h3></Link>
          </section>
     </Container>
  )
}

export default Home