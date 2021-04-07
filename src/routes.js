import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login'
import Salesman_Listing from './pages/Salesman_Listing'
import Detail from './pages/Detail'
import Detail_Clients from './pages/Detail_Clients'
import Detail_Plans from './pages/Detail_Plans'
import Create_Salesman from './pages/Create_Salesman'
import Update_Salesman from './pages/Update_Salesman'
import Update_Client from './pages/Update_Client'
import Home_Admin from './pages/Home_Admin'
import Home_Salesman from './pages/Home_Salesman'
import Home_Client from './pages/Home_Client'
import Clients_Listing from './pages/Clients_Listing'
import Create_Clients from './pages/Create_Clients'


export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Home_Admin" component={Home_Admin} />
                <AppStack.Screen name="Home_Salesman" component={Home_Salesman} />
                <AppStack.Screen name="Home_Client" component={Home_Client} />
                <AppStack.Screen name="Salesman_Listing" component={Salesman_Listing} />
                <AppStack.Screen name="Detail" component={Detail} />
                <AppStack.Screen name="Detail_Clients" component={Detail_Clients} />
                <AppStack.Screen name="Detail_Plans" component={Detail_Plans} />
                <AppStack.Screen name="Create_Salesman" component={Create_Salesman} />
                <AppStack.Screen name="Update_Salesman" component={Update_Salesman} />
                <AppStack.Screen name="Clients_Listing" component={Clients_Listing} />
                <AppStack.Screen name="Create_Clients" component={Create_Clients} />
                <AppStack.Screen name="Update_Client" component={Update_Client} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}