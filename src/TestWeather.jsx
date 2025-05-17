import { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from 'react-error-boundary';

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
const fetchWeather = async () => {
    await sleep(2000);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&appid=1ae64f8e15da22af443aac6b1e5b87cd`);
    if (res.ok) {
        return res.json()
    }
    throw new Error(res.statusText);
};

export function TestWeather() {
    const { data, isLoading, isError, error, refetch } = useQuery({ queryKey: ['weather'], queryFn: fetchWeather });

    console.log(data);


    return (
        <>

            <Suspense fallback={<p>Loading...</p>}>
                <ErrorBoundary fallback={<div>エラーが発生しました。</div>}>
                    <p>
                        {data?.weather?.[0]?.description}
                    </p>
                </ErrorBoundary>
            </Suspense >
        </>
    )
}