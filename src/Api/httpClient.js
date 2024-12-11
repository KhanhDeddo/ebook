import axios from "axios";

export default class httpClient {
    constructor(path) {
        this.api = "http://127.0.0.1:5000/api" + path
    }

    getAsync = async (uri) => {
        try {
            let url = this.api + uri;
            let response = await axios.get(url);
            return response.data;
        } catch (error) {
                console.log(error);
        }
    }

    postAsync = async (uri, payload) => {
        try {
            let url = this.api + uri;
            let response = await axios.post(url, payload);
            return response.data;
        } catch (error) {
                console.log(error);
        }
    }

    putAsync = async (uri, payload) => {
        try {
            let url = this.api + uri;
            let response = await axios.put(url, payload);
            return response.data;
        } catch (error) {
                console.log(error);
        }
    }

    deleteAsync = async (uri, payload) => {
        try {
            let url = this.api + uri;
            let response = await axios.delete(url, payload);
            return response.data;
        } catch (error) {
                console.log(error);
        }
    }
}


