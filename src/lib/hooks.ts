import { useContext } from "react";
import { FeedbackItemContext } from "../components/context/FeedbackItemContextProvider";

export function useFeedbackItemsContext() {
    const context = useContext(FeedbackItemContext);
    if (!context) {
        throw new Error("FeedbackItemsContext is not defined in FeedbackList component")
    }
    return context;
}