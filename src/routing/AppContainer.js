import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from '../screens/login/containers/Login'
import SignUp from '../screens/sign_up/containers/SignUp';
import Recovery from '../screens/recovery/containers/Recovery';
import Feed from '../screens/feed/containers/Feed';
import Settings from '../screens/settings/containers/Settings';
import Post from '../screens/post/containers/Post';
import Editor from '../screens/editor/containers/Editor';
import Swiper from '../screens/swiper/containers/Swiper';
import Finder from '../screens/finder/containers/Finder';
import Notification from '../screens/notification/containers/Notification';
// you can also import from @react-navigation/native

const AppNavigator = createStackNavigator({
  FeedScreen: {screen: Feed},
  LoginScreen: { screen: Login},
  SignUpScreen: { screen: SignUp},
  RecoveryScreen: {screen: Recovery},
  SettingScreen: {screen: Settings},
  PostScreen: {screen: Post},
  EditorScreen: {screen: Editor},
  SwiperScreen: {screen: Swiper},
  FinderScreen: {screen: Finder},
  NotificationsScreen: {screen: Notification},
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;