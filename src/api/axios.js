import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true // le navigateur envoie automatiquement les cookies avec les requêtes => Mettre à true lors de l'intégration avec Laravel JWT 
})

export default api


