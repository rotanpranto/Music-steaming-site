import { useContext } from "react"
import { audioContext } from "../contexts/audioContext"

export const useAudioContext = () => {
    const context = useContext(audioContext)
    console.log(context)

    if (!context) {
        throw Error(' must be inside an AudioContextProvider')
    }

    return context
}