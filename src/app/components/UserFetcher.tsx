"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '@/store/userSlice';
import axios from 'axios';

export default function UserFetcher() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      dispatch(setLoading(true));
      try {
        const res = await axios.get('/api/user');
        console.log('[UserFetcher] API user data:', res.data);
        dispatch(setUser(res.data));
      } catch {
        dispatch(setUser(null));
      }
    }
    fetchUser();
  }, [dispatch]);

  return null;
} 