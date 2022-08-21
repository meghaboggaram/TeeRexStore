import {Link} from 'react-router-dom';
const Home=()=>{
return (
    <div>
        <h1>Welcome to King Shan's Shopping Experience</h1>
        <Link to='products'><p>goto Products</p></Link>
    </div>
);
};

export default Home;