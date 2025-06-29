import Chart from './pages/Chart.jsx';
import Viewtop from './pages/Viewtop.jsx';
import Calendar from './pages/calendar.jsx';
import Liketop from './pages/Liketop.jsx'
import './Home.css'

const Home = () => {
    return (
        <>
            <Chart />
            <div className='top-wapper'>
                <Calendar />
                <div className='top5-wapper'>
                    <Viewtop />
                    <Liketop />
                </div>
            </div>
            <div className='info'></div>
        </>
    )
}
export default Home