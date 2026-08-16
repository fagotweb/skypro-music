'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { fetchAllTracks } from '@/services/tracks';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { TrackType } from '@/sharedTypes/sharedTypes';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setAllTracks(allTracks));
    } else {
      dispatch(setFetchIsLoading(true));

      fetchAllTracks()
        .then((res: TrackType[]) => {
          dispatch(setAllTracks(res));
        })
        .catch((error: unknown) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
          } else {
            dispatch(setFetchError('Неизвестная ошибка'));
          }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, [allTracks, dispatch]);

  return null;
}
