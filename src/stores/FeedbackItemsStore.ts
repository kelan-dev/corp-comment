import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  error: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  error: "",
  selectedCompany: "",

  getCompanyList: () => {
    const companyList = get().feedbackItems.map((item) => item.company);
    return Array.from(new Set(companyList));
  },

  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (item) => item.company === state.selectedCompany
        )
      : state.feedbackItems;
  },

  addItemToList: async (text: string) => {
    if (!text) return;

    const company = text
      .split(" ")
      .find((word) => word.startsWith("#"))!
      .substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();

    const newItem: TFeedbackItem = {
      id: Date.now(),
      upvoteCount: 0,
      badgeLetter,
      company,
      text,
      daysAgo: 0,
    };

    // optimistic update
    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    // post to server
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );
  },

  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },

  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));

    try {
      const res = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      set(() => ({ feedbackItems: data.feedbacks }));
    } catch (err) {
      if (err instanceof Error) {
        set(() => ({ error: err.message }));
      } else {
        set(() => ({ error: "Something went wrong" }));
      }
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
}));
