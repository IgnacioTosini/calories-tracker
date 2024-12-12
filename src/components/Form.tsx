import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { ActivityP } from "../types"
import { useActivity } from "../hooks/useActivity"

const initialState: ActivityP = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export const Form = () => {
    const [activity, setActivity] = useState<ActivityP>(initialState)
    const { dispatch, state } = useActivity()

    useEffect(() => {
        if (state.activeId) {
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <p>Formulario</p>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select name="" id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input type="text" id="name" className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Ejercicio"
                    value={activity.name}
                    onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input type="number" id="calories" className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input type="submit"
                className="bg-gray-800 hover:bg-slate-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
