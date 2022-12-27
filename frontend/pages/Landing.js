import FeaturedArtworks from '../components/Container/FeaturedArtworks';
import FeaturedCreators from '../components/Container/FeaturedCreators';
import LiveAuctions from '../components/Container/LiveAuctions';

import HeaderHero from '../components/Container/HeaderHero';


export default function Landing() {

  return (
    <>
    <div className='body-container'>
        <HeaderHero/>
        <FeaturedCreators />
        <LiveAuctions />
        <FeaturedArtworks />
      </div>
    </>
  );
} 
