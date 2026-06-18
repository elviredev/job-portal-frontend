/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"
import api from "@/api/axios"


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)

   // récupère le user : requête au backend GET /auth/me qui va renvoyer les données du user en json
   // met à jour le state "user" dans AuthContext puis tous les composants utilisant useAuth() sont re-rendus automatiquement sans recharger la page
   const refreshUser = async () => {
      try {
         const res = await api.get('/auth/me', {
            withCredentials: true // axios transmet les cookies dans la requête
         })

         setUser(res.data.user ?? res.data)
      } catch (error) {
         if(error.response?.status !== 401) {
            console.log(error)
         }

         setUser(null)
      } 
   }

   useEffect(() => {
      const init = async () => {
         await refreshUser()
         setLoading(false)
      }

      init()
   }, [])

   // logout function
   const logout = async () => {
      try {
         await api.post('/auth/logout', {}, {
            withCredentials: true
         })
         setUser(null)
      } catch (error) {
         console.log(error)
      } finally {
         setUser(null)
      }
   }

   return (
      // Les enfants sont affichés tant que loading est false
      // si loading est true, rien n'est affiché. Cela évite un "flash" où la Navbar afficherait 
      // temporairement les boutons Login avant de découvrir que l'utilisateur est déjà connecté.
      <AuthContext.Provider value={{ user, setUser, refreshUser, loading, logout }}>
         {!loading && children}
      </AuthContext.Provider>
   )

}

export const useAuth = () => useContext(AuthContext)



