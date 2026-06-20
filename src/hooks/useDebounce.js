import { useEffect, useState } from "react";

/**
 * Permet d'optimiser le réseau, les appels API lors d'une recherche
 * Le user tape dans l'input react par exemple. 
 * Avec debounce 500 ms : attente 500 ms puis requête API
 * Et non pas 5 requêtes APÏ : "r" -> API, "re" -> api, "rea" -> api ...
 */

export const useDebounce = (value, delay = 500) => {
   const [debounceValue, setDebounceValue] = useState(value)

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebounceValue(value)
      }, delay)

      return () => clearTimeout(timer)
   }, [value, delay])

   return debounceValue
}