import {useQuery} from '@tanstack/react-query';

export default function useGetQueues() {
    async function getQueues() {
        const response = await fetch(`/api/get/queues`);

        if (response.status >= 400) throw new Error(`${response.status}: ${response.statusText}`);
        return response.json();
    }

    return useQuery(['get', 'queues'], getQueues);
}