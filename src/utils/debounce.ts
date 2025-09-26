const debouncedHandler = (callback: () => void, period: number) => {
    let timer: number;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback();
        }, period);
    };
}

export default debouncedHandler;