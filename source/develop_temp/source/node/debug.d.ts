export type Native = {
    startThread(): {
        promise: Promise<void>;
        id: number;
    };
};
