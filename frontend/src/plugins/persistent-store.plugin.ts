import { configurePersistable } from 'mobx-persist-store';

if (typeof window !== 'undefined') {
    configurePersistable(
        {
            storage: window.localStorage,
            expireIn: 3600000, // 1 hour in milliseconds
            removeOnExpiration: true,
            debugMode: false, // Announce sets and gets in console
        },
        { delay: 200, fireImmediately: false }
    );
}
