import { createAppContainer, createStackNavigator } from 'react-navigation'
import FeedScreen from '../screens/feed/FeedScreen'
import Login from '../screens/login/LoginScreen'
import SignUp from '../screens/sign_up/SignUpScreen'
import ValidateEmailScreen from '../screens/sign_up/ValidateEmailScreen'

// you can also import from @react-navigation/native

const AppNavigator = createStackNavigator(
  {
    Feed: { screen: FeedScreen},
    Login: { screen: Login, navigationOptions: { header: null }},
    SignUp: { screen: SignUp, navigationOptions: { header: null }},
    ValidateEmail: { screen: ValidateEmailScreen, navigationOptions: { header: null } }
  },
  {
    initialRouteName: 'Login'
  }
);

const UnauthenticatedAppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default UnauthenticatedAppContainer;