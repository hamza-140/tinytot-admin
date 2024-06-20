import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
  {
    id: 1,
    icon: DashboardIcon,
    path: '/',
    title: 'Home',
  },
  {
    id: 2,
    icon: ShippingIcon,
    path: '/progress',
    title: 'Progress',
  },
];

export default sidebar_menu;
