import { createSlice, createAsyncThunk, PayloadAction, isRejectedWithValue } from "@reduxjs/toolkit";
import api from "./api";

interface Research {
    id: number;
    title: string;
    author: string;
    content: string;
    url: string;
    date: string;
    source: string;
    type: string;
    tags: string;
    deadline: string;
    status: string;
    notes: string;
    pdfUrl: string;
}

interface ResearchState {
    research: Research | null;
    allResearch: Research[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: ResearchState = {
    research: null,
    allResearch: [],
    status: 'idle',
    error: null,
};

export const fetchResearch = createAsyncThunk<Research, number, { rejectValue: string }>(
    "research/fetchResearch",
    async (researchId, { rejectWithValue }) => {
        try {
            console.log("fetching research")
            const response = await api.get<Research>(`/research/${researchId}`);
            return response.data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch research");
        }
    }
);

export const fetchAllResearch = createAsyncThunk<Research[], void, { rejectValue: string }>(
    "research/fetchAllResearch",
    async (_, {rejectWithValue}) => {
        try {
            console.log("fetching all research")
            const response = await api.get<Research[]>(`/research/all`);
            return response.data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "failed to fetch research list");        }
    }
);

const researchSlice = createSlice({
    name: 'research',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchResearch.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchResearch.fulfilled, (state, action) => {
            state.status = 'idle';
            state.research = action.payload;
        })
            .addCase(fetchResearch.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? "unknown error";
        })
        .addCase(fetchAllResearch.fulfilled, (state, action) => {
            state.allResearch = action.payload; 
          });
    },
});

export default researchSlice.reducer;