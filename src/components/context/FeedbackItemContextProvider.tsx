import { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../../lib/types";
import { useFeedbackItemsContext } from "../../lib/hooks";

type TFeedbackItemContext = {
    isLoading: boolean;
    errorMessage: string;
    companyList: string[];
    handleAddList: (text: string) => void;
    filterFeedbackItems: TFeedbackItem[];
    handleSelectCompany: (text: string) => void;
}

type FeedbackItemsContextProviderProps = {
    children: React.ReactNode;
}

export const FeedbackItemContext = createContext<TFeedbackItemContext | null>(null);

export default function FeedbackItemContextProvider({ children }: 
    FeedbackItemsContextProviderProps) {
    const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const companyList = useMemo(() => feedbackItems.map((item) => item.company)
    .filter((company, index, array) => {
        return array.indexOf(company) === index;
    }), [feedbackItems]);

    const handleAddList = async (text: string) => {
        const companyName = text
            .split(' ')
            .find(word => word.includes('#'))!
            .substring(1)
  
        const newItem: TFeedbackItem = {
            id: new Date().getTime(),
            text: text,
            upvoteCount: 0,
            daysAgo: 0,
            company: companyName,
            badgeLetter: companyName.substring(0,1).toUpperCase(),
        }
  
        setFeedbackItems([...feedbackItems, newItem]);
  
        await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
    }
    
    const [selectedCompany, setSelectedCompany] = useState("");

    const filterFeedbackItems = useMemo(() => selectedCompany ? feedbackItems.filter(
      feedbackItem => feedbackItem.company === selectedCompany
    ) : feedbackItems, [feedbackItems, selectedCompany]);
  
    const handleSelectCompany = (company: string) => {
      setSelectedCompany(company);
    }
    useEffect(() => {
        const fetchFeedbackItems = async () => {
            setIsLoading(true);
  
            try {
                const response = await fetch(
                    'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks')
                
                if (!response.ok) {
                    throw new Error();
                }
    
                const data = await response.json();
                setFeedbackItems(data.feedbacks);
            } catch (error) {
                setErrorMessage("Something went wrong. Please try again later.");
            }
            setIsLoading(false);
        };
  
        fetchFeedbackItems();
    }, []);

    return <FeedbackItemContext.Provider 
        value={{
            isLoading,
            errorMessage,
            companyList,
            handleAddList,
            filterFeedbackItems,
            handleSelectCompany
    }}>
        {children}
    </FeedbackItemContext.Provider>

    useFeedbackItemsContext();  
}