// src/hooks/useFetch.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url, config = {}, cacheTime = 5 * 60 * 1000) => { // 5 minutes default cache
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(!!url);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                // Check cache first
                const cacheKey = `cache_${url}`;
                const cached = localStorage.getItem(cacheKey);
                
                if (cached) {
                    const { data: cachedData, timestamp } = JSON.parse(cached);
                    const isExpired = Date.now() - timestamp > cacheTime;
                    
                    if (!isExpired) {
                        setData(cachedData);
                        setLoading(false);
                        return;
                    }
                }

                setLoading(true);
                const response = await axios.get(url, {
                    signal: controller.signal,
                    ...config,
                });
                
                // Cache the response
                const cacheData = {
                    data: response.data,
                    timestamp: Date.now()
                };
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                
                setData(response.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url, cacheTime]);

    return { data, loading, error };
};

export default useFetch;
