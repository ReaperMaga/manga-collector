import {getPersistedStore, makePersistable} from "mobx-persist-store";
import {makeAutoObservable} from "mobx";
import {login} from "../core/auth";
import {toast} from "react-toastify";
import success = toast.success;

class UserStore {

    isLoading = true
    password = ""

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})

        makePersistable(this, {
            name: "UserStore",
            properties: ["password"]
        }).then(r => {
            return;
        })
    }

    logout() {
        this.password = ""
    }

    login(password: string, callback: (success: boolean) => void) {
        login(password).then((request) => {
            this.password = password
            callback(true)
        }).catch((err) => {
            callback(false)
        })
    }

    update(callback: (success: boolean) => void) {
        getPersistedStore(this).then((data) => {
            login(this.password).then(request => {
                callback(true)
            }).finally(() => {
                setTimeout(() => {
                    this.setLoading(false)
                }, 700)
            }).catch((error) => {
                this.password = "";
                callback(false)
                return;
            })
        })
    }

    getPassword(): string {
        return this.password
    }

    setLoading(value: boolean) {
        this.isLoading = value
    }

    isLoggedIn() {
        if(this.password != undefined) {
            if(this.password !== "") {
                return true;
            }
        }
        return false;
    }
}

const userStore = new UserStore()

export default userStore