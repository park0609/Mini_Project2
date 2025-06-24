import Chart from './pages/Chart.jsx';
import Viewtop from './pages/Viewtop.jsx';
import Calendar from './pages/calendar.jsx';
import Liketop from './pages/Liketop.jsx'

const Home = () => {
    return (
        <>
            <Calendar />
            <Chart />
            <Viewtop />
            <Liketop />
        </>
    )
}
export default Home