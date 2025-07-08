// src/hooks/useFetch.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url, config = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(!!url); // Only load if URL is provided
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController(); // cancel if unmounted

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    signal: controller.signal,
                    ...config,
                });
                setData(response.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort(); // clean up
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
