import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes/components/app-routes';
import Footer from './components/Footer'
function App() {          
  return (
    <div>
     <Header/>
     <AppRoutes />
     <Footer/>
    </div>
  );
}

export default App;
