"use client";

import { useEffect, useState } from "react";
import { Banner } from "@/types/banner";
import { fetchBanners } from "@/sanity/queries";

export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBanners() {
      try {
        setLoading(true);
        setError(null);

        const fetchedBanners = await fetchBanners();
        setBanners(fetchedBanners);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch banners');
        console.error('Error loading banners:', err);
      } finally {
        setLoading(false);
      }
    }

    loadBanners();
  }, []);

  return {
    banners,
    loading,
    error,
    setBanners,
    refetch: async () => {
      setBanners([]);
      setLoading(true);
      setError(null);
      
      try {

        const fetchedBanners = await fetchBanners();
        setBanners(fetchedBanners);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch banners');
        console.error('Error loading banners:', err);
      } finally {
        setLoading(false);
      }
    }
  };
}
