import React from 'react'
import { createStore, combineReducers } from 'redux'
import counter1 from './reducers/counter1'

let cominedReducers = combineReducers({ counter1 })

let store = createStore(cominedReducers)