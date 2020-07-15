import React from 'react';

import Map from './Map'


import History from './order history'
import Logout from './logout'






export const Mapscreen =({navigation})=>< Map navigation={navigation} name="map"/> 

export const  HistoryScreen =({navigation})=><  History navigation={navigation} name="about"/> 
export const Logoutscreen =({navigation})=>< Logout navigation={navigation} name="contact"/> 


