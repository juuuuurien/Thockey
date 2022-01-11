import { useState, useEffect} from "react"
import randomWords from 'random-words';


const useSentence = async () => {
    const [sentence, setSentence] = useState();

    const generateString = async () => {
        const s = randomWords({exactly: 5, maxLength: 5, join: " "})
        return s;
      }
      
      const generateSentence = async () => {
        const s = await generateString();
        const arr = s.split("").map((c,i)=>{
          return (<span key={i} className = "character">{c}</span>)
        })
        setSentence(arr)
      }
    
      useEffect(async ()=>{
         await generateSentence();
      },[])

      return[sentence, generateSentence]
}

export default useSentence;