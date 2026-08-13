import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  currentPlaylist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  currentPlaylist: [],
  shuffledPlaylist: [],
  isShuffle: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
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
        () => Math.random() - 0.5
      );
    },
    
    // ЭКШЕН СЛЕДУЮЩЕГО ТРЕКА (ищет внутри state.currentPlaylist)
    setNextTrack: (state) => {
      const { currentTrack, currentPlaylist } = state;

      const currentIndex = currentPlaylist.findIndex(
        (t: TrackType) => t._id === currentTrack?._id,
      );

      if (currentIndex !== -1 && currentIndex < currentPlaylist.length - 1) {
        state.currentTrack = currentPlaylist[currentIndex + 1];
      }

      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
        
      const curIndex = playlist.findIndex(
        (el: TrackType) => el._id === state.currentTrack?._id
      );
      
      const nextIndexTrack = curIndex + 1;
      
      // Проверяем, чтобы индекс не вышел за пределы массива
      if (nextIndexTrack < playlist.length) {
        state.currentTrack = playlist[nextIndexTrack];
      }
    },

    // ЭКШЕН ПРЕДЫДУЩЕГО ТРЕКА
    setPrevTrack: (state) => {
      const { currentTrack, currentPlaylist } = state;

      const currentIndex = currentPlaylist.findIndex(
        (t: TrackType) => t._id === currentTrack?._id,
      );

      if (currentIndex > 0) {
        state.currentTrack = currentPlaylist[currentIndex - 1];
      }

      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
        
      const curIndex = playlist.findIndex(
        (el: TrackType) => el._id === state.currentTrack?._id
      );
      
      const prevIndexTrack = curIndex - 1;
      
      if (prevIndexTrack >= 0) {
        state.currentTrack = playlist[prevIndexTrack];
      }
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
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
