import React from 'react'
import { Container,Image,Carousel } from 'react-bootstrap';
import{Link} from 'react-router-dom';
function Home() {
  return (
    <Container> 

 
        <div className="home">
            <h1 className='neon-text'> Maybe Art Records</h1>
          <h2 className="neon-text">🎵 Audio Upload</h2>
          </div>
          <section className='up-sec'> 
            <Carousel> 


              {/* <Carousel.Item> 
                <Image src ='https://images.nightcafe.studio/jobs/NhyvNsjRQ8Wu1RWJTt6n/NhyvNsjRQ8Wu1RWJTt6n--grid.jpg?tr=w-1600,c-at_max'/>
              </Carousel.Item>
               */}
              {/* <Carousel.Item> 
                <Image src ='https://images.nightcafe.studio/jobs/o1IPlELbHJUQIkBXNzJ4/o1IPlELbHJUQIkBXNzJ4--0--699ol.jpg?tr=w-1600,c-at_max'/>
               </Carousel.Item> */}
            </Carousel>

            <Link to ='/login'>   <h3 className='profile-text'> Login</h3></Link>
            <Link to ='/register'> <h3 className='profile-text'> Register</h3></Link>
          </section>
     </Container>
  )
}

export default Home