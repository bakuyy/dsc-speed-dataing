'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Logo from "../../../../public/images/logo.png";
import Image from "next/image";
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaSync, FaArrowLeft } from 'react-icons/fa';

interface Match {
  match_id: string;
  similarity_score: number;
  emoji: string;
  person1: {
    id: string;
    name: string;
    year: string;
    program: string;
    pronouns: string;
    social_media_links: string;
    email: string;
  } | null;
  person2: {
    id: string;
    name: string;
    year: string;
    program: string;
    pronouns: string;
    social_media_links: string;
    email: string;
  } | null;
  created_at: string;
}

const AllMatchesPage = () => {
  const router = useRouter();
  const { role } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAccess = () => {
      const cookieRole = Cookies.get('role');
      const reduxRole = role;
      const adminVerified = Cookies.get('adminVerified');
      
      console.log('[All Matches Page] Checking admin access:', { cookieRole, reduxRole, adminVerified });
      
      if ((cookieRole === 'admin' || reduxRole === 'admin') && adminVerified === 'true') {
        console.log('[All Matches Page] Admin access confirmed');
        setIsAdmin(true);
        setIsLoading(false);
        fetchAllMatches();
      } else if (cookieRole === 'admin' || reduxRole === 'admin') {
        console.log('[All Matches Page] Admin not verified, redirecting to verification');
        router.push('/admin/verify');
      } else if (cookieRole && cookieRole !== 'admin') {
        console.log('[All Matches Page] User is not admin, redirecting to dashboard');
        router.push('/dashboard');
      } else if (!cookieRole && !reduxRole) {
        console.log('[All Matches Page] Still loading authentication state');
        setTimeout(checkAdminAccess, 500);
      } else {
        console.log('[All Matches Page] No authentication found, redirecting to login');
        router.push('/');
      }
    };

    checkAdminAccess();
  }, [role, router]);

  const fetchAllMatches = async () => {
    setLoadingMatches(true);
    setError(null);
    try {
      const response = await axios.get('/api/admin/all-matches');
      if (response.data.success) {
        setMatches(response.data.matches);
        console.log('[All Matches Page] Fetched matches:', response.data.matches);
      } else {
        setError(response.data.message || 'Failed to fetch matches');
      }
    } catch (error: unknown) {
      console.error('[All Matches Page] Error fetching matches:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string } } };
        setError(axiosError.response?.data?.error || 'Failed to fetch matches');
      } else {
        setError('Failed to fetch matches');
      }
    } finally {
      setLoadingMatches(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#374995] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="mt-4 text-[#374995] text-lg">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#E6EFFD]">
      <Navbar />
      <Image src={Logo} alt="Logo" className="w-3/5 lg:w-2/5 h-auto mx-auto py-8"/>
      
      <main className="flex-1 p-6 lg:p-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/admin')}
                  className="bg-[#374995] text-white px-4 py-2 rounded-lg hover:bg-[#5989fc] transition-colors flex items-center gap-2"
                >
                  <FaArrowLeft />
                  Back to Admin
                </button>
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold text-[#374995] mb-2">
                    All Current Matches
                  </h1>
                  <p className="text-lg text-gray-600">
                    View all speed dating matches generated by the algorithm.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={fetchAllMatches}
                  disabled={loadingMatches}
                  className="bg-[#374995] text-white px-4 py-2 rounded-lg hover:bg-[#5989fc] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <FaSync className={loadingMatches ? 'animate-spin' : ''} />
                  Refresh
                </button>
              </div>
            </div>
          </header>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Loading State */}
          {loadingMatches && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2">
                <FaSync className="animate-spin" />
                <span className="text-[#374995] text-lg">Loading matches...</span>
              </div>
            </div>
          )}

          {/* Matches Display */}
          {!loadingMatches && (
            <div className="space-y-6">
              {matches.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center border-2 border-[#374995]">
                  <h3 className="text-2xl font-semibold text-[#374995] mb-4">No Matches Found</h3>
                  <p className="text-gray-600 mb-6">
                    No current matches have been generated yet. Run the matching algorithm to create matches.
                  </p>
                  <button
                    onClick={() => router.push('/admin')}
                    className="bg-[#374995] text-white px-6 py-3 rounded-lg hover:bg-[#5989fc] transition-colors"
                  >
                    Go to Admin Dashboard
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#374995]">
                    <h3 className="text-xl font-semibold text-[#374995] mb-2">
                      Total Matches: {matches.length}
                    </h3>
                    <p className="text-gray-600">
                      Generated on: {matches.length > 0 ? formatDate(matches[0].created_at) : 'N/A'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map((match, index) => (
                      <div key={match.match_id} className="bg-white rounded-lg shadow-lg border-2 border-[#374995] overflow-hidden">
                        {/* Emoji Header */}
                        <div className="bg-[#374995] p-6 text-center">
                          <div className="text-6xl mb-2">{match.emoji}</div>
                          <div className="text-white text-sm">
                            Match #{index + 1} • {(match.similarity_score * 100).toFixed(1)}% Similarity
                          </div>
                        </div>

                        {/* Match Details */}
                        <div className="p-6">
                          <div className="space-y-4">
                            {/* Person 1 */}
                            <div className="border-b border-gray-200 pb-4">
                              <h4 className="font-semibold text-[#374995] mb-2">Person 1</h4>
                              {match.person1 ? (
                                <div className="space-y-1 text-sm">
                                  <p><strong>Name:</strong> {match.person1.name}</p>
                                  <p><strong>Year:</strong> {match.person1.year}</p>
                                  <p><strong>Program:</strong> {match.person1.program}</p>
                                  <p><strong>Pronouns:</strong> {match.person1.pronouns}</p>
                                  <p><strong>Socials:</strong> {match.person1.social_media_links}</p>
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">Person details not found</p>
                              )}
                            </div>

                            {/* Person 2 */}
                            <div>
                              <h4 className="font-semibold text-[#374995] mb-2">Person 2</h4>
                              {match.person2 ? (
                                <div className="space-y-1 text-sm">
                                  <p><strong>Name:</strong> {match.person2.name}</p>
                                  <p><strong>Year:</strong> {match.person2.year}</p>
                                  <p><strong>Program:</strong> {match.person2.program}</p>
                                  <p><strong>Pronouns:</strong> {match.person2.pronouns}</p>
                                  <p><strong>Socials:</strong> {match.person2.social_media_links}</p>
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">Person details not found</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllMatchesPage; 