import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackList() {
    const { isLoading, errorMessage, filterFeedbackItems } = useFeedbackItemsContext();

    return <ol className="feedback-list">
        {/* short-circuit for tineary checks */}
        {isLoading && <Spinner />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {filterFeedbackItems.map(feedbackItem => (
                <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
        ))}
    </ol>
}