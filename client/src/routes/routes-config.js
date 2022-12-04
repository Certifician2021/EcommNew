import MainApp from '../components/MainApp';
import NotFoundPage from '../components/NotFoundPage'
import Products from '../components/Products';
import SignUp from '../components/SignUp';


const routes = [
  {
    path: "/",
    component: Products,
  },
  {
    path: "/app/*",
    component: MainApp,
  },
  {
    path: "*",
    component: NotFoundPage,
  }
];

export default routes;
