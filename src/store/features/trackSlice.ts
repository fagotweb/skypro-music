import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  currentPlaylist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  searchQuery: string;
  selectedAuthors: string[];
  selectedGenres: string[];
  selectedYear: string;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  currentPlaylist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  searchQuery: '',
  selectedAuthors: [],
  selectedGenres: [],
  selectedYear: 'По умолчанию',
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      state.isPlay = true;
    },

    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },

    // Экшен для переключения кнопки шафла
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },

    // ЭКШЕН ДЛЯ СОХРАНЕНИЯ ТЕКУЩЕГО ПЛЕЙЛИСТА (то, что вызывается на строке 25 в Track.tsx)
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
      state.shuffledPlaylist = [...action.payload].sort(
        () => Math.random() - 0.5,
      );
    },

    // ЭКШЕН СЛЕДУЮЩЕГО ТРЕКА (ищет внутри state.currentPlaylist)
    setNextTrack: (state) => {
      const currentList = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;

      if (!currentList || !currentList.length) return;

      const currentIndex = currentList.findIndex(
        (track: TrackType) => track._id === state.currentTrack?._id,
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < currentList.length) {
        state.currentTrack = currentList[nextIndex];
      }
    },

    // ЭКШЕН ПРЕДЫДУЩЕГО ТРЕКА
    setPrevTrack: (state) => {
      const currentList = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      if (!currentList || !currentList.length) return;
      const currentIndex = currentList.findIndex(
        (track: TrackType) => track._id === state.currentTrack?._id,
      );
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        state.currentTrack = currentList[prevIndex];
      }
    },

    // ЭКШЕНЫ ДЛЯ ИЗМЕНЕНИЯ ФИЛЬТРОВ
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleAuthorFilter: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.selectedAuthors.includes(author)) {
        state.selectedAuthors = state.selectedAuthors.filter(
          (a) => a !== author,
        );
      } else {
        state.selectedAuthors.push(author);
      }
    },
    toggleGenreFilter: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      if (state.selectedGenres.includes(genre)) {
        state.selectedGenres = state.selectedGenres.filter((g) => g !== genre);
      } else {
        state.selectedGenres.push(genre);
      }
    },
    setYearFilter: (state, action: PayloadAction<string>) => {
      state.selectedYear = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  setCurrentPlaylist,
  toggleShuffle,
  setSearchQuery,
  toggleAuthorFilter,
  toggleGenreFilter,
  setYearFilter,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
