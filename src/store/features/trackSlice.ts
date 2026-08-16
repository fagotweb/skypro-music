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
  allTracks: TrackType[];
  favoriteTracks: TrackType[];  
  fetchError: null | string;
  fetchIsLoading: boolean;
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
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
};

// Хелпер для переключения треков
const getNextOrPrevTrack = (
  playlist: TrackType[],
  currentTrack: TrackType | null,
  direction: 'next' | 'prev'
): TrackType | null => {
  if (!currentTrack || playlist.length === 0) return null;
  
  // Ищем индекс строго по id/ _id
  const currentIndex = playlist.findIndex((track) => track._id === currentTrack._id);
  
  if (currentIndex === -1) return null;

  if (direction === 'next') {
    const nextIndex = currentIndex + 1;
    // Если это последний трек, можно вернуть null или зациклить на 0 (playlist[0])
    return nextIndex < playlist.length ? playlist[nextIndex] : null; 
  } else {
    const prevIndex = currentIndex - 1;
    return prevIndex >= 0 ? playlist[prevIndex] : null;
  }
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

    // ЭКШЕН СЛЕДУЮЩЕГО ТРЕКА
    setNextTrack: (state) => {
      // Выбираем активный плейлист (обычный или перемешанный)
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.currentPlaylist;
      
      const nextTrack = getNextOrPrevTrack(playlist, state.currentTrack, 'next');
      
      if (nextTrack) {
        state.currentTrack = nextTrack;
      }
    },

    // ЭКШЕН ПРЕДЫДУЩЕГО ТРЕКА
    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.currentPlaylist;
      
      const prevTrack = getNextOrPrevTrack(playlist, state.currentTrack, 'prev');
      
      if (prevTrack) {
        state.currentTrack = prevTrack;
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

    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
    // Проверяем, нет ли уже этого трека в массиве, чтобы избежать дубликатов
    const exists = state.favoriteTracks.some((track) => track._id === action.payload._id);
    if (!exists) {
      state.favoriteTracks.push(action.payload);
    }
  },
  removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
    state.favoriteTracks = state.favoriteTracks.filter(
      (track) => track._id !== action.payload._id
    );
  },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
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
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
