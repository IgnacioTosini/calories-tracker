import { Dispatch, useMemo } from "react"
import { ActivityP } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activityReducer"

type ActivityListProps = {
    activities: ActivityP[],
    dispatch: Dispatch<ActivityActions>
}

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
    const categoryName = useMemo(() =>
        (category: ActivityP['category']) =>
            categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])

    const isEmpty = useMemo(() => activities.length === 0, [activities])
    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
            {
                isEmpty ?
                    <p className="text-center my-5">No hay actividades</p>
                    :
                    activities.map(activity => (
                        <div key={activity.id}
                            className="px-5 py-10 bg-white mt-5 flex justify-between"
                        >
                            <div className="space-y-2 relative">
                                <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                                ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}
                                >
                                    {categoryName(+activity.category)}
                                </p>
                                <p className="text-2xl font-bold pt-5">
                                    {activity.name}
                                </p>
                                <p className="font-black text-4xl text-lime-500">
                                    {activity.calories} {''}
                                    <span>Calorias</span>
                                </p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <button
                                    onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}>
                                    <PencilSquareIcon
                                        className="h-8 w-8 text-gray-800"></PencilSquareIcon>
                                </button>
                                <button
                                    onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}>
                                    <TrashIcon
                                        className="h-8 w-8 text-red-800"></TrashIcon>
                                </button>
                            </div>
                        </div>
                    ))}
        </>
    )
}
