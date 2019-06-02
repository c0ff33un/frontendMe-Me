import {createStackNavigator,createAppContainer} from 'react-navigation';

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
import UploadMeme from '../screens/upload_meme/containers/UploadMeme';

const StackNavigator = createStackNavigator({
  LoginScreen: { screen: Login},
  SignUpScreen: { screen: SignUp},
  RecoveryScreen: {screen: Recovery},
  FeedScreen: {screen: Feed},
  SettingScreen: {screen: Settings},
  PostScreen: {screen: Post},
  EditorScreen: {screen: Editor},
  SwiperScreen: {screen: Swiper},
  FinderScreen: {screen: Finder},
  NotificationsScreen: {screen: Notification},
});

const MainNavigator = createAppContainer(StackNavigator);

export default MainNavigator;