import {useQuery} from '@tanstack/react-query';

// const server = `${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_SERVER_PORT}`;

export function useGet() {
    async function get(){
        // async fetch request to the /get/ endpoint
        // const res = await fetch(`${server}/api/get/`);
        const res = await fetch('http://localhost:3050/api/get/');

        // if res is an error, throw that error
        if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

        // json returns a promise, so our QF can return it
        return res.json();
    }

    return useQuery(['get'], get);
}