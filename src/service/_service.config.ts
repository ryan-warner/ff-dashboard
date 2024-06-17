import APIDataSource from "./external/APIDataSource";
//import MockDataSource from "./external/MockDataSource";
import AirportData from '../model/AirportData';

import { atom } from 'jotai'

//export const dataSource = new MockDataSource();
export const dataSource = new APIDataSource();
export const airportData = atom<AirportData[]>([])
export const editingLayout = atom(false)