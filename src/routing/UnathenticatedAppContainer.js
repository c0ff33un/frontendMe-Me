import { createAppContainer, createStackNavigator } from 'react-navigation'
import FeedScreen from '../screens/feed/FeedScreen'
import Login from '../screens/login/LoginScreen'
import SignUp from '../screens/sign_up/SignUpScreen'

// you can also import from @react-navigation/native

const AppNavigator = createStackNavigator(
  {
    Feed: { screen: FeedScreen },
    Login: { screen: Login},
    SignUp: { screen: SignUp}
  },
  {
    initialRouteName: 'Login'
  }
);

const UnauthenticatedAppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default UnauthenticatedAppContainer;