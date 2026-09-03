import { nextServer } from "../api"

export const getCurrentUser = async() => {
    const response = await nextServer.get('/api/user/me');

    return response.data;
}