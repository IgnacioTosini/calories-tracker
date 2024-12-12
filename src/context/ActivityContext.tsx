import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activityReducer"
import { ActivityP } from "../types"
import { categories } from "../data/categories"

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netcalories: number
    categoryName: (category: ActivityP["category"]) => string[]
    isEmpty: boolean
}
export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState)

    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) =>
        activity.category === 1 ? total + activity.calories : total, 0), [state.activities])
    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) =>
        activity.category === 2 ? total + activity.calories : total, 0), [state.activities])
    const netcalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

    const categoryName = useMemo(() =>
        (category: ActivityP['category']) =>
            categories.map(cat => cat.id === category ? cat.name : '')
        , [state.activities])

    const isEmpty = useMemo(() => state.activities.length === 0, [state.activities])
    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netcalories,
            categoryName,
            isEmpty
        }}>
            {children}
        </ActivityContext.Provider>
    )
}
