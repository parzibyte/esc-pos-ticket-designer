export const debounce = (callback: Function, wait: number) => {
    let timerId: number;
    return (...args: any) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
};