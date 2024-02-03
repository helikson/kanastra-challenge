interface FetchDataOptions {
   url: RequestInfo | URL;
   options?: RequestInit | undefined;
   onSuccess: (data: any) => void;
   onFail: (error: any) => void;
}

export async function fetchData({ url, options = {}, onSuccess, onFail }: FetchDataOptions) {
   return fetch(`${import.meta.env.VITE_API_BASE_URL}/${url}`, options)
            .then(response => response.json())
            .then(onSuccess)
            .catch(onFail);
}