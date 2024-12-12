import { CalorieDisplay } from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

export const CalorieTracker = () => {
    const { caloriesBurned, caloriesConsumed, netcalories } = useActivity()

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay calories={caloriesConsumed} text="Consumidas"></CalorieDisplay>
                <CalorieDisplay calories={caloriesBurned} text="Quemadas"></CalorieDisplay>
                <CalorieDisplay calories={netcalories} text="Diferencia"></CalorieDisplay>
            </div>
        </>
    )
}
