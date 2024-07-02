import { configureStore } from '@reduxjs/toolkit'
import Tabreducer from './reducers/tab'

export default configureStore({
    reducer: {
        tab: Tabreducer,
    },
})
