import { getPersistedStore, makePersistable } from "mobx-persist-store";
import { makeAutoObservable } from "mobx";
import { login } from "../core/auth";
import { changePasswordHeader } from "../core/api";

class UserStore {
    isLoading = true;

    password = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        makePersistable(this, {
            name: "UserStore",
            properties: ["password"],
        });
    }

    logout() {
        this.password = "";
    }

    login(password: string, callback: (success: boolean) => void) {
        login(password)
            .then(() => {
                this.password = password;
                changePasswordHeader(password);
                callback(true);
            })
            .catch(() => {
                callback(false);
            });
    }

    update(callback: (success: boolean) => void) {
        getPersistedStore(this).then(() => {
            login(this.password)
                .then(() => {
                    changePasswordHeader(this.password);
                    callback(true);
                })
                .finally(() => {
                    setTimeout(() => {
                        this.setLoading(false);
                    }, 700);
                })
                .catch(() => {
                    this.password = "";
                    callback(false);
                });
        });
    }

    getPassword(): string {
        return this.password;
    }

    setLoading(value: boolean) {
        this.isLoading = value;
    }

    isLoggedIn() {
        return this.password !== undefined && this.password !== "";
    }
}

const userStore = new UserStore();

export default userStore;
