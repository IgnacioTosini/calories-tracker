import { ActivityP } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: ActivityP } } | //Payload son los datos
    { type: 'set-activeId', payload: { id: ActivityP['id'] } } |
    { type: 'delete-activity', payload: { id: ActivityP['id'] } } |
    { type: 'restart-app' }

export type ActivityState = {
    activities: ActivityP[],
    activeId: ActivityP['id']
}

const localStorageActivities = () : ActivityP[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        // Este codigo maneja la logica para actualizar el state
        let updateActivities: ActivityP[] = []
        if (state.activeId) {
            updateActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updateActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}